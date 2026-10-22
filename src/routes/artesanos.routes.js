import { Router } from "express";
import {
  obtenerArtesanoPorIdController,
  crearArtesanoController,
  actualizarArtesanoController,
  eliminarArtesanoController,
  obtenerTodosLosArtesanosController,
} from "../controllers/artesanos.controllers.js";
import { 
	validarCreacionArtesano,
	validarActualizacionArtesano,
	validarIdArtesanoParam,
	validarConsultaArtesanos,
 } from "../middlewares/artesanos.js";

const router = Router();

router.get("/obtener", validarConsultaArtesanos, obtenerTodosLosArtesanosController);
router.get("/obtenerPorId/:id", validarIdArtesanoParam, obtenerArtesanoPorIdController);
router.post("/", validarCreacionArtesano, crearArtesanoController);
router.patch("/actualizar/:id", validarIdArtesanoParam, validarActualizacionArtesano, actualizarArtesanoController);
router.delete("/eliminar/:id", validarIdArtesanoParam, eliminarArtesanoController);

export default router;
