 const express = require('express');
 const cookieparser= require('cookie-parser');
 const connectDB = require('./db/db');
const registerRoutes = require('./routes/register.routes');
const lawyerRoutes = require('./routes/lawyer.route');
const bookAppoinments= require('./routes/bookappoinments.route')
 const authRoutes = require('./routes/auth.route');
 const cors = require('cors');
require('dotenv').config();
 const app=express();
 app.use(express.json());
app.use(cors());
 app.use(cookieparser());

 app.use(express.urlencoded({ extended: true }));
  app.use("/api/client",registerRoutes);
   app.use("/api/lawyer",lawyerRoutes);
    app.use("/api/auth",authRoutes);
    app.use("/api/appoinment",bookAppoinments);
 connectDB();
  app.get("/",(req,res)=>{
    res.send("Hello World");
  })
  module.exports=app;
