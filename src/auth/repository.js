import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient()

const authRepo = {
  getUserByEmail: async (email) => {
    return await prisma.users.findUnique({
      where: {
        email,
      },
      omit: {
        password: true
      },
      include: {
        roles: true
      }
    }
    )
  },
  updateLastLogin: async (user) => {
    return await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        last_login: new Date(),
      },
    })
  }
}

export default authRepo;