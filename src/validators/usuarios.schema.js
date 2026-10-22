import { z } from "zod";

export const crearAdministradorSchema = z.object({
  email: z.email("El email no tiene un formato válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede superar los 100 caracteres"),
});

export const actualizarEstadoUsuarioSchema = z.object({
  activo: z.boolean({ error: "El estado activo debe ser true o false" }),
});

export const idUsuarioParamSchema = z.object({
  id: z.uuid("El ID del usuario debe ser un UUID válido"),
});
