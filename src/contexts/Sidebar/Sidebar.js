import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { Chat, DonutLarge, MoreVert } from "@mui/icons-material";
import SidebarChats from "./SidebarChats";
import Parse from 'parse/dist/parse.min';
import { lightBlue } from "@mui/material/colors";

Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);    

    useEffect(() =>{
        getRooms();
    }, []);

    const getRooms = async() => {
        const roomsAll = new Parse.Object.extend('rooms');
        const query = new Parse.Query(roomsAll);
        try {
          const res = await query.findAll();
          const rooms = res.map((items) => ({
            roomId: items.id,
            name: items.get("name"),
            key: items.id,
            message: items.get("message")
          }));

          setRooms(rooms);
          return getRooms();

        } catch (error) {
          console.log(`Error! ${error.message}`);
          return false;
        };
        return () => {
            rooms();
        }
      };
      

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar />
                <div className="sidebar_header-icons">
                    <IconButton>
                        <DonutLarge style={{ color: lightBlue[500] }} />
                    </IconButton>
                    <IconButton>
                        <Chat style={{ color: lightBlue[500] }} />
                    </IconButton>
                    <IconButton>
                        <MoreVert style={{ color: lightBlue[500] }} />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="side_search-container">
                    <input placeholder="Search or start new chart" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
            <SidebarChats newChat = {true}/>
                {rooms.map((items) => (
                    <SidebarChats room={items.name}
                    message={items.message}
                    key={items.index}
                    roomId={items.roomId} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;