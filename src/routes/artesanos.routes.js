import { Router } from "express";
import { obtenerMiPerfil } from "../controllers/artesanos.controllers.js";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerArtesanoPorIdController,
  actualizarArtesanoController,
  eliminarArtesanoController,
  obtenerTodosLosArtesanosController,
} from "../controllers/artesanos.controllers.js";
import { 
	validarActualizacionArtesano,
	validarIdArtesanoParam,
	validarConsultaArtesanos,
 } from "../middlewares/artesanos.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get(
  "/",
  /*
  #swagger.tags = ['Artesanos']
  #swagger.summary = 'Listar artesanos'
  #swagger.description = 'Devuelve artesanos filtrados, ordenados y paginados, incluyendo sus productos.'
  #swagger.security = []
  #swagger.parameters['nombreEmprendimiento'] = { in: 'query', description: 'Filtra por nombre de emprendimiento.', schema: { $ref: '#/components/schemas/consultaArtesano/properties/nombreEmprendimiento' } }
  #swagger.parameters['rubro'] = { in: 'query', description: 'Filtra por rubro.', schema: { $ref: '#/components/schemas/consultaArtesano/properties/rubro' } }
  #swagger.parameters['localidad'] = { in: 'query', description: 'Filtra por localidad.', schema: { $ref: '#/components/schemas/consultaArtesano/properties/localidad' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/consultaArtesano/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/consultaArtesano/properties/orden' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página (desde 1).', schema: { $ref: '#/components/schemas/consultaArtesano/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Cantidad de resultados (máximo 100).', schema: { $ref: '#/components/schemas/consultaArtesano/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de artesanos con sus productos.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoArtesanos' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultaArtesanos,
  obtenerTodosLosArtesanosController,
);
router.get(
  "/me",
  /*
  #swagger.tags = ['Artesanos']
  #swagger.summary = 'Obtener perfil del artesano autenticado'
  #swagger.description = 'Devuelve el perfil asociado a la cuenta del token, sus productos y solicitud de registro.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.responses[200] = {
    description: 'Perfil del artesano.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PerfilArtesano' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = {
    description: 'La cuenta autenticada está inactiva.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MensajeApi' },
        example: { mensaje: 'La cuenta está inactiva.' }
      }
    }
  }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  autenticarUsuario,
  obtenerMiPerfil,
);
router.get(
  "/:id",
  /*
  #swagger.tags = ['Artesanos']
  #swagger.summary = 'Obtener artesano por ID'
  #swagger.description = 'Devuelve un artesano por UUID, incluyendo productos y solicitud de registro.'
  #swagger.security = []
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del artesano.', schema: { $ref: '#/components/schemas/IdArtesanoParam' } }
  #swagger.responses[200] = {
    description: 'Artesano encontrado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ArtesanoConProductosYSolicitud' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdArtesanoParam,
  obtenerArtesanoPorIdController,
);
router.patch(
  "/:id",
  /*
  #swagger.tags = ['Artesanos']
  #swagger.summary = 'Actualizar artesano'
  #swagger.description = 'Actualiza parcialmente un perfil de artesano. Solo para administradores; enviar al menos un campo.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del artesano.', schema: { $ref: '#/components/schemas/IdArtesanoParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarArtesano' } } }
  }
  #swagger.responses[200] = {
    description: 'Artesano actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Artesano' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdArtesanoParam,
  validarActualizacionArtesano,
  actualizarArtesanoController,
);
router.delete(
  "/:id",
  /*
  #swagger.tags = ['Artesanos']
  #swagger.summary = 'Eliminar perfil de artesano'
  #swagger.description = 'Elimina el perfil de artesano indicado. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del artesano.', schema: { $ref: '#/components/schemas/IdArtesanoParam' } }
  #swagger.responses[200] = {
    description: 'Perfil eliminado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/EliminacionArtesano' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdArtesanoParam,
  eliminarArtesanoController,
);

export default router;
