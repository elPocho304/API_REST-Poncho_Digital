import {
  obtenerAsignacionesStandService,
  obtenerAsignacionStandPorIdService,
  eliminarAsignacionStandService,
  asignarStandService,
  actualizarEstadoAsignacionStandService,
} from "../services/asignacionesStand.services.js";

export const obtenerAsignacionesStandController = async (req, res, next) => {
  try {
    const asignaciones = await obtenerAsignacionesStandService(
      req.asignacionesStandConsulta,
    );
    return res.status(200).json(asignaciones);
  } catch (error) {
    next(error);
  }
};

export const obtenerAsignacionStandPorIdController = async (
  req,
  res,
  next,
) => {
  try {
    const asignacion = await obtenerAsignacionStandPorIdService(req.params.id);
    return res.status(200).json(asignacion);
  } catch (error) {
    next(error);
  }
};

export const eliminarAsignacionStandController = async (req, res, next) => {
  try {
    const resultado = await eliminarAsignacionStandService(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const actualizarEstadoAsignacionStandController = async (
  req,
  res,
  next,
) => {
  try {
    const asignacion = await actualizarEstadoAsignacionStandService(
      req.params.id,
      req.body.activo,
    );
    return res.status(200).json(asignacion);
  } catch (error) {
    next(error);
  }
};

export const asignarStandController = async (req, res, next) => {
  try {
    const asignacion = await asignarStandService(req.body);
    return res.status(201).json(asignacion);
  } catch (error) {
    next(error);
  }
};
