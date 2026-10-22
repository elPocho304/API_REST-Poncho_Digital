import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.js";

const FACTOR_COSTO = 10;
const usuarioSeguro = {
  id: true,
  email: true,
  rol: true,
  activo: true,
  createdAt: true,
};

export const crearAdministradorService = async ({ email, password }) => {
  const existente = await prisma.usuario.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existente) {
    throw new AppError("El correo electrónico ya existe", 409);
  }

  const passwordHash = await bcrypt.hash(password, FACTOR_COSTO);
  return prisma.usuario.create({
    data: {
      email,
      passwordHash,
      rol: "ADMINISTRADOR",
    },
    select: usuarioSeguro,
  });
};

export const actualizarEstadoUsuarioService = async (id, activo) =>
  prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.findUnique({
      where: { id },
      select: { id: true, rol: true, activo: true },
    });
    if (!usuario) {
      throw new AppError("No se encontró el usuario solicitado", 404);
    }

    if (
      !activo &&
      usuario.rol === "ADMINISTRADOR" &&
      usuario.activo
    ) {
      const administradoresActivos = await tx.usuario.count({
        where: { rol: "ADMINISTRADOR", activo: true },
      });
      if (administradoresActivos <= 1) {
        throw new AppError(
          "No se puede desactivar al último administrador activo",
          409,
        );
      }
    }

    return tx.usuario.update({
      where: { id },
      data: { activo },
      select: usuarioSeguro,
    });
  });
