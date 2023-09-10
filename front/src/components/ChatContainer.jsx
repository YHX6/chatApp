import React, { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRouter, getAllMessagesRouter } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";


export default function ChatContainer({currentChat, currentUser, socket}){
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage]= useState(null);

  // get all history messages
  useEffect( () => {
    const asyncUseEffect = async () => {
      if(currentChat){
        const resp = await axios.post(getAllMessagesRouter, {
          from:currentUser._id,
          to:currentChat._id
        });
        setMessages(resp.data);
      }
    };

    asyncUseEffect();
  },[currentChat, currentUser])

  // send message to server and other uses
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRouter, {
      from:currentUser._id,
      to:currentChat._id,
      message:msg
    });

    // send to user
    socket.current.emit("send-msg", {
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    });
    console.log(123);
    // update local messaages
    const msgs = [...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs);
  };

  //listen and receive message from socket io
  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({fromSelf:false, message:msg})
      });
    }
  },[socket]);

  // add new arrivalMessage
  useEffect(() => {
    arrivalMessage&&setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage])

  // scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


    return (
      <div className='chatcontainer_container'>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
         
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    );
};