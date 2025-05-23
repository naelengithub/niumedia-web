const projects = {
  name: "projects",
  title: "Proyectos",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
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
      title: "Año",
      type: "number",
    },
    {
      name: "client",
      title: "Cliente",
      type: "string",
    },
    {
      name: "services",
      title: "Servicos",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        },
      ],
    },
    {
      name: "shortDescription",
      title: "Breve descripción",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Breve resumen del proyecto que aparecerá en la página inicial (3 oraciones máx).",
      rows: 3,
    },
    {
      name: "content",
      title: "Descripción",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "additionalImages",
      title: "Imágenes adicionales",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export default projects;
