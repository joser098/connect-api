import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const commonsRepo = {
  getCabaLocations: async () => {
    return await prisma.locations.findMany({
      where: {
        zone_id: 1
      },
    });
  }
}

export default commonsRepo;