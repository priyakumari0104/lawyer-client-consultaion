 const express= require('express');
  const router=express.Router();
  const bookAppoinments= require('../controllers/appoinment.controller');
router.post("/book",bookAppoinments.bookAppoinment);

  module.exports=router;