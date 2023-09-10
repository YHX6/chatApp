import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import loading from "../assets/loading.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRouter } from '../utils/APIRoutes';
import {Buffer} from "buffer";


export default function SetAvatar(){
    const api = "https://api.multiavatar.com/";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark",

    };

    // check if we have user info locally already, if not we have to login first
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }
        };
        asyncUseEffect();
    }, [navigate])


    const setProfilePicture = async () => {
        // if profile is not selected, pops up a toast
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar", toastOptions);
        }else{ // if it is selected, send info to server with post method
            const user =  await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRouter}/${user._id}`, {
                image:avatars[selectedAvatar]
            })


            // send avatar to backend to store. Then get isSet attribute from backend, if isSet successfully, we redirect
            // console.log(data);
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
            }else{
                toast.error('Error setting avatar. Please try again', toastOptions);
            }


        }
    };

    // get avatars for choices
    useEffect(()=> {
        // async is not ok with useEffect anymore, so we first define it in the method then call it
        const asyncUseEffect = async () => {
            const data = [];
            for(let i=0; i<4; i++){
                // visit url every 0.5 s
                // setTimeout(async () => {
                //     const image = await axios.get(`${api}/${Math.round(Math.random()*10000)}`);
                //     const buffer = new Buffer(image.data);
                //     data.push(buffer.toString("base64"));
                // }, 500);
                const image = await axios.get(`${api}/${Math.round(Math.random()*10000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
                // await setTimeout(1000);
            };
            setAvatars(data);
            setIsloading(false);   
        };

        asyncUseEffect();
    }, []);



    return (
    <>
    {   // if is loading, show loader; else show the page
        isLoading ? 
        <div className='avatar_container'>
            <img src={loading} className='"loader' alt="loader"></img>
        </div> 
        : (
            <div className='avatar_container'>
            <div className="title-container">
                <h1>
                    Pick an avatar as your profile picture
                </h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar, index) => {
                        return ( 
                        <div className={`avatar ${selectedAvatar === index ? "selected": ""}`}>
                            <img 
                                src={`data:image/svg+xml;base64,${avatar}`}
                                 alt="a random avatar" 
                                onClick={() => setSelectedAvatar(index)}
                            />
                        </div>
                        );
                    })
                }
            </div>

            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile</button>
            <ToastContainer></ToastContainer>

        </div>
        
        )
    }
        
    </>
    );
};
