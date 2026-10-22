import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

const incluirRelaciones = {
  artesano: {
    select: {
      id: true,
      nombreEmprendimiento: true,
      rubro: true,
      localidad: true,
    },
  },
  stand: {
    include: {
      sector: {
        include: {
          pabellon: true,
        },
      },
    },
  },
};

export const obtenerAsignacionesStandService = async (filtros = {}) => {
  const {
    artesanoId,
    standId,
    activo,
    ordenPor,
    orden,
    pagina,
    limite,
  } = filtros;

  return prisma.asignacionStand.findMany({
    where: {
      ...(artesanoId && { artesanoId }),
      ...(standId && { standId }),
      ...(activo !== undefined && { activo }),
    },
    orderBy: [{ [ordenPor]: orden }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
    include: incluirRelaciones,
  });
};

export const obtenerAsignacionStandPorIdService = async (id) => {
  const asignacion = await prisma.asignacionStand.findUnique({
    where: { id },
    include: incluirRelaciones,
  });

  if (!asignacion) {
    throw new AppError("No se encontró la asignación de stand solicitada", 404);
  }

  return asignacion;
};

export const eliminarAsignacionStandService = async (id) => {
  return prisma.$transaction(async (tx) => {
    const asignacion = await tx.asignacionStand.findUnique({
      where: { id },
      select: { id: true, standId: true, activo: true },
    });

    if (!asignacion) {
      throw new AppError(
        "No existe la asignación de stand que se intenta eliminar",
        404,
      );
    }

    await tx.asignacionStand.delete({ where: { id } });

    if (asignacion.activo) {
      const otrasAsignacionesActivas = await tx.asignacionStand.findFirst({
        where: { standId: asignacion.standId, activo: true },
        select: { id: true },
      });

      if (!otrasAsignacionesActivas) {
        await tx.stand.updateMany({
          where: { id: asignacion.standId, estado: "OCUPADO" },
          data: { estado: "DISPONIBLE" },
        });
      }
    }

    return { mensaje: "Asignación de stand eliminada correctamente" };
  });
};

export const actualizarEstadoAsignacionStandService = async (id, activo) => {
  return prisma.$transaction(async (tx) => {
    const asignacion = await tx.asignacionStand.findUnique({
      where: { id },
      include: { stand: { select: { id: true, estado: true } } },
    });

    if (!asignacion) {
      throw new AppError(
        "No existe la asignación de stand que se intenta actualizar",
        404,
      );
    }

    if (asignacion.activo === activo) {
      return tx.asignacionStand.findUnique({
        where: { id },
        include: incluirRelaciones,
      });
    }

    if (!activo) {
      const asignacionActualizada = await tx.asignacionStand.update({
        where: { id },
        data: { activo: false, fechaFin: new Date() },
        include: incluirRelaciones,
      });

      const otraAsignacionActiva = await tx.asignacionStand.findFirst({
        where: { standId: asignacion.standId, activo: true },
        select: { id: true },
      });

      if (!otraAsignacionActiva) {
        await tx.stand.updateMany({
          where: { id: asignacion.standId, estado: "OCUPADO" },
          data: { estado: "DISPONIBLE" },
        });
      }

      return asignacionActualizada;
    }

    if (asignacion.stand.estado !== "DISPONIBLE") {
      throw new AppError("El stand no está disponible para asignarse", 409);
    }

    const otraAsignacionActiva = await tx.asignacionStand.findFirst({
      where: {
        id: { not: id },
        OR: [
          { artesanoId: asignacion.artesanoId, activo: true },
          { standId: asignacion.standId, activo: true },
        ],
      },
      select: { id: true },
    });

    if (otraAsignacionActiva) {
      throw new AppError(
        "El artesano o el stand ya tiene otra asignación activa",
        409,
      );
    }

    const asignacionActualizada = await tx.asignacionStand.update({
      where: { id },
      data: { activo: true, fechaFin: null },
      include: incluirRelaciones,
    });

    await tx.stand.update({
      where: { id: asignacion.standId },
      data: { estado: "OCUPADO" },
    });

    return asignacionActualizada;
  });
};

export const asignarStandService = async ({
  artesanoId,
  standId,
}) => {
  return prisma.$transaction(async (tx) => {
    const artesano = await tx.artesano.findUnique({
      where: { id: artesanoId },
      select: { id: true },
    });

    if (!artesano) {
      throw new AppError("El artesano especificado no existe", 404);
    }

    const stand = await tx.stand.findUnique({
      where: { id: standId },
      select: { id: true, estado: true },
    });

    if (!stand) {
      throw new AppError("El stand especificado no existe", 404);
    }

    if (stand.estado !== "DISPONIBLE") {
      throw new AppError("Solo se pueden solicitar stands disponibles", 409);
    }

    const asignacionActiva = await tx.asignacionStand.findFirst({
      where: {
        OR: [{ artesanoId, activo: true }, { standId, activo: true }],
      },
      select: { id: true },
    });

    if (asignacionActiva) {
      throw new AppError(
        "El artesano o el stand ya tiene una asignación activa",
        409,
      );
    }

    const asignacion = await tx.asignacionStand.create({
      data: {
        artesanoId,
        standId,
        activo: true,
      },
      include: incluirRelaciones,
    });

    await tx.stand.update({
      where: { id: standId },
      data: { estado: "OCUPADO" },
    });

    return asignacion;
  });
};
