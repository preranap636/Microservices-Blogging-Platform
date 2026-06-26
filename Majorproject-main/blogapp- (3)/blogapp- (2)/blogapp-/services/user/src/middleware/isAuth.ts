// import { type NextFunction } from "express";
// import jwt, { type JwtPayload } from "jsonwebtoken";
// import { type IUser } from "../model/User.js";
// import { type Request, type Response } from "express";

// export interface AuthenticatedRequest extends Request {
//   user?: IUser | null;
// }

// export const isAuth = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const authHeader = req.headers.authorization;

//     // 🛑 No Authorization header
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       res.status(401).json({
//         success: false,
//         message: "Please login — missing or invalid Authorization header",
//       });
//       return;
//     }

//     const token = authHeader?.split(" ")[1];


//     // 🧩 Verify JWT token
//     const decoded = jwt.verify(
//       token as string,
//       process.env.JWT_SEC as string
//     ) as JwtPayload & { user?: IUser };

//     // 🛑 Invalid or missing user inside token
//     if (!decoded || !decoded.user) {
//       res.status(401).json({
//         success: false,
//         message: "Invalid or expired token",
//       });
//       return;
//     }

//     // ✅ Attach user to request
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error);
//     res.status(401).json({
//       success: false,
//       message: "Please login — token verification failed",
//     });
//   }
// };
import { type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type IUser } from "../model/User.js";
import { type Request, type Response } from "express";
import User from "../model/User.js";

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
        success: false,
        message: "Please login — missing or invalid Authorization header",
      });
      return;
    }

    const token = authHeader.split(" ")[1]!;

    // ✅ Verify JWT and decode payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SEC as string
    ) as JwtPayload & { id?: string };

    if (!decoded?.id) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // ✅ Fetch user from DB by ID
    const user = await User.findById(decoded.id).select("-__v");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({
      success: false,
      message: "Please login — token verification failed",
    });
  }
};
