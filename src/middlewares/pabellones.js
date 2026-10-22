import {
  crearPabellonSchema,
  actualizarPabellonSchema,
  idPabellonParamSchema,
  consultarPabellonesSchema,
} from "../validators/pabellones.schema.js";
import { BadRequest } from "../utils/error.js";

const enviarErroresValidacion = (resultado, next) => {
  const mensajes = resultado.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(";");
  return next(new BadRequest(mensajes));
};

export const validarCreacionPabellon = (req, res, next) => {
  const resultado = crearPabellonSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.body = resultado.data;
  next();
};

export const validarActualizacionPabellon = (req, res, next) => {
  const resultado = actualizarPabellonSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.body = resultado.data;
  next();
};

export const validarIdPabellonParam = (req, res, next) => {
  const resultado = idPabellonParamSchema.safeParse(req.params);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.params = resultado.data;
  next();
};

export const validarConsultarPabellones = (req, res, next) => {
  const resultado = consultarPabellonesSchema.safeParse(req.query);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.pabellonConsulta = resultado.data;
  next();
};
