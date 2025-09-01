import zonesRepo from "./repository.js";
import { formatZones } from "../services/scripts.js";
import { z } from "zod";

export const zonesControl = {
  getAllLeaders: async (req, res) => {
    try {
      const leaders = await zonesRepo.getAllLeaders();
      return res.status(200).json(leaders);
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error getting leaders', error: error.message });
    }
  },
  getZones: async (req, res) => {
    try {
      const zones = await zonesRepo.getZones();
      const formattedZones = formatZones(zones);

      return res.status(200).json(formattedZones);
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error getting zones', error: error.message });
    }
  }
}