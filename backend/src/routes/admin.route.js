const express=require('express');
const router= express.Router();
const admincontroller=require("../controllers/admin.controller");

router.get("/pending-lawyer",admincontroller.getpendinglawyer);
router.put("/approve-lawyer/:id",admincontroller.approvelawyers);
router.put("/reject-lawyer/:id",admincontroller.rejectlawyer);
module.exports=router;