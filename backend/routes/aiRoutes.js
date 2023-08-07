const { addUserMessage, addAIMessage,getAllMessage } = require("../controllers/aiController");

const Router = require("express").Router();


Router.post("/addusermsg", addUserMessage);
Router.post("/addaimsg", addAIMessage);
Router.post("/getallmsg", getAllMessage);



module.exports = Router;