import { roles } from "../data/roles.js";

export const obtenerTodosLosRoles = (req, res) => {
    const { nombre } = req.query;

    let resultado = roles;
    if(nombre){
        resultado = resultado.filter(rol => rol.nombre.toLowerCase().includes(nombre.toLowerCase()));

    }
    res.json(resultado);
}
export const obtenerRolPorId = (req, res) => {
    res.json(req.elementoEncontrado);
}
export const agregarRol = (req, res) => {
    const { nombre } = req.body;
    const nuevoId = roles.length + 1;

    if(!nombre){
        return res.status(400).json({error: "El nombre del rol es un dato obligatorios."});
    };

    const nuevoRol = {
        id: nuevoId,
        nombre: nombre,
    };

    productos.push(nuevoRol);
}
export const actualizarRol = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res
      .status(400)
      .json({ error: "Para actualizar, el nombre del rol es obligatorio." });
  }

  const rol = req.elementoEncontrado;

  //reasigno los valores
  rol.nombre = nombre;

  res.json(rol);
};
export const eliminarRol = (req, res) => {
  const posicion = req.elementoIndice;

  roles.splice(posicion, 1);

  res.json({ message: "El rol se eliminó correctamente." });
};