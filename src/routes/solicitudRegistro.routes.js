import { Router } from "express";
import {
  obtenerSolicitudesRegistroController,
  obtenerSolicitudRegistroPorIdController,
  eliminarSolicitudRegistroController,
} from "../controllers/solicitudRegistro.controllers.js";
import {
  validarConsultaSolicitudesRegistro,
  validarIdSolicitudRegistroParam,
} from "../middlewares/solicitudRegistro.js";

const router = Router();

router.get(
  "/obtener",
  validarConsultaSolicitudesRegistro,
  obtenerSolicitudesRegistroController,
);
router.get(
  "/obtenerPorId/:id",
  validarIdSolicitudRegistroParam,
  obtenerSolicitudRegistroPorIdController,
);
router.delete(
  "/eliminar/:id",
  validarIdSolicitudRegistroParam,
  eliminarSolicitudRegistroController,
);

export default router;
