import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateOAuthUser } from "../services/auth.service";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma } from "@stride/database";
import "dotenv/config";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable:${name}`);
  return value;
}

passport.serializeUser((user, done) => {
  done(null, (user as { id: string }).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user ?? false);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
      callbackURL: requiredEnv("GOOGLE_CALLBACK_URL"),
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser({
          provider: "GOOGLE",
          providerAccountId: profile.id,
          email: profile.emails?.[0]?.value ?? null,
          name:
            profile.displayName || profile.emails?.[0]?.value || "Google User",
            imageUrl: profile.photos?.[0]?.value ?? null,
        });

        done(null, user);
      } catch (error) {
        done(error as Error);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
      callbackURL: requiredEnv("GITHUB_CALLBACK_URL"),
      scope: ["user:email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser({
          provider: "GITHUB",
          providerAccountId: profile.id,
          email: profile.emails?.find((entry) => entry.value)?.value ?? null,
          name: profile.displayName || profile.username || "GitHub User",
          imageUrl: profile.photos?.[0]?.value ?? null,
        });
        done(null, user);
      } catch (error) {
        done(error as Error);
      }
    },
  ),
);

export default passport;
