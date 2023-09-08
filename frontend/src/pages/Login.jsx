import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo192.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRouter } from '../utils/APIRoutes';
import bg from "../assets/react-bg.jpg";
import { getOpenAiKey } from '../utils/AWSConfig';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username:"",
        password:"",
    });

    // if local store user info, we skip this part and log into the account
    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
    }, [navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){

            const {password, username} = values;
            // use axios to send req/resp
            const {data} = await axios.post(loginRouter, {
                username,
                password
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }else{
                //store info locally and navigate to home page
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/");
            }

            

        }
    };



    const handleChange = (event) => {
        setValues({...values, [event.target.name]:event.target.value});
    };

    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark",

    };



    const handleValidation = () => {
        const {password, username} = values;
        if(!username){
            toast.error("Username is required!", toastOptions);
            return false;
        }else if(!password){
            toast.error("Password is required!", toastOptions);
            return false;
        }
        return true;
    }

    return <>
        <img className='background-img' src={bg} alt="human and robot handshaking"></img>
        <FormContainer>
            <button onClick={getOpenAiKey}>Test Open AI</button>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='brand'>
                    <img src={Logo} alt="logo"></img>
                    <h1>chat_XYH</h1>
                </div>
                <input type="text" placeholder='Username' name="username" min="3" onChange={(e) => {handleChange(e)}}></input>
                
                <input type="password" placeholder='Password' name="password" onChange={(e) => {handleChange(e)}}></input>
               
                
                <button type="submit">Login</button>

                <span>Don't have an account ? <Link to="/register">Register</Link></span>
            </form>
        </FormContainer>
        <ToastContainer>

        </ToastContainer>
    </>
};

const FormContainer = styled.div`
    height:100vh;
    width:100wh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:rgba(40,57,101,0.6);

    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }

    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000086;
        border-radius: 2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline: none;
            }
        }
    }

    button{
        background-color: #997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        border-radius: 0.4rem;
        font-size:1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }

    span{
        color:white;
        text-transform: uppercase;
        a {
            color:#4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default Login;