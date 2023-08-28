const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const aiRouters = require("./routes/aiRoutes");
const socket = require("socket.io");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const { ObjectId } = require('mongodb');

const app = express();


// config
require("dotenv").config();  // use this to access .env variables
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/ai", aiRouters);


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

// create ai account
const initAI = async () =>{
    // const aiId = process.env.AI_ID;
    const aiId = new ObjectId(process.env.AI_ID);
    const aiCheck = await User.findOne({_id:aiId});
    if(!aiCheck){
        const hashedPassword =  bcrypt.hashSync(process.env.AI_PASSWORD, 10);    
        const user = await User.create({
            _id:aiId,
            email:process.env.AI_EMAIL,
            username:"ChatAI",
            password:hashedPassword
        });
    }
};
initAI();





// socket io connection
const io = socket(server, {
    cors:{
        origin:"http://localhost:3002",
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

