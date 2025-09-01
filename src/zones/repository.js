import { de } from 'zod/v4/locales';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const zonesRepo = {
  getAllLeaders: async () => {
    return await prisma.users.findMany({
      where: {
        role_id: 3
      },
      select: {
        name: true,
        last_name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
        groups_: {
          select: {
            description: true,
          }
        },
      }
    });
  },
  getZones: async () => {
    return await prisma.groups_zones.findMany({
      include: {
        groups_: {
          select: {
            group_id: true,
            _count: {
              select: { users: true }
            }
          }
        },
        users: {
          select: { id: true, name: true, last_name: true } // líder de la zona
        }
      }
    });
  }
};

export default zonesRepo;