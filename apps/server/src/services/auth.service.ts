import { prisma } from "@stride/database";

type OAuthProvider = "GOOGLE" | "GITHUB";

interface OAuthUserInput {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string | null;
  name: string;
  imageUrl: string | null;
}

export async function findOrCreateOAuthUser(input: OAuthUserInput) {
  const { provider, providerAccountId } = input;

  
    

  const existingAccount = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    include: { user: true },
  });

  if (existingAccount) {
    return await prisma.user.update({
      where: {
        id: existingAccount.user.id,
      },
      data: {
        ...(input.imageUrl ? { imageUrl: input.imageUrl } : {}),
      },
    });
  }
  

  const email = input.email?.trim().toLowerCase() || null;

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(
        "This email belongs to an existing account. Sign in with its linked provider first."
      );
    }
  }

  return await prisma.user.create({
    data: {
      name: input.name.trim() || "Stride User",
      email,
      imageUrl  :input.imageUrl,
      oauthAccounts: {
        create: {
          provider,
          providerAccountId,
        },
      },
    },
  });
}