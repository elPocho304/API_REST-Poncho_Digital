import { z } from "zod";


//esquema para crear un artesano luego de que se apruebe la solicitud
export const crearArtesanoSchema = z.object({
  usuarioId: z.string({
    required_error: "El ID de usuario es obligatorio",
  }).uuid("El ID de usuario debe ser un UUID válido"),
  
  solicitudId: z.string().uuid("El ID de solicitud debe ser un UUID válido").optional(),
  
  nombreEmprendimiento: z.string({
    required_error: "El nombre del emprendimiento es obligatorio",
  }).min(2, "El nombre debe tener al menos 2 caracteres"),
  
  rubro: z.string({
    required_error: "El rubro es obligatorio",
  }).min(2, "El rubro debe tener al menos 2 caracteres"),
  
  localidad: z.string({
    required_error: "La localidad es obligatoria",
  }).min(2, "La localidad debe tener al menos 2 caracteres"),
  
  trayectoria: z.string().optional(),
});


//reutilizamos crearArtesano con los campos opcionales y bloqueamos la clave foránea
export const actualizarArtesanoSchema = crearArtesanoSchema.partial().omit({
  usuarioId: true, // El ID de usuario no debe modificarse una vez vinculado
  solicitudId: true,
});

//validamos params de ruta
export const idArtesanoParamSchema = z.object({
  id: z.string({
    required_error: "El ID del artesano es obligatorio en los parámetros",
  }).uuid("El ID del artesano debe ser un UUID válido"),
});