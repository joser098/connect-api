import groupsRepo from "./repository.js";

export  const groupsControl = {
  getAllGroups: async (req, res) => {
    const groups = await groupsRepo.getAllGroups();
    return res.status(200).json(groups);
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
  getAssignments: async (req, res) => {
    const assignments = await groupsRepo.getAssignments();
    return res.status(200).json(assignments);
  }
}