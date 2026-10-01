import { validarRegistro } from "../validators/autenticacion.schema.js";
import { BadRequest } from "../utils/error.js";
import { inicioSesionShema } from "../validators/autenticacion.schema.js";

export const validacionRegistro = (req, res, next) => {
  const resultado = validarRegistro.safeParse(req.body);
  if (!resultado.success){
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes))
  }
  req.body = resultado.data;  
  next()
}

export const validarInicioSesion = (req, res, next) => {
    const resultado = inicioSesionShema.safeParse(req.body);
     if (!resultado.success){
    const mensajes = resultado.error.issues
      .map((issues) => `${issues.path.join(".")}: ${issues.message}`)
      .join(";");
    return next(new BadRequest(mensajes))
  }
  req.body = resultado.data;
  next()
}
