import { z } from "zod";

export const crearStandSchema = z.object({
  numero: z.string({
    required_error: "El número del stand es obligatorio",
  }).min(1, "El número del stand no puede estar vacío"),
  
  sectorId: z.string({
    required_error: "El ID del sector es obligatorio",
  }).uuid({ message: "El ID del sector debe ser un UUID válido" }),
  
  estado: z.enum(["DISPONIBLE", "OCUPADO", "RESERVADO"], {
    errorMap: () => ({ message: "Estado inválido. Debe ser DISPONIBLE, OCUPADO o RESERVADO" }),
  }).optional(),
});

export const actualizarStandSchema = crearStandSchema.partial();

export const idStandParamSchema = z.object({
  id: z.string({
    required_error: "El ID del stand es obligatorio en los parámetros",
  }).uuid({ message: "El ID del stand debe ser un UUID válido" }),
});