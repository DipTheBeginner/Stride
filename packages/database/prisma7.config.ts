import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

// This checks the current folder first, then falls back to the root Stride folder
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});
