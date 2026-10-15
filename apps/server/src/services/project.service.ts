import { prisma } from "@stride/database";






export async function createProject(name: string, workspaceId: string, userId: string) {

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId
      }
    }
  })

  if (!membership) {
    throw new Error("Unauthorized access to workspace")
  }

  const project = await prisma.project.create({
    
      data: {
        name,
        workspaceId
      }
    }
  )

  return project;
  
}