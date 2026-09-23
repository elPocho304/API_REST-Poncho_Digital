import express from "express";
import { validarId } from "../middlewares/validarId.js";

import {
    obtenerTodosLosProductos,
    obtenerProductoPorId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", validarId, obtenerProductoPorId);
router.post("/", agregarProducto);
router.put("/:id", validarId, actualizarProducto);
router.delete("/:id", validarId, eliminarProducto);

export default router;
