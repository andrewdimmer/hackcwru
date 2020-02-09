import React, { Fragment, useState } from "react";
import { User } from "firebase";
import { Typography, Button } from "@material-ui/core";
import ControlPage from "../../src/components/ControlPage";
import LoginPage from "./LoginPage";
import { firebaseApp, UserData } from "../firebase/config";
import { getCreateUser } from "../firebase/user";

const MainPage: React.FunctionComponent = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginButton = () => {
    setIsLoggingIn(true);
  };

  const handleLogin = () => {
    setIsLoggingIn(false);
    const currentUser = firebaseApp.auth().currentUser;
    if (currentUser !== null) {
      if (getCreateUser(currentUser.uid)) {
        setUserId(currentUser.uid);
      } else {
        console.log("Error getting user; logging out...");
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserData(null);
    firebaseApp.auth().signOut();
  };

  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      handleLogin();
    } else {
      handleLogout();
    }
  });

  if (userId) {
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot({
        next: snapshot => {
          const data = snapshot.data() as UserData | undefined;
          if (data) {
            setUserData(data);
          }
        }
      });
  }

  return (
    <Fragment>
      {!userId && isLoggingIn && <LoginPage handleLogin={handleLogin} />}
      {userId && (
        <Fragment>
          {!userData && (
            <Typography variant="body1">
              Error: There is a userId but not a userData object...
            </Typography>
          )}
          {userData && (
            <ControlPage
              handleLogout={handleLogout}
              userId={userId}
              userData={userData}
            />
          )}
        </Fragment>
      )}
      {!userId && !isLoggingIn && (
        <Button variant="contained" onClick={handleLoginButton}>
          Click here to login!
        </Button>
      )}
    </Fragment>
  );
};

export default MainPage;
