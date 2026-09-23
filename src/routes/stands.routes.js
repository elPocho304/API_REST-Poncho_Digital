import express from "express";
import { validarId } from "../middlewares/validarId.js";
import {
    obtenerTodosLosStands,
    obtenerStandPorId,
    agregarStand,
    actualizarStand,
    eliminarStand
} from "../controllers/stands.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosStands);
router.get("/:id", validarId, obtenerStandPorId);
router.post("/", agregarStand);
router.put("/:id", validarId, actualizarStand);
router.delete("/:id", validarId, eliminarStand);

export default router;