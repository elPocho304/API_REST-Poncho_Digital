import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerAsignacionesStandController,
  obtenerAsignacionStandPorIdController,
  eliminarAsignacionStandController,
  asignarStandController,
  actualizarEstadoAsignacionStandController,
} from "../controllers/asignacionesStand.controllers.js";
import {
  validarConsultaAsignacionesStand,
  validarCreacionAsignacionStand,
  validarActualizacionAsignacionStand,
  validarIdAsignacionStandParam,
} from "../middlewares/asignacionesStand.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.post(
  "/asignar",
  /*
  #swagger.tags = ['Asignaciones de stand']
  #swagger.summary = 'Asignar un stand a un artesano'
  #swagger.description = 'Crea una asignación activa y marca el stand como ocupado. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CrearAsignacionStand' } } }
  }
  #swagger.responses[201] = {
    description: 'Asignación creada con los datos del artesano y del stand.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/AsignacionStandConRelaciones' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarCreacionAsignacionStand,
  asignarStandController,
);
router.get(
  "/obtener",
  /*
  #swagger.tags = ['Asignaciones de stand']
  #swagger.summary = 'Listar asignaciones de stands'
  #swagger.description = 'Devuelve asignaciones filtradas, ordenadas y paginadas, con las relaciones del artesano y del stand.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['artesanoId'] = { in: 'query', description: 'Filtra por UUID del artesano.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/artesanoId' } }
  #swagger.parameters['standId'] = { in: 'query', description: 'Filtra por UUID del stand.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/standId' } }
  #swagger.parameters['activo'] = { in: 'query', description: 'Filtra por estado activo.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/activo' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/orden' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaAsignacionesStand/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de asignaciones.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoAsignacionesStand' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarConsultaAsignacionesStand,
  obtenerAsignacionesStandController,
);
router.get(
  "/obtenerPorId/:id",
  /*
  #swagger.tags = ['Asignaciones de stand']
  #swagger.summary = 'Obtener asignación por ID'
  #swagger.description = 'Devuelve una asignación con artesano, stand, sector y pabellón. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la asignación.', schema: { $ref: '#/components/schemas/IdAsignacionStandParam' } }
  #swagger.responses[200] = {
    description: 'Asignación encontrada.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/AsignacionStandConRelaciones' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  obtenerAsignacionStandPorIdController,
);
router.patch(
  "/actualizar/:id",
  /*
  #swagger.tags = ['Asignaciones de stand']
  #swagger.summary = 'Actualizar estado de asignación'
  #swagger.description = 'Activa o desactiva la asignación y ajusta la disponibilidad del stand. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la asignación.', schema: { $ref: '#/components/schemas/IdAsignacionStandParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarAsignacionStand' } } }
  }
  #swagger.responses[200] = {
    description: 'Estado de la asignación actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/AsignacionStandConRelaciones' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  validarActualizacionAsignacionStand,
  actualizarEstadoAsignacionStandController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Asignaciones de stand']
  #swagger.summary = 'Eliminar asignación de stand'
  #swagger.description = 'Elimina la asignación y libera el stand si no tiene otra asignación activa. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID de la asignación.', schema: { $ref: '#/components/schemas/IdAsignacionStandParam' } }
  #swagger.responses[200] = {
    description: 'Asignación eliminada.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/EliminacionAsignacionStand' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdAsignacionStandParam,
  eliminarAsignacionStandController,
);

export default router;
