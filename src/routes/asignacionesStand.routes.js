import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerAsignacionesStandController,
  obtenerAsignacionStandPorIdController,
  eliminarAsignacionStandController,
  asignarStandController,
  actualizarEstadoAsignacionStandController,
} from "../controllers/asignacionesStand.controllers.js";
import {
  validarConsultaAsignacionesStand,
  validarCreacionAsignacionStand,
  validarActualizacionAsignacionStand,
  validarIdAsignacionStandParam,
} from "../middlewares/asignacionesStand.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.post("/asignar", ...autenticarAdministrador, validarCreacionAsignacionStand, asignarStandController);
router.get(
  "/obtener",
  ...autenticarAdministrador,
  validarConsultaAsignacionesStand,
  obtenerAsignacionesStandController,
);
router.get(
  "/obtenerPorId/:id",
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  obtenerAsignacionStandPorIdController,
);
router.patch(
  "/actualizar/:id",
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  validarActualizacionAsignacionStand,
  actualizarEstadoAsignacionStandController,
);
router.delete(
  "/eliminar/:id",
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  eliminarAsignacionStandController,
);

export default router;
