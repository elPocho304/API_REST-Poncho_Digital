import {
  crearStandSchema,
  actualizarStandSchema,
  idStandParamSchema,
  consultarStandsSchema,
} from "../validators/stands.schema.js";
import { BadRequest } from "../utils/error.js";

export const validarCreacionStand = (req, res, next) => {
  const resultado = crearStandSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarActualizacionStand = (req, res, next) => {
  const resultado = actualizarStandSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarIdStandParam = (req, res, next) => {
  const resultado = idStandParamSchema.safeParse(req.params);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.params = resultado.data;
  next();
};

export const validarConsultarStands = (req, res, next) => {
  const resultado = consultarStandsSchema.safeParse(req.query);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");

    return next(new BadRequest(mensajes));
  }
  req.query = resultado.data;
  next();
};
