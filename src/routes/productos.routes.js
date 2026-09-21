import express from "express";
import { productos } from "../data/productos.js";
import { validarId } from "../middlewares/validarId.js";
import { noEncontrado } from "../middlewares/noEncontrado.js";
import {
    obtenerTodosLosProductos,
    obtenerProductoPorId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.constrollers.js";

const router = express.Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", validarId, noEncontrado(productos), obtenerProductoPorId);
router.post("/", agregarProducto);
router.put("/:id", validarId, noEncontrado(productos), actualizarProducto);
router.delete("/:id", validarId, eliminarProducto);

export default router;
