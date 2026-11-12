import express from "express";
import { validacionRegistro, validarInicioSesion } from "../middlewares/autenticacion.js";
import { registro, iniciarSesion } from "../controllers/autenticacion.controllers.js";

const router = express.Router();

router.post(
  "/registro",
  /*
  #swagger.tags = ['Autenticación']
  #swagger.summary = 'Registrar una cuenta y solicitar perfil de artesano'
  #swagger.description = 'Crea una cuenta sin rol y una solicitud de registro pendiente.'
  #swagger.security = []
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/RegistroUsuario' }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Cuenta creada y solicitud registrada.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/RegistroUsuarioRespuesta' }
      }
    }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validacionRegistro,
  registro,
);
router.post(
  "/login",
  /*
  #swagger.tags = ['Autenticación']
  #swagger.summary = 'Iniciar sesión'
  #swagger.description = 'Valida las credenciales de una cuenta activa y devuelve un JWT.'
  #swagger.security = []
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/InicioSesion' }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Autenticación exitosa.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/InicioSesionRespuesta' }
      }
    }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = {
    description: 'Credenciales inválidas o cuenta inactiva.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        example: { mensaje: 'Credenciales inválidas' }
      }
    }
  }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarInicioSesion,
  iniciarSesion,
);
export default router;