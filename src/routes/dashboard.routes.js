const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");

router.get("/dashboard", async (req, res) => {
  try {
    const dashboardData = await DashboardController.getDashboardData();
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

module.exports = router;
