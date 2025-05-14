const projects = {
  name: "projects",
  title: "Proyectos",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "year",
      title: "Year",
      type: "number",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "content",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default projects;
