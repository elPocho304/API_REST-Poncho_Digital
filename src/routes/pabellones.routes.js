import { Router } from "express";
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

router.get("/obtener", validarConsultarPabellones, obtenerPabellonesController);
router.get(
  "/obtenerPorId/:id",
  validarIdPabellonParam,
  obtenerPabellonPorIdController,
);
router.post("/agregar", validarCreacionPabellon, crearPabellonController);
router.patch(
  "/actualizar/:id",
  validarIdPabellonParam,
  validarActualizacionPabellon,
  actualizarPabellonController,
);
router.delete(
  "/eliminar/:id",
  validarIdPabellonParam,
  eliminarPabellonController,
);

export default router;
