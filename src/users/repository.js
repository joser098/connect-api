import { PrismaClient } from '../generated/prisma/index.js';
import crypto from "node:crypto";

const prisma = new PrismaClient()

const usersRepo = {
  getAllUsers: async () => {
  },
  getUserByEmail: async (email) => {
    return await prisma.users.findUnique({
      where: {
        email
      }
    });
  },
  createUser: async ({name, last_name, dni, birthday, phone, email, password, group_id}) => {
    return await prisma.users.create({
      data: {
        user_id: crypto.randomUUID(),
        name,
        last_name,
        dni,
        birthday,
        phone,
        email,
        password,
        role_id: 5,
        group_id
      }
    });
  }
}

export default usersRepo;