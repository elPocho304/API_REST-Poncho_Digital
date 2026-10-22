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
