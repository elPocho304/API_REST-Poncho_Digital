import { BadRequest } from "../utils/error.js";
import {
	obtenerArtesanosService,
  obtenerArtesanoPorIdService,
  crearArtesanoService,
  actualizarArtesanoService,
  eliminarArtesanoService,
} from "../services/artesanos.services.js";

export const obtenerTodosLosArtesanosController = async (req, res, next) => {
	try {
		const filtros = req.query;
		const artesanos = await obtenerArtesanosService(filtros);
		return res.status(200).json(artesanos)

	}catch(error){
		next (error);
	}
};

export const obtenerArtesanoPorIdController = async (req, res, next) => {
	try{
		const { id } = req.params;
		const artesano = await obtenerArtesanoPorIdService(id);
		res.status(200).json(artesano);
	}catch(error){
		next(error);
	}
};

export const crearArtesanoController = async (req, res, next) => {
	try{
		const artesanoDto = req.body;
		const nuevoArtesano = await crearArtesanoService(artesanoDto);
		return res.status(201).json(nuevoArtesano);
	}catch(error){
		next(error);
	}
};

export const actualizarArtesanoController = async (req, res, next) => {
	try{
		const {id} = req.params;
		const datosActualizacion = req.body;
		const artesanoActualizado = await actualizarArtesanoService(id, datosActualizacion);
		return res.status(200).json(artesanoActualizado);
	}catch(error){
		next(error);
	}
};

export const eliminarArtesanoController = async (req, res, next) => {
	try{
		const {id} = req.params;
		const resultado = await eliminarArtesanoService(id);
		return res.status(200).json(resultado);
	}catch(error){
		next (error);
	}
};
