import ai_img from "../assets/ai_img.jpg";

export default function AIContact(){
    return (
        <div className="aicontact_container">
            <div
                // key={contact._id}
                    className="contact"
                    // onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={ai_img}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3><b>CHAT AI</b></h3>
                    </div>
                  </div>
        </div>
    );
};
