import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

export const obtenerPabellonesService = async ({
  nombre,
  pagina,
  limite,
} = {}) => {
  return prisma.pabellon.findMany({
    where: {
      ...(nombre && { nombre: { contains: nombre, mode: "insensitive" } }),
    },
    orderBy: [{ nombre: "asc" }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
  });
};

export const obtenerPabellonPorIdService = async (id) => {
  const pabellon = await prisma.pabellon.findUnique({
    where: { id },
    include: { sectores: true },
  });

  if (!pabellon) {
    throw new AppError("No se encontró el pabellón solicitado", 404);
  }

  return pabellon;
};

export const crearPabellonService = async (datos) => {
  const { nombre, descripcion } = datos;
  const existente = await prisma.pabellon.findUnique({ where: { nombre } });

  if (existente) {
    throw new AppError("Ya existe un pabellón con ese nombre", 409);
  }

  return prisma.pabellon.create({ data: { nombre, descripcion } });
};

export const actualizarPabellonService = async (id, datos) => {
  const existente = await prisma.pabellon.findUnique({ where: { id } });

  if (!existente) {
    throw new AppError("No existe el pabellón que se intenta actualizar", 404);
  }

  if (datos.nombre && datos.nombre !== existente.nombre) {
    const nombreExistente = await prisma.pabellon.findUnique({
      where: { nombre: datos.nombre },
    });
    if (nombreExistente) {
      throw new AppError("Ya existe un pabellón con ese nombre", 409);
    }
  }

  return prisma.pabellon.update({ where: { id }, data: datos });
};

export const eliminarPabellonService = async (id) => {
  const existente = await prisma.pabellon.findUnique({
    where: { id },
    include: { _count: { select: { sectores: true } } },
  });

  if (!existente) {
    throw new AppError("No existe el pabellón que se intenta eliminar", 404);
  }

  if (existente._count.sectores > 0) {
    throw new AppError(
      "No se puede eliminar el pabellón porque tiene sectores asociados",
      409,
    );
  }

  await prisma.pabellon.delete({ where: { id } });
  return { mensaje: "Pabellón eliminado correctamente" };
};
