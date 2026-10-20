import { prisma } from "@stride/database";

interface createWorkspaceProps {
  name: string;
  slug: string;
  userId: string;
}

export async function createWorkspace(input: createWorkspaceProps) {
  const { name, slug, userId } = input;

  const normalizedSlug = slug.trim().toLowerCase();

  const existingSlug = await prisma.workspace.findUnique({
    where: {
      slug: normalizedSlug,
    },
  });

  if (existingSlug) {
    throw new Error("Workspace slug already taken");
  }

  const newWorkspace = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name,
        slug: normalizedSlug,
      },
    });

    await tx.workspaceMember.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: "OWNER",
      },
    });

    return workspace;
  });

  return newWorkspace;
}

export async function getUserWorkspace(userId: string) {
  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        where: { userId },
        select: { role: true },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return workspaces;
}

export async function getWorkspaceBySlug(slug: string, userId: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  const slugWorkspace = await prisma.workspace.findFirst({
    where: {
      slug: normalizedSlug,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        where: { userId },
        select: { role: true },
      },
    },
  });

  return slugWorkspace;
}

export async function canManageWorkspace(userId: string, slug: string) {
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspace: {
        slug,
      },
    },
  });

  if (!membership) {
    return false;
  }

  return membership.role === "OWNER" || membership.role === "ADMIN";
}

export async function updateWorkspaceLogo(slug: string, logoKey: string) {
  return prisma.workspace.update({
    where: {
      slug,
    },
    data: {
      logoUrl: logoKey,
    },
  });
}
