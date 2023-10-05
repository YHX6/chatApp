import React, {useState, useEffect} from "react";
import Logo from "../assets/logo192.png";
import AIContact from "../components/AIContact";
import Logout from "./Logout";

export default function Contacts({contacts, changeChat, changeChatAI}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [aiSelected, setAiSelected] = useState(false);

    // console.log(contacts);

    useEffect(() => {
      const asyncUseEffect = async () => {
        const currentUser = await JSON.parse(localStorage.getItem("chat-app-user"));
          if(currentUser){    
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
          }
      };

      asyncUseEffect();
      // if(currentUser){
      //   setCurrentUserImage(currentUser.avatarImage);
      //   setCurrentUserName(currentUser.username);
      // };

    }, []);


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
        setAiSelected(false);
    };

    const setChatAI = () => {
      setCurrentSelected(undefined);
      setAiSelected(!aiSelected);
      changeChatAI();
    }



    return (

      <>
        {currentUserImage && currentUserImage && (
          <div className="contacts_container">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>chat_xyh</h3>
            </div>
            <div className={`ai_container ${aiSelected ?"aiselected" : ""}`} onClick={setChatAI}><AIContact></AIContact></div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className="current-user">
              <div className="user_info">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
       
              <Logout />
            </div>

          </div>
        )}
      </>
    );
};
