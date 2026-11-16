import { prisma } from "@stride/database";
import { Prisma } from "../../../../packages/database/generated/prisma/client";

export async function createProject(
  name: string,
  workspaceId: string,
  userId: string,
  description: string | null,
  icon: string,
  color: string,
  leadId: string | null,
  memberIds: string[],
  status: "PLANNED" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED",
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT",
  tags: string[],
  dueDate: string,
  startDate: string,
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

  const selectedLeadId = leadId ?? userId;

  const allMemberIds = [userId, selectedLeadId, ...memberIds];

  const uniqueMemberIds = [...new Set(allMemberIds)];

  const workspaceMembers = await prisma.workspaceMember.findMany({
    where: {
      workspaceId,
      userId: {
        in: uniqueMemberIds,
      },
    },

    select: {
      userId: true,
    },
  });

  if (workspaceMembers.length !== uniqueMemberIds.length) {
    throw new Error("One or more selected users are not workspace members");
  }

  const projectMembers = uniqueMemberIds.map((memberId) => ({
    userId: memberId,
    role: memberId === selectedLeadId ? ("LEAD" as const) : ("MEMBER" as const),
  }));

  const baseKey =
    name
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 3)
      .toUpperCase() || "PRJ";

  let project;

  for (let attempt = 1; attempt <= 20; attempt++) {
    const projectKey = attempt === 1 ? baseKey : `${baseKey}${attempt}`;

    try {
       project = await prisma.project.create({
        data: {
          name,
          key: baseKey,
          workspaceId,
          description,
          icon,
          color,
          leadId: selectedLeadId,
          status,
          priority,
          tags,
          startDate: new Date(startDate),
          dueDate: new Date(dueDate),
          members: {
            create: projectMembers,
          },
        },
      });
      break;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        continue;
      }

      throw error;
    }
  }

  if (!project) {
    throw new Error("Unable to generate a unique project key");
  }

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
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found or unauthorized");
  }

  return workspace.projects;
}

export async function getProjectById(projectId: string, userId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      workspace: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  return project;
}

export async function getProjectMembers(projectId: string, userId: string) {
  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  if (!membership) {
    throw new Error("you are not member of the group");
  }

  if (!membership) {
    throw new Error("Project not found or unauthorized");
  }

  const members = await prisma.projectMember.findMany({
    where: {
      projectId,
    },
    select: {
      userId: true,
      role: true,
      user: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          email: true,
        },
      },
    },
  });

  return members;
}
