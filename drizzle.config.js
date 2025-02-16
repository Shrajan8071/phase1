import { defineConfig } from "drizzle-kit";
/** @type {import('drizzle-kit').Config} */
export default defineConfig({
  
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_8sU1HyaqgmTx@ep-soft-haze-a8jzr2k7-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  }
});
