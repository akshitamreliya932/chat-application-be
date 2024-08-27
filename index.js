// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors")

const app = express();
app.use(cors());
const server = http.createServer(app);
const io =  socketIo(server,{
  cors : {
    origin : "http://localhost:3000",
    methods: ["GET","POST"],
   },
});

const PORT = process.env.PORT || 4000;


io.on('connection', (socket) => {
  console.log('New client connected',socket);

  socket.on('sendMessage', (message) => {
    io.to(message.roomId).emit('receiveMessage', message);

    console.log('message', message)
  });

  socket.on("join_room",(data) => {
    socket.join(data);
    console.log(`user joined with ${socket.id} join - ${data}` ) 
   }
  )

  socket.on('disconnect', () => {
    console.log('Client disconnected',socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
