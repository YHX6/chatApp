const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");


const app = express();

// config
require("dotenv").config();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);
app.use("/api/msg", messageRoutes);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("DB connected!");
}).catch(err => {
    console.log(err.message);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
});


// socket io connection
const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        Credential:true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });


    socket.on("send-msg", (data) => {
        console.log(data);
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            console.log(data);
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
});

