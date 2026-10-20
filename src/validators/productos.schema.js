import { z } from "zod";

export const crearProductoSchema = z.object({
  artesanoId: z.string({
    required_error: "El ID del artesano es obligatorio",
  }).uuid({ message: "El ID del artesano debe ser un UUID válido" }),

  nombre: z.string({
    required_error: "El nombre del producto es obligatorio",
  }).min(2, "El nombre debe tener al menos 2 caracteres"),

  descripcion: z.string().optional(),

  precio: z.number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser un número",
  }).positive("El precio debe ser mayor a 0"),
});

export const actualizarProductoSchema = crearProductoSchema.partial().omit({
  artesanoId: true, // No se permite transferir un producto a otro artesano en una edición simple
});

export const idProductoParamSchema = z.object({
  id: z.string({
    required_error: "El ID del producto es obligatorio en los parámetros",
  }).uuid({ message: "El ID del producto debe ser un UUID válido" }),
});