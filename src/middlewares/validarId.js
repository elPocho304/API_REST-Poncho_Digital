import { BadRequest, NotFound } from "../utils/error.js";


export const validarId = (req, res, next) =>{
  
  const { id }  = req.params.id;
  const idNumero = Number(id);

 if (isNaN(idNumero) || !Number.isInteger(idNumero) || idNumero <= 0) {
        return next(new BadRequest("El ID enviado en los parámetros debe ser un número entero positivo."));
    }

    next();
};