const { addMessage, getAllMessage } = require("../controllers/messageController");

const Router = require("express").Router();


Router.post("/addmsg", addMessage);
Router.post("/getallmsg", getAllMessage);



module.exports = Router;