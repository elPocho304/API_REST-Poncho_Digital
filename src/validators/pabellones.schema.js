import { z } from "zod";

export const crearPabellonSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre del pabellón es obligatorio"),
  descripcion: z.string().trim().optional(),
});

export const actualizarPabellonSchema = crearPabellonSchema
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Debe proporcionar al menos un campo para actualizar",
  });

export const idPabellonParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del pabellón es obligatorio en los parámetros"
        : "El ID del pabellón debe ser un UUID válido",
  }),
});

export const consultarPabellonesSchema = z.object({
  nombre: z.string().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});
