import React, { Fragment, useState } from "react";
import { User } from "firebase";
import { Typography, Button } from "@material-ui/core";
import ControlPage from "../../src/components/ControlPage";
import LoginPage from "./LoginPage";
import { firebaseApp } from "../firebase/config";

const MainPage: React.FunctionComponent = () => {
  const [isLoggedIn, setIfLoggedIn] = useState(false);
  const [isLoggingIn, setIfLoggingIn] = useState(false);

  const handleLoginButton = () => {
    setIfLoggingIn(true);
    setIfLoggedIn(false);
  };

  const handleLogin = () => {
    setIfLoggingIn(false);
    setIfLoggedIn(true);
  };

  const handleLogout = () => {
    setIfLoggedIn(false);
    setIfLoggingIn(false);
    firebaseApp.auth().signOut();
  };

  return (
    <Fragment>
      {!isLoggedIn && isLoggingIn && <LoginPage handleLogin={handleLogin} />}
      {isLoggedIn && !isLoggingIn && (
        <ControlPage handleLogout={handleLogout} />
      )}
      {!isLoggedIn && !isLoggingIn && (
        <Button variant="contained" onClick={handleLoginButton}>
          Click here to login!
        </Button>
      )}
    </Fragment>
  );
};

export default MainPage;
