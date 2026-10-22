import { z } from "zod";

//Cambiar ya que no existe funcion padre
export const actualizarArtesanoSchema = crearArtesanoSchema.partial().omit({
  usuarioId: true, // El ID de usuario no debe modificarse una vez vinculado
  solicitudId: true,
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