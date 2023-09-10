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

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: transparent;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      /* .emoji-picker-react { */
      .EmojiPickerReact{
        position: absolute;
        top: -500px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-header-overlay{
          display: none;
        }

        .epr-emoji-category-label{
          background-color:  #080420;
        }

        .epr-preview{
          display: none;
        }

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    box-shadow: 10px 5px 5px rgba(0,0,0,0.55);
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;