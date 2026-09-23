import express from "express";
import { validarId } from "../middlewares/validarId.js";
import {
	obtenerTodosLosArtesanos,
	obtenerArtesanoPorId,
	agregarArtesano,
	actualizarArtesano,
	eliminarArtesano
} from "../controllers/artesanos.controllers.js";

const router = express.Router();

router.get("/", obtenerTodosLosArtesanos);
router.get("/:id", validarId, obtenerArtesanoPorId);
router.post("/", agregarArtesano);
router.put("/:id", validarId, actualizarArtesano);
router.delete("/:id", validarId, eliminarArtesano);

export default router;
