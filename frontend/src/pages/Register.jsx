import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo192.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRouter } from '../utils/APIRoutes';
import "../assets/css/style.css";
import bg from "../assets/react-bg.jpg";


function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

     // if local store user info, we skip this part and log into the account
    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
    }, [navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){

            const {password, username, email} = values;
            // use axios to send req/resp
            const {data} = await axios.post(registerRouter, {
                username,
                email,
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

    // set toast
    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark",

    };


    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values;
        if(password !== confirmPassword){
            // pops up a toastify banner 
            toast.error("Password and confirm password are not the same!", toastOptions);
            return false;
        }else if(email === ""){
            toast.error("Email is required!", toastOptions);
            return false;
        }else if(username.length < 3){
            toast.error("Username should be longer than 3!", toastOptions);
            return false;
        }else if(password.length < 6){
            toast.error("Password should be longer than 6!", toastOptions);
            return false;
        }
        return true;
    }

    return <>
        <img className='background-img' src={bg} alt="human and robot handshaking"></img>
        <div className='register_container'>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='brand'>
                    <img src={Logo} alt="logo"></img>
                    <h1>chat_xyh</h1>
                </div>
                <input type="text" placeholder='Username' name="username" onChange={(e) => {handleChange(e)}}></input>
                <input type="email" placeholder='Email' name="email" onChange={(e) => {handleChange(e)}}></input>
                <input type="password" placeholder='Password' name="password" onChange={(e) => {handleChange(e)}}></input>
                <input type="password" placeholder='Confirm password' name="confirmPassword" onChange={(e) => {handleChange(e)}}></input>
                
                <button type="submit">Create User</button>

                <span>Already have an account ? <Link to="/login">Login</Link></span>
            </form>
        </div>
        <ToastContainer>

        </ToastContainer>
    </>
};


export default Register;