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

router.get(
  "/obtener",
  /*
  #swagger.tags = ['Sectores']
  #swagger.summary = 'Listar sectores'
  #swagger.description = 'Busca sectores por pabellón o nombre y devuelve también el pabellón relacionado.'
  #swagger.security = []
  #swagger.parameters['pabellonId'] = { in: 'query', description: 'Filtra por UUID del pabellón.', schema: { $ref: '#/components/schemas/ConsultaSectores/properties/pabellonId' } }
  #swagger.parameters['nombre'] = { in: 'query', description: 'Filtro parcial por nombre.', schema: { $ref: '#/components/schemas/ConsultaSectores/properties/nombre' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaSectores/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaSectores/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de sectores con sus pabellones.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoSectores' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultarSectores,
  obtenerSectoresController,
);
router.get(
  "/obtenerPorId/:id",
  /*
  #swagger.tags = ['Sectores']
  #swagger.summary = 'Obtener sector por ID'
  #swagger.description = 'Devuelve el sector con su pabellón y stands asociados.'
  #swagger.security = []
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del sector.', schema: { $ref: '#/components/schemas/IdSectorParam' } }
  #swagger.responses[200] = {
    description: 'Sector encontrado con pabellón y stands.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/SectorConPabellonYStands' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdSectorParam,
  obtenerSectorPorIdController,
);
router.post(
  "/agregar",
  /*
  #swagger.tags = ['Sectores']
  #swagger.summary = 'Crear sector'
  #swagger.description = 'Crea un sector dentro de un pabellón existente. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CrearSector' } } }
  }
  #swagger.responses[201] = {
    description: 'Sector creado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Sector' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarCreacionSector,
  crearSectorController,
);
router.patch(
  "/actualizar/:id",
  /*
  #swagger.tags = ['Sectores']
  #swagger.summary = 'Actualizar sector'
  #swagger.description = 'Actualiza parcialmente el nombre y/o el pabellón del sector. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del sector.', schema: { $ref: '#/components/schemas/IdSectorParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarSector' } } }
  }
  #swagger.responses[200] = {
    description: 'Sector actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Sector' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdSectorParam,
  validarActualizacionSector,
  actualizarSectorController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Sectores']
  #swagger.summary = 'Eliminar sector'
  #swagger.description = 'Elimina el sector solo si no contiene stands asociados. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del sector.', schema: { $ref: '#/components/schemas/IdSectorParam' } }
  #swagger.responses[200] = {
    description: 'Sector eliminado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/MensajeApi' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdSectorParam,
  eliminarSectorController,
);

export default router;
