import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Please Login - No auth header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SEC;

    if (!secret) {
      console.error("❌ JWT_SEC is not defined in .env file");
      res.status(500).json({
        message: "Internal server error: JWT secret not configured",
      });
      return;
    }

    const decodeValue = jwt.verify(token ?? "", secret) as any;

if (!decodeValue || !decodeValue.user || !decodeValue.user._id) {
  res.status(401).json({
    message: "Invalid token",
  });
}

req.user = decodeValue.user;  
next();


  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Session expired. Please log in again.",
      });
      return;
    }

    res.status(401).json({
      message: "Invalid token or authentication error",
    });
  }
};
