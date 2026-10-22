import { z } from "zod";

export const crearArtesanoSchema = z.object({
  usuarioId: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID de usuario es obligatorio"
        : "El ID de usuario debe ser un UUID válido",
  }),
  solicitudId: z
    .uuid({ error: "El ID de solicitud debe ser un UUID válido" })
    .optional(),
  nombreEmprendimiento: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  rubro: z.string().trim().min(2, "El rubro debe tener al menos 2 caracteres"),
  localidad: z
    .string()
    .trim()
    .min(2, "La localidad debe tener al menos 2 caracteres"),
  trayectoria: z.string().optional(),
});

export const actualizarArtesanoSchema = z
  .object({
    nombreEmprendimiento: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .optional(),
    rubro: z
      .string()
      .min(2, "El rubro debe tener al menos 2 caracteres")
      .optional(),
    localidad: z
      .string()
      .min(2, "La localidad debe tener al menos 2 caracteres")
      .optional(),
    trayectoria: z.string().optional(),
  })
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Debe proporcionar al menos un campo para actualizar",
  });

//validamos params de ruta
export const idArtesanoParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del artesano es obligatorio en los parámetros"
        : "El ID del artesano debe ser un UUID válido",
  }),
});

//validamos las consultas
export const artesanoQuerySchema = z.object({
  rubro: z.string().optional(),
  localidad: z.string().optional(),
  nombreEmprendimiento: z.string().optional(),
  ordenPor: z
    .enum(["nombreEmprendimiento", "rubro", "localidad", "createdAt"])
    .default("nombreEmprendimiento"),
  orden: z.enum(["asc", "desc"]).default("asc"),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});

export const consultarArtesanosSchema = z.object({
  nombreEmprendimiento: z.string().optional(),
  rubro: z.string().optional(),
  localidad: z.string().optional(),
  ordenPor: z
    .enum(["nombreEmprendimiento", "rubro", "localidad"])
    .default("nombreEmprendimiento"),
  orden: z.enum(["asc", "desc"]).default("asc"),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});