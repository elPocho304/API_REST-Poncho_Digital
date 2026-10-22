import {
  obtenerSolicitudesRegistroService,
  obtenerSolicitudRegistroPorIdService,
  eliminarSolicitudRegistroService,
} from "../services/solicitudRegistro.services.js";

export const obtenerSolicitudesRegistroController = async (req, res, next) => {
  try {
    const solicitudes = await obtenerSolicitudesRegistroService(
      req.solicitudRegistroConsulta,
    );
    return res.status(200).json(solicitudes);
  } catch (error) {
    next(error);
  }
};

export const obtenerSolicitudRegistroPorIdController = async (
  req,
  res,
  next,
) => {
  try {
    const solicitud = await obtenerSolicitudRegistroPorIdService(req.params.id);
    return res.status(200).json(solicitud);
  } catch (error) {
    next(error);
  }
};

export const eliminarSolicitudRegistroController = async (req, res, next) => {
  try {
    const resultado = await eliminarSolicitudRegistroService(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
