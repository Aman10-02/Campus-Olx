let connectedUser = {};
require('dotenv').config();
// //console.log(process.env)
const express = require("express");
const authRoutes = require('./routes/auth');
const addsRoutes = require('./routes/adds');
const addsUpdateRoutes = require('./routes/addsUpdate');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const mongoose = require('mongoose');
require('./config/passport');
// const keys = require('./config/keys.env')
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require("cors");
const path = require("path")
const socketIo = require("socket.io");
const http = require("http"); 
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://campus-olx.onrender.com/", // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
app.use(express.json());
app.use(express.text())
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSIONCOOKIEKEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: "https://campus-olx.onrender.com/",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

// mongoose.connect("mongodb://127.0.0.1:27017/olxClone",
// () => {
//     //console.log("connected")
// },
// e => console.error(e)
// )

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("logIn", (user) => {
    console.log("A user loggedIN", user.userid);
    connectedUser[user.userid] = socket.id;
    // console.log("Received message:", message);
  });
  socket.on("newMessage", (user) => {
    console.log("Received message:", user.receiver);
    if(connectedUser.hasOwnProperty(user.receiver)){
      const socketid = connectedUser[user.receiver];
      io.to(socketid).emit("gotMessage");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    for (const key in connectedUser) {
      if (connectedUser[key] === socket.id) {
        delete connectedUser[key];
        console.log(`Deleted key: ${key}`);
      }
    }
  });
  console.log(JSON.stringify(connectedUser))
});

mongoose
  .connect(process.env.MONGODBCONNECT)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use("/auth", authRoutes);
app.use("/update", addsUpdateRoutes);
app.use("/adds", addsRoutes);
app.use("/user", userRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);





app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});





server.listen(process.env.PORT || 5000, () => {
    //console.log("server is running")
})