import { PrivateUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import { AuthError } from "./auth-error";
import { prisma } from "../bd/prisma";

export class CredentialsValidator {
  static validateUsername(username: string) {
    const usernameRegExp = /^[a-zA-Z0-9_-]{3,20}$/;

    const isValid = usernameRegExp.test(username);

    if (!isValid)
      throw new AuthError(
        "El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números, guiones (-) y guiones bajos (_).",
        422,
      );
  }

  static async validateEmail(email: string) {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegExp.test(email);

    if (!isValid) throw new AuthError("Correo electronico inválido", 422);

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) throw new AuthError("Ya existe un usuario con ese email", 409);
  }

  static validatePassword(password: string) {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const isValid = passwordRegExp.test(password);

    if (!isValid)
      throw new AuthError(
        "La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una minúscula, un número y un símbolo.",
        422,
      );
  }

  static async validateUser(user: PrivateUser | null, password: string) {
    if (!user) throw new AuthError("Credenciales invalidas", 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AuthError("Credenciales invalidas", 401);
  }
}
