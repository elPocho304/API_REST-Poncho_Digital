import {Router} from "express";
import {
  obtenerProductosController,
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
} from "../controllers/productos.controllers.js";
import { 
    validarCreacionProducto,
    validarActualizacionProducto,
    validarIdProductoParam,
    validarId,
} from "../middlewares/validarId.js";

const router = Router();

router.get("/", obtenerProductosController);
router.get("/:id", validarIdProductoParam, obtenerProductoPorIdController);
router.post("/", validarCreacionProducto, crearProductoController);
router.patch("/:id", validarIdProductoParam, validarActualizacionProducto, actualizarProductoController);
router.delete("/:id", validarIdProductoParam, eliminarProductoController);

export default router;
