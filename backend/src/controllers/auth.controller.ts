import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.secret_key as string;
const refreshKey = process.env.refresh_key as string;

export const handleRefreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new ApiError(401, "No refresh token provided");

    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });
    if (!user) throw new ApiError(403, "Invalid refresh token");

    jwt.verify(refreshToken, refreshKey, (err: any) => {
      if (err) {
        throw new ApiError(403, "Refresh token expired or invalid");
      }

      const accessToken = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        secretKey,
        { expiresIn: "2h" }
      );

      res.json({ accessToken });
    });
  }
);

export const handleTokenVerifaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw new ApiError(403, "Invalid or expired token");
      }

      res.status(200).json({
        message: "Token is valid",
        user: decoded,
      });
    });
  }
);
