import { Button } from '@material-ui/core';
import { CriticActions, CriticStore } from 'app/store/store';
import React, { useContext} from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import * as env from '../../../env'


function GoogleLoginButton({className}) {
  const history = useHistory();
  const {dispatch} = useContext(CriticStore)
  const clientId = env.GOOGLE_OAUTH_CLIENTID

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    dispatch(CriticActions.loginSuccess(res.profileObj))
    history.push("/register")
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    dispatch(CriticActions.loginFailed())
    history.push("/")
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <Button className={className} variant="contained" color="primary" onClick={signIn} >Login</Button>
  );
}

export default GoogleLoginButton;