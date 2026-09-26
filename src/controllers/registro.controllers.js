import { crearRegistro } from "../services/registro.services.js";

export const registro = async (req, res, next) => {
    try {
        const nuevoUsuario = await crearRegistro(req.body);
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        next(error);
    }
}