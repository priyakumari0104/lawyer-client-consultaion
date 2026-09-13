const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const connectDB = require("./db/db");
const registerRoutes = require("./routes/register.routes");
const lawyerRoutes = require("./routes/lawyer.route");
const adminroute = require("./routes/admin.route");
const authRoutes = require("./routes/auth.route");
const appointmentroute = require("./routes/appointment.route");
const messageroute= require("./routes/message.route");
const notificationroute=require("./routes/notification.route");
const documentroute=require("./routes/document.route");
const activityroute=require("./routes/activity.route");


const cors = require("cors");
const allowedOrigins=[
    "http://localhost:5173",
  "https://lawyer-client-consultation.vercel.app",
  "https://lawyer-client-consultation-ihbd4n6rd.vercel.app"
];
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}));
require("dotenv").config();
app.use(express.json());

app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/client", registerRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminroute);
app.use("/api/appointment", appointmentroute);
app.use("/api/chat",messageroute);
app.use("/api/notification",notificationroute);
app.use("/api/document",documentroute)
app.use("/api/activity",activityroute);

connectDB();

module.exports = app;
