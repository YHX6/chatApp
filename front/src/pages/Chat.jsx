import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import {allUsersRouter, host} from "../utils/APIRoutes";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import ChatContainerAI from '../components/ChatContainerAI';
import {io} from "socket.io-client";



function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showAIChat, setShowAIChat] = useState(false);
    // load current user
    useEffect( () => {
        const asyncUseEffect = async () => {
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            
                // console.log("current User is:");
                // console.log(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
        };
        asyncUseEffect();
    },[navigate])   

    
    useEffect(() => {
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }

    },[currentUser]);

    // load contacts
    useEffect( () => {
        const asyncUseEffect = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    // console.log(`${allUsersRouter}/${currentUser._id}`);
                  const data = await axios.get(`${allUsersRouter}/${currentUser._id}`);
                  // console.log(data.data.users);
                  const users = data.data.users;
                  // console.log(users);
                  setContacts(users);
              
                } else {
                  navigate("/setAvatar");
                }
            }
        };

        asyncUseEffect();
    },[currentUser,navigate]);

    const changeChat = (chat) => {
      setCurrentChat(chat);
      setShowAIChat(false);
    };

    const changeChatAI = () => {
      setCurrentChat(undefined);
      setShowAIChat(true);
    }

    
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} changeChat={changeChat} changeChatAI={changeChatAI}></Contacts>
                {currentChat === undefined ? 
                (showAIChat ? <ChatContainerAI currentUser={currentUser}></ChatContainerAI> : <Welcome ></Welcome>) : 
                (
                  <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}></ChatContainer>
                )}
                
                
            </div>

            
        </Container>
        
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #343541;
    display: grid;
    grid-template-columns: 300px 1fr;
  }
  `;

export default Chat;