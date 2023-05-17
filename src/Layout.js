import React from 'react';
import "./Layout.css";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './contexts/Sidebar/Sidebar';
import Chat from './contexts/Chat/Chat';
import Home from './contexts/Home';


const Layout = () => {
  return (
    <Router>
        <div className="app_body">
        <Sidebar />
        <Routes>
            {/* <Route element={<ProtectedRoutes />}>   */}
                <Route index path="/home" element={ <Home /> }/>
                <Route exact path="/rooms/:roomId"
                    element={
                    <Chat room={'This is a room'}
                    lastSeenDate={"A random date"}
                    roomId={"asasd"} />
                    }
                />
                {/* <Route exact path="/home" element={<h1>Welcome {currentUser.get('username')}!</h1> }/> */}
            {/* </Route> */}
        </Routes>
        </div>
    </Router>
  )
}

export default Layout