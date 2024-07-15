import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    return <ChatApp />;
}

export default App;
const apiBaseURL = "https://live-coded-api-july-2024.glitch.me";

function ChatApp() {
    const [messages, setMessages] = useState([] as Message[]);
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

    interface Message {
        text: string;
        author: string;
    }

    async function handleGetAllMessages() {
        const reply = await axios.get(apiBaseURL + "/messages");
        setMessages(reply.data);
    }

    async function handleSendMessage() {
        const message: Message = {
            author,
            text,
        };

        const reply = await axios.post(apiBaseURL + "/messages", message);
        if (reply.status === 200) {
            setAuthor("");
            setText("");
        } else {
            console.error("Failed to send message");
            alert("ERROR: see logs");
        }
    }
    return (
        <div>
            <h1>Chat App</h1>
            <input
                value={author}
                onChange={(ev) => setAuthor(ev.target.value)}
            />
            <input value={text} onChange={(ev) => setText(ev.target.value)} />
            <hr />
            <div>text: {text}</div>
            <div>author: {author}</div>
            <button onClick={handleSendMessage}>Send</button>
            <button onClick={handleGetAllMessages}>get all messages</button>
            <div>
                {messages.map((m) => (
                    <div className="message">
                        <div>{m.author}</div>
                        <div>{m.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
