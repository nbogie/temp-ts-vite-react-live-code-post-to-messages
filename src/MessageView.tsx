import { Message } from "./ChatApp.tsx";

export function MessageView(props: { message: Message }) {
    const m = props.message;
    return (
        <div className="message">
            <div className="author">{m.author} says</div>
            <div className="text">{m.text}</div>
        </div>
    );
}
