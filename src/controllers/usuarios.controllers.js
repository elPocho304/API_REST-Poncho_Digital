import {
  actualizarEstadoUsuarioService,
  crearAdministradorService,
} from "../services/usuarios.services.js";

export const crearAdministradorController = async (req, res, next) => {
  try {
    const usuario = await crearAdministradorService(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    return next(error);
  }
};

export const actualizarEstadoUsuarioController = async (req, res, next) => {
  try {
    const usuario = await actualizarEstadoUsuarioService(
      req.params.id,
      req.body.activo,
    );
    return res.status(200).json(usuario);
  } catch (error) {
    return next(error);
  }
};
