import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    return <ChatApp />;
}

export default App;

function ChatApp() {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

    interface Message {
        text: string;
        author: string;
    }
    async function sendMessage() {
        const message: Message = {
            author,
            text,
        };
        const apiBaseURL = "https://live-coded-api-july-2024.glitch.me";

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
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
