import { FormControl, IconButton, InputAdornment } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Send, Mic } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import { useParams } from "react-router-dom";
import Parse from 'parse/dist/parse.min';
import LoggingIn from "../../auth/logging/LoggingIn";
import { lightBlue } from "@mui/material/colors";
import TextField from '@material-ui/core/TextField';
import { blueGrey } from "@material-ui/core/colors";
import { useParseQuery } from "@parse/react";

Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';

function Chat(props) {
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const {roomId} = useParams();
    const [{currentUser, setCurrentUser}] = useState(LoggingIn());
    const senderNicknameName = currentUser("username");
    // const receiverNicknameName = ;
    // const [messages, setMessages] = useState();

    
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        window.location.href = "/";
        return true;
      }
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    console.log(senderNicknameName)
    return currentUser;
  };

    (async () => {
        const query = new Parse.Query("rooms");
        try {
            const object = await query.get(roomId);
            try {
            const response = await object.get("name");
            setRoomName(response);
            console.log(response);
            } catch (error) {
            console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
        })();

    const sendMessage = (e) => {
        e.preventDefault();
        alert(input);
        setInput("");
    }

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }
        
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar
                    alt={roomName}
                    src={`https://api.dicebear.com/5.x/personas/${props.roomId}.svg`}
                />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at: {props.lastSeenDate}</p>
                </div>
                <div className="chat_headerButtons">
                    <IconButton>
                        <SearchOutlined style={{ color: lightBlue[500] }} />
                    </IconButton>
                    {/* <IconButton>
                        <AttachFile style={{ color: lightBlue[500] }} />
                    </IconButton> */}
                    <IconButton>
                        <MoreVert style={{ color: lightBlue[500] }} onClick={doUserLogOut} />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
               <div className="chat_body_container">
                    <ChatMessage name={"Mia Khalifa"}
                        message={"Hello. How are you?"}
                        timestamp={"8:26 p.m."}
                        isSender={true}
                    />
                    <ChatMessage name={"Mia Khalifa"}
                        message={"Hello. How are you?"}
                        timestamp={"8:26 p.m."}
                        isSender={false}
                    />
               
                    <div className="chat_footer">                    
                        <FormControl>
                            <TextField
                                id="outlined-textarea"
                                placeholder="Mensaje"
                                className="text_field"
                                multiline
                                variant="outlined"
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <InsertEmoticon style={{ color: blueGrey[500] }} />
                                            </IconButton>
                                        </InputAdornment>              
                                    ),
                                    endAdornment:(
                                        <InputAdornment position="flex-end">
                                            <IconButton>
                                                <Send onClick={sendMessage} style={{ color: blueGrey[500] }} />
                                            </IconButton>                                    
                                        </InputAdornment>
                                    ),
                                }}
                                value={input}
                                onChange={handleOnChange}                                
                            />
                        </FormControl>
                        <IconButton>
                            <Mic style={{ color: blueGrey[500] }} />
                        </IconButton>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default Chat;