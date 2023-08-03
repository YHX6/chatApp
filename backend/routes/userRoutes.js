const { register, login, setAvatar, getAllUsers } = require("../controllers/userController");

const Router = require("express").Router();


Router.post("/register", register);
Router.post("/login", login);
Router.post("/setAvatar/:id", setAvatar);

Router.get("/allUsers/:id", getAllUsers); 


module.exports = Router;