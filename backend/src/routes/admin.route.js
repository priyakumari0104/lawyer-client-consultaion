const express=require('express');
const router= express.Router();
const admincontroller=require("../controllers/admin.controller");

router.get("/pending-lawyer",admincontroller.getpendinglawyer);
router.put("/approve-lawyer/:id",admincontroller.approvelawyers);
router.put("/reject-lawyer/:id",admincontroller.rejectlawyer);
router.get("/dashboard",admincontroller.dashboardStats);
router.get("/manage-user",admincontroller.manageUsers);
module.exports=router;