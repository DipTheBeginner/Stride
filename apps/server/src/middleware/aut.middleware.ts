import type { NextFunction, Request, Response } from "express";




export default function authMiddleware(req: Request, res:Response , next:NextFunction) {
  if (!req.isAuthenticated() || req.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message:"You must be logined to access this resource"
      
    })
    
  }
}