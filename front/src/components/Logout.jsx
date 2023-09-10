import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {BiPowerOff} from "react-icons/bi";

export default function Logout(){
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.clear();
        navigate("/login");
    };




    return (
        <button onClick={logout} className="logout">
            <BiPowerOff>
            </BiPowerOff>
        </button>
    );
};


