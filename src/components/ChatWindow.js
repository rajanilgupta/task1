import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesContainerRef = useRef(null);

  const getAIResponse = (userInput) => {
    return `You said: ${userInput}`;
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { text: userInput, fromUser: true }]);
      setUserInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.fromUser) {
        const aiResponse = getAIResponse(lastMessage.text);
        setMessages([...messages, { text: aiResponse, fromUser: false }]);
      }

      // Scroll to the bottom of the messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.fromUser ? "user" : "ai"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
