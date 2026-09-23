import prisma from "../config/prisma.js";
import { BadRequest, NotFound } from "../utils/error.js";

//OBTENER TODOS LOS STANDS
export const obtenerTodosLosStands = async (req, res, next) => {
    try {
        const { pabellon, sector, estado, nombre } = req.query;

        const where = {};

        if (pabellon) {
            where.pabellon = { contains: pabellon, mode: "insensitive" };
        }
        if (sector) {
            where.sector = { contains: sector, mode: "insensitive" };
        }
        if (estado) {
            where.estado = { contains: estado, mode: "insensitive" };
        }
        if (nombre) {
            where.nombre = { contains: nombre, mode: "insensitive" };
        }

        const stands = await prisma.stand.findMany({
            where,
            include: {
                artesano: true // Trae la info del artesano si el stand está ocupado
            }
        });

        res.status(200).json(stands);
    } catch (error) {
        next(error);
    }
};

//OBTENER STAND POR ID
export const obtenerStandPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const stand = await prisma.stand.findUnique({
            where: { id },
            include: {
                artesano: true
            }
        });

        if (!stand) {
            throw new NotFound(id);
        }

        res.status(200).json(stand);
    } catch (error) {
        next(error);
    }
};

//AGREGAR UN STAND
export const agregarStand = async (req, res, next) => {
    try {
        const { nombre, descripcion, pabellon, sector, estado, latitud, longitud } = req.body;

        // Validamos datos
        if (!nombre || !descripcion || !pabellon || !sector || !estado || latitud === undefined || longitud === undefined) {
            throw new BadRequest("Faltan datos obligatorios para crear el stand (incluyendo latitud y longitud)");
        }

        // Aseguramos que latitud y longitud puedan ser convertidos a Float
        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);

        if (isNaN(lat) || isNaN(lng)) {
            throw new BadRequest("La latitud y longitud deben ser números válidos");
        }

        const nuevoStand = await prisma.stand.create({
            data: {
                nombre,
                descripcion,
                pabellon,
                sector,
                estado,
                latitud: lat,
                longitud: lng
            }
        });

        res.status(201).json(nuevoStand);
    } catch (error) {
        next(error);
    }
};

//ACTUALIZAR UN STAND
export const actualizarStand = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nombre, descripcion, pabellon, sector, estado, latitud, longitud } = req.body;

        if (!nombre || !descripcion || !pabellon || !sector || !estado || latitud === undefined || longitud === undefined) {
            throw new BadRequest("Faltan datos obligatorios para actualizar el stand");
        }

        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);

        if (isNaN(lat) || isNaN(lng)) {
            throw new BadRequest("La latitud y longitud deben ser números válidos");
        }

        const existe = await prisma.stand.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        const standActualizado = await prisma.stand.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                pabellon,
                sector,
                estado,
                latitud: lat,
                longitud: lng
            }
        });

        res.status(200).json(standActualizado);
    } catch (error) {
        next(error);
    }
};

//ELIMINAR UN STAND
export const eliminarStand = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.stand.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        await prisma.stand.delete({
            where: { id }
        });

        res.status(200).json({ message: "El stand se eliminó correctamente." });
    } catch (error) {
        next(error);
    }
};