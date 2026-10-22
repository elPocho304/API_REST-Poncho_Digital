import {
  obtenerPabellonesService,
  obtenerPabellonPorIdService,
  crearPabellonService,
  actualizarPabellonService,
  eliminarPabellonService,
} from "../services/pabellones.services.js";

export const obtenerPabellonesController = async (req, res, next) => {
  try {
    const pabellones = await obtenerPabellonesService(req.pabellonConsulta);
    return res.status(200).json(pabellones);
  } catch (error) {
    next(error);
  }
};

export const obtenerPabellonPorIdController = async (req, res, next) => {
  try {
    const pabellon = await obtenerPabellonPorIdService(req.params.id);
    return res.status(200).json(pabellon);
  } catch (error) {
    next(error);
  }
};

export const crearPabellonController = async (req, res, next) => {
  try {
    const pabellon = await crearPabellonService(req.body);
    return res.status(201).json(pabellon);
  } catch (error) {
    next(error);
  }
};

export const actualizarPabellonController = async (req, res, next) => {
  try {
    const pabellon = await actualizarPabellonService(
      req.params.id,
      req.body,
    );
    return res.status(200).json(pabellon);
  } catch (error) {
    next(error);
  }
};

export const eliminarPabellonController = async (req, res, next) => {
  try {
    const resultado = await eliminarPabellonService(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
