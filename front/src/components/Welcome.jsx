import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome(){
    const [userName, setUserName] = useState("");
    useEffect( () => {
        const asyncUseEffect = async () => {
            // setUserName(await JSON.parse(localStorage.getItem("chat-app-user")).username);
            setUserName("test");
        };
        asyncUseEffect();
    },[])

    return (
        <div className="welcome_container">
            <img src={Robot} alt="robot"></img>
            <h1>Welcome, <span>{userName}</span></h1>
            <h3>Please select a chat to start messaging!</h3>
        </div>
    );
}
