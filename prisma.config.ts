import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url:
      process.env.NODE_ENV === "development"
        ? process.env.DATABASE_URL
        : process.env.DATABASE_URL_PROD,
    shadowDatabaseUrl:
      process.env.NODE_ENV === "development"
        ? process.env.SHADOW_DATABASE_URL
        : process.env.SHADOW_DATABASE_URL_PROD || undefined,
  },
});
