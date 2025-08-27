// src/config/server.ts
import dotenv from "dotenv";
import path from "path";
import { z, type ZodError } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const serverEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_PERSIST_SECRET_KEY: z.string().min(32),
});

const env = serverEnvSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid server environment variables:\n");
  (env.error as ZodError).issues.forEach((err) => {
    console.error(`- ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

export const serverConfig = env.data;
