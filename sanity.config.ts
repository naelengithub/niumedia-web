import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "9btf3gbv",
  dataset: "production",
  title: "Niumedia Studio",
  apiVersion: "2025-05-05",
  basePath: "/admin",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
});

export default config;
