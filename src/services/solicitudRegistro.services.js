import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

const incluirRelacionesSeguras = {
  usuario: {
    select: {
      id: true,
      email: true,
      rol: true,
    },
  },
  resueltaPor: {
    select: {
      id: true,
      email: true,
      rol: true,
    },
  },
};

export const obtenerSolicitudesRegistroService = async (filtros = {}) => {
  const {
    estado,
    usuarioId,
    resueltaPorId,
    nombreEmprendimiento,
    rubro,
    localidad,
    ordenPor = "fechaSolicitud",
    orden = "desc",
    pagina = 1,
    limite = 10,
  } = filtros;

  return prisma.solicitudRegistro.findMany({
    where: {
      ...(estado && { estado }),
      ...(usuarioId && { usuarioId }),
      ...(resueltaPorId && { resueltaPorId }),
      ...(nombreEmprendimiento && {
        nombreEmprendimiento: {
          contains: nombreEmprendimiento,
          mode: "insensitive",
        },
      }),
      ...(rubro && { rubro: { contains: rubro, mode: "insensitive" } }),
      ...(localidad && {
        localidad: { contains: localidad, mode: "insensitive" },
      }),
    },
    orderBy: [{ [ordenPor]: orden }, { id: "asc" }],
    skip: (pagina - 1) * limite,
    take: limite,
    include: incluirRelacionesSeguras,
  });
};

export const obtenerSolicitudRegistroPorIdService = async (id) => {
  const solicitud = await prisma.solicitudRegistro.findUnique({
    where: { id },
    include: incluirRelacionesSeguras,
  });

  if (!solicitud) {
    throw new AppError("No se encontró la solicitud de registro", 404);
  }

  return solicitud;
};

export const eliminarSolicitudRegistroService = async (id) => {
  const solicitud = await prisma.solicitudRegistro.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!solicitud) {
    throw new AppError(
      "No existe la solicitud de registro que se intenta eliminar",
      404,
    );
  }

  await prisma.solicitudRegistro.delete({ where: { id } });
  return { mensaje: "Solicitud de registro eliminada correctamente" };
};

export const resolverSolicitudRegistroService = async (
  id,
  administradorId,
  { estado, comentarioAdmin },
) =>
  prisma.$transaction(async (tx) => {
    const solicitud = await tx.solicitudRegistro.findUnique({
      where: { id },
      select: {
        id: true,
        usuarioId: true,
        nombreEmprendimiento: true,
        rubro: true,
        localidad: true,
        estado: true,
      },
    });
    if (!solicitud) {
      throw new AppError("No se encontró la solicitud de registro", 404);
    }
    if (solicitud.estado !== "PENDIENTE") {
      throw new AppError("La solicitud ya fue resuelta", 409);
    }

    if (estado === "APROBADA") {
      const perfilExistente = await tx.artesano.findUnique({
        where: { usuarioId: solicitud.usuarioId },
        select: { id: true },
      });
      if (perfilExistente) {
        throw new AppError("El usuario ya posee un perfil de artesano", 409);
      }

      await tx.artesano.create({
        data: {
          usuarioId: solicitud.usuarioId,
          solicitudId: solicitud.id,
          nombreEmprendimiento: solicitud.nombreEmprendimiento,
          rubro: solicitud.rubro,
          localidad: solicitud.localidad,
        },
      });
      await tx.usuario.update({
        where: { id: solicitud.usuarioId },
        data: { rol: "ARTESANO" },
      });
    }

    return tx.solicitudRegistro.update({
      where: { id },
      data: {
        estado,
        ...(comentarioAdmin !== undefined && { comentarioAdmin }),
        resueltaPorId: administradorId,
        fechaResolucion: new Date(),
      },
      include: incluirRelacionesSeguras,
    });
  });
