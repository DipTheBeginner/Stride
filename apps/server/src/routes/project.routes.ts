import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import {
  createProject,
  getProjectById,
  getProjectMembers,
  getWorkspaceProjectsBySlug,
} from "../services/project.service";
import { strict } from "assert";

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
      const {
        name,
        description,
        icon,
        color,
        memberIds,
        leadId,
        status,
        priority,
        tags,
        dueDate,
        startDate,
      } = req.body;
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

      if (
        leadId !== undefined &&
        leadId !== null &&
        (typeof leadId !== "string" || leadId.trim() === "")
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project lead",
        });
      }

      if (
        memberIds !== undefined &&
        (!Array.isArray(memberIds) ||
          !memberIds.every(
            (id: unknown) => typeof id === "string" && id.trim() !== "",
          ))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project members",
        });
      }

      if (
        typeof startDate !== "string" ||
        typeof dueDate !== "string" ||
        !startDate.trim() ||
        !dueDate.trim() ||
        Number.isNaN(Date.parse(startDate)) ||
        Number.isNaN(Date.parse(dueDate))
      ) {
        return res.status(400).json({
          message: "Valid start date and due date are required",
        });
      }

      if (new Date(dueDate) < new Date(startDate)) {
        return res.status(400).json({
          message: "Due date cannot be earlier than start date",
        });
      }

      if (
        !Array.isArray(tags) ||
        !tags.every(
          (tag: unknown) => typeof tag === "string" && tag.trim() !== "",
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Tags must be an array of non-empty strings",
        });
      }

      const cleanDescription =
        typeof description === "string" && description.trim()
          ? description.trim()
          : null;

      const allowedIcons = [
        "folder",
        "code",
        "globe",
        "smartphone",
        "server",
        "palette",
        "rocket",
        "megaphone",
        "briefcase",
        "chart",
        "lightbulb",
        "target",
      ];

      if (typeof icon !== "string" || !allowedIcons.includes(icon)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project icon",
        });
      }

      if (typeof color !== "string" || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project color",
        });
      }

      const project = await createProject(
        name,
        workspaceId,
        userId,
        description,
        icon,
        color,
        leadId,
        memberIds,
        status,
        priority,
        tags,
        dueDate,
        startDate,
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

router.get(
  "/:projectId",
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

      const { projectId } = req.params;

      if (typeof projectId !== "string" || projectId.trim() === "") {
        return res.status(401).json({
          success: false,
          message: "Project id is required",
        });
      }

      const project = await getProjectById(projectId, userId);

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      console.error("Failed to fetch project:", error);

      if (
        error instanceof Error &&
        error.message === "Project not found or unauthorized"
      ) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch project",
      });
    }
  },
);

router.get(
  "/:projectId/members",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "user not exist",
        });
      }

      const userId = req.user.id;
      const { projectId } = req.params;

      if (typeof userId !== "string" || userId.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "userId is mandatory",
        });
      }

      if (typeof projectId !== "string" || projectId.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "projectId is mandatory",
        });
      }

      const members = await getProjectMembers(projectId, userId);

      return res.status(200).json({
        success: true,
        members,
      });
    } catch (error) {
      console.error("Failed to fetch project members:", error);

      if (error instanceof Error) {
        if (error.message === "Project not found or unauthorized") {
          return res.status(404).json({
            success: false,
            message: error.message,
          });
        }
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch project members",
      });
    }
  },
);

export default router;
