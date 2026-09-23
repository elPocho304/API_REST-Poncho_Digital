import express from "express";
import { validarId } from "../middlewares/validarId.js";
import {
    obtenerTodosLosRoles,
    obtenerRolPorId,
    agregarRol,
    actualizarRol,
    eliminarRol
} from "../controllers/roles.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosRoles);
router.get("/:id", validarId, obtenerRolPorId);
router.post("/", agregarRol);
router.put("/:id", validarId, actualizarRol);
router.delete("/:id", validarId, eliminarRol);

export default router;