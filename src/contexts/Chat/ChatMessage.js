import React from "react";
import "./ChatMessage.css";

function ChatMessage(props) {
    return(
        <div className="chatMessage">
            <p className={props.isSender ? "chatMessage_message chatMessage_sender" : "chatMessage_message"}>
                <span className="chatMessage_name">
                    {props.name}
                </span>
                {props.message}
                <span className="chatMessage_timestamp">
                    {props.timestamp}</span>              
            </p>
        </div>
    );
}

export default ChatMessage;