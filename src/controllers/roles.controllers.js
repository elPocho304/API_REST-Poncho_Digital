import { roles } from "../data/roles.js";

export const obtenerTodosLosRoles = (req, res) => {
    const { nombre } = req.query;

    let resultado = roles;
    if(nombre){
        resultado = resultado.filter(rol => rol.nombre.toLowerCase().includes(nombre.toLowerCase()));

    }
    res.status(200).json(resultado);
}
export const obtenerRolPorId = (req, res) => {
    res.status(200).json(req.elementoEncontrado);
}
export const agregarRol = (req, res, next) => {
    const { nombre } = req.body;
    const nuevoId = roles.length + 1;

    if(!nombre){
        return next(new BadRequest('Faltan datos obligatorios'))
    };

    const nuevoRol = {
        id: nuevoId,
        nombre: nombre,
    };

    productos.push(nuevoRol);
    res.status(201).json(nuevoRol)
}
export const actualizarRol = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
     return next(new BadRequest('Faltan datos obligatorios'))
  }

  const rol = req.elementoEncontrado;

  //reasigno los valores
  rol.nombre = nombre;

  res.status(200).json(rol);
};
export const eliminarRol = (req, res) => {
  const posicion = req.elementoIndice;

  roles.splice(posicion, 1);

  res.status(204).json({ message: "El rol se eliminó correctamente." });
};