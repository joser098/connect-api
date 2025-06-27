import { PrismaClient } from '../generated/prisma/index.js';
import { getDate } from '.././services/scripts.js'

const prisma = new PrismaClient()

const groupsRepo = {
  getAllGroups: async () => {
    return await prisma.groups_.findMany({
      include: {
        zones: true,
      }
    });
  },
  createAssignment: async ({name,
        last_name,
        age,
        gender,
        marital_status,
        phone,
        email,
        attend_with,
        hillsong_is_my_church,
        has_selected_group,
        group_selected,
        member_from,
        service_selected,
        zone,
        status,
        comments,}) => {
    return await prisma.assignments.create({
      data: {
        name,
        last_name,
        age,
        gender,
        marital_status,
        phone,
        email,
        attend_with,
        hillsong_is_my_church,
        has_selected_group,
        group_selected,
        member_from,
        service_selected,
        zone,
        status,
        comments,
        created_at: getDate(),
        updated_at: getDate()
      }
    });
  },
  getAssignments: async () => {
    return await prisma.assignments.findMany({
      include: {
        assignment_status: true
      }
    });
  },
  getAssignmentById: async (id) => {
    return await prisma.assignments.findUnique({
      where: {
        id
      }
    });
  },
  updateAssignmentStatus: async (id, status) => {
    return await prisma.assignments.update({
      where: {
        id
      },
      data: {
        status: status + 1,
        updated_at: getDate()
      }
    });
  },
  assignGroup: async (id,email, group_id) => {
    await prisma.users.update({
      where: {
        email
      },
      data: {
        group_id
      }
    });
    return await prisma.assignments.update({
      where: {
        id
      },
      data: {
        has_selected_group: true,
        group_selected: group_id
      }
    });
  }
}

export default groupsRepo;