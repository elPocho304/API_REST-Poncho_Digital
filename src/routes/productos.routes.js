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
} from "../middlewares/productos.js";

const router = Router();

router.get("/", obtenerTodosLosProductosController);
router.get("/:id", validarIdProductoParam, obtenerProductoPorIdController);
router.post("/", validarCreacionProducto, crearProductoController);
router.patch("/:id", validarIdProductoParam, validarActualizacionProducto, actualizarProductoController);
router.delete("/:id", validarIdProductoParam, eliminarProductoController);

export default router;
