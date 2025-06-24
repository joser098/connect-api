import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient()

const groupsRepo = {
  getAllGroups: async () => {
    return await prisma.groups_.findMany({
      include: {
        zones: true,
      }
    });
  },
  getAssignments: async () => {
    return await prisma.assignments.findMany();
  }
}

export default groupsRepo;