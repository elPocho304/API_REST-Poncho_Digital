import { Router } from "express";
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

router.get("/obtener", validarConsultarStands, obtenerStandsController);
router.get("/obtenerPorId/:id", validarIdStandParam, obtenerStandPorIdController);
router.post("/agregar", validarCreacionStand, crearStandController);
router.patch(
  "/actualizar/:id",
  validarIdStandParam,
  validarActualizacionStand,
  actualizarStandController,
);
router.delete("/eliminar/:id", validarIdStandParam, eliminarStandController);

export default router;
