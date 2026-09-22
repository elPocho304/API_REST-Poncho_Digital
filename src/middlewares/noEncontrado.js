import { AppError } from "../utils/error.js";
export const rutaNoEncontrada = (req, res, next)=>{
  return next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404))
};