import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerStandsController,
  obtenerStandPorIdController,
  crearStandController,
  actualizarStandController,
  eliminarStandController,
} from "../controllers/stands.controllers.js";
import {
  validarCreacionStand,
  validarActualizacionStand,
  validarIdStandParam,
  validarConsultarStands,
} from "../middlewares/stands.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get(
  "/obtener",
  /*
  #swagger.tags = ['Stands']
  #swagger.summary = 'Listar stands'
  #swagger.description = 'Busca stands por sector, estado o número y devuelve el sector de cada stand.'
  #swagger.security = []
  #swagger.parameters['sectorId'] = { in: 'query', description: 'Filtra por UUID del sector.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/sectorId' } }
  #swagger.parameters['estado'] = { in: 'query', description: 'Estado del stand.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/estado' } }
  #swagger.parameters['numero'] = { in: 'query', description: 'Filtro parcial por número.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/numero' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/orden' } }
  #swagger.parameters['ordenEstado'] = { in: 'query', description: 'Orden alternativo por estado.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/ordenEstado' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaStands/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaStands/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de stands con sus sectores.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoStands' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultarStands,
  obtenerStandsController,
);
router.get(
  "/obtenerPorId/:id",
  /*
  #swagger.tags = ['Stands']
  #swagger.summary = 'Obtener stand por ID'
  #swagger.description = 'Devuelve el stand, su sector y las asignaciones asociadas.'
  #swagger.security = []
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del stand.', schema: { $ref: '#/components/schemas/IdStandParam' } }
  #swagger.responses[200] = {
    description: 'Stand encontrado con sus relaciones.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/StandConAsignaciones' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdStandParam,
  obtenerStandPorIdController,
);
router.post(
  "/agregar",
  /*
  #swagger.tags = ['Stands']
  #swagger.summary = 'Crear stand'
  #swagger.description = 'Crea un stand en un sector existente. El estado inicial es DISPONIBLE y no se modifica desde esta ruta. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CrearStand' } } }
  }
  #swagger.responses[201] = {
    description: 'Stand creado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Stand' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarCreacionStand,
  crearStandController,
);
router.patch(
  "/actualizar/:id",
  /*
  #swagger.tags = ['Stands']
  #swagger.summary = 'Actualizar stand'
  #swagger.description = 'Actualiza parcialmente el número o el sector de un stand. El estado no puede actualizarse por esta ruta. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del stand.', schema: { $ref: '#/components/schemas/IdStandParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarStand' } } }
  }
  #swagger.responses[200] = {
    description: 'Stand actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Stand' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = {
    description: 'El número del stand ya pertenece a otro stand y debe ser único.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorApi' },
        example: { error: 'El recurso ya existe o entra en conflicto con otro registro.' }
      }
    }
  }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdStandParam,
  validarActualizacionStand,
  actualizarStandController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Stands']
  #swagger.summary = 'Eliminar stand'
  #swagger.description = 'Elimina el stand. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del stand.', schema: { $ref: '#/components/schemas/IdStandParam' } }
  #swagger.responses[200] = {
    description: 'Stand eliminado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/MensajeApi' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdStandParam,
  eliminarStandController,
);

export default router;
