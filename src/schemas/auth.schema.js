import { z } from "zod";

export const signupSchema = z
  .object({
    nombre: z
      .string({
        required_error: "nombre es obligatorio",
      })
      .min(3, {
        message: "nombre debe contener al menos 3 caracteres",
      }),
    email: z
      .string({
        required_error: "Email es obligatorio",
      })
      .email({
        message: "Email no es válido",
      }),
    password1: z
      .string({
        required_error: "Contraseña es obligatorio",
      })
      .min(6, {
        message: "Contraseña debe contener al menos 6 caracteres",
      }),
    password2: z.string({
      required_error: "Contraseña es obligatorio",
    }),
    //rol
    role: z.string({
      required_error: "rol es obligatorio",
    }),
    
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords no coinciden",
    path: ["password2"],
  });

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email es obligatorio",
    })
    .email({
      message: "Email no es válido",
    }),
  password: z
    .string({
      required_error: "Password es obligatorio",
    })
    .min(6, {
      message: "Password debe contener al menos 6 caracteres",
    }),
});
