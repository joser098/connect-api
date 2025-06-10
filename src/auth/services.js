import authRepo from "./repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  validateLogin: async (email, password) => {
    const user = await authRepo.getUserByEmail(email);

    if (!user) {
      throw new Error(`No existe usuario con email: ${email}`)
    }

    console.log(user)
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

    await authRepo.updateLastLogin(user.id);
  
    return {
      access: true,
      token: token,
    };
  }
}

export default authService;