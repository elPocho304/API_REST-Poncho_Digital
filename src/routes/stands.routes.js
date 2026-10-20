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
} from "../middlewares/stands.js";

const router = Router();

router.get("/", obtenerStandsController);
router.get("/:id", validarIdStandParam, obtenerStandPorIdController);
router.post("/", validarCreacionStand, crearStandController);
router.patch("/:id", validarIdStandParam, validarActualizacionStand, actualizarStandController);
router.delete("/:id", validarIdStandParam, eliminarStandController);

export default router;