import { productos } from "../data/productos.js";
import { BadRequest } from "../utils/error.js";

export const obtenerTodosLosProductos = (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.query;

    let resultado = productos;
    if(nombre){
        resultado = resultado.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
    };
    if(descripcion){
        resultado = resultado.filter(producto => producto.descripcion.toLowerCase().includes(descripcion.toLowerCase()));
    };
    if(precio){
        resultado = resultado.filter(producto => producto.precio === Number(precio));
    };
    if(categoria){
        resultado = resultado.filter(producto => producto.categoria.toLowerCase().includes(categoria.toLowerCase()));
    };

    res.status(200).json(resultado);

}
export const obtenerProductoPorId = (req, res) => {
    res.status(200).json(req.elementoEncontrado);
}
export const agregarProducto = (req, res, next) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const nuevoId = productos.length + 1;

    if(!nombre || !precio || !categoria){
        return next(new BadRequest('Faltan datos obligatorios'))
    };

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        descripcion: descripcion || null,
        precio: precio,
        categoria: categoria
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto)
}
export const actualizarProducto = (req, res, next) => {
  const { nombre, descripcion, precio, categoria } = req.body;

  if (!nombre || !descripcion || !precio || !categoria) {
    return next(new BadRequest('Faltan datos obligatorios'))
  }

  const producto = req.elementoEncontrado;

  //reasigno los valores
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  producto.categoria = categoria;

  res.status(200).json(producto);
};
export const eliminarProducto = (req, res) => {
  const posicion = req.elementoIndice;

  productos.splice(posicion, 1);

  res.status(204).json({ message: "El producto se eliminó correctamente." });
};