import {
  obtenerSolicitudesRegistroService,
  obtenerSolicitudRegistroPorIdService,
  eliminarSolicitudRegistroService,
  resolverSolicitudRegistroService,
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

export const resolverSolicitudRegistroController = async (req, res, next) => {
  try {
    const solicitud = await resolverSolicitudRegistroService(
      req.params.id,
      req.usuario.id,
      req.body,
    );
    return res.status(200).json(solicitud);
  } catch (error) {
    return next(error);
  }
};
