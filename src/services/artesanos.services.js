import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

// Obtener todos los artesanos (con opción de filtros por rubro o localidad)
export const obtenerArtesanosService = async (filtros = {}) => {
  const {
    rubro,
    localidad,
    nombreEmprendimiento,
    ordenPor,
    orden,
    pagina,
    limite,
  } = filtros;

  const artesanos = await prisma.artesano.findMany({
    where: {
      ...(rubro && { rubro: { contains: rubro, mode: "insensitive" } }),
      ...(localidad && { localidad: { contains: localidad, mode: "insensitive" } }),
      ...(nombreEmprendimiento && {
        nombreEmprendimiento: {
          contains: nombreEmprendimiento,
          mode: "insensitive",
        },
      }),
    },
    orderBy: { [ordenPor]: orden },
    skip: (pagina - 1) * limite,
    take: limite,
    include: {
      productos: true, // Incluye los productos asociados
    },
  });

  return artesanos;
};

// Obtener un artesano por su ID
export const obtenerArtesanoPorIdService = async (id) => {
  const artesano = await prisma.artesano.findUnique({
    where: { id },
    include: {
      productos: true,
      solicitud: true,
    },
  });

  if (!artesano) {
    throw new AppError("No se encontró el artesano solicitado", 404);
  }

  return artesano;
};

// Crear un perfil de artesano directamente
export const crearArtesanoService = async (artesanoDto) => {
  const { usuarioId, solicitudId, nombreEmprendimiento, rubro, localidad, trayectoria } = artesanoDto;

  // Verificar si el usuario ya tiene un perfil de artesano asignado
  const artesanoExistente = await prisma.artesano.findUnique({
    where: { usuarioId },
  });

  if (artesanoExistente) {
    throw new AppError("El usuario ya posee un perfil de artesano activo", 409);
  }

  const nuevoArtesano = await prisma.artesano.create({
    data: {
      usuarioId,
      solicitudId: solicitudId || null,
      nombreEmprendimiento,
      rubro,
      localidad,
      trayectoria,
    },
  });

  return nuevoArtesano;
};

// Actualizar perfil de un artesano existente
export const actualizarArtesanoService = async (id, datosActualizacion) => {
  // Verificar existencia previa
  const artesanoExistente = await prisma.artesano.findUnique({
    where: { id },
  });

  if (!artesanoExistente) {
    throw new AppError("No existe el artesano que se intenta actualizar", 404);
  }

  const artesanoActualizado = await prisma.artesano.update({
    where: { id },
    data: datosActualizacion,
  });

  return artesanoActualizado;
};

// Eliminar un perfil de artesano
export const eliminarArtesanoService = async (id) => {
  const artesanoExistente = await prisma.artesano.findUnique({
    where: { id },
  });

  if (!artesanoExistente) {
    throw new AppError("No existe el artesano que se intenta eliminar", 404);
  }

  await prisma.artesano.delete({
    where: { id },
  });

  return { mensaje: "Perfil de artesano eliminado correctamente" };
};