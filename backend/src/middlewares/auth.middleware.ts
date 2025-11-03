import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.secret_key as string; 

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Verifying token")
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    console.log("Authorized request")
    next();
  } catch (error) {
    console.log("error verifi=ying")
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

export const checkAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if(req.user && req.user.role === "ADMIN"){
    return next()
  }
  else {
    return res.status(403).json({message: "Access denied: only for admins!"})
  }
}