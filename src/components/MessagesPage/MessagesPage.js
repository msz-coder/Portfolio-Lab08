import React, { useEffect, useState, useContext } from "react";
import "./MessagesPage.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import StyleContext from "../../contexts/StyleContext";

export default function MessagesPage() {
  const { isDark } = useContext(StyleContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://portfolio-api-backend-0544f6fc6e71.herokuapp.com/api/messages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load messages");
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => setError("Error loading messages"));
  }, []);

  return (
    <div className={isDark ? "dark-mode messages-page" : "messages-page"}>
      <Header />
      <main className="messages-container">
        <h1>Messages</h1>
        {error && <p className="error">{error}</p>}
        {messages.length === 0 && !error ? (
          <p>No messages found.</p>
        ) : (
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-card">
                <h3>{msg.name}</h3>
                <h4>{msg.subject}</h4>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}