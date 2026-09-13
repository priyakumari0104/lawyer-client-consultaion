const app=require("./src/app");
const http= require("http");
const {Server}=require("socket.io");
const server=http.createServer(app);
const Message=require("./src/models/message.model");
const PORT=process.env.PORT||3000;
const allowedOrigins=[
  "http://localhost:5173",
  "https://lawyer-client-consultation.vercel.app",
  "https://lawyer-client-consultation-ihbd4n6rd.vercel.app"
];
const io=new Server(server,{
  cors:{
    origin:allowedOrigins,
    methods:["GET","POST"],
    Credentials:true,
  },
});
io.on("connection",(socket)=>{
  console.log("User connected",socket.id);
  socket.on("joinRoom",(appointmentId)=>{
    socket.join(appointmentId);
    console.log(`Joined room ${appointmentId}`);
  });
  socket.on("sendMessage",async(data)=>{
    const message=await Message.create({
      appointmentId:data.room,
      senderId:data.senderId,
      text:data.text
    });
    io.to(data.room).emit("receiveMessage",message);
  })
  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
  })
});
server.listen(PORT,"0.0.0.0",()=>{
  console.log(`Server is running on ${PORT}`);
})