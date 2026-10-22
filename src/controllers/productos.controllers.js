import {
  obtenerProductosService,
  obtenerMisProductosService,
  obtenerProductoPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService,
} from "../services/productos.services.js";
import { BadRequest } from "../utils/error.js";

export const obtenerTodosLosProductosController = async (req, res, next) => {
    try {
    const filtros = req.productoConsulta;
    const productos = await obtenerProductosService(
      filtros,
      req.usuario?.rol === "ARTESANO" ? req.usuario.artesanoId : undefined,
    );
    return res.status(200).json(productos);
    }catch (error) {
        next (error);
    }
}
export const obtenerMisProductosController = async (req, res, next) => {
  try {
    const productos = await obtenerMisProductosService(
      req.usuario.artesanoId,
      req.productoConsulta,
    );
    return res.status(200).json(productos);
  } catch (error) {
    return next(error);
  }
};
export const obtenerProductoPorIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    return res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
}

export const crearProductoController = async (req, res, next) => {
  try {
    const productoDto = req.body;
    const nuevoProducto = await crearProductoService(
      req.usuario.artesanoId,
      productoDto,
    );
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};

export const actualizarProductoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizacion = req.body;
    const productoActualizado = await actualizarProductoService(
      id,
      req.usuario.artesanoId,
      datosActualizacion,
    );
    return res.status(200).json(productoActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminarProductoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarProductoService(
      id,
      req.usuario.artesanoId,
    );
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};