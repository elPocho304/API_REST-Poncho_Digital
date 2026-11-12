import {Router} from "express";
import { autenticarUsuario, autorizarRoles } from "../middlewares/autenticacion.js";
import {
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
  obtenerTodosLosProductosController,
  obtenerMisProductosController,
} from "../controllers/productos.controllers.js";
import { 
    validarCreacionProducto,
    validarActualizacionProducto,
    validarIdProductoParam,
    validarConsultaProductos,
} from "../middlewares/productos.js";

const router = Router();
const autenticarArtesano = [autenticarUsuario, autorizarRoles("ARTESANO")];

router.get(
  "/obtener",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Listar productos'
  #swagger.description = 'Busca productos por artesano, nombre y rango de precios. Devuelve cada producto con un resumen de su artesano.'
  #swagger.security = []
  #swagger.parameters['artesanoId'] = { in: 'query', description: 'Filtra por UUID del artesano.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/artesanoId' } }
  #swagger.parameters['nombre'] = { in: 'query', description: 'Filtro parcial por nombre.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/nombre' } }
  #swagger.parameters['precioMin'] = { in: 'query', description: 'Precio mínimo.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/precioMin' } }
  #swagger.parameters['precioMax'] = { in: 'query', description: 'Precio máximo; debe ser mayor o igual al mínimo.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/precioMax' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/orden' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de productos con datos resumidos del artesano.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoProductos' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarConsultaProductos,
  obtenerTodosLosProductosController,
);
router.get(
  "/obetenerPorId/:id",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Obtener producto por ID'
  #swagger.description = 'Devuelve un producto con un resumen de su artesano.'
  #swagger.security = []
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del producto.', schema: { $ref: '#/components/schemas/IdProductoParam' } }
  #swagger.responses[200] = {
    description: 'Producto encontrado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductoConArtesano' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  validarIdProductoParam,
  obtenerProductoPorIdController,
);
router.get(
  "/mis-productos",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Listar mis productos'
  #swagger.description = 'Devuelve los productos del artesano autenticado con sus datos resumidos. El propietario se obtiene del token.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['nombre'] = { in: 'query', description: 'Filtro parcial por nombre.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/nombre' } }
  #swagger.parameters['precioMin'] = { in: 'query', description: 'Precio mínimo.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/precioMin' } }
  #swagger.parameters['precioMax'] = { in: 'query', description: 'Precio máximo.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/precioMax' } }
  #swagger.parameters['ordenPor'] = { in: 'query', description: 'Campo de ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/ordenPor' } }
  #swagger.parameters['orden'] = { in: 'query', description: 'Dirección del ordenamiento.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/orden' } }
  #swagger.parameters['pagina'] = { in: 'query', description: 'Número de página.', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/pagina' } }
  #swagger.parameters['limite'] = { in: 'query', description: 'Resultados por página (máximo 100).', schema: { $ref: '#/components/schemas/ConsultaProductos/properties/limite' } }
  #swagger.responses[200] = {
    description: 'Lista de productos del artesano.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListadoProductos' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarArtesano,
  validarConsultaProductos,
  obtenerMisProductosController,
);
router.post(
  "/agregar",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Crear producto'
  #swagger.description = 'Crea un producto asociado al artesano autenticado; no se acepta el propietario desde el cuerpo.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CrearProducto' } } }
  }
  #swagger.responses[201] = {
    description: 'Producto creado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarArtesano,
  validarCreacionProducto,
  crearProductoController,
);
router.patch(
  "/actualizar/:id",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Actualizar producto propio'
  #swagger.description = 'Actualiza parcialmente un producto que pertenece al artesano autenticado.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del producto.', schema: { $ref: '#/components/schemas/IdProductoParam' } }
  #swagger.requestBody = {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/ActualizarProducto' } } }
  }
  #swagger.responses[200] = {
    description: 'Producto actualizado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarArtesano,
  validarIdProductoParam,
  validarActualizacionProducto,
  actualizarProductoController,
);
router.delete(
  "/eliminar/:id",
  /*
  #swagger.tags = ['Productos']
  #swagger.summary = 'Eliminar producto propio'
  #swagger.description = 'Elimina un producto perteneciente al artesano autenticado.'
  #swagger.security = [{ 'bearerAuth': [] }]
  #swagger.parameters['id'] = { in: 'path', required: true, description: 'UUID del producto.', schema: { $ref: '#/components/schemas/IdProductoParam' } }
  #swagger.responses[200] = {
    description: 'Producto eliminado.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/EliminacionProducto' } } }
  }
  #swagger.responses[400] = { $ref: '#/components/responses/BadRequest' }
  #swagger.responses[401] = { $ref: '#/components/responses/Unauthorized' }
  #swagger.responses[403] = { $ref: '#/components/responses/Forbidden' }
  #swagger.responses[404] = { $ref: '#/components/responses/NotFound' }
  #swagger.responses[409] = { $ref: '#/components/responses/Conflict' }
  #swagger.responses[500] = { $ref: '#/components/responses/InternalError' }
*/
  ...autenticarArtesano,
  validarIdProductoParam,
  eliminarProductoController,
);

export default router;
