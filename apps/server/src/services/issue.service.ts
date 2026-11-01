import { prisma } from "@stride/database";

export async function createIssue(
  title: string,
  description: string,
  priority: string,
  status: "TODO" | "IN_PROGRESS" | "COMPLETED",
  projectId: string,
  assigneeId: string | null,

  createdById: string | null,
  dueDate: string | null,
) {
  if (!createdById) {
    throw new Error("User is not authenticated");
  }

  if (!assigneeId) {
    throw new Error("User is not authenticated");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: createdById,
        workspaceId: project?.workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  const projectMembership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId: createdById,
      },
    },
  });

  const isWorkspaceAdmin =
    membership.role === "OWNER" || membership.role === "ADMIN";
  if (!isWorkspaceAdmin && !projectMembership) {
    throw new Error("You are not a member of this project");
  }

  const assigneeMembership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: projectId,
        userId: assigneeId,
      },
    },
  });

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      projectId: project.id,
      createdById,
      dueDate: dueDate ? new Date(dueDate) : null,
      assigneeId,
      status,
      priority,
    },
  });

  return issue;
}

export async function getProjectIssue(projectId: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: project?.workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  const projectMembership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  const isWorkspaceAdmin =
    membership.role === "OWNER" || membership.role === "ADMIN";

  if (!isWorkspaceAdmin && !projectMembership) {
    throw new Error("You don't have access to this project");
  }

  const issues = await prisma.issue.findMany({
    where: {
      projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return issues;
}

type UpdateIssueData = {
  title?: string;
  description?: string;
  priority?: string;
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  assigneeId?: string | null;
  dueDate?: string | null;
};

export async function updateIssue(
  userId: string,
  projectId: string,
  issueId: string,
  data: UpdateIssueData,
) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: project?.workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  const projectMembership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  const isWorkspaceAdmin =
    membership.role === "OWNER" || membership.role === "ADMIN";

  if (!isWorkspaceAdmin && !projectMembership) {
    throw new Error("You don't have access to this project");
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issueId,
    },
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      assigneeId: data.assigneeId,
      dueDate:
        data.dueDate === undefined
          ? undefined
          : data.dueDate === null
            ? null
            : new Date(data.dueDate),
    },
  });

  return updatedIssue;
}

export async function deleteIssue(
  projectId: string,
  issueId: string,
  userId: string,
) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const projectMembership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: project?.workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  const isWorkspaceAdmin =
    membership.role === "OWNER" || membership.role === "ADMIN";

  if (!isWorkspaceAdmin && !projectMembership) {
    throw new Error("You don't have permission to delete issues");
  }

  const deleteIssue = await prisma.issue.delete({
    where: {
      id: issueId,
      projectId: project.id,
    },
  });

  return deleteIssue;
}
