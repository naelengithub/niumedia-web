import { PortableTextBlock } from "next-sanity";

export type Service = {
  _id: string;
  _createdAt: Date;
  name: string;
  image: string;
  slug: string;
  alt: string;
  imageSecondary?: string;
  altSecondary?: string;
  content: PortableTextBlock[];
  serviceList: string[];
};
