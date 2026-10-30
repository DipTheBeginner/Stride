import { prisma } from "@stride/database";

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

  const project = await prisma.project.create({
    data: {
      name,
      workspaceId,
      description,
      icon,
      color,
      leadId: selectedLeadId,
      status,
      priority,
      members: {
        create: projectMembers,
      },
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
