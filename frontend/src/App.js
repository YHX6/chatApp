import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import "./assets/css/style.css";


export default function App(){
  return (
    <>
    <div>I'm testing</div>
        <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
        <Route path="/" element={<Chat></Chat>}></Route>
      </Routes>
    </BrowserRouter>
    </>

    // <Register></Register>
  )
};