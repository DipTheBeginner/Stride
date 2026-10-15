
import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import {createWorkspace, getUserWorkspace, getWorkspaceBySlug} from "../services/workspace.service";

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
  }
);


router.get("/getworkspaces", authMiddleware, async (req: Request, res: Response) => {

  try {
    if (!req.user) {
      return res.status(401).json({
        error:"UserId not avilable"
      })

    }

    const userId = req.user.id;

    const userworksSpace=await getUserWorkspace(userId);

    return res.status(200).json({
      success: true,
      message: "User workspaces fetched",
      userworksSpace
    })



  } catch (error) {

    console.log("Workspaces fetch failed:", error);
    return res.status(500).json({
        success: false,
        message: "Failed to fetch workspaces",
      });


  }


})




router.get("/:slug", authMiddleware, async(req: Request, res: Response) => {

  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:"Unauthorized"
      })

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
        message:"No wrokspaces found with such slug"
      })
    }

    return res.status(200).json({
      success: true,
      workspace
    })
    
    
  } catch (error) {
    console.error("Failed to fetch workspace by slug", error);
    return res.status(500).json({
      success: false,
      message:"Failed to fetch workspace"
    })

  }
})

export default router;
