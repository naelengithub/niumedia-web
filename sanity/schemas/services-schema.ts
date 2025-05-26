const services = {
  name: "services",
  title: "Servicios",
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
    {
      name: "serviceList",
      title: "Service List",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "imageSecondary",
      title: "Imagen secundaria",
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
  ],
};

export default services;
