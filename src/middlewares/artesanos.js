import { 
  crearArtesanoSchema, 
  actualizarArtesanoSchema, 
  idArtesanoParamSchema,
  artesanoQuerySchema,
} from "../validators/artesanos.schema.js";
import { BadRequest } from "../utils/error.js";

export const validarCreacionArtesano = (req, res, next) => {
  const resultado = crearArtesanoSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarActualizacionArtesano = (req, res, next) => {
  const resultado = actualizarArtesanoSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarIdArtesanoParam = (req, res, next) => {
  const resultado = idArtesanoParamSchema.safeParse(req.params);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.params = resultado.data;
  next();
};

export const validarConsultaArtesanos = (req, res, next) => {
  const resultado = artesanoQuerySchema.safeParse(req.query);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.artesanoConsulta = resultado.data;
  next();
};