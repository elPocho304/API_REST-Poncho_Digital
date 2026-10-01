import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"
import { AppError } from "../utils/error.js";

const FACTOR_COSTO = 10;

export const crearRegistro = async (registroDto) => {
    const {email, password} = registroDto;
    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            email : email
        }
    })
    if (usuarioExistente){
        throw new AppError("El correo electronico ya existe", 409)
    }

    const passwordHash = await bcrypt.hash(password,FACTOR_COSTO)

    const rol = "ARTESANO"
    const registro = await prisma.usuario.create({
        data: {
            email: email,
            passwordHash: passwordHash,
            rol: rol
        },
        select: {
            id: true,
            email: true,
            rol: true,
            createdAt: true
        }
    })
    return registro;
};

export const iniciarSesionService = async (usuarioDto) => {
    const {emailDto, passwordDto} = usuarioDto;
    const usuario = await prisma.usuario.findUnique({
        where: {email : emailDto}
    })
    if (!usuario){
        throw new AppError("No existe un usuario con ese email", 401)
    }
    const passwordValida = await bcrypt.compare(passwordDto, usuario.passwordHash)
    if (!passwordValida) { 
        throw new AppError ("Contraseña incorrecta", 401)
    }
    return {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
    };

}