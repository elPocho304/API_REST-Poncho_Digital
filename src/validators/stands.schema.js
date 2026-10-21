import { z } from "zod";

export const crearStandSchema = z.object({
  numero: z
    .string({
      required_error: "El número del stand es obligatorio",
    })
    .min(1, "El número del stand no puede estar vacío"),

  sectorId: z
    .uuid({
      error: (issue) =>
        issue.input === undefined
          ? "El ID del sector es obligatorio"
          : "El ID del sector debe ser un UUID válido",
    }),

  estado: z
    .enum(["DISPONIBLE", "OCUPADO", "RESERVADO"], {
      errorMap: () => ({
        message: "Estado inválido. Debe ser DISPONIBLE, OCUPADO o RESERVADO",
      }),
    })
    .optional(),
});

export const actualizarStandSchema = crearStandSchema.partial();

export const idStandParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del stand es obligatorio en los parámetros"
        : "El ID del stand debe ser un UUID válido",
  }),
});

export const consultarStandsSchema = z.object({
  sectorId: z
    .uuid({ error: "El ID del sector debe ser un UUID válido" })
    .optional(),
  estado: z
    .enum(["DISPONIBLE", "OCUPADO", "RESERVADO"], {
      errorMap: () => ({
        message: "Estado inválido. Debe ser DISPONIBLE, OCUPADO o RESERVADO",
      }),
    })
    .optional(),
  ordenEstado: z
    .enum(["asc", "desc", "ASC", "DESC"], {
      errorMap: () => ({ message: "El orden debe ser 'asc' o 'desc'" }),
    })
    .optional(),
});
