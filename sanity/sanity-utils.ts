import { Service } from "@/types/Service";
import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// Define client once to avoid re-creating it in every function
const client = createClient(clientConfig);

// Fetch all sevices
export async function getServices(): Promise<Service[]> {
  return client.fetch<Service[]>(
    `*[_type == "services"] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      "alt": image.alt,
      content,
      serviceList
    }`,
    {},
    {
      next: { revalidate: 86400 }, // ✅ once per day
    }
  );
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "projects"] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      year,
      client,
      services,
      "slug": slug.current,
      "image": image.asset->url,
      "alt": image.alt,
      content,
      additionalImages[]{
        "url": asset->url,
        alt
      }
    }`
  );
}
