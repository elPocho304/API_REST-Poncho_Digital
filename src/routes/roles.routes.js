import express from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import { roles } from "../data/roles.js";
import { validarId } from "../middlewares/validarId.js";
import {
    obtenerTodosLosRoles,
    obtenerRolPorId,
    agregarRol,
    actualizarRol,
    eliminarRol
} from "../controllers/roles.controllers.js";

const router = express.Router();
router.use(autenticarUsuario, autorizarRoles("ADMINISTRADOR"));

router.get("/", obtenerTodosLosRoles);
router.get("/:id", validarId(roles), obtenerRolPorId);
router.post("/", agregarRol);
router.put("/:id", validarId(roles), actualizarRol);
router.delete("/:id", validarId(roles), eliminarRol);

export default router;