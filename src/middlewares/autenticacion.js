import { validarRegistro } from "../validators/autenticacion.schema.js";
import { BadRequest } from "../utils/error.js";
import { inicioSesionShema } from "../validators/autenticacion.schema.js";

export const autenticarUsuario = (req, res, next) => {
  const encabezado = req.get("Authorization");
  if (!encabezado) {
    res.set("WWW-Authenticate", "Bearer");
    return res.status(401).json({
      mensaje: "Se requiere un token de acceso.",
    });
  }

  const coincidencia = /^Bearer +(\S+)$/i.exec(encabezado);
  if (!coincidencia) {
    res.set("WWW-Authenticate", 'Bearer error = "invalid_request"');
    return res.status(400).json({
      mensaje: "Usar Authorization: Bearer <token>.",
    });
  }

  try {
    req.usuario = verificarToken(coincidencia[1]);
    // if(await tokenEstaRevocado(req.usuario.jti)){
    //   throw new jwt.JsonWebTokenError("Token revocado.")
    // }
  } catch (error) {
    if (!(error instanceof jwt.JsonWebTokenError)) {
      return next(error);
    }
    res.set("WWW-Authenticate", 'Bearer error = "invalid_token"');
    return res.status(401).json({
      mensaje: "El token es invalido o ha vencido.",
    });
  }
  return next();
};

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
