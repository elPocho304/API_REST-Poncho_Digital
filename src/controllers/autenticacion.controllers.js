import { crearRegistro, iniciarSesionService } from "../services/autenticacion.services.js";
import { generarToken } from "../services/tokens.service.js";

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
        const token = generarToken(usuario);

        return res
        .status(200)
        .json({
            mensaje: "Inicio de sesión exitoso.",
            token: token,
            usuario: usuario,
      });
    } catch (error) {
        next(error);
    }
}