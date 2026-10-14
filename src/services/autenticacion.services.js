import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/error.js";

const FACTOR_COSTO = 10;

export const crearRegistro = async (registroDto) => {
  const {
    email,
    password,
    nombreEmpredimiento,
    rubro,
    localidad,
    descripcion,
  } = registroDto;
  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });
  if (usuarioExistente) {
    throw new AppError("El correo electronico ya existe", 409);
  }

  const passwordHash = await bcrypt.hash(password, FACTOR_COSTO);

  const rol = "ARTESANO";

  //usamos una transaccion para crear el usuario y su solicitud de registro
  const resultado = await prisma.$transaction(async (tx) => {
    const nuevoUsuario = await tx.usuario.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        rol: rol,
      },
    });

    const nuevaSolicitud = await tx.solicitudRegistro.create({
      data: {
        usuarioId: nuevoUsuario.id,
        nombreEmpredimiento: nombreEmpredimiento,
        rubro: rubro,
        localidad: localidad,
        descripcion: descripcion,
        estado: "PENDIENTE",
      },
    });

    return {
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      createAt: nuevoUsuario.createAt,
      nombreEmpredimiento: nuevaSolicitud.nombreEmpredimiento,
    };
  });

  return resultado;
  // const registro = await prisma.usuario.create({
  //     data: {
  //         email: email,
  //         passwordHash: passwordHash,
  //         rol: rol
  //     },
  //     select: {
  //         id: true,
  //         email: true,
  //         rol: true,
  //         createdAt: true
  //     }
  // })
  // return registro;
};

export const iniciarSesionService = async (usuarioDto) => {
  const { email, password } = usuarioDto;
  const usuario = await prisma.usuario.findUnique({
    where: { email: email },
  });
  if (!usuario) {
    throw new AppError("No existe un usuario con ese email", 401);
  }
  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
  if (!passwordValida) {
    throw new AppError("Contraseña incorrecta", 401);
  }
  return {
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol,
  };
};
