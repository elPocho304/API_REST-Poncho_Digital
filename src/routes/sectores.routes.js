import { Router } from "express";
import {
  obtenerSectoresController,
  obtenerSectorPorIdController,
  crearSectorController,
  actualizarSectorController,
  eliminarSectorController,
} from "../controllers/sectores.controllers.js";
import {
  validarCreacionSector,
  validarActualizacionSector,
  validarIdSectorParam,
  validarConsultarSectores,
} from "../middlewares/sectores.js";

const router = Router();

router.get("/obtener", validarConsultarSectores, obtenerSectoresController);
router.get(
  "/obtenerPorId/:id",
  validarIdSectorParam,
  obtenerSectorPorIdController,
);
router.post("/agregar", validarCreacionSector, crearSectorController);
router.patch(
  "/actualizar/:id",
  validarIdSectorParam,
  validarActualizacionSector,
  actualizarSectorController,
);
router.delete(
  "/eliminar/:id",
  validarIdSectorParam,
  eliminarSectorController,
);

export default router;
