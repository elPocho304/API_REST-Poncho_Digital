import {
  obtenerSectoresService,
  obtenerSectorPorIdService,
  crearSectorService,
  actualizarSectorService,
  eliminarSectorService,
} from "../services/sectores.services.js";

export const obtenerSectoresController = async (req, res, next) => {
  try {
    const sectores = await obtenerSectoresService(req.sectorConsulta);
    return res.status(200).json(sectores);
  } catch (error) {
    next(error);
  }
};

export const obtenerSectorPorIdController = async (req, res, next) => {
  try {
    const sector = await obtenerSectorPorIdService(req.params.id);
    return res.status(200).json(sector);
  } catch (error) {
    next(error);
  }
};

export const crearSectorController = async (req, res, next) => {
  try {
    const sector = await crearSectorService(req.body);
    return res.status(201).json(sector);
  } catch (error) {
    next(error);
  }
};

export const actualizarSectorController = async (req, res, next) => {
  try {
    const sector = await actualizarSectorService(req.params.id, req.body);
    return res.status(200).json(sector);
  } catch (error) {
    next(error);
  }
};

export const eliminarSectorController = async (req, res, next) => {
  try {
    const resultado = await eliminarSectorService(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
