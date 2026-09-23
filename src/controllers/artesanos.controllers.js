import prisma from "../config/prisma.js";
import { BadRequest, NotFound } from "../utils/error.js";

//OBTENER TODOS LOS ARTESANOS (+ filtro)
export const obtenerTodosLosArtesanos = async (req, res, next) => {
    try {
        const { nombre, dni, localidad, descripcion, estado } = req.query;

        const where = {};

        if (nombre) {
            where.nombre = { contains: nombre, mode: "insensitive" };
        }
        if (dni) {
            where.dni = Number(dni);
        }
        if (localidad) {
            where.localidad = { contains: localidad, mode: "insensitive" };
        }
        if (descripcion) {
            where.descripcion = { contains: descripcion, mode: "insensitive" };
        }
        if (estado) {
            where.estado = { contains: estado, mode: "insensitive" };
        }

        const artesanos = await prisma.artesano.findMany({
            where,
            include: {
                productos: true,
                stand: true,
                rol: true
            }
        });

        res.status(200).json(artesanos);
    } catch (error) {
        next(error);
    }
};

//OBTENER ARTESANO POR ID
export const obtenerArtesanoPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const artesano = await prisma.artesano.findUnique({
            where: { id },
            include: {
                productos: true,
                stand: true,
                rol: true
            }
        });

        if (!artesano) {
            throw new NotFound(id); // si no existe el id genera error 404
        }

        res.status(200).json(artesano);
    } catch (error) {
        next(error);
    }
};

//AGREGAR UN ARTESANO
export const agregarArtesano = async (req, res, next) => {
    try {
        const { nombre, dni, localidad, descripcion, estado, rolId, standId } = req.body;

        if (!nombre || !dni || !localidad || !estado) {
            throw new BadRequest("Faltan datos obligatorios: nombre, dni, localidad y estado");
        }

        const nuevoArtesano = await prisma.artesano.create({
            data: {
                nombre,
                dni: Number(dni),
                localidad,
                descripcion: descripcion || "",
                estado,
                rolId: rolId ? Number(rolId) : 2,
                ...(standId && { standId: Number(standId) })
            }
        });

        res.status(201).json(nuevoArtesano);
    } catch (error) {
        next(error);
    }
};

//ACTUALIZAR UN ARTESANO
export const actualizarArtesano = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nombre, dni, localidad, descripcion, estado, rolId, standId } = req.body;

        if (!nombre || !dni || !localidad || !descripcion || !estado) {
            throw new BadRequest("Faltan datos obligatorios para actualizar el artesano");
        }

        // Se verifica si existe antes de actualizar
        const existe = await prisma.artesano.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        const artesanoActualizado = await prisma.artesano.update({
            where: { id },
            data: {
                nombre,
                dni: Number(dni),
                localidad,
                descripcion,
                estado,
                ...(rolId && { rolId: Number(rolId) }),
                ...(standId && { standId: Number(standId) })
            }
        });

        res.status(200).json(artesanoActualizado);
    } catch (error) {
        next(error);
    }
};

//ELIMINAR UN ARTESANO
export const eliminarArtesano = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.artesano.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        await prisma.artesano.delete({
            where: { id }
        });

        res.status(200).json({ message: "El artesano se eliminó correctamente." });
    } catch (error) {
        next(error);
    }
};