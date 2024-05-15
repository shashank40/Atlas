import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInTokenCheck } from "../hooks/SignIn";
import { socket } from "../dependencies/socketConnection";
import PermanentDrawerLeft from "./Drawer";

interface messageIdentification {
  message: string;
  messageID: string;
}

function generateDeterministicId(id1: string, id2: string) {
  // Combine the IDs and sort them
  const combinedId = (id1 + id2).split("").sort().join("");
  // Generate hash
  let hash = 0;
  for (let i = 0; i < combinedId.length; i++) {
    const char = combinedId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
}

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageIdentification[]>([]);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";
  const friendId: string = sessionStorage.getItem("friendId") || "";
  const mySocketId = socket.id || "";
  const roomID = generateDeterministicId(mySocketId, friendId);

  useEffect(() => {
    socket.on(`message${roomID}`, (message: string, messageID: string) => {
      setMessages([...messages, { message, messageID }]);
    });
  }, [message]);

  useEffect(() => {
    if (token !== null) {
      SignInTokenCheck(token)
        .then((response) => {
          if (response.status === 200) {
            navigate("/chat");
          }
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  const sendMessage = () => {
    socket.emit("user-message", message, mySocketId, friendId);
    setMessage("");
  };

  return (
    <div className="flex flex-auto">
      <div>
        <PermanentDrawerLeft setModalOpen={false} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-red-200">
        <div className="messages-container h-50 overflow-auto">
          {messages.map((msg, index) => (
            <div className="text-xl" key={index}>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input w-80 md:w-96 h-10 m-4 p-2"
          />
          <button onClick={sendMessage} className="send-button m-4 text-2xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
