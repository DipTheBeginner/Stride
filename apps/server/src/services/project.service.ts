import { prisma } from "@stride/database";

export async function createProject(
  name: string,
  workspaceId: string,
  userId: string,
  description: string | null,
) {
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("Unauthorized access to workspace");
  }

  const project = await prisma.project.create({
    data: {
      name,
      workspaceId,
      description,
      members: {
        create: {
          userId,
          role:"LEAD"
        }
      }
    },
    
  });

  return project;
}

export async function getWorkspaceProjectsBySlug(slug: string, userId: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  const workspace = await prisma.workspace.findFirst({
    where: {
      slug: normalizedSlug,
      members: {
        some: { userId },
      },
    },
    include: {
      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found or unauthorized");
  }

  return workspace.projects;
}
