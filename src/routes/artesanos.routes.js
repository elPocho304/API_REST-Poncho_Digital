import { Router } from "express";
import { obtenerMiPerfil } from "../controllers/artesanos.controllers.js";
import { autenticarUsuario } from "../middlewares/autenticacion.js";
import {
  obtenerArtesanoPorIdController,
  actualizarArtesanoController,
  eliminarArtesanoController,
  obtenerTodosLosArtesanosController,
} from "../controllers/artesanos.controllers.js";
import { 
	validarActualizacionArtesano,
	validarIdArtesanoParam,
	validarConsultaArtesanos,
 } from "../middlewares/artesanos.js";

const router = Router();

router.get("/obtener", validarConsultaArtesanos, obtenerTodosLosArtesanosController);
router.get("/me", autenticarUsuario, obtenerMiPerfil);
router.get("/obtenerPorId/:id", validarIdArtesanoParam, obtenerArtesanoPorIdController);
router.patch("/actualizar/:id", validarIdArtesanoParam, validarActualizacionArtesano, actualizarArtesanoController);
router.delete("/eliminar/:id", validarIdArtesanoParam, eliminarArtesanoController);

export default router;
