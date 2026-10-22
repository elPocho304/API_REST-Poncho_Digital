import jwt from "jsonwebtoken";
import { verificarToken } from "../services/tokens.service.js";
import prisma from "../config/prisma.js";
import { validarRegistro } from "../validators/autenticacion.schema.js";
import { AppError, BadRequest } from "../utils/error.js";
import { inicioSesionShema } from "../validators/autenticacion.schema.js";

export const autenticarUsuario = async (req, res, next) => {
  const encabezado = req.get("Authorization");
  if (!encabezado) {
    res.set("WWW-Authenticate", "Bearer");
    return res.status(401).json({
      mensaje: "Se requiere un token de acceso.",
    });
  }

  const coincidencia = /^Bearer\s+(\S+)$/i.exec(encabezado);
  if (!coincidencia) {
    res.set("WWW-Authenticate", 'Bearer error="invalid_request"');
    return res.status(400).json({
      mensaje: "Usar Authorization: Bearer <token>.",
    });
  }

  let identidad;
  try {
    identidad = verificarToken(coincidencia[1]);
  } catch (error) {
    if (!(error instanceof jwt.JsonWebTokenError)) {
      return next(error);
    }
    res.set("WWW-Authenticate", 'Bearer error="invalid_token"');
    return res.status(401).json({
      mensaje: "El token es inválido o ha vencido.",
    });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: identidad.id },
      select: {
        id: true,
        email: true,
        rol: true,
        activo: true,
        artesano: { select: { id: true } },
      },
    });

    if (!usuario) {
      res.set("WWW-Authenticate", 'Bearer error="invalid_token"');
      return res.status(401).json({
        mensaje: "La cuenta asociada al token no existe.",
      });
    }
    if (!usuario.activo) {
      return res.status(403).json({
        mensaje: "La cuenta está inactiva.",
      });
    }

    req.usuario = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
      artesanoId: usuario.artesano?.id,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

export const autorizarRoles = (...rolesPermitidos) => (req, res, next) => {
  if (!req.usuario) {
    return next(new AppError("Se requiere autenticación.", 401));
  }
  if (!rolesPermitidos.includes(req.usuario.rol)) {
    return res.status(403).json({
      mensaje: "No tiene permisos para realizar esta operación.",
    });
  }
  return next();
};

export const validacionRegistro = (req, res, next) => {
  const resultado = validarRegistro.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  return next();
};

export const validarInicioSesion = (req, res, next) => {
  const resultado = inicioSesionShema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  return next();
};
