import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import type { ZodError } from "zod";

// Load environment variables from `.env.local`
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Define schema for validation
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(
    "NEXT_PUBLIC_API_BASE_URL must be a valid URL",
  ),
  NEXT_PUBLIC_PERSIST_SECRET_KEY: z
    .string()
    .min(32, "NEXT_PUBLIC_PERSIST_SECRET_KEY must be at least 32 characters"),
});

// Validate process.env
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("\n❌ Invalid environment variables:\n");

  (env.error as ZodError).issues.forEach((err) => {
    console.error(`- ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

export const config = env.data;
