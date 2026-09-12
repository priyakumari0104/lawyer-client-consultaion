import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "../styles/chat.css";

const socket = io(import.meta.env.VITE_BASE_URL);

const Chat = () => {
  const { appointmentId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Join the room whenever appointmentId changes
  useEffect(() => {
    socket.emit("joinRoom", appointmentId);
  }, [appointmentId]);

  // 2. Listen for incoming socket messages (Cleans up correctly to prevent memory leaks)
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // 3. FIXED: Fetch older history and ensure it maps safely
 const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/chat/${appointmentId}`);
      
      console.log("=== CHAT DEBUG LOG ===");
      console.log("Data Type:", typeof response.data);
      console.log("Raw Response Data:", response.data);
      
      // 1. If it's a straight array
      if (Array.isArray(response.data)) {
        console.log("Structure matched: Array");
        setMessages(response.data);
        return;
      }
      
      // 2. If it's an object, let's look inside it
      if (response.data && typeof response.data === 'object') {
        // Look for any array inside the object keys (e.g., messages, chats, data)
        const nestedArray = Object.values(response.data).find(val => Array.isArray(val));
        
        if (nestedArray) {
          console.log("Structure matched: Nested Array found inside object");
          setMessages(nestedArray);
          return;
        }

        // If the object itself represents a single message document
        if (response.data.text || response.data.message) {
          console.log("Structure matched: Single Message Object");
          setMessages([{
            text: response.data.text || response.data.message,
            senderId: response.data.senderId || "historical",
            senderName: response.data.senderName || "History"
          }]);
          return;
        }
      }

      // 3. If it's returning a single direct string
      if (typeof response.data === "string" && response.data.trim() !== "") {
        console.log("Structure matched: Raw String");
        setMessages([{
          text: response.data,
          senderId: "historical",
          senderName: "History"
        }]);
        return;
      }

      console.log("Structure Warning: Response fell through all matches.");
    } catch (error) {
      console.error("Error retrieving historical log:", error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [appointmentId]);

  // 4. FIXED: Removed the local setMessages push to prevent the double-render bug
  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      room: appointmentId,
      text: message,
      senderId: currentUser._id,
      senderName: currentUser.fullName || "User"
    };

    // Send to server. The server will broadcast it back, hitting our socket listener above.
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-viewport-centerer">
      <div className="chat-window-box">
        
        {/* Chat Window Title Header */}
<div className="chat-header">
  <div className="chat-header-info">
    {/* Clean, interactive Back Arrow Link */}
    <Link 
      to={currentUser.role === "lawyer" ? "/lawyer/appoinments" : "/client/appointments"} 
      className="chat-back-arrow-btn"
      title="Return to Appointments"
    >
      ← Back
    </Link>
    
    <div className="header-divider-line"></div>

    <span className="secure-icon">🔒</span>
    <div>
      <h3>Secure Legal Workspace</h3>
      <p className="chat-status-sub">End-to-end encrypted consultation channel</p>
    </div>
  </div>
  
  {/* Keeps the traditional exit trigger on the right side as well */}
  <Link to={currentUser.role === "lawyer" ? "/lawyer/appoinments" : "/client/appointments"} className="close-chat-x">
    ×
  </Link>
</div>

        <div className="chat-messages-body">
          {messages.length === 0 ? (
            <div className="empty-chat-notice">
              <p>Conversation initiated. Type a message below to consult regarding your case profile.</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMyMessage = msg.senderId === currentUser._id;
              return (
                <div key={index} className={`message-row ${isMyMessage ? "outgoing" : "incoming"}`}>
                  <div className="message-bubble">
                    {!isMyMessage && <span className="sender-tag">{msg.senderName}</span>}
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-dock">
          <input
            type="text"
            placeholder="Type your message legal brief here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage} className="chat-send-btn">
            Send ⚡
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;