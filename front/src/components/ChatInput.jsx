import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";


export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");


    const switchEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
      // alert(123);
    }
    const chooseEmoji = ( emojiObject) => {
      console.log(emojiObject);
        let message = msg;
        message += emojiObject.emoji;
        
        setMsg(message);
        
    };
    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
    } ;


    return (
        <div className="chatinput_container">
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={switchEmojiPicker}/>
                    {
                       showEmojiPicker && <Picker onEmojiClick={chooseEmoji} disableAutoFocus={true} native></Picker>
                    }
                   
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" 
                    placeholder="Type your message here..." 
                    value={msg} 
                    onChange={(e) => setMsg(e.target.value)}></input>
                <button className="submit">
                    <IoMdSend></IoMdSend>
                </button>
            </form>
        </div>
    );
};
