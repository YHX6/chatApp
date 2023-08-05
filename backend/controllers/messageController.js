const Message = require("../models/messageModel");

module.exports.addMessage = async (req, resp, next) => {
    try{
        const {from, to, message} = req.body;
        const data = await Message.create({
            message:{text:message},
            users:[from, to],
            sender:from
        });

        console.log(data);

        if(data) return resp.json({msg:"Message added successfully!"});
        return resp.json({msg:"Error persisting message data!"});

    }catch(e){
        next(e);
    }
};


module.exports.getAllMessage = async (req, resp, next) => {
    try{
        const {from, to} = req.body;
        // find the messages between these two
        const messages = await Message
            .find({
                users:{$all:[from, to]},
            })
            .sort({updateAt: 1});
        
        // check message directtion
        const theMessages = messages.map((msg) => {
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            };
        });

        resp.json(theMessages);
    }catch(e){
        next(e);
    }
};