import {
  crearAsignacionStandSchema,
  actualizarAsignacionStandSchema,
  consultarAsignacionesStandSchema,
  idAsignacionStandParamSchema,
} from "../validators/asignacionesStand.schema.js";
import { BadRequest } from "../utils/error.js";

const enviarErroresValidacion = (resultado, next) => {
  const mensajes = resultado.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(";");
  return next(new BadRequest(mensajes));
};

export const validarCreacionAsignacionStand = (req, res, next) => {
  const resultado = crearAsignacionStandSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);

  req.body = resultado.data;
  next();
};

export const validarActualizacionAsignacionStand = (req, res, next) => {
  const resultado = actualizarAsignacionStandSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);

  req.body = resultado.data;
  next();
};

export const validarConsultaAsignacionesStand = (req, res, next) => {
  const resultado = consultarAsignacionesStandSchema.safeParse(req.query);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);

  req.asignacionesStandConsulta = resultado.data;
  next();
};

export const validarIdAsignacionStandParam = (req, res, next) => {
  const resultado = idAsignacionStandParamSchema.safeParse(req.params);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);

  req.params = resultado.data;
  next();
};
