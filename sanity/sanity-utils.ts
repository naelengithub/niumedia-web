import { Service } from "@/types/Service";
import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// Define client once to avoid re-creating it in every function
const client = createClient(clientConfig);

// Fetch all services
export async function getServices(): Promise<Service[]> {
  return client.fetch(
    groq`*[_type == "services"] | order(_createdAt asc) {
        name,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        content
      }`
  );
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "projects"] | order(_createdAt asc) {
        name,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        content
      }`
  );
}
