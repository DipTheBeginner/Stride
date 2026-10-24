import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import {
  addMembersToWorkspace,
  createWorkspace,
  getUserWorkspace,
  getWorkspaceBySlug,
  updateWorkspaceLogo,
} from "../services/workspace.service";
import { uploadWorkspacelogo } from "../middleware/upload.middleware";
import { validateWorkspaceLogo } from "../utils/validate-image";
import requireWorkspaceManager from "../middleware/workspacepermission.middleware";
import {
  deleteLogofromR2,
  getLogoSignedUrl,
  uploadLogoToR2,
} from "../services/r2.service";
import { prisma } from "@stride/database";

const router = Router();

router.post(
  "/createworkspace",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const userId = req.user.id;
      const { slug, name } = req.body;

      if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Name is missing",
        });
      }

      if (typeof slug !== "string" || slug.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Slug is missing",
        });
      }

      const normalizedSlug = slug.trim().toLowerCase();
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

      if (!slugRegex.test(normalizedSlug)) {
        return res.status(400).json({
          success: false,
          message:
            "Slug can only contain lowercase letters, numbers, and single hyphens between words",
        });
      }

      const input = {
        slug: normalizedSlug,
        name: name.trim(),
        userId,
      };

      const workspace = await createWorkspace(input);

      return res.status(201).json({
        success: true,
        message: "Workspace created successfully",
        workspace,
      });
    } catch (error) {
      console.error("Workspace creation failed:", error);

      if (
        error instanceof Error &&
        error.message === "Workspace slug already taken"
      ) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to create workspace",
      });
    }
  },
);

router.get(
  "/getworkspaces",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "UserId not avilable",
        });
      }

      const userId = req.user.id;

      const userworksSpace = await getUserWorkspace(userId);

      return res.status(200).json({
        success: true,
        message: "User workspaces fetched",
        userworksSpace,
      });
    } catch (error) {
      console.log("Workspaces fetch failed:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch workspaces",
      });
    }
  },
);

router.get("/:slug", authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
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

    const workspace = await getWorkspaceBySlug(slug, userId);

    if (!workspace) {
      return res.status(404).json({
        message: "No wrokspaces found with such slug",
      });
    }

    const logoUrl = workspace.logoUrl
      ? await getLogoSignedUrl(workspace.logoUrl)
      : null;

    return res.status(200).json({
      success: true,
      workspace: {
        ...workspace,
        logoUrl,
      },
    });
  } catch (error) {
    console.error("Failed to fetch workspace by slug", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch workspace",
    });
  }
});

router.patch(
  "/:slug/logo",
  authMiddleware,
  requireWorkspaceManager,
  uploadWorkspacelogo,
  async (req: Request, res: Response) => {
    // OUTER TRY START
    try {
      const { slug } = req.params;
      const file = req.file;

      if (typeof slug !== "string" || !slug.trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace slug",
        });
      }

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Workspace logo is required",
        });
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const userId = req.user.id;

      let validatedMimeType: string;

      try {
        validatedMimeType = await validateWorkspaceLogo(file);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace logo",
        });
      }

      const workspace = await getWorkspaceBySlug(slug, userId);

      if (!workspace) {
        return res.status(404).json({
          success: false,
          message: "Workspace not found",
        });
      }

      const key = await uploadLogoToR2(workspace.id, file, validatedMimeType);

      // INNER TRY START
      try {
        const updatedWorkspace = await updateWorkspaceLogo(slug, key);

        return res.status(200).json({
          success: true,
          message: "Workspace logo updated",
          workspace: updatedWorkspace,
        });
      } catch (error) {
        try {
          await deleteLogofromR2(key);
        } catch (cleanupError) {
          console.error("R2 cleanup failed:", cleanupError);
        }

        throw error;
      }
      // INNER TRY END
    } catch (error) {
      // OUTER CATCH
      console.error("Workspace logo upload failed:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload workspace logo",
      });
    }
  },
);


router.post("/:slug/addmember", authMiddleware, async (req: Request, res: Response) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:"Unauthorized access"
      })
    }

    const requestedByUserId = req.user.id;

    const { slug } = req.params

    const { email } = req.body

    if (typeof slug !== "string" || !slug.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid workspace slug",
      });
    }
    
    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        slug:slug.toLowerCase()
      }
    })

    
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const member = await addMembersToWorkspace(workspace.id, email, requestedByUserId)


    return res.status(201).json({
      success: true,
      message:"Member added successfully"
    })
    
    
  } catch (error) {
    console.error("Failed to add to workspace:", error);

    return res.status(500).json({
      success: false,
      message:"Failed to add workspace member"
    })
  }
})

export default router;
