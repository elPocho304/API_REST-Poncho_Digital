import { BadRequest, NotFound } from "../utils/error.js";
export const validarId = (array) =>{
  return (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return next(new BadRequest("El id debe ser un numero entero positivo"))
  }; 
  
  const indice = array.findIndex((e) => e.id === id);

  if (indice === -1) {
      return next(new NotFound(id));
    }

    req.elementoEncontrado = array[indice];
    req.elementoIndice = indice;

  next();
}};