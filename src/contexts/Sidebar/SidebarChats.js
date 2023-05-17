import "./SidebarChats.css";
import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min';
import { deepPurple } from "@mui/material/colors";

Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';


function SidebarChats(props) {

    const stringToColor = (string) => {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      

    const createChat = async() => {
        const roomName = prompt("Enter a name a new Chat")
        if(!roomName) return;
        const rooms = new Parse.Object('rooms');
        rooms.set('name', roomName);
        rooms.set('message', "A message");
        try {
            await rooms.save();
            return true;
        } catch (error) {
            // console.log(`Error! ${error.message}`);
            return false;
        }
    };

    return !props.newChat ?(
        <Link to={`/rooms/${props.roomId}`} className="links">
            <div className="sidebarChats">
                <Avatar
                    // backgroundColor={dame_color_aleatorio()}
                    alt={props.room}
                    src={`https://avatar.dicebear.com/api/human/${props.roomId}.svg`}
                    // src={`https://api.dicebear.com/5.x/personas/${props.roomId}svg`}
                    // sx={{ bgcolor: `${dame_color_aleatorio}` }}
                    // sx={{ bgcolor: deepPurple[500] }}          
                    // {...stringAvatar()}
                    
                    sx= {{bgcolor: stringToColor(`${props.room}`)}}
                      
                />
                <div className="sidebarChats_info">
                    <h2>{props.room}</h2>
                    <p>{props.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChats" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SidebarChats;