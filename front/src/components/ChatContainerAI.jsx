import React, { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput';
import axios from 'axios';
import { addAIMessagesAI, addUserMessagesAI, getAllMessagesAI } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";
import ai_img from "../assets/ai_img.jpg";
import { chatWithAI } from '../utils/OpenAIConfig';


export default function ChatContainerAI({currentUser}){
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  // const [prompt, setPrompt] = useState([]);

  // get all history messages
  useEffect( () => {
    const asyncUseEffect = async () => {        
        const resp = await axios.post(getAllMessagesAI, {
            userID:currentUser._id
        });
  
        setMessages(resp.data);
    };
    asyncUseEffect();
  },[currentUser]);

    // send message to server and other uses
    const handleSendMsg = async (msg) => {
      // user send mesg
      await axios.post(addUserMessagesAI, {
      userID:currentUser._id,
        message:msg
      });
  
      // update local messaages
      const msgs = [...messages];
      msgs.push({fromSelf:true, message:msg});
      setMessages(msgs);
  
      // setMessages(msgs, () => {
      //   // The setState function takes an optional callback parameter that can be used to make updates after the state is changed.
      //   this.receiveAIMessage();
      // });
  
    };
  
  
  
  
    const receiveAIMessage = async (prompt)=> {
      // get AI response
      const msg = await chatWithAI(prompt);
  
      // store ai message into database
      await axios.post(addAIMessagesAI, {
          userID:currentUser._id,
          message:msg,
      });
          
      // update local messaages
      const msgs = [...messages];
      msgs.push({fromSelf:false, message:msg});
      setMessages(msgs);
  
      // console.log("set new messages after receiving from open ai");
  
    };

  useEffect( () => {
    // console.log("messages changed")
    // console.log(messages);
    if(messages.length > 0 && messages[messages.length - 1].fromSelf){
      const p =[
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: "Hello world"},
        {role: 'assistant', content: 'Hello! How may I assist you today?'},
        ];
        // update prompt
      for(let msg of messages){
          if(msg.fromSelf){
              p.push({role:"user", content:msg.message});
          }else{
              p.push({role:"assistant", content:msg.message});
          }
      }
      // console.log(p);
      receiveAIMessage(p);
    }
  },[messages]);

  // init/update prompt when message change
  // useEffect(() => {    
    // const p =[
    //   {role: "system", content: "You are a helpful assistant."},
    //   {role: "user", content: "Hello world"},
    //   {role: 'assistant', content: 'Hello! How may I assist you today?'},
    //   ];
    //   // update prompt
    // for(let msg of messages){
    //     if(msg.fromSelf){
    //         p.push({role:"user", content:msg.message});
    //     }else{
    //         p.push({role:"assistant", content:msg.message});
    //     }
    //     setPrompt(p);
    // }

  // },[messages]);






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
                src={ai_img}
                alt=""
              />
            </div>
            <div className="username">
              <h3>ChatAI</h3>
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
