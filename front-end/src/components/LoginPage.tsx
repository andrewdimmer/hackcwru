import firebase, { User } from "firebase";
import React, { Fragment } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {firebaseApp} from "../firebase/config";

declare interface LoginProps {
    handleLogin: () => void;
  }
  const LoginPage: React.FunctionComponent<LoginProps> = ({
    handleLogin
  }) => {
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        signInSuccessUrl: ""
       
      };
      
      firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user) {
          handleLogin();
        }
      }); 
    return(
        <Fragment>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Fragment>
    );
}

export default LoginPage;