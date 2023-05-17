import React, { useState } from 'react';
import "./NavBar.css"
import Parse from 'parse/dist/parse.min';
import { lightBlue } from "@mui/material/colors";
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import LoggingIn from '../../auth/logging/LoggingIn';
import { IconButton } from '@material-ui/core';

Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';

function NavBar() {
    const [{currentUser, setCurrentUser}] = useState(LoggingIn());

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
      currentUser = await Parse.User.current();
      setCurrentUser(currentUser);
      return currentUser;
    };

  return (
    <div className="chat">
    <div className="chat_header">
       {currentUser.get('username')}
        <div className="chat_headerInfo">
        </div>
        <div className="chat_headerButtons">
            <IconButton>
                <SearchOutlined style={{ color: lightBlue[500] }} />
            </IconButton>
            <IconButton>
                <AttachFile  style={{ color: lightBlue[500] }} />
            </IconButton>
            <IconButton>
                <MoreVert style={{ color: lightBlue[500] }} onClick={doUserLogOut} />
            </IconButton>
        </div>
    </div>
    </div>
  )
}

export default NavBar