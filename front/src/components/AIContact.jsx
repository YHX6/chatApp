import styled from "styled-components";
import ai_img from "../assets/ai_img.jpg";

export default function AIContact(){
    return (
        <Container>
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
        </Container>
    );
};


const Container = styled.div`
      background-color: #615f71;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .contact{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:0.8rem;
      }
      .avatar {
        img {
          height: 3.5rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
}`;