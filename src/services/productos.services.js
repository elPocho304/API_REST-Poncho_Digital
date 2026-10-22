import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

export const obtenerProductosService = async (filtros = {}, propietarioId) => {
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
      ...((propietarioId || artesanoId) && {
        artesanoId: propietarioId || artesanoId,
      }),
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

export const obtenerMisProductosService = async (propietarioId, filtros = {}) => {
  if (!propietarioId) {
    throw new AppError("La cuenta no tiene un perfil de artesano habilitado", 409);
  }
  return obtenerProductosService(filtros, propietarioId);
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

export const crearProductoService = async (artesanoId, productoDto) => {
  const { nombre, descripcion, precio } = productoDto;
  if (!artesanoId) {
    throw new AppError("La cuenta no tiene un perfil de artesano habilitado", 409);
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

export const actualizarProductoService = async (
  id,
  artesanoId,
  datosActualizacion,
) => {
  if (!artesanoId) {
    throw new AppError("La cuenta no tiene un perfil de artesano habilitado", 409);
  }
  const [productoActualizado] = await prisma.producto.updateManyAndReturn({
    where: { id, artesanoId },
    data: datosActualizacion,
  });

  if (!productoActualizado) {
    throw new AppError("No se encontró el producto solicitado", 404);
  }
  return productoActualizado;
};

export const eliminarProductoService = async (id, artesanoId) => {
  if (!artesanoId) {
    throw new AppError("La cuenta no tiene un perfil de artesano habilitado", 409);
  }
  const resultado = await prisma.producto.deleteMany({
    where: { id, artesanoId },
  });

  if (resultado.count === 0) {
    throw new AppError("No se encontró el producto solicitado", 404);
  }

  return { mensaje: "Producto eliminado correctamente" };
};