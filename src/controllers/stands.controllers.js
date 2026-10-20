import {
  obtenerStandsService,
  obtenerStandPorIdService,
  crearStandService,
  actualizarStandService,
  eliminarStandService,
} from "../services/stands.services.js";

export const obtenerStandsController = async (req, res, next) => {
  try {
    const filtros = req.query;
    const stands = await obtenerStandsService(filtros);
    return res.status(200).json(stands);
  } catch (error) {
    next(error);
  }
};

export const obtenerStandPorIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stand = await obtenerStandPorIdService(id);
    return res.status(200).json(stand);
  } catch (error) {
    next(error);
  }
};

export const crearStandController = async (req, res, next) => {
  try {
    const standDto = req.body;
    const nuevoStand = await crearStandService(standDto);
    return res.status(201).json(nuevoStand);
  } catch (error) {
    next(error);
  }
};

export const actualizarStandController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizacion = req.body;
    const standActualizado = await actualizarStandService(id, datosActualizacion);
    return res.status(200).json(standActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminarStandController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarStandService(id);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};