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
  /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Crear una cuenta de administrador'
  #swagger.description = 'Crea una cuenta activa con rol ADMINISTRADOR. Requiere un JWT válido de un administrador. La contraseña se almacena como hash y no se devuelve en la respuesta.'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.requestBody = {
    required: true,
    description: 'Correo electrónico y contraseña para la nueva cuenta administrativa.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/NuevoAdministrador' }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Cuenta de administrador creada.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UsuarioAdministracion' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'La solicitud tiene un formato de autorización incorrecto o los datos no cumplen las validaciones.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorSolicitudApi' },
        examples: {
          datosInvalidos: { value: { error: 'email: El email no tiene un formato válido' } },
          autorizacionMalFormada: { value: { mensaje: 'Usar Authorization: Bearer <token>.' } }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: 'Falta un token Bearer válido o el token es inválido, venció o pertenece a una cuenta inexistente.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        examples: {
          tokenFaltante: { value: { mensaje: 'Se requiere un token de acceso.' } },
          tokenInvalido: { value: { mensaje: 'El token es inválido o ha vencido.' } },
          cuentaInexistente: { value: { mensaje: 'La cuenta asociada al token no existe.' } }
        }
      }
    }
  }
  #swagger.responses[403] = {
    description: 'La cuenta está inactiva o no pertenece al rol ADMINISTRADOR.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        examples: {
          cuentaInactiva: { value: { mensaje: 'La cuenta está inactiva.' } },
          rolInsuficiente: { value: { mensaje: 'No tiene permisos para realizar esta operación.' } }
        }
      }
    }
  }
  #swagger.responses[409] = {
    description: 'Ya existe una cuenta con ese correo electrónico.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'El correo electrónico ya existe' }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Error interno inesperado.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'Ha ocurrido un error interno.' }
      }
    }
  }
*/
  validarCreacionAdministrador,
  crearAdministradorController,
);
router.patch(
  "/:id/activo",
  /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Actualizar el estado de un usuario'
  #swagger.description = 'Activa o desactiva una cuenta por su UUID. Requiere un JWT válido de un administrador. No permite desactivar al último administrador activo.'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'UUID del usuario cuyo estado se actualizará.',
    required: true,
    '@schema': { $ref: '#/components/schemas/IdUsuarioParam' }
  }
  #swagger.requestBody = {
    required: true,
    description: 'Nuevo estado de la cuenta.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ActualizarEstadoUsuario' }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Estado de la cuenta actualizado.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UsuarioAdministracion' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'UUID inválido, estado ausente/no booleano o formato de autorización incorrecto.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorSolicitudApi' },
        examples: {
          idInvalido: { value: { error: 'id: El ID del usuario debe ser un UUID válido' } },
          estadoInvalido: { value: { error: 'activo: El estado activo debe ser true o false' } },
          autorizacionMalFormada: { value: { mensaje: 'Usar Authorization: Bearer <token>.' } }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: 'Falta un token Bearer válido o el token es inválido, venció o pertenece a una cuenta inexistente.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        examples: {
          tokenFaltante: { value: { mensaje: 'Se requiere un token de acceso.' } },
          tokenInvalido: { value: { mensaje: 'El token es inválido o ha vencido.' } },
          cuentaInexistente: { value: { mensaje: 'La cuenta asociada al token no existe.' } }
        }
      }
    }
  }
  #swagger.responses[403] = {
    description: 'La cuenta está inactiva o no pertenece al rol ADMINISTRADOR.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        examples: {
          cuentaInactiva: { value: { mensaje: 'La cuenta está inactiva.' } },
          rolInsuficiente: { value: { mensaje: 'No tiene permisos para realizar esta operación.' } }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'No se encontró un usuario con el UUID indicado.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'No se encontró el usuario solicitado' }
      }
    }
  }
  #swagger.responses[409] = {
    description: 'La operación dejaría el sistema sin administradores activos.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'No se puede desactivar al último administrador activo' }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Error interno inesperado.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'Ha ocurrido un error interno.' }
      }
    }
  }
*/
  validarIdUsuarioParam,
  validarEstadoUsuario,
  actualizarEstadoUsuarioController,
);

export default router;
