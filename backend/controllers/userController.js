const { json } = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, resp, next) => {
    // console.log(req.body);
    try{
        const {username, email, password} = req.body;

        // check username
        const usernameCheck = await User.findOne({username});
        if(usernameCheck) return resp.json({msg:"Username already used!", status:false});



        // check email
        const emailCheck = await User.findOne({email});
        if(emailCheck) return resp.json({msg:"Email already used!", status:false});


        const hashedPassword = await bcrypt.hash(password, 10);    
        const user = await User.create({
            email,
            username,
            password:hashedPassword
        });
        delete user.password;
        return resp.json({status:true, user:user});
    }catch(e){
        next(e);
    }
    

};


module.exports.login = async (req, resp, next) => {
    // console.log(req.body);
    try{
        const {username, password} = req.body;

        // check username
        const user = await User.findOne({username});
        if(!user) return resp.json({msg:"Username not exist!", status:false});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return resp.json({msg:"Password incorrect!", status:false});
        }

        delete user.password;
        return resp.json({user, status:true});

    }catch(e){
        next(e);
    }
    

};
module.exports.setAvatar = async (req, resp, next) => {
    // console.log(req.body);
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet : true,
            avatarImage
        });
       
        return resp.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })

    }catch(e){
        next(e);
    }
    

};

module.exports.getAllUsers = async (req, resp, next) => {
    try{
        // find all users who's id is different from current client
        const users = await User.find({_id:{ $ne:req.params.id} }).select([
            "email", "username","avatarImage", "_id"
        ]);
        console.log("request for get users");
        return resp.json({users});
    }catch(e){
        next(e);
    }
};