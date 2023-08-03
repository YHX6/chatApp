import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome(){
    const [userName, setUserName] = useState("");
    useEffect( () => {
        const asyncUseEffect = async () => {
            setUserName(await JSON.parse(localStorage.getItem("chat-app-user")).username);
        };
        asyncUseEffect();
    },[])

    return (
        <Container>
            <img src={Robot} alt="robot"></img>
            <h1>Welcome, <span>{userName}</span></h1>
            <h3>Please select a chat to start messaging!</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;