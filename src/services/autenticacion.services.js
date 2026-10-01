import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"
import { BadRequest } from "../utils/error.js";

const FACTOR_COSTO = 10;

export const crearRegistro = async (registroDto) => {
    const {email, password} = registroDto;
    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            email : email
        }
    })
    if (usuarioExistente){
        throw new BadRequest("El correo electronico ya existe")
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
