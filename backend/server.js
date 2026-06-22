const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const Message = require("./src/models/message.model");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("joinRoom", (appointmentId) => {
    socket.join(appointmentId);

    console.log(`Joined room ${appointmentId}`);
  });
  socket.on("sendMessage", async (data) => {
    const message = await Message.create({
      appointmentId: data.room,
      senderId: data.senderId,
      text: data.text,
    });

    io.to(data.room).emit("receiveMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
server.listen(3000, () => {
  console.log("server is running on port 3000");
});
