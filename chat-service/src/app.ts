import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const crypto = require("crypto");

import {generateDeterministicId} from './utils/hashGenerator';

const app = express();


const port = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

let onlineUsers: string[] = [];

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected");
  console.log('A client connected with ID:', socket.id);
  let userId = socket.id;

  onlineUsers.push(userId);

  io.sockets.emit("online", onlineUsers);

  socket.on('disconnect', () => {
    console.log("User disconnected");
    onlineUsers = onlineUsers.filter((user) => user !== userId);
    io.sockets.emit("online", onlineUsers);
    socket.disconnect()
  })

  socket.on("user-message", (message, mySocketId, friendId) => {
    const messageID = crypto.randomUUID();
    const roomID = generateDeterministicId(mySocketId, friendId)
    console.log(`Message: ${message} from ${mySocketId} to ${friendId}`);
    io.emit(`message${roomID}`, message, messageID.toString());
  });
});

server.listen(port, () => console.log(`Server Started at PORT:${port}`));