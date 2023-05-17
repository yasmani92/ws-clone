import  React, { useEffect, useState } from 'react';
import './App.css';
import LoggingIn from "./auth/logging/LoggingIn";
import Parse from 'parse/dist/parse.min';
import Layout from './Layout';


Parse.initialize('YferreraWsClone', 'YferreraWsClone');
Parse.serverURL = 'http://127.0.0.1:1337/parse';


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  // const PageNotFound = () => {
  //   return(
  //     <div>
  //       <h2>404 Page not found</h2>
  //     </div>
  //   )
  // }
  
  useEffect(async() => {
    const user = await Parse.User.current();
    setCurrentUser(user);
  }, [])

  return (
      <div className="App">
        {!currentUser ? (
          <LoggingIn />
          ):(          
            <Layout />
          )}
      </div>
  );
};

export default App;