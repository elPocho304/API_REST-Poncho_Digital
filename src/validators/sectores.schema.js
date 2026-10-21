import { z } from "zod";

export const crearSectorSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre del sector es obligatorio"),
  pabellonId: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del pabellón es obligatorio"
        : "El ID del pabellón debe ser un UUID válido",
  }),
});

export const actualizarSectorSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(1, "El nombre del sector no puede estar vacío")
      .optional(),
    pabellonId: z
      .uuid({ error: "El ID del pabellón debe ser un UUID válido" })
      .optional(),
  })
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Debe proporcionar al menos un campo para actualizar",
  });

export const idSectorParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del sector es obligatorio en los parámetros"
        : "El ID del sector debe ser un UUID válido",
  }),
});

export const consultarSectoresSchema = z.object({
  pabellonId: z
    .uuid({ error: "El ID del pabellón debe ser un UUID válido" })
    .optional(),
  nombre: z.string().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});
