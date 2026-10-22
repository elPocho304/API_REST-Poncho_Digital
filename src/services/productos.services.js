import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

export const obtenerProductosService = async (filtros = {}) => {
  const {
    artesanoId,
    nombre,
    precioMin,
    precioMax,
    ordenPor = "nombre",
    orden = "asc",
    pagina = 1,
    limite = 10,
  } = filtros;

  const productos = await prisma.producto.findMany({
    where: {
      ...(artesanoId && { artesanoId }),
      ...(nombre && { nombre: { contains: nombre, mode: "insensitive" } }),
      ...((precioMin !== undefined || precioMax !== undefined) && {
        precio: {
          ...(precioMin !== undefined && { gte: precioMin }),
          ...(precioMax !== undefined && { lte: precioMax }),
        },
      }),
    },
    orderBy: [{ [ordenPor]: orden }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
    include: {
      artesano: {
        select: {
          id: true,
          nombreEmprendimiento: true,
          rubro: true,
        },
      },
    },
  });

  return productos;
};

export const obtenerProductoPorIdService = async (id) => {
  const producto = await prisma.producto.findUnique({
    where: { id },
    include: {
      artesano: {
        select: {
          id: true,
          nombreEmprendimiento: true,
          rubro: true,
        },
      },
    },
  });

  if (!producto) {
    throw new AppError("No se encontró el producto solicitado", 404);
  }

  return producto;
};

export const crearProductoService = async (productoDto) => {
  const { artesanoId, nombre, descripcion, precio } = productoDto;

  // Verificar que el artesano existe antes de asociar el producto
  const artesanoExistente = await prisma.artesano.findUnique({
    where: { id: artesanoId },
  });

  if (!artesanoExistente) {
    throw new AppError("El artesano especificado no existe", 404);
  }

  const nuevoProducto = await prisma.producto.create({
    data: {
      artesanoId,
      nombre,
      descripcion,
      precio,
    },
  });

  return nuevoProducto;
};

export const actualizarProductoService = async (id, datosActualizacion) => {
  const productoExistente = await prisma.producto.findUnique({
    where: { id },
  });

  if (!productoExistente) {
    throw new AppError("No existe el producto que se intenta actualizar", 404);
  }

  const productoActualizado = await prisma.producto.update({
    where: { id },
    data: datosActualizacion,
  });

  return productoActualizado;
};

export const eliminarProductoService = async (id) => {
  const productoExistente = await prisma.producto.findUnique({
    where: { id },
  });

  if (!productoExistente) {
    throw new AppError("No existe el producto que se intenta eliminar", 404);
  }

  await prisma.producto.delete({
    where: { id },
  });

  return { mensaje: "Producto eliminado correctamente" };
};