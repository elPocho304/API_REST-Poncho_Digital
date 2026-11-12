import { Router } from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerPabellonesController,
  obtenerPabellonPorIdController,
  crearPabellonController,
  actualizarPabellonController,
  eliminarPabellonController,
} from "../controllers/pabellones.controllers.js";
import {
  validarCreacionPabellon,
  validarActualizacionPabellon,
  validarIdPabellonParam,
  validarConsultarPabellones,
} from "../middlewares/pabellones.js";

const router = Router();
const autenticarAdministrador = [autenticarUsuario, autorizarRoles("ADMINISTRADOR")];

router.get(
  "/obtener",
  /*
  #swagger.tags = ['Pabellones']
  #swagger.summary = 'Listar pabellones'
  #swagger.description = 'Busca pabellones por nombre y permite paginación.'
  #swagger.security = []
  #swagger.parameters['nombre'] = { in: 'query', description: 'Filtro parcial por nombre.', schema: { $ref: '#/components/schemas/ConsultaPabellones/properties/nombre' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaPabellones/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaPabellones/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de pabellones.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoPabellones' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultarPabellones,
  obtenerPabellonesController,
);
router.get(
  "/obtenerPorId/:id",
  /*
  #swagger.tags = ['Pabellones']
  #swagger.summary = 'Obtener pabellón por ID'
  #swagger.description = 'Devuelve el pabellón y sus sectores asociados.'
  #swagger.security = []
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del pabellón.', schema: { $ref: '#/components/schemas/IdPabellonParam' } }
  #swagger.responses[200] = {
    description: 'Pabellón encontrado con sectores.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PabellonConSectores' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdPabellonParam,
  obtenerPabellonPorIdController,
);
router.post(
  "/agregar",
  /*
  #swagger.tags = ['Pabellones']
  #swagger.summary = 'Crear pabellón'
  #swagger.description = 'Crea un pabellón. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CrearPabellon' } } }
  }
  #swagger.responses[201] = {
    description: 'Pabellón creado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Pabellon' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarCreacionPabellon,
  crearPabellonController,
);
router.patch(
  "/actualizar/:id",
  /*
  #swagger.tags = ['Pabellones']
  #swagger.summary = 'Actualizar pabellón'
  #swagger.description = 'Actualiza parcialmente un pabellón. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del pabellón.', schema: { $ref: '#/components/schemas/IdPabellonParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarPabellon' } } }
  }
  #swagger.responses[200] = {
    description: 'Pabellón actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Pabellon' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarAdministrador,
  validarIdPabellonParam,
  validarActualizacionPabellon,
  actualizarPabellonController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Pabellones']
  #swagger.summary = 'Eliminar pabellón'
  #swagger.description = 'Elimina el pabellón solo si no tiene sectores asociados. Solo para administradores.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del pabellón.', schema: { $ref: '#/components/schemas/IdPabellonParam' } }
  #swagger.responses[200] = {
    description: 'Pabellón eliminado.',
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
  validarIdPabellonParam,
  eliminarPabellonController,
);

export default router;
