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

router.get("/obtener", validarConsultaProductos, obtenerTodosLosProductosController);
router.get("/obetenerPorId/:id", validarIdProductoParam, obtenerProductoPorIdController);
router.get("/mis-productos", ...autenticarArtesano, validarConsultaProductos, obtenerMisProductosController);
router.post("/agregar", ...autenticarArtesano, validarCreacionProducto, crearProductoController);
router.patch("/actualizar/:id", ...autenticarArtesano, validarIdProductoParam, validarActualizacionProducto, actualizarProductoController);
router.delete("/eliminar/:id", ...autenticarArtesano, validarIdProductoParam, eliminarProductoController);

export default router;
