const Activity = require("../models/activity.model");

const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.log("Error fetching activities:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecentActivities,
};