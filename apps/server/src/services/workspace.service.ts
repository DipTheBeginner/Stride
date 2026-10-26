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

export async function createWorkspaceInvitation(
  workspaceId: string,
  email: string,
  invitedById: string,
) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    throw new Error("Email is required");
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  const inviterMembership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: invitedById,
        workspaceId,
      },
    },
  });

  if (
    !inviterMembership ||
    !["OWNER", "ADMIN"].includes(inviterMembership.role)
  ) {
    throw new Error("Unauthorized to invite members");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    const existingMembership = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: existingUser.id,
          workspaceId,
        },
      },
    });

    if (existingMembership) {
      throw new Error("User is already a member of this workspace");
    }
  }

  const existingInvitation = await prisma.workspaceInvitation.findFirst({
    where: {
      workspaceId,
      email: normalizedEmail,
      status: "PENDING",
    },
  });

  if (existingInvitation) {
    throw new Error("Invitation already pending");
  }

  return prisma.workspaceInvitation.create({
    data: {
      workspaceId,
      email: normalizedEmail,
      invitedById,
    },
  });
}

export async function getMyWorkspaceInvitation(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  });

  if (!user?.email) {
    throw new Error("User not exist");
  }

  return prisma.workspaceInvitation.findMany({
    where: {
      email: user.email.trim().toLowerCase(),
      status: "PENDING",
    },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl:true,
        },
      },
      invitedBy: {
        select: {
          id: true,
          name: true,
          imageUrl:true
        }
      }
      
    },
    orderBy: {
      createdAt:"desc"
    }
    
  });
}

export async function acceptWorkspaceInvitation(
  invitationId: string,
  userId: string,
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    if (!user?.email) {
      throw new Error("User Email not found");
    }

    const invitation = await tx.workspaceInvitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation) {
      throw new Error("Invitataion not found");
    }
    if (invitation.status !== "PENDING") {
      throw new Error("Invitation is no longer pending");
    }

    if (invitation.email !== user.email.trim().toLowerCase()) {
      throw new Error("Unauthorized to accept this invitation");
    }

    await tx.workspaceMember.create({
      data: {
        workspaceId: invitation.workspaceId,
        userId,
        role: "MEMBER"
      },
    });

    return tx.workspaceInvitation.update({
      where: {
        id:invitationId
      },
      data: {
        status:"ACCEPTED"
      }
    })
  });
}


export async function rejectWorkspaceInvitation(invitationId: string, userId: string) {


  
    
    const user = await prisma.user.findUnique({
      where: {
        id:userId
      },
      select: {
        email:true
      }
    }) 

    if (!user?.email) {
      throw new Error("User email not found")
    }

    const invitation = await prisma.workspaceInvitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation) {
      throw new Error("Invitataion not found");
    }
    if (invitation.status !== "PENDING") {
      throw new Error("Invitation is no longer pending");
    }

    if (invitation.email !== user.email.trim().toLowerCase()) {
      throw new Error("Unauthorized to reject this invitation");
    }

   
    return prisma.workspaceInvitation.update({
      where: {
        
        id: invitationId,
        status:"PENDING"
      },
      data: {
        status:"REJECTED"
      }
    })

}
