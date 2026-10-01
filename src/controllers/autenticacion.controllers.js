import { crearRegistro, iniciarSesionService } from "../services/autenticacion.services.js";

export const registro = async (req, res, next) => {
    try {
        const nuevoUsuario = await crearRegistro(req.body);
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        next(error);
    }
}

export const iniciarSesion = async (req, res, next) => {
    try {
        const usuario = await iniciarSesionService(req.body);
        return res.status(201).json(usuario)
    } catch (error) {
        next(error);
    }
}