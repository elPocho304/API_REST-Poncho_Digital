import { z } from "zod";

export const validarRegistro = z.object({
  email: z.preprocess(
    // 1. Filtro previo seguro: si es texto, le quitamos los espacios de los extremos
    (val) => (typeof val === "string" ? val.trim() : val),
    // 2. Aplicamos la validación de email y las reglas personalizadas
    z
      .string({ message: "El correo electrónico es obligatorio" })
      .email({ message: "El formato del correo electrónico no es válido." })
      .refine(
        (val) => {
          const [usuario] = val.split("@");
          return usuario.length >= 6 && usuario.length <= 30;
        },
        {
          message:
            "El nombre de usuario de Gmail debe tener entre 6 y 30 caracteres.",
        },
      ),
  ),

  password: z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, {
      message: "La contraseña no puede superar los 100 caracteres.",
    }),

  nombreEmprendimiento: z
    .string()
    .trim()
    .min(2, {
      message: "El nombre del emprendimiento debe tener al menos 2 caracteres",
    })
    .max(100, {
      message:
        "El nombre del emprendimiento no puede superar los 100 caracteres",
    }),

  rubro: z.string().trim().min(2, {
    message: "El rubro es obligatorio y debe tener al menos 2 caracteres.",
  }),

  localidad: z
    .string()
    .trim()
    .min(2, { message: "La localidad es obligatoria." }),

  descripcion: z
    .string()
    .trim()
    .max(500, {
      message: "La descripción no puede superar los 500 caracteres.",
    })
    .opcional(),
});

export const inicioSesionShema = z.object({
  email: z.email("el email no tiene un formato valido"),
  password: z.string().min(1, "la contraseña es obligatoria"),
});
