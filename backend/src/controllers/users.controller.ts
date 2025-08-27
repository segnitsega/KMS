import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

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
        id: newUser.id,
        role: newUser.role,
      },
      secretKey,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        id: newUser.id,
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
    if (!passwordMatch) throw new ApiError(401, "Invalid password");
    const accessToken = jwt.sign(
      {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        id: userFound.id,
        role: userFound.role,
      },
      secretKey,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        id: userFound.id,
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
      prisma.user.count(),
    ]);
    if (users.length === 0) throw new ApiError(400, "No users found");

    const safeUsers = users.map(({ password, refreshToken, ...rest }) => rest);
    res.status(200).json({
      totalUsers: totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users: safeUsers,
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
      include: {
        userDetail: true,
      },
    });
    if (!user) throw new ApiError(400, "Error finding user");

    const { password, refreshToken, ...safeUser } = user;
    res.status(200).json({ user: safeUser });
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
      },
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

export const handleProfileUpdate = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;
    const {
      email,
      firstName,
      lastName,
      skills,
      phoneNumber,
      birthPlace,
      address,
      socialMedia,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        firstName,
        lastName,
        skills,
        userDetail: {
          upsert: {
            create: {
              phoneNumber,
              birthPlace,
              address,
              socialMedia,
            },
            update: {
              phoneNumber,
              birthPlace,
              address,
              socialMedia,
            },
          },
        },
      },
      include: {
        userDetail: true,
      },
    });
    if (!updatedUser) throw new ApiError(500, "Error updating profile");
    res.status(200).json({
      message: "Profile updated successfully",
    });
  }
);
