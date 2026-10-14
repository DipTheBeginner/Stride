
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { prisma } from "@stride/database";
import session from "express-session";
import passport from "./config/auth.config";
import authRouter from "./routes/auth.routes";

const app = express();


const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  app.set("trust proxy", 1); // Required for secure cookies behind a proxy
}
app.use(helmet());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true, // REQUIRED so browser sends/receives stride.sid cookie
  }),
);
app.use(express.json());


app.use(
  session({
    name: "stride.sid",
    secret: process.env.SESSION_SECRET || "local-development-only-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);



app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Ok",
    service: "stride-api",
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default app;
