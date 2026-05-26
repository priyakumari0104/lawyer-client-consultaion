 const express = require('express');
  const router = express.Router();
 const userauth = require('../controllers/user.register');
 
 router.put("/update/:id",userauth.updateClient);
 router.post("/register", userauth.register);
 

  module.exports = router;
