const Message = require("../models/messageModel");
const { AI_OBJECTID } = require("../utils/config");



module.exports.addUserMessage = async (req, resp, next) => {
    try{
        const {userID, message} = req.body;
        const data = await Message.create({
            message:{text:message},
            users:[userID, AI_OBJECTID],
            sender:userID
        });

        // console.log(data);

        if(data) return resp.json({msg:"Message added successfully!"});
        return resp.json({msg:"Error persisting message data!"});

    }catch(e){
        next(e);
    }
};
module.exports.addAIMessage = async (req, resp, next) => {
    try{
        const {userID, message} = req.body;
        // console.log(message);

        const data = await Message.create({
            message:{text:message},
            users:[AI_OBJECTID, userID],
            sender:AI_OBJECTID
        });

        // console.log(data);

        if(data) return resp.json({msg:"Message added successfully!"});
        return resp.json({msg:"Error persisting message data!"});

    }catch(e){
        next(e);
    }
};


module.exports.getAllMessage = async (req, resp, next) => {
    try{
        const {userID} = req.body;
        // find the messages between these two
        const messages = await Message
            .find({
                users:{$all:[userID, AI_OBJECTID]},
            })
            .sort({updateAt: 1});

        // console.log(messages);
        
        // check message directtion
        const theMessages = messages.map((msg) => {
            return {
                fromSelf:msg.sender.toString() === userID,
                message:msg.message.text,
            };
        });    

        resp.json(theMessages);
    }catch(e){
        next(e);
    }
};