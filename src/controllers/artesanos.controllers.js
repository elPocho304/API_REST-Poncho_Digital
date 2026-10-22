import {
	obtenerArtesanosService,
  obtenerArtesanoPorIdService,
  obtenerArtesanoPorUsuarioIdService,
  actualizarArtesanoService,
  eliminarArtesanoService,
} from "../services/artesanos.services.js";

export const obtenerTodosLosArtesanosController = async (req, res, next) => {
	try {
		const filtros = req.artesanoConsulta;
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

export const obtenerMiPerfil = async (req, res, next) => {
  try {
    const usuario = await obtenerArtesanoPorUsuarioIdService(req.usuario.id);
    if (!usuario) {
      res.set("WWW-Authenticate", 'Bearer error = "invalidate_token"');
      return res.status(401).json({
        mensaje: "La cuenta asociada al token no existe.",
      });
    }
    return res.status(200).json({ usuario: usuario });
  } catch (error) {
    return next(error);
  }
};
