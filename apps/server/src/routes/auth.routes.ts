import { Router } from "express";
import passport from "passport";

const router = Router();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${frontendUrl}/login?error=oauth_failed`,
  }),
  (_req, res) => {
    res.redirect(`${frontendUrl}/dashboard`);
  },
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${frontendUrl}/login?error=oauth_failed`,
  }),

  (_req, res) => {
    res.redirect(`${frontendUrl}/dashboard`);
  },
);

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);
      res.clearCookie("stride.sid");
      res.status(200).json({
        success: true,
      });
    });
  });
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({
      authenticated: false,
    });
  }

  const user = req.user as { id: string; name: string; email: string | null };
  return res.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: req.user.imageUrl,
    },
  });
});

export default router;
