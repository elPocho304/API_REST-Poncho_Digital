import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

export const obtenerSectoresService = async ({
  pabellonId,
  nombre,
  pagina,
  limite,
} = {}) => {
  return prisma.sector.findMany({
    where: {
      ...(pabellonId && { pabellonId }),
      ...(nombre && { nombre: { contains: nombre, mode: "insensitive" } }),
    },
    orderBy: [{ nombre: "asc" }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
    include: { pabellon: true },
  });
};

export const obtenerSectorPorIdService = async (id) => {
  const sector = await prisma.sector.findUnique({
    where: { id },
    include: { pabellon: true, stands: true },
  });

  if (!sector) {
    throw new AppError("No se encontró el sector solicitado", 404);
  }

  return sector;
};

export const crearSectorService = async (datos) => {
  const { nombre, pabellonId } = datos;
  const pabellonExistente = await prisma.pabellon.findUnique({
    where: { id: pabellonId },
  });

  if (!pabellonExistente) {
    throw new AppError("El pabellón especificado no existe", 404);
  }

  return prisma.sector.create({ data: { nombre, pabellonId } });
};

export const actualizarSectorService = async (id, datos) => {
  const existente = await prisma.sector.findUnique({ where: { id } });

  if (!existente) {
    throw new AppError("No existe el sector que se intenta actualizar", 404);
  }

  if (datos.pabellonId) {
    const pabellonExistente = await prisma.pabellon.findUnique({
      where: { id: datos.pabellonId },
    });
    if (!pabellonExistente) {
      throw new AppError("El pabellón especificado no existe", 404);
    }
  }

  return prisma.sector.update({ where: { id }, data: datos });
};

export const eliminarSectorService = async (id) => {
  const existente = await prisma.sector.findUnique({
    where: { id },
    include: { _count: { select: { stands: true } } },
  });

  if (!existente) {
    throw new AppError("No existe el sector que se intenta eliminar", 404);
  }

  if (existente._count.stands > 0) {
    throw new AppError(
      "No se puede eliminar el sector porque tiene stands asociados",
      409,
    );
  }

  await prisma.sector.delete({ where: { id } });
  return { mensaje: "Sector eliminado correctamente" };
};
