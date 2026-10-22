import {
  crearSectorSchema,
  actualizarSectorSchema,
  idSectorParamSchema,
  consultarSectoresSchema,
} from "../validators/sectores.schema.js";
import { BadRequest } from "../utils/error.js";

const enviarErroresValidacion = (resultado, next) => {
  const mensajes = resultado.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(";");
  return next(new BadRequest(mensajes));
};

export const validarCreacionSector = (req, res, next) => {
  const resultado = crearSectorSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.body = resultado.data;
  next();
};

export const validarActualizacionSector = (req, res, next) => {
  const resultado = actualizarSectorSchema.safeParse(req.body);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.body = resultado.data;
  next();
};

export const validarIdSectorParam = (req, res, next) => {
  const resultado = idSectorParamSchema.safeParse(req.params);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.params = resultado.data;
  next();
};

export const validarConsultarSectores = (req, res, next) => {
  const resultado = consultarSectoresSchema.safeParse(req.query);
  if (!resultado.success) return enviarErroresValidacion(resultado, next);
  req.sectorConsulta = resultado.data;
  next();
};
