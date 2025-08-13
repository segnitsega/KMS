import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.secret_key as string;
const refreshKey = process.env.refresh_key as string;

export const handleSignup = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    console.log(req.body);
    if (!req.body) throw new ApiError(400, "Empty request body");
    const { firstName, lastName, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists)
      throw new ApiError(400, `User with email ${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) throw new ApiError(400, "Error registering new user.");

    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      secretKey,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      refreshKey,
      { expiresIn: "7d" }
    );

    await prisma.user.update({
      where: { email },
      data: {
        refreshToken,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 *1000 
    })

    res.status(200).json({
      message: "login successful",
      accessToken: accessToken,
    });
    return res.status(200).json({
      message: " New user registered successfully",
      userId: newUser.id,
      accessToken: accessToken,
    });
  }
);

export const handleLogin = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const userFound = await prisma.user.findUnique({
      where: { email },
    });
    if (!userFound)
      throw new ApiError(400, `User with email ${email} is not found`);

    const passwordMatch = await bcrypt.compare(
      password,
      userFound.password as string
    );
    if (!passwordMatch) throw new ApiError(400, "Invalid password");
    const accessToken = jwt.sign(
      {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        role: userFound.role,
      },
      secretKey,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        role: userFound.role,
      },
      refreshKey,
      { expiresIn: "7d" }
    );
    await prisma.user.update({
      where: { email },
      data: {
        refreshToken,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 *1000 
    })

    res.status(200).json({
      message: "login successful",
      accessToken: accessToken,
    });
  }
);

export const getUsers = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
      }),
      prisma.discussion.count(),
    ]);
    if (users.length === 0) throw new ApiError(400, "No users found");
    res.status(200).json({
      totalUsers: totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users: users,
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new ApiError(400, "Error finding user");
    res.status(200).json({ user: user });
  }
);

export const handleUserSearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const results = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { skills: { has: query } },
          { department: { contains: query, mode: "insensitive" } },
        ],
      }
    });

    if (results.length === 0) {
      throw new ApiError(404, "No matching users found");
    }

    res.status(200).json({
      totalResults: results.length,
      users: results,
    });
  }
);