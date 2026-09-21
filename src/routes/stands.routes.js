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

const router = express.Router();

router.get("/", obtenerTodosLosStads);
router.get("/:id", validarId, noEncontrado(stands), obtenerStandPorId);
router.post("/", agregarStand);
router.put("/:id", validarId, noEncontrado(stands), actualizarStand);
router.delete("/:id", validarId, eliminarStand);

export default router;