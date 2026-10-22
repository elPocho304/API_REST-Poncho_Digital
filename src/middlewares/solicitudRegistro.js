import {
  consultarSolicitudesRegistroSchema,
  idSolicitudParamSchema,
  resolverSolicitudRegistroSchema,
} from "../validators/solicitudRegistro.schema.js";
import { BadRequest } from "../utils/error.js";

const validarResultado = (resultado, next) => {
  const mensajes = resultado.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(";");
  return next(new BadRequest(mensajes));
};

export const validarConsultaSolicitudesRegistro = (req, res, next) => {
  const resultado = consultarSolicitudesRegistroSchema.safeParse(req.query);
  if (!resultado.success) return validarResultado(resultado, next);

  req.solicitudRegistroConsulta = resultado.data;
  next();
};

export const validarIdSolicitudRegistroParam = (req, res, next) => {
  const resultado = idSolicitudParamSchema.safeParse(req.params);
  if (!resultado.success) return validarResultado(resultado, next);

  req.params = resultado.data;
  next();
};

export const validarResolucionSolicitudRegistro = (req, res, next) => {
  const resultado = resolverSolicitudRegistroSchema.safeParse(req.body);
  if (!resultado.success) return validarResultado(resultado, next);

  req.body = resultado.data;
  return next();
};
