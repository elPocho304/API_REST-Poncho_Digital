import { z } from "zod";

export const crearProductoSchema = z.object({
  artesanoId: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del artesano es obligatorio"
        : "El ID del artesano debe ser un UUID válido",
  }),

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
  id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "El ID del producto es obligatorio en los parámetros"
        : "El ID del producto debe ser un UUID válido",
  }),
});

export const consultarProductosSchema = z
  .object({
    artesanoId: z
      .uuid({ error: "El ID del artesano debe ser un UUID válido" })
      .optional(),
    nombre: z.string().optional(),
    precioMin: z.coerce.number().min(0).optional(),
    precioMax: z.coerce.number().min(0).optional(),
    ordenPor: z.enum(["nombre", "precio", "createdAt"]).default("nombre"),
    orden: z.enum(["asc", "desc"]).default("asc"),
    pagina: z.coerce.number().int().min(1).default(1),
    limite: z.coerce.number().int().min(1).max(100).default(10),
  })
  .refine(
    ({ precioMin, precioMax }) =>
      precioMin === undefined ||
      precioMax === undefined ||
      precioMin <= precioMax,
    {
      path: ["precioMax"],
      message: "El precio máximo debe ser mayor o igual al precio mínimo",
    },
  );