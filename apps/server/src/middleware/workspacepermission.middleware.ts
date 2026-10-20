import type { NextFunction, Request, Response } from "express";
import { canManageWorkspace } from "../services/workspace.service";

export default async function requireWorkspaceManager(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        susccess: false,
        message: "Not authenticated user",
      });
    }

    const userId = req.user.id;

    const { slug } = req.params;

    if (typeof slug !== "string" || !slug.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid workspace slug",
      });
    }

    const allowed = await canManageWorkspace(userId, slug);

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Only workspace owners and admins can change the logo",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}
