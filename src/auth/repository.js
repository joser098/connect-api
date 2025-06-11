import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient()

const authRepo = {
  getUserByEmail: async (email) => {
    return await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        roles: true
      }
    }
    )
  },
  updateLastLogin: async (email) => {
    return await prisma.users.update({
      where: {
        email,
      },
      data: {
        last_login: new Date(),
      },
    })
  },
  saveHash: async (email, hash) => {
    return await prisma.hash.create({
      data: {
        email,
        hash,
      },
    })
  },
  getPassByEmail: async (email) => {
    return await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
      }
    })
  },
  getEmailByHash: async (hash) => {
    return await prisma.hash.findUnique({
      where: {
        hash,
      },
      select: {
        email: true,
      }
    })
  },
  updatePassword: async (email, password) => {
    return await prisma.users.update({
      where: {
        email,
      },
      data: {
        password,
      },
    })
  },
  deleteHash: async (hash) => {
    return await prisma.hash.delete({
      where: {
        hash,
      },
    })
  },
  setEmailVerification: async (email) => {
    return await prisma.users.update({
      where: {
        email
      },
      data: {
        isEmailVerified: true
      }
    })
  } 
}

export default authRepo;