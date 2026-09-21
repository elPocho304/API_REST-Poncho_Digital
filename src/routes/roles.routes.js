import express from "express";
import { roles } from "../data/roles.js";
import { validarId } from "../middlewares/validarId.js";
import { noEncontrado } from "../middlewares/noEncontrado.js";
import {
    obtenerTodosLosRoles,
    obtenerRolPorId,
    agregarRol,
    actualizarRol,
    eliminarRol
} from "../controllers/roles.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosRoles);
router.get("/:id", validarId, noEncontrado(roles), obtenerRolPorId);
router.post("/", agregarRol);
router.put("/:id", validarId, noEncontrado(roles), actualizarRol);
router.delete("/:id", validarId, eliminarRol);

export default router;