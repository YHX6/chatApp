import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo192.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRouter } from '../utils/APIRoutes';
import bg from "../assets/react-bg.jpg";


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
        <div className='login_container'>
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
        </div>
        <ToastContainer>

        </ToastContainer>
    </>
};

export default Login;