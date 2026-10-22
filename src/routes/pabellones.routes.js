import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerPabellonesController,
  obtenerPabellonPorIdController,
  crearPabellonController,
  actualizarPabellonController,
  eliminarPabellonController,
} from "../controllers/pabellones.controllers.js";
import {
  validarCreacionPabellon,
  validarActualizacionPabellon,
  validarIdPabellonParam,
  validarConsultarPabellones,
} from "../middlewares/pabellones.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get("/obtener", validarConsultarPabellones, obtenerPabellonesController);
router.get(
  "/obtenerPorId/:id",
  validarIdPabellonParam,
  obtenerPabellonPorIdController,
);
router.post("/agregar", ...autenticarAdministrador, validarCreacionPabellon, crearPabellonController);
router.patch(
  "/actualizar/:id",
  ...autenticarAdministrador,
  validarIdPabellonParam,
  validarActualizacionPabellon,
  actualizarPabellonController,
);
router.delete(
  "/eliminar/:id",
  ...autenticarAdministrador,
  validarIdPabellonParam,
  eliminarPabellonController,
);

export default router;
