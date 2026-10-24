import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import {
  createProject,
  getWorkspaceProjectsBySlug,
} from "../services/project.service";

const router = Router();

router.post(
  "/:workspaceId/createproject",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const userId = req.user.id;
      const { name , description } = req.body;
      const { workspaceId } = req.params;
      

      if (typeof workspaceId !== "string" || workspaceId.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Workspace ID is required",
        });
      }

      if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Project name is required",
        });
      }
      
      if (
        description !== undefined &&
        description !== null &&
        typeof description !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      const cleanDescription =
        typeof description === "string" && description.trim()
          ? description.trim()
          : null;

      const project = await createProject(
        name.trim(),
        workspaceId.trim(),
        userId,
        cleanDescription
      );

      return res.status(201).json({
        success: true,
        message: "Project created successfully",
        project,
      });
    } catch (error) {
      console.error("Failed to create project:", error);

      if (
        error instanceof Error &&
        error.message === "Unauthorized access to workspace"
      ) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to create project",
      });
    }
  },
);

router.get(
  "/workspace/:slug/projects",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

      const userId = req.user.id;

      const { slug } = req.params;

      if (typeof slug !== "string" || slug.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Workspace slug is required",
        });
      }

      const projects = await getWorkspaceProjectsBySlug(slug.trim(), userId);

      return res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.error("Failed to fetch projects:", error);

      if (
        error instanceof Error &&
        error.message === "Workspace not found or unauthorized"
      ) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
      });
    }
  },
);

export default router;
