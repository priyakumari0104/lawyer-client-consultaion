const Notification=require("../controllers/Notification.controller");
const express=require("express");
const router=express.Router();
router.get("/:userId",Notification.getAllNotifications);
router.put("/read/:id",Notification.markAsRead);
router.delete("/:id",Notification.deleteNotification);
router.delete("/clear/:userId",Notification.deleteAllNotification);
module.exports=router;