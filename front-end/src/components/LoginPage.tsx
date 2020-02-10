import firebase from "firebase";
import * as firebaseui from "firebaseui";
import React, { Fragment } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

declare interface LoginProps {}

const LoginPage: React.FunctionComponent<LoginProps> = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
  };

  return (
    <Fragment>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Fragment>
  );
};

export default LoginPage;
