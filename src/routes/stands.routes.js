import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerStandsController,
  obtenerStandPorIdController,
  crearStandController,
  actualizarStandController,
  eliminarStandController,
} from "../controllers/stands.controllers.js";
import {
  validarCreacionStand,
  validarActualizacionStand,
  validarIdStandParam,
  validarConsultarStands,
} from "../middlewares/stands.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get("/obtener", validarConsultarStands, obtenerStandsController);
router.get("/obtenerPorId/:id", validarIdStandParam, obtenerStandPorIdController);
router.post("/agregar", ...autenticarAdministrador, validarCreacionStand, crearStandController);
router.patch(
  "/actualizar/:id",
  ...autenticarAdministrador,
  validarIdStandParam,
  validarActualizacionStand,
  actualizarStandController,
);
router.delete("/eliminar/:id", ...autenticarAdministrador, validarIdStandParam, eliminarStandController);

export default router;
