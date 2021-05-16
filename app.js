const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Authentification endpoints
app.post("/signup", AuthController.signUp);
app.post("/login", AuthController.login);

app.get("/user/all", UserController.getAllUsers);
app.get("/user/:id", UserController.getUserById);
app.get("/messages", (req, res) => {
  res.json({ messages })
})



// Socket.io
let users = [];

const messages = {
  main: [],
  dyl: []
}

io.on('connection', (socket) => {
  socket.on("join server", (username) => {
    socket.username = username
    const user = {
      username: socket.username,
      id: socket.id
    }
    console.log(`${user.username} is conected`);
    users.push(user);
    io.emit('new user', users)
    console.log(users)
  })
  socket.on("join room", (roomName, cb) => {
    socket.join(roomName)
    cb(messages[roomName])
    console.log(getAllRooms())
    console.log(`${socket.username} joined "${roomName}" room`)
  })

  socket.on("send message", ({content, to, sender, chatName, isChannel}) => {
      const payload = {
        content: content,
        chatName: isChannel ? chatName : sender,
        sender: sender,
      }
      socket.to(to).emit("new message", payload)
      if (messages[chatName]) {
        messages[chatName].push({
          sender,
          content
        })
      }
      console.log(messages[chatName])
  })
  
  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id)
    io.emit("new user", users)
    console.log(`${socket.username} is disconnected`);
  });


  function getAllRooms() {
    const allRooms = []
    const rooms = Object.fromEntries(io.sockets.adapter.rooms.entries())
    if(rooms) {
      console.log(rooms)
      for (let room in rooms) {
        const set = rooms[room]
        rooms[room] = [...set].toString()
        if(room != rooms[room]) {
          allRooms.push(room)
        }
      }
      return allRooms 
    }
  }
});


module.exports = { app, server };