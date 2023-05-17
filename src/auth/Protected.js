import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, Redirect } from 'react-router-dom';
import LoggingIn from "./logging/LoggingIn";
import Parse from 'parse/dist/parse.min';
import { connect } from 'http2';
// import { connect } from "react-redux";

Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';

const Protected = props => {
    const { isAuthUser, type } = props;
    if (type === "guest" && isAuthUser) return <Redirect to="/home" />;
    else if (type === "private" && !isAuthUser) return <Redirect to="/login" />;
  
    return <Route {...props} />;
  };
  
  const mapStateToProps = ({ isAuthUser }) => ({
    isAuthUser
  });
  

  export default connect(mapStateToProps)(Protected);