import emailTemplates from "../services/email-templates.js";
import emailsService from "../services/emails.service.js";
import { getCommunity } from "../services/scripts.js";
import usersRepo from "../users/repository.js";
import groupsRepo from "./repository.js";

export  const groupsControl = {
  getAllGroups: async (req, res) => {
    const groups = await groupsRepo.getAllGroups();
    return res.status(200).json(groups);
  },
  getGroups: async (req, res) => {
    try {
      const { age, zone } = req.query;
    
      if (!age || !zone) {
        return res.status(400).json({ success: false, message: 'Age and zone are required' });
      }

      const community = getCommunity(+age);

      const groups = await groupsRepo.getGroups(community, +zone)

      // const groups = await groupsRepo.getGroups();
      return res.status(200).json({ sucess: true, data: groups });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error getting groups', error: error.message });
    }
  },
  getGroup: (req, res) => {
    res.send('get group')
  },
  createGroup: (req, res) => {
    res.send('create group')
  },
  updateGroup: (req, res) => {
    res.send('update group')
  },
  deleteGroup: (req, res) => {
    res.send('delete group')
  },
  createAssignment: async (req, res) => {
    try {
      const {
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
      } = req.body;

      const emailExists = await usersRepo.getUserByEmail(email);

      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      } 

      const saveAsUser = await usersRepo.createUser(req.body);
      if (!saveAsUser) {
        return res.status(500).json({ success: false, message: 'Error creating user' });
      }

      const newAssignment = await groupsRepo.createAssignment(req.body);

      return res.status(201).json({ success: true, message: 'Assignment created successfully', data: newAssignment });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error creating assignment', error: error.message });
    }
  },
  getAssignments: async (req, res) => {
    const assignments = await groupsRepo.getAssignments();
    return res.status(200).json(assignments);
  },
  updateAssignmentStatus: async (req, res) => {
    const { id } = req.params;

    const { status } = req.body;
    const assignment = await groupsRepo.getAssignmentById(+id);

    switch(status){
      case 1:
        //Pre-asignar grupo
        await groupsRepo.updateAssignmentStatus(+id, 1);
        break;
      case 2:
        //Actulizar estado confirmando que ha sido contactado
        await groupsRepo.updateAssignmentStatus(+id, 2);
        break;
      case 3:
        // Enviar mail con invitacion a grupo de whatsapp/zoom
        const emailTemplate = emailTemplates.whatsappInvitation.html(assignment.name);
        const email = await emailsService.sendEmailSES(assignment.email, 'Unete a nuestro de Whatsapp', emailTemplate)
        if(email.MessageId){
          await groupsRepo.updateAssignmentStatus(+id, 3);
        } else {
          return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        break;
      case 4:
        // Confirma asistencia y actualiza estado a finalizado y agrega fecha de finalizacion de la asignacion
        // TODO: Enviar correo a lider y agregar grupoId a User
        await groupsRepo.updateAssignmentStatus(+id, 4);
        break;
      case 5:
        return res.status(200).json({ success: true, message: 'Final status gotten already' });
      default:
        return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    return res.status(200).json({ success: true, message: 'Assignment status updated successfully' });
  },
  assignGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const { group_id } = req.body;
      const assignment = await groupsRepo.getAssignmentById(+id);

      if (!assignment) {
        return res.status(404).json({ success: false, message: 'Assignment not found' });
      }

      await groupsRepo.assignGroup(+id, assignment.email, group_id);
      await groupsRepo.updateAssignmentStatus(+id, 1);
      const emailTemplate = emailTemplates.groupAssigned.html(assignment.name);
      await emailsService.sendEmailSES(assignment.email, 'Grupo asignado', emailTemplate);
      //Enviar correo al lider
      
      return res.status(200).json({ success: true, message: 'Group assigned successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error assigning group', error: error.message });
    }
  },
  saveWelcomeCommunityPerson: async (req, res) => {
    try {
      // TODO: VALIDAR QUE NO EXISTA EL EMAIL Y QUE NO FALTEM CAMPOS
      await groupsRepo.saveWelcomeCommunityPerson(req.body);

      return res.status(200).json({ success: true, message: 'Welcomed community person successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error welcoming community person', error: error.message });
    }
  },
  getWelcomeCommunityList: async (req, res) => {
    try {
    const { date } = req.query;
    console.log(date);

    const welcomeCommunity = await groupsRepo.getWelcomeCommunityList(date);
    return res.status(200).json(welcomeCommunity);
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error getting welcome community', error: error.message });
    }
  },
}