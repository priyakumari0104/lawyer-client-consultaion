const express =
require('express');

const router =
express.Router();

const authController =
require("../controllers/login.controller");

router.post(

  "/login",

  authController.Login

);

module.exports = router;