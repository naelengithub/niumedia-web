import { PortableTextBlock } from "next-sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  image: string;
  slug: string;
  alt: string;
  content: PortableTextBlock[];
  shortDescription: PortableTextBlock[];
  client?: string;
  services?: string[];
  year: number;
  additionalImages?: {
    url: string;
    alt?: string;
  }[];
};
