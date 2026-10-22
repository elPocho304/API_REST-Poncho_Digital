import { Router } from "express";
import {
  autenticarUsuario,
  autorizarRoles,
} from "../middlewares/autenticacion.js";
import {
  validarCreacionAdministrador,
  validarEstadoUsuario,
  validarIdUsuarioParam,
} from "../middlewares/usuarios.js";
import {
  actualizarEstadoUsuarioController,
  crearAdministradorController,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.use(autenticarUsuario, autorizarRoles("ADMINISTRADOR"));
router.post(
  "/administradores",
  validarCreacionAdministrador,
  crearAdministradorController,
);
router.patch(
  "/:id/activo",
  validarIdUsuarioParam,
  validarEstadoUsuario,
  actualizarEstadoUsuarioController,
);

export default router;
