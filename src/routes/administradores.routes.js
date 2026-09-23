import express from "express";
import { validarId } from "../middlewares/validarId.js";
import {
    obtenerTodosLosAdministradores,
    obtenerAdministradorPorId,
    agregarAdministrador,
    actualizarAdministrador,
    eliminarAdministrador
} from "../controllers/administradores.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosAdministradores);
router.get("/:id", validarId, obtenerAdministradorPorId);
router.post("/", agregarAdministrador);
router.put("/:id", validarId, actualizarAdministrador);
router.delete("/:id", validarId, eliminarAdministrador);

export default router;