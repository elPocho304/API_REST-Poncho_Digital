import { Router } from "express";
import {
	obtenerArtesanosController,
  obtenerArtesanoPorIdController,
  crearArtesanoController,
  actualizarArtesanoController,
  eliminarArtesanoController,
  obtenerTodosLosArtesanosController,
} from "../controllers/artesanos.controllers.js";
import { 
	validarCreacionArtesano,
	validarActualizacionArtesano,
	validarArtesanoParams,
	validarIdArtesanoParam,
 } from "../middlewares/artesanos.js";

const router = Router();

router.get("/", obtenerTodosLosArtesanosController);
router.get("/:id", validarIdArtesanoParam, obtenerArtesanoPorIdController);
router.post("/", validarCreacionArtesano, crearArtesanoController);
router.patch("/:id", validarIdArtesanoParam, validarActualizacionArtesano, actualizarArtesanoController);
router.delete("/:id", validarIdArtesanoParam, eliminarArtesanoController);

export default router;
