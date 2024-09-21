import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-Form-Builder_owner:D5kpwMXxeJf6@ep-snowy-lake-a55exdrm.us-east-2.aws.neon.tech/AI-Form-Builder?sslmode=require',
  }
});