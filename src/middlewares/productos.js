import {
  crearProductoSchema,
  actualizarProductoSchema,
  idProductoParamSchema,
  consultarProductosSchema,
} from "../validators/productos.schema.js";
import { BadRequest } from "../utils/error.js";

export const validarCreacionProducto = (req, res, next) => {
  const resultado = crearProductoSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarActualizacionProducto = (req, res, next) => {
  const resultado = actualizarProductoSchema.safeParse(req.body);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.body = resultado.data;
  next();
};

export const validarIdProductoParam = (req, res, next) => {
  const resultado = idProductoParamSchema.safeParse(req.params);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.params = resultado.data;
  next();
};

export const validarConsultaProductos = (req, res, next) => {
  const resultado = consultarProductosSchema.safeParse(req.query);
  if (!resultado.success) {
    const mensajes = resultado.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(";");
    return next(new BadRequest(mensajes));
  }
  req.productoConsulta = resultado.data;
  next();
};