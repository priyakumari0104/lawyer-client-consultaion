const express= require("express");
const router=express.Router();
const messageController=require("../controllers/message.controller");
router.get("/:appointmentId",messageController.getMessages);
module.exports=router;