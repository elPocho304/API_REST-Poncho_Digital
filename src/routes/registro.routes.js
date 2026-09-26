import express from "express";
import { validacionRegistro } from "../middlewares/validarId.js";
import { registro } from "../controllers/registro.controllers.js";

const router = express.Router();

router.post("/", validacionRegistro, registro);

export default router