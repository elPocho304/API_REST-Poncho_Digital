import { productos } from "../data/productos.js";

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

    res.json(resultado);

}
export const obtenerProductoPorId = (req, res) => {
    res.json(req.elementoEncontrado);
}
export const agregarProducto = (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const nuevoId = productos.length + 1;

    if(!nombre || !precio || !categoria){
        return res.status(400).json({error: "El nombre, precio y categoría son datos obligatorios."});
    };

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        descripcion: descripcion || null,
        precio: precio,
        categoria: categoria
    };

    productos.push(nuevoProducto);
}
export const actualizarProducto = (req, res) => {
  const { nombre, descripcion, precio, categoria } = req.body;

  if (!nombre || !descripcion || !precio || !categoria) {
    return res
      .status(400)
      .json({ error: "Para actualizar, todos los datos son obligatorios." });
  }

  const producto = req.elementoEncontrado;

  //reasigno los valores
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  producto.categoria = categoria;

  res.json(producto);
};
export const eliminarProducto = (req, res) => {
  const posicion = req.elementoIndice;

  productos.splice(posicion, 1);

  res.json({ message: "El producto se eliminó correctamente." });
};