import { artesanos } from "../data/artesanos.js";
import { BadRequest } from "../utils/error.js";

export const obtenerTodosLosArtesanos = (req, res) => {
	const { nombre, dni, localidad, descripcion, estado } = req.query;

	let resultado = artesanos;
	if (nombre) {
		resultado = resultado.filter(artesano => artesano.nombre.toLowerCase().includes(nombre.toLowerCase()));
	}
	if (dni) {
		resultado = resultado.filter(artesano => artesano.dni.includes(dni));
	}
	if (localidad) {
		resultado = resultado.filter(artesano => artesano.localidad.toLowerCase().includes(localidad.toLowerCase()));
	}
	if (descripcion) {
		resultado = resultado.filter(artesano => artesano.descripcion.toLowerCase().includes(descripcion.toLowerCase()));
	}
	if (estado) {
		resultado = resultado.filter(artesano => artesano.estado.toLowerCase().includes(estado.toLowerCase()));
	}

	res.status(200).json(resultado);
};

export const obtenerArtesanoPorId = (req, res) => {
	res.status(200).json(req.elementoEncontrado);
};

export const agregarArtesano = (req, res, next) => {
	const { nombre, dni, localidad, descripcion, estado } = req.body;
	const nuevoId = artesanos.length + 1;

	if (!nombre || !dni || !localidad || !estado) {
		return next(new BadRequest("Faltan datos obligatorios"));
	}

	const nuevoArtesano = {
		id: nuevoId,
		nombre,
		dni,
		localidad,
		descripcion: descripcion || null,
		estado
	};

	artesanos.push(nuevoArtesano);
	res.status(201).json(nuevoArtesano);
};

export const actualizarArtesano = (req, res, next) => {
	const { nombre, dni, localidad, descripcion, estado } = req.body;

	if (!nombre || !dni || !localidad || !descripcion || !estado) {
		return next(new BadRequest("Faltan datos obligatorios"));
	}

	const artesano = req.elementoEncontrado;

	artesano.nombre = nombre;
	artesano.dni = dni;
	artesano.localidad = localidad;
	artesano.descripcion = descripcion;
	artesano.estado = estado;

	res.status(200).json(artesano);
};

export const eliminarArtesano = (req, res) => {
	const posicion = req.elementoIndice;

	artesanos.splice(posicion, 1);

	res.status(204).json({ message: "El artesano se eliminó correctamente." });
};
