import { Prisma } from "../generated/prisma/client.ts";

export const manejadorErrores = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "El recurso ya existe o entra en conflicto con otro registro.",
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "No se encontró el recurso solicitado.",
      });
    }
  }

  if (typeof err.status === "number" && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({
      error: err.message || "La solicitud no pudo ser procesada.",
    });
  }

  console.error(err);
  return res.status(500).json({
    error: "Ha ocurrido un error interno.",
  });
};
