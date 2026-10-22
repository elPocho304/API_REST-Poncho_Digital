import { Router } from "express";
import { obtenerMiPerfil } from "../controllers/artesanos.controllers.js";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
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
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get("/obtener", validarConsultaArtesanos, obtenerTodosLosArtesanosController);
router.get("/me", autenticarUsuario, obtenerMiPerfil);
router.get("/obtenerPorId/:id", validarIdArtesanoParam, obtenerArtesanoPorIdController);
router.patch("/actualizar/:id", ...autenticarAdministrador, validarIdArtesanoParam, validarActualizacionArtesano, actualizarArtesanoController);
router.delete("/eliminar/:id", ...autenticarAdministrador, validarIdArtesanoParam, eliminarArtesanoController);

export default router;
