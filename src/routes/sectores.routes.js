import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
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
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get("/obtener", validarConsultarSectores, obtenerSectoresController);
router.get(
  "/obtenerPorId/:id",
  validarIdSectorParam,
  obtenerSectorPorIdController,
);
router.post("/agregar", ...autenticarAdministrador, validarCreacionSector, crearSectorController);
router.patch(
  "/actualizar/:id",
  ...autenticarAdministrador,
  validarIdSectorParam,
  validarActualizacionSector,
  actualizarSectorController,
);
router.delete(
  "/eliminar/:id",
  ...autenticarAdministrador,
  validarIdSectorParam,
  eliminarSectorController,
);

export default router;
