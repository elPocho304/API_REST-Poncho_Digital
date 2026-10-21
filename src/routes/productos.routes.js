import {Router} from "express";
import {
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
  obtenerTodosLosProductosController,
} from "../controllers/productos.controllers.js";
import { 
    validarCreacionProducto,
    validarActualizacionProducto,
    validarIdProductoParam,
    validarConsultaProductos,
} from "../middlewares/productos.js";

const router = Router();

router.get("/obtener", validarConsultaProductos, obtenerTodosLosProductosController);
router.get("/obetenerPorId/:id", validarIdProductoParam, obtenerProductoPorIdController);
router.post("/agregar", validarCreacionProducto, crearProductoController);
router.patch("/actualizar/:id", validarIdProductoParam, validarActualizacionProducto, actualizarProductoController);
router.delete("/eliminar/:id", validarIdProductoParam, eliminarProductoController);

export default router;
