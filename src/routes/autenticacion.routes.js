import express from "express";
import { validacionRegistro, validarInicioSesion } from "../middlewares/autenticacion.js";
import { registro, iniciarSesion } from "../controllers/autenticacion.controllers.js";

const router = express.Router();

router.post("/registro", validacionRegistro, registro);
router.post("/login", validarInicioSesion, iniciarSesion)
export default router;