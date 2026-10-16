import { Router, type Request, type Response } from "express";
import authMiddleware from "../middleware/aut.middleware";
import { createProject } from "../services/project.service";



const router = Router();




router.post("/projects/:workspaceId/createproject", authMiddleware, async (req: Request, res: Response) => {

  try {


  if (!req.user) {
    return res.status(401).json({
      success: false,
      message:"User not found"
    })
  }

  const userId = req.user.id;
  const {name} = req.body;
  const workspaceId = req.params.id;

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



          const project = await createProject({
                  userId,
                  workspaceId: workspaceId.trim(),
                  name: name.trim(),
                });


  } catch (error) {

  }
})
