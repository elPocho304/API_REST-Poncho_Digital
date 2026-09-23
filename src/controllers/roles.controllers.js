import prisma from "../config/prisma.js";
import { BadRequest, NotFound } from "../utils/error.js";

//OBTENER TODOS LOS ROLES
export const obtenerTodosLosRoles = async (req, res, next) => {
    try {
        const roles = await prisma.rol.findMany({
        });

        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
};

//OBTENER ROL POR ID
export const obtenerRolPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const rol = await prisma.rol.findUnique({
            where: { id }
        });

        if (!rol) {
            throw new NotFound(id);
        }

        res.status(200).json(rol);
    } catch (error) {
        next(error);
    }
};

//AGREGAR UN ROL
export const agregarRol = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            throw new BadRequest("El nombre del rol es obligatorio");
        }

        const nombreFormateado = nombre.toUpperCase();

        const rolExistente = await prisma.rol.findUnique({
            where: { nombre: nombreFormateado }
        });

        if (rolExistente) {
            throw new BadRequest(`El rol '${nombreFormateado}' ya existe en el sistema`);
        }

        const nuevoRol = await prisma.rol.create({
            data: {
                nombre: nombreFormateado
            }
        });

        res.status(201).json(nuevoRol);
    } catch (error) {
        next(error);
    }
};

//ACTUALIZAR UN ROL
export const actualizarRol = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nombre } = req.body;

        if (!nombre) {
            throw new BadRequest("El nombre del rol es obligatorio para actualizar");
        }

        const existe = await prisma.rol.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        const nombreFormateado = nombre.toUpperCase();

        const rolActualizado = await prisma.rol.update({
            where: { id },
            data: {
                nombre: nombreFormateado
            }
        });

        res.status(200).json(rolActualizado);
    } catch (error) {
        next(error);
    }
};

//ELIMINAR UN ROL
export const eliminarRol = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.rol.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }
        
        await prisma.rol.delete({
            where: { id }
        });

        res.status(200).json({ message: "El rol se eliminó correctamente." });
    } catch (error) {
        next(error);
    }
};