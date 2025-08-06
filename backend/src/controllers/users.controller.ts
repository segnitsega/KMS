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
      { id: newUser.id, role: newUser.role },
      secretKey,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      { id: newUser.id, role: newUser.role },
      refreshKey,
      { expiresIn: "7d" }
    );

    await prisma.user.update({
      where: { email },
      data: {
        refreshToken,
      },
    });
    return res.status(200).json({
      message: " New user registered successfully",
      userId: newUser.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
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

      const passwordMatch = await bcrypt.compare(password, userFound.password as string);
      if (!passwordMatch) throw new ApiError(400, "Invalid password");
      const accessToken = jwt.sign(
        { id: userFound.id, role: userFound.role },
        secretKey,
        { expiresIn: "2h" }
      );
      const refreshToken = jwt.sign(
        { id: userFound.id, role: userFound.role },
        refreshKey,
        { expiresIn: "7d" }
      );
      await prisma.user.update({
        where: { email },
        data: {
          refreshToken,
        },
      });

      res.status(200).json({
        message: "login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
);
