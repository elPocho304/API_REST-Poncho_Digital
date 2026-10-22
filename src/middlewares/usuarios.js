import { BadRequest } from "../utils/error.js";
import {
  actualizarEstadoUsuarioSchema,
  crearAdministradorSchema,
  idUsuarioParamSchema,
} from "../validators/usuarios.schema.js";

const validar = (schema, obtenerDato, asignarDato) => (req, res, next) => {
  const resultado = schema.safeParse(obtenerDato(req));
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  asignarDato(req, resultado.data);
  return next();
};

export const validarCreacionAdministrador = validar(
  crearAdministradorSchema,
  (req) => req.body,
  (req, datos) => {
    req.body = datos;
  },
);

export const validarEstadoUsuario = validar(
  actualizarEstadoUsuarioSchema,
  (req) => req.body,
  (req, datos) => {
    req.body = datos;
  },
);

export const validarIdUsuarioParam = validar(
  idUsuarioParamSchema,
  (req) => req.params,
  (req, datos) => {
    req.params = datos;
  },
);
