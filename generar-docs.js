import swaggerAutogen from "swagger-autogen";
import {fileURLToPath} from "node:url";
import * as esquemas from "./src/documentacion/esquemas.js";

const doc = {
info: { title: "API-REST Poncho Digital", version: "1.0.0",
description: "API REST para la gestión de artesanos, productos, stands, solicitudes de registro y administración de cuentas. Incluye contratos de entrada y salida, errores y autenticación Bearer.",
},
servers: [{ url: "/", description: "Servidor actual" }],
components: {
  "@schemas": {
    ...esquemas,
  },
  responses: {
    BadRequest: {
      description: "Los datos no cumplen las validaciones o el encabezado Authorization tiene un formato incorrecto.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorSolicitudApi" },
          examples: {
            datosInvalidos: {
              value: { error: "email: El email no tiene un formato válido" },
            },
            autorizacionMalFormada: {
              value: { mensaje: "Usar Authorization: Bearer <token>." },
            },
          },
        },
      },
    },
    Unauthorized: {
      description: "Falta un token Bearer, es inválido o venció, o la cuenta asociada ya no existe.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/MensajeApi" },
          examples: {
            tokenFaltante: {
              value: { mensaje: "Se requiere un token de acceso." },
            },
            tokenInvalido: {
              value: { mensaje: "El token es inválido o ha vencido." },
            },
            cuentaInexistente: {
              value: { mensaje: "La cuenta asociada al token no existe." },
            },
          },
        },
      },
    },
    Forbidden: {
      description: "La cuenta está inactiva o no tiene el rol requerido.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/MensajeApi" },
          examples: {
            cuentaInactiva: {
              value: { mensaje: "La cuenta está inactiva." },
            },
            rolInsuficiente: {
              value: { mensaje: "No tiene permisos para realizar esta operación." },
            },
          },
        },
      },
    },
    NotFound: {
      description: "No se encontró el recurso solicitado.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorApi" },
          example: { error: "No se encontró el recurso solicitado." },
        },
      },
    },
    Conflict: {
      description: "La operación entra en conflicto con el estado o los datos existentes.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorApi" },
          examples: {
            conflictoDeUnicidad: {
              value: {
                error: "El recurso ya existe o entra en conflicto con otro registro.",
              },
            },
            estadoIncompatible: {
              value: { error: "La solicitud ya fue resuelta" },
            },
          },
        },
      },
    },
    InternalError: {
      description: "Error interno inesperado.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorApi" },
          example: { error: "Ha ocurrido un error interno." },
        },
      },
    },
  },
},
securityDefinitions: {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Token JWT enviado en el encabezado Authorization como Bearer <token>.",
  },
},
};
const ruta = (archivo) =>
fileURLToPath(new URL(archivo, import.meta.url)).replaceAll("\\", "/");
const outputFile = ruta("./swagger-output.json");
const routes = [ruta("./src/app.js")];
const generar = swaggerAutogen({ openapi: "3.0.0" });
const resultado = await generar(outputFile, routes, doc);
if (!resultado.success) {
throw new Error("No se pudo generar la especificación OpenAPI.");
}