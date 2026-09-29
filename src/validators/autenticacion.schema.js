import {z} from "zod";


export const validarRegistro = z.object({
    email: z.preprocess(
    // 1. Filtro previo seguro: si es texto, le quitamos los espacios de los extremos
    (val) => (typeof val === 'string' ? val.trim() : val),
    // 2. Aplicamos la validación de email y las reglas personalizadas
    z.email({ message: "El formato del correo electrónico no es válido." })
      .refine((val) => {
        const [usuario] = val.split('@');
        return usuario.length >= 6 && usuario.length <= 30;
      }, {
        message: "El nombre de usuario de Gmail debe tener entre 6 y 30 caracteres."
      })
  ),

  passwordHash: z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, { message: "La contraseña no puede superar los 100 caracteres." })
});