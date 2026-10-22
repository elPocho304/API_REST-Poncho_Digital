import { z } from "zod";

export const crearAsignacionStandSchema = z.object({
  artesanoId: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del artesano es obligatorio"
        : "El ID del artesano debe ser un UUID válido",
  }),
  standId: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del stand es obligatorio"
        : "El ID del stand debe ser un UUID válido",
  }),
});

export const actualizarAsignacionStandSchema = z
  .object({
    activo: z.boolean({
      error: (issue) =>
        issue.input === undefined
          ? "El estado activo es obligatorio"
          : "El estado activo debe ser true o false",
    }),
  })
  .strict();

export const idAsignacionStandParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID de la asignación es obligatorio en los parámetros"
        : "El ID de la asignación debe ser un UUID válido",
  }),
});

export const consultarAsignacionesStandSchema = z.object({
  artesanoId: z
    .uuid({ error: "El ID del artesano debe ser un UUID válido" })
    .optional(),
  standId: z
    .uuid({ error: "El ID del stand debe ser un UUID válido" })
    .optional(),
  activo: z
    .enum(["true", "false"], {
      error: "El filtro activo debe ser true o false",
    })
    .transform((valor) => valor === "true")
    .optional(),
  ordenPor: z
    .enum(["fechaInicio", "fechaFin", "activo"])
    .default("fechaInicio"),
  orden: z.enum(["asc", "desc"]).default("desc"),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});
