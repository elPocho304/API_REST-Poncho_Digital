import { z } from "zod";

export const idSolicitudParamSchema = z.object({
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID de la solicitud es obligatorio en los parámetros"
        : "El ID de la solicitud debe ser un UUID válido",
  }),
});

export const consultarSolicitudesRegistroSchema = z.object({
  estado: z
    .enum([
      "PENDIENTE",
      "APROBADA",
      "RECHAZADA",
      "MODIFICACION_SOLICITADA",
    ])
    .optional(),
  usuarioId: z
    .uuid({ error: "El ID del usuario debe ser un UUID válido" })
    .optional(),
  resueltaPorId: z
    .uuid({ error: "El ID del administrador debe ser un UUID válido" })
    .optional(),
  nombreEmprendimiento: z.string().optional(),
  rubro: z.string().optional(),
  localidad: z.string().optional(),
  ordenPor: z
    .enum([
      "estado",
      "nombreEmprendimiento",
      "rubro",
      "localidad",
      "fechaSolicitud",
      "fechaResolucion",
    ])
    .default("fechaSolicitud"),
  orden: z.enum(["asc", "desc"]).default("desc"),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(10),
});

export const resolverSolicitudRegistroSchema = z.object({
  estado: z.enum(["APROBADA", "RECHAZADA", "MODIFICACION_SOLICITADA"]),
  comentarioAdmin: z.string().max(1000).optional(),
});
