import prisma from "../config/prisma.js";
import { BadRequest } from "../utils/error.js";

export const crearRegistro = async (registroDto) => {
    const {email, passwordHash} = registroDto;
    const emailbd = await prisma.usuario.findUnique({
        where: {
            email : email
        }
    })
    if (emailbd){
        throw new BadRequest("El correo electronico ya existe")
    }
    const rol = "ARTESANO"
    const registro = await prisma.usuario.create({
        data: {
            email: email,
            passwordHash: passwordHash,
            rol: rol
        }
    })
    return registro;
}