import prisma from "../config/prisma.js"
import { BadRequest, NotFound } from "../utils/error.js";

//OBTENER TODOS LOS PRODUCTOS (+ filtros)
export const obtenerTodosLosProductos = async (req, res, next) => {
try {
        const { nombre, categoria, precioMin, precioMax, artesanoId } = req.query;

        const where = {};

        if (nombre) {
            where.nombre = { contains: nombre, mode: "insensitive" };
        }
        if (categoria) {
            where.categoria = { contains: categoria, mode: "insensitive" };
        }
        if (artesanoId) {
            where.artesanoId = Number(artesanoId); // Para buscar todos los productos de un artesano específico
        }
        // Filtro de rango de precios usando gte (mayor o igual) y lte (menor o igual)
        if (precioMin || precioMax) {
            where.precio = {};
            if (precioMin) where.precio.gte = Number(precioMin);
            if (precioMax) where.precio.lte = Number(precioMax);
        }

        const productos = await prisma.producto.findMany({
            where,
            include: {
                artesano: true // Trae los datos del artesano del producto
            }
        });

        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

//OBTENER PRODUCTO POR ID
export const obtenerProductoPorId = async (req, res, next) => {
   try {
        const id = Number(req.params.id);

        const producto = await prisma.producto.findUnique({
            where: { id },
            include: {
                artesano: true
            }
        });

        if (!producto) {
            throw new NotFound(id);
        }

        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

//AGREGAR PRODUCOT
export const agregarProducto = async (req, res, next) => {
    try {
        const { nombre, descripcion, precio, categoria, artesanoId } = req.body;

        // Validamos que vengan todos los campos, especialmente el artesanoId (clave foránea)
        if (!nombre || !descripcion || !precio || !categoria || !artesanoId) {
            throw new BadRequest("Faltan datos obligatorios, incluyendo el artesanoId");
        }

        // Antes de crear el producto verificamos que el artesano exista
        const artesanoExiste = await prisma.artesano.findUnique({
            where: { id: Number(artesanoId) }
        });

        if (!artesanoExiste) {
            throw new BadRequest(`No se puede crear el producto porque el artesano con ID ${artesanoId} no existe`);
        }

        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio: Number(precio),
                categoria,
                artesanoId: Number(artesanoId)
            }
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
}

//ACTUALIZAR PRODUCTO
export const actualizarProducto = async (req, res, next) => {
try {
        const id = Number(req.params.id);
        const { nombre, descripcion, precio, categoria, artesanoId } = req.body;

        if (!nombre || !descripcion || !precio || !categoria || !artesanoId) {
            throw new BadRequest("Faltan datos obligatorios para actualizar el producto");
        }

        // Verificamos si el producto existe
        const existe = await prisma.producto.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        // Si cambian el artesanoId, verificamos que el nuevo artesano exista
        if (Number(artesanoId) !== existe.artesanoId) {
             const artesanoExiste = await prisma.artesano.findUnique({ where: { id: Number(artesanoId) }});
             if (!artesanoExiste) {
                 throw new BadRequest(`El nuevo artesano asignado (ID ${artesanoId}) no existe`);
             }
        }

        const productoActualizado = await prisma.producto.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                precio: Number(precio),
                categoria,
                artesanoId: Number(artesanoId)
            }
        });

        res.status(200).json(productoActualizado);
    } catch (error) {
        next(error);
    }
};
export const eliminarProducto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.producto.findUnique({ where: { id } });
        if (!existe) {
            throw new NotFound(id);
        }

        await prisma.producto.delete({
            where: { id }
        });

        res.status(200).json({ message: "El producto se eliminó correctamente." });
    } catch (error) {
        next(error);
    }
};