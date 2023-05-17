import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
// import Parse from 'parse/dist/parse.min';

// Parse.initialize('YferreraWsClone', 'YferreraWsClone');
// Parse.serverURL = 'http://127.0.0.1:1337/parse';


const ProtectedRoutes = ({children}) => { 
  
  const AuthContext = createContext();
  const UserAuth = () => useContext(AuthContext);

  const {user} = () => UserAuth();
    if(!user){
      return (<Navigate to='/' />)
    }
  return (
    {children}
  )

};

export default ProtectedRoutes;