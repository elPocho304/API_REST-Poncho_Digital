import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerSolicitudesRegistroController,
  obtenerSolicitudRegistroPorIdController,
  eliminarSolicitudRegistroController,
  resolverSolicitudRegistroController,
} from "../controllers/solicitudRegistro.controllers.js";
import {
  validarConsultaSolicitudesRegistro,
  validarIdSolicitudRegistroParam,
  validarResolucionSolicitudRegistro,
} from "../middlewares/solicitudRegistro.js";

const router = Router();
router.use(autenticarUsuario, autorizarRoles("ADMINISTRADOR"));

router.get(
  "/obtener",
  /*
  #swagger.tags = ['Solicitudes de registro']
  #swagger.summary = 'Listar solicitudes de registro'
  #swagger.description = 'Busca solicitudes por estado, usuario, administrador, emprendimiento, rubro o localidad y permite ordenamiento y paginación. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['estado'] = { in: 'query', description: 'Estado de la solicitud.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/estado' } }
  #swagger.parameters['usuarioId'] = { in: 'query', description: 'UUID del usuario postulante.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/usuarioId' } }
  #swagger.parameters['resueltaPorId'] = { in: 'query', description: 'UUID del administrador que resolvió.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/resueltaPorId' } }
  #swagger.parameters['nombreEmprendimiento'] = { in: 'query', description: 'Filtro parcial por emprendimiento.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/nombreEmprendimiento' } }
  #swagger.parameters['rubro'] = { in: 'query', description: 'Filtro parcial por rubro.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/rubro' } }
  #swagger.parameters['localidad'] = { in: 'query', description: 'Filtro parcial por localidad.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/localidad' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/orden' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaSolicitudesRegistro/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Solicitudes con datos seguros del usuario y del administrador.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoSolicitudesRegistro' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultaSolicitudesRegistro,
  obtenerSolicitudesRegistroController,
);
router.get(
  "/obtenerPorId/:id",
  /*
  #swagger.tags = ['Solicitudes de registro']
  #swagger.summary = 'Obtener solicitud por ID'
  #swagger.description = 'Devuelve una solicitud con información segura del postulante y del administrador que la resolvió. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la solicitud.', schema: { $ref: '#/components/schemas/IdSolicitudParam' } }
  #swagger.responses[200] = {
    description: 'Solicitud encontrada.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/SolicitudRegistroConUsuarios' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdSolicitudRegistroParam,
  obtenerSolicitudRegistroPorIdController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Solicitudes de registro']
  #swagger.summary = 'Eliminar solicitud de registro'
  #swagger.description = 'Elimina una solicitud por UUID. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la solicitud.', schema: { $ref: '#/components/schemas/IdSolicitudParam' } }
  #swagger.responses[200] = {
    description: 'Solicitud eliminada.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/EliminacionSolicitudRegistro' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdSolicitudRegistroParam,
  eliminarSolicitudRegistroController,
);
router.patch(
  "/resolver/:id",
  /*
  #swagger.tags = ['Solicitudes de registro']
  #swagger.summary = 'Resolver solicitud de registro'
  #swagger.description = 'Aprueba, rechaza o solicita modificaciones. Al aprobar, crea el perfil de artesano y cambia el rol del usuario. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la solicitud.', schema: { $ref: '#/components/schemas/IdSolicitudParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ResolverSolicitudRegistro' } } }
  }
  #swagger.responses[200] = {
    description: 'Solicitud resuelta.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/SolicitudRegistroConUsuarios' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdSolicitudRegistroParam,
  validarResolucionSolicitudRegistro,
  resolverSolicitudRegistroController,
);

export default router;
