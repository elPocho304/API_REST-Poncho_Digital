import express from "express";
import { artesanos } from "../data/artesanos.js";
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
router.get("/:id", validarId(artesanos), obtenerArtesanoPorId);
router.post("/", agregarArtesano);
router.put("/:id", validarId(artesanos), actualizarArtesano);
router.delete("/:id", validarId(artesanos), eliminarArtesano);

export default router;
