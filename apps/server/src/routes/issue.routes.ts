import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import { createIssue, deleteIssue, getProjectIssue, updateIssue } from "../services/issue.service";

const router = Router();

router.post(
  "/:projectId/issue",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "use not exist",
        });
      }

      const createdById = req.user.id;
      const { projectId } = req.params;

      const { title, description, priority, status, assigneeId, dueDate } =
        req.body;

      // 1. Validate projectId
      if (typeof projectId !== "string" || !projectId.trim()) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required",
        });
      }

      // 2. Validate title
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Issue title is required",
        });
      }

      // 3. Validate description
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

      // 4. Validate priority
      const allowedPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

      if (
        priority !== undefined &&
        (typeof priority !== "string" || !allowedPriorities.includes(priority))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue priority",
        });
      }

      // 5. Validate status
      const allowedStatuses: string[] = ["TODO", "IN_PROGRESS", "COMPLETED"];

      if (
        status !== undefined &&
        (typeof status !== "string" || !allowedStatuses.includes(status))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue status",
        });
      }

      // 6. Validate assigneeId
      if (
        assigneeId !== undefined &&
        assigneeId !== null &&
        (typeof assigneeId !== "string" || !assigneeId.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid assignee ID",
        });
      }

      // 7. Validate dueDate
      if (
        dueDate !== undefined &&
        dueDate !== null &&
        (typeof dueDate !== "string" ||
          !dueDate.trim() ||
          Number.isNaN(new Date(dueDate).getTime()))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid due date",
        });
      }

      // 8. Prepare validated values
      const cleanTitle = title.trim();
      const cleanDescription =
        typeof description === "string" ? description.trim() : "";

      const cleanPriority = priority ?? "MEDIUM";
      const cleanStatus = (status ?? "TODO") as
        "TODO" | "IN_PROGRESS" | "COMPLETED";

      const issue = await createIssue(
        cleanTitle,
        cleanDescription,
        cleanPriority,
        status,
        projectId,
        assigneeId,
        createdById,
        dueDate,
      );
    } catch (error) {
      console.error("Failed to create issue:", error);

      if (error instanceof Error) {
        if (error.message === "Project not found") {
          return res.status(404).json({
            success: false,
            message: error.message,
          });
        }

        if (
          error.message === "You are not a member of this workspace" ||
          error.message === "You are not a member of this project" ||
          error.message === "Assignee is not a member of this project"
        ) {
          return res.status(403).json({
            success: false,
            message: error.message,
          });
        }
      }

      return res.status(500).json({
        success: false,
        message: "Failed to create issue",
      });
    }
  },
);

router.get(
  "/:projectId/getIssue",
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

      if (typeof projectId !== "string" || !projectId.trim()) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required",
        });
      }

      const getIssue = await getProjectIssue(projectId, userId);

      return res.status(200).json({
        success: true,
        getIssue,
      });
    } catch (error) {
      console.error("Failed to fetch issues:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch issues",
      });
    }
  },
);

router.patch(
  "/:projectId/issues/:issueId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {

      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "use not exist",
        });
      }

      const createdById = req.user.id;
      const { projectId, issueId } = req.params;

      const { title, description, priority, status, assigneeId, dueDate } =
        req.body;


      if (
        [title, description, priority, status, assigneeId, dueDate]
          .every((value) => value === undefined)
      ) {
        return res.status(400).json({
          success: false,
          message: "At least one field is required to update an issue",
        });
      }

      // 1. Validate projectId issueId

      if (
        typeof projectId !== "string" ||
        !projectId.trim() ||
        typeof issueId !== "string" ||
        !issueId.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Valid project ID and issue ID are required",
        });
      }

      // 2. Validate title
      if (
        title !== undefined &&
        (typeof title !== "string" || !title.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue title",
        });
      }

      // 3. Validate description
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

      // 4. Validate priority
      const allowedPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

      if (
        priority !== undefined &&
        (typeof priority !== "string" || !allowedPriorities.includes(priority))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue priority",
        });
      }

      // 5. Validate status
      const allowedStatuses: string[] = ["TODO", "IN_PROGRESS", "COMPLETED"];

      if (
        status !== undefined &&
        (typeof status !== "string" || !allowedStatuses.includes(status))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue status",
        });
      }

      // 6. Validate assigneeId
      if (
        assigneeId !== undefined &&
        assigneeId !== null &&
        (typeof assigneeId !== "string" || !assigneeId.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid assignee ID",
        });
      }

      // 7. Validate dueDate
      if (
        dueDate !== undefined &&
        dueDate !== null &&
        (typeof dueDate !== "string" ||
          !dueDate.trim() ||
          Number.isNaN(new Date(dueDate).getTime()))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid due date",
        });
      }

      // 8. Prepare validated values
      const cleanTitle = title.trim();
      const cleanDescription =
        typeof description === "string" ? description.trim() : "";

     


      const updatedIssue = await updateIssue(
        createdById,
        projectId,
        issueId,
        {
          title: cleanTitle,
          description: cleanDescription,
          priority,
          status,
          assigneeId,
          dueDate,
        },
      );
      
      return res.status(200).json({
        success: true,
        message: "Issue updated successfully",
        issue: updatedIssue,
      });


    } catch (error) {}
  },
);


router.delete(
  "/:projectId/issues/:issueId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      const userId = req.user.id;
      const { projectId, issueId } = req.params;

      // Validate projectId
      if (typeof projectId !== "string" || !projectId.trim()) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required",
        });
      }

      // Validate issueId
      if (typeof issueId !== "string" || !issueId.trim()) {
        return res.status(400).json({
          success: false,
          message: "Issue ID is required",
        });
      }

      // Call service
      const deletedIssue = await deleteIssue(
        projectId,
        issueId,
        userId,
      );

      return res.status(200).json({
        success: true,
        message: "Issue deleted successfully",
        issue: deletedIssue,
      });

    } catch (error) {
      console.error("Failed to delete issue:", error);

      if (error instanceof Error) {
        if (
          error.message === "Project not found" ||
          error.message === "Issue not found in this project"
        ) {
          return res.status(404).json({
            success: false,
            message: error.message,
          });
        }

        if (
          error.message === "You are not a member of this workspace" ||
          error.message === "You don't have permission to delete issues"
        ) {
          return res.status(403).json({
            success: false,
            message: error.message,
          });
        }
      }

      return res.status(500).json({
        success: false,
        message: "Failed to delete issue",
      });
    }
  },
);
export default router;
