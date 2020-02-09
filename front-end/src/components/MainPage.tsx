import React, { Fragment, useState } from "react";
import { User } from "firebase";
import {
  Typography,
  Button,
  makeStyles,
  Theme,
  ButtonBase,
  withStyles,
  Box,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import container from "@material-ui/core/Container";
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
  /*
 const useStyles = makeStyles((theme: Theme) => ({
    root: {
      //minWidth: 275,
      display: "flex",

      "justify-content": "center",

      "flex-direction": "column",

      "align-items": "center",

      "flex-wrap": "wrap"
    },

    title: {
      fontSize: 14
    },

    pos: {
      marginBottom: 12
    }
  }));

  const classes = useStyles(); */

  const StyledButton = withStyles({
    root: {
      "background-image": "linear-gradient(red, yellow, blue)",
      height: "90%",
      width: "60%",
      color: "blue"
    },
    label: {
      testTransform: "capitalize"
    }
  })(Button);

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
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            <Typography color="textSecondary" gutterBottom align="center">
              Inspired by a love of ducks and technology
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h3"
              component="h3"
              color="primary"
              align="center"
            >
              The Buck Duck Demonstration
            </Typography>{" "}
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" align="center">
              Andrew Dimmer, Nathan Dimmer, James Lynott, Allison Broski
            </Typography>{" "}
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body2"
              component="p"
              color="textPrimary"
              align="center"
            >
              A mindful mallard to help you reflect, plan, and perservere.
            </Typography>{" "}
          </Grid>
          <Grid item xs={4}>
            <StyledButton variant="contained" onClick={handleLoginButton}>
              Click Here to Login!
            </StyledButton>{" "}
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default MainPage;
