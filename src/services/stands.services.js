import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

export const obtenerStandsService = async (filtros = {}) => {
  const {
    sectorId,
    estado,
    numero,
    ordenPor = "numero",
    orden = "asc",
    ordenEstado,
    pagina = 1,
    limite = 10,
  } = filtros;
  const direccionOrden = (ordenEstado ?? orden).toLowerCase();
  const campoOrden = ordenEstado ? "estado" : ordenPor;

  const stands = await prisma.stand.findMany({
    where: {
      ...(sectorId && { sectorId }),
      ...(estado && { estado }),
      ...(numero && { numero: { contains: numero, mode: "insensitive" } }),
    },
    orderBy: [{ [campoOrden]: direccionOrden }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
    include: {
      sector: true, // Incluimos la información del sector relacionado
    },
  });

  return stands;
};

export const obtenerStandPorIdService = async (id) => {
  const stand = await prisma.stand.findUnique({
    where: { id },
    include: {
      sector: true,
      asignaciones: true,
    },
  });

  if (!stand) {
    throw new AppError("No se encontró el stand solicitado", 404);
  }

  return stand;
};

export const crearStandService = async (standDto) => {
  const { numero, sectorId, estado } = standDto;

  // Verificar que el sector exista antes de crear el stand
  const sectorExistente = await prisma.sector.findUnique({
    where: { id: sectorId },
  });

  if (!sectorExistente) {
    throw new AppError("El sector especificado no existe", 404);
  }

  // Como 'numero' es @unique en tu schema, validamos si ya existe
  const standExistente = await prisma.stand.findUnique({
    where: { numero },
  });

  if (standExistente) {
    throw new AppError("Ya existe un stand con ese número", 409);
  }

  const nuevoStand = await prisma.stand.create({
    data: {
      numero,
      sectorId,
      ...(estado && { estado }),
    },
  });

  return nuevoStand;
};

export const actualizarStandService = async (id, datosActualizacion) => {
  const standExistente = await prisma.stand.findUnique({
    where: { id },
  });

  if (!standExistente) {
    throw new AppError("No existe el stand que se intenta actualizar", 404);
  }

  const standActualizado = await prisma.stand.update({
    where: { id },
    data: datosActualizacion,
  });

  return standActualizado;
};

export const eliminarStandService = async (id) => {
  const standExistente = await prisma.stand.findUnique({
    where: { id },
  });

  if (!standExistente) {
    throw new AppError("No existe el stand que se intenta eliminar", 404);
  }

  await prisma.stand.delete({
    where: { id },
  });

  return { mensaje: "Stand eliminado correctamente" };
};
