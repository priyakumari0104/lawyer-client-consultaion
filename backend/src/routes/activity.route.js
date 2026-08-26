const express=require("express");
const router=express.Router();
const activitycontroller=require("../controllers/activity.controller");
router.get("/recent",activitycontroller.getRecentActivities);
module.exports=router;