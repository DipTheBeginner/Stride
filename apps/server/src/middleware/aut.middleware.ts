import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string | null;
    }
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("Session ID:", req.sessionID);
  console.log("Authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "You must be logined to access this resource",
    });
  }
  next();
}
