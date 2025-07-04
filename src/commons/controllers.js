import commonsRepo from "./repository.js"

export const commonsControl = {
  getCabaLocations: async (req, res) => {
    try {
      const locations = await commonsRepo.getCabaLocations();

      return res.status(200).json({ success: true, data: locations });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}