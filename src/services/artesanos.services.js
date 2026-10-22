import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

// Obtener artesanos con filtros, orden y paginación
export const obtenerArtesanosService = async (filtros = {}) => {
  const {
    nombreEmprendimiento,
    rubro,
    localidad,
    ordenPor,
    orden ,
    pagina,
    limite,
  } = filtros;

  const artesanos = await prisma.artesano.findMany({
    where: {
      ...(nombreEmprendimiento && {
        nombreEmprendimiento: {
          contains: nombreEmprendimiento,
          mode: "insensitive",
        },
      }),
      ...(rubro && { rubro: { contains: rubro, mode: "insensitive" } }),
      ...(localidad && { localidad: { contains: localidad, mode: "insensitive" } }),
    },
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

export const crearArtesanoService = async (artesanoDto) => {
  const {
    usuarioId,
    solicitudId,
    nombreEmprendimiento,
    rubro,
    localidad,
    trayectoria,
  } = artesanoDto;

  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { id: true },
  });

  if (!usuario) {
    throw new AppError("El usuario especificado no existe", 404);
  }

  const perfilExistente = await prisma.artesano.findUnique({
    where: { usuarioId },
    select: { id: true },
  });

  if (perfilExistente) {
    throw new AppError("El usuario ya posee un perfil de artesano activo", 409);
  }

  if (solicitudId) {
    const solicitudExistente = await prisma.solicitudRegistro.findUnique({
      where: { id: solicitudId },
      select: { id: true },
    });

    if (!solicitudExistente) {
      throw new AppError("La solicitud de registro especificada no existe", 404);
    }
  }

  return prisma.artesano.create({
    data: {
      usuarioId,
      solicitudId: solicitudId || null,
      nombreEmprendimiento,
      rubro,
      localidad,
      trayectoria,
    },
  });
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