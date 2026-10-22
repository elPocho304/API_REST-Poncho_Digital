import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerSolicitudesRegistroController,
  obtenerSolicitudRegistroPorIdController,
  eliminarSolicitudRegistroController,
  resolverSolicitudRegistroController,
} from "../controllers/solicitudRegistro.controllers.js";
import {
  validarConsultaSolicitudesRegistro,
  validarIdSolicitudRegistroParam,
  validarResolucionSolicitudRegistro,
} from "../middlewares/solicitudRegistro.js";

const router = Router();
router.use(autenticarUsuario, autorizarRoles("ADMINISTRADOR"));

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
router.patch(
  "/resolver/:id",
  validarIdSolicitudRegistroParam,
  validarResolucionSolicitudRegistro,
  resolverSolicitudRegistroController,
);

export default router;
