const Activity = require("../models/activity.model");

const createActivity = async ({
  category,
  title,
  message,
  relatedId,
  relatedModel,
}) => {
  try {
    console.log("========== CREATE ACTIVITY START ==========");
    console.log("DB NAME:", Activity.db.name);
    console.log("COLLECTION NAME:", Activity.collection.name);

    const activity = await Activity.create({
      category,
      title,
      message,
      relatedId,
      relatedModel,
    });

    console.log("CREATED ACTIVITY:", activity);

    const foundActivity = await Activity.findById(activity._id);

    console.log("FOUND ACTIVITY FROM DB:", foundActivity);
    console.log("========== CREATE ACTIVITY END ==========");

    return activity;
  } catch (error) {
    console.log("ACTIVITY ERROR:", error);
    throw error;
  }
};

module.exports = createActivity;