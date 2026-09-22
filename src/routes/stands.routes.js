import express from "express";
import { stands } from "../data/stands.js";
import { validarId } from "../middlewares/validarId.js";
import { noEncontrado } from "../middlewares/noEncontrado.js";
import {
    obtenerTodosLosStads,
    obtenerStandPorId,
    agregarStand,
    actualizarStand,
    eliminarStand
} from "../controllers/stands.controllers.js";
import { roles } from "../data/roles.js";

const router = express.Router();

router.get("/", obtenerTodosLosStads);
router.get("/:id", validarId(stands), obtenerStandPorId);
router.post("/", agregarStand);
router.put("/:id", validarId(stands), actualizarStand);
router.delete("/:id", validarId(stands), eliminarStand);

export default router;