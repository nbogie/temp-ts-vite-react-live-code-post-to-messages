import axios from "axios";
import { useState } from "react";
import { MessageView } from "./MessageView";

const apiBaseURL = "https://live-coded-api-july-2024.glitch.me";

export interface Message {
    text: string;
    author: string;
}

export function ChatApp() {
    const [messages, setMessages] = useState([] as Message[]);
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

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
            console.error(`Failed to send message - status ${reply.status}`);
            alert(`ERROR ${reply.status}: see logs`);
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
            <div className="messageList">
                {messages.map((m, index) => (
                    <MessageView key={index} message={m} />
                ))}
            </div>
        </div>
    );
}
