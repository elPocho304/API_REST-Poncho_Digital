import prisma from "../config/prisma.js";
import { BadRequest, NotFound } from "../utils/error.js";

//OBTENER TODOS LOS ADMINISTRADORES
export const obtenerTodosLosAdministradores = async (req, res, next) => {
    try {
        const { nombre, email } = req.query;

        const where = {};

        if (nombre) {
            where.nombre = { contains: nombre, mode: "insensitive" };
        }
        if (email) {
            where.email = { contains: email, mode: "insensitive" };
        }

        const administradores = await prisma.administrador.findMany({
            where,
            include: {
                rol: true //información del Rol asignado
            }
        });

        res.status(200).json(administradores);
    } catch (error) {
        next(error);
    }
};

//OBTENER ADMINISTRADOR POR ID
export const obtenerAdministradorPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const administrador = await prisma.administrador.findUnique({
            where: { id },
            include: {
                rol: true
            }
        });

        if (!administrador) {
            throw new NotFound(id);
        }

        res.status(200).json(administrador);
    } catch (error) {
        next(error);
    }
};

//AGREGAR UN ADMINISTRADOR
export const agregarAdministrador = async (req, res, next) => {
    try {
        const { nombre, email, password, rolId } = req.body;

        if (!nombre || !email || !password || !rolId) {
            throw new BadRequest("Faltan datos obligatorios: nombre, email, password o rolId");
        }

        // Verificamos si el email ya existe
        const emailExistente = await prisma.administrador.findUnique({
            where: { email }
        });

        if (emailExistente) {
            throw new BadRequest("El email ya está registrado");
        }

        const nuevoAdmin = await prisma.administrador.create({
            data: {
                nombre,
                email,
                password,
                rolId: Number(rolId)
            },
            include: {
                rol: true
            }
        });

        res.status(201).json(nuevoAdmin);
    } catch (error) {
        next(error);
    }
};

// 4. ACTUALIZAR UN ADMINISTRADOR
export const actualizarAdministrador = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nombre, email, password, rolId } = req.body;

        if (!nombre || !email || !password || !rolId) {
            throw new BadRequest("Faltan datos obligatorios para actualizar el administrador");
        }

        const existe = await prisma.administrador.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        const adminActualizado = await prisma.administrador.update({
            where: { id },
            data: {
                nombre,
                email,
                password,
                rolId: Number(rolId)
            },
            include: {
                rol: true
            }
        });

        res.status(200).json(adminActualizado);
    } catch (error) {
        next(error);
    }
};

// 5. ELIMINAR UN ADMINISTRADOR
export const eliminarAdministrador = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.administrador.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        await prisma.administrador.delete({
            where: { id }
        });

        res.status(200).json({ message: "El administrador se eliminó correctamente." });
    } catch (error) {
        next(error);
    }
};