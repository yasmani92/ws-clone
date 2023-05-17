import { Button,  Divider, FormGroup, Input } from '@material-ui/core';
import React, { useState } from 'react';
import "./LoggingIn.css";
import Parse from 'parse/dist/parse.min';
import GoogleLogin from 'react-google-login';

const LoggingIn = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [ifRegister, setIfRegister] = useState(false);

  /**START USER REGISTRATION */
  const SubmitHandler = async function () {
    const usernameValue = username;
    const passwordValue = password;
    
    if(ifRegister){
      try {
        const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
        window.location.href = "/home";
        return true;
      } catch (error) {
        alert(`Error! ${error}`);
        return false;
      }
    } else {
      try {
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        window.location.href = "/home";
        const currentUser = await Parse.User.current();
        console.log(loggedInUser === currentUser);
        setUsername('');
        setPassword('');
        getCurrentUser();
        return true;        
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    }
  };


  /**START GOOGLE LOGIN */  
  const handleGoogleLoginLoginResponse = async function(response) {
    if (response.error !== undefined) {
      console.log(`Error: ${response.error}`);
      return false;
    } else {
      try {
        const userGoogleId = response.googleId;
        const userTokenId = response.tokenId;
        const userEmail = response.profileObj.email;
        const userToLogin = new Parse.User();
        userToLogin.set('username', userEmail);
        userToLogin.set('email', userEmail);
        try {
          let loggedInUser = await userToLogin
          .linkWith('google', {
            authData: {id: userGoogleId, id_token: userTokenId},
          });
          window.location.href = "/home";
          getCurrentUser();
          console.log(`${loggedInUser.get('username')}`)
          return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
          return false;
        }
      } catch (error) {
        console.log("Error gathering Google user info, please try again!")
        return false;
      }
    }
  }
  /**END GOOGLE LOGIN */
  
  const getCurrentUser = async function () {
    currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };
    

  return (
    <div className="login">
        <div className="login_container">
            <img src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png" 
                alt="Logo WhatsApp" />
            <div className="login_text">
                <h1>{ifRegister ? 'Sign in to WhatsApp' : 'Log in to WhatsApp'}</h1>
            </div>
              <div className="form_wrapper">
                <FormGroup>
                  <Input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Usuario"
                    size="large"
                    className="form_input"
                  />
                  <Input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Contraseña"
                    size="large"
                    type="password"
                    className="form_input input_password"
                  />
                  <Button type='submit' className='form_buttons'
                      onClick={() => SubmitHandler()}                  
                    >
                      {ifRegister ? 'Sign In' : 'Log In'}
                    </Button>
                </FormGroup>
                <div className="form_buttons">                  
                <Divider />
                <div className='change__button'>
                  <Button onClick={() => setIfRegister(!ifRegister)}>
                  {ifRegister ? "Do you have an account? Log In" : "Don't have an account? Sign In"}         
                  </Button>
                </div>
              </div>
              </div>
              
            <GoogleLogin
                clientId="BOnngTcEckKE9mugdNOnJ_9iHyZzDRr1vj9CfBNSJVpFaiteEMOYNXhBvKS8FZFYQvB_Ue9Ug-rNqnkLjsLt8vs"
                render={renderProps => (
                  <div className="login_google_button">                    
                    <Button              
                      onClick={renderProps.onClick}
                    >
                     Sign In with Google
                    </Button>
                  </div>
                )}
              buttonText="Login"
              onSuccess={handleGoogleLoginLoginResponse}
              onFailure={handleGoogleLoginLoginResponse}
              cookiePolicy={'single_host_origin'}
            />
        </div>
    </div>
  )
}

export default LoggingIn;