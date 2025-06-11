import authRepo from "./repository.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  validateLogin: async (email, password) => {
    const user = await authRepo.getUserByEmail(email);

    if (!user) {
      throw new Error(`No existe usuario con email: ${email}`)
    }

    if(!user.isEmailVerified){
      throw new Error("Correo electrónico no verificado")
    }

    if(!user.isActive){
      throw new Error("Su cuenta no esta activa")
    }

    const validatePassword = !user
    ? false
    : await bcrypt.compare(password, user.password);

    if (!(user && validatePassword)) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const token = await jwt.sign(user, process.env.JWT_SECRET);
  
    return {
      access: true,
      token: token,
    };
  },
  generateHash: async (email) => {
    const user = await authRepo.getUserByEmail(email);
    if (!user) {
      throw new Error(`No existe usuario con email: ${email}`)
    }

    const hash = crypto.randomUUID();
    return await authRepo.saveHash(email, hash);
  },
}

export default authService;