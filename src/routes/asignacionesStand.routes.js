import { Router } from "express";
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

router.post("/asignar", validarCreacionAsignacionStand, asignarStandController);
router.get(
  "/obtener",
  validarConsultaAsignacionesStand,
  obtenerAsignacionesStandController,
);
router.get(
  "/obtenerPorId/:id",
  validarIdAsignacionStandParam,
  obtenerAsignacionStandPorIdController,
);
router.patch(
  "/actualizar/:id",
  validarIdAsignacionStandParam,
  validarActualizacionAsignacionStand,
  actualizarEstadoAsignacionStandController,
);
router.delete(
  "/eliminar/:id",
  validarIdAsignacionStandParam,
  eliminarAsignacionStandController,
);

export default router;
