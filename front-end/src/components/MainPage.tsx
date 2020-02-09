import React, { Fragment, useState } from "react";
import { User } from "firebase";
import {
  Typography,
  Button,
  makeStyles,
  Theme,
  ButtonBase,
  withStyles,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import ControlPage from "../../src/components/ControlPage";
import LoginPage from "./LoginPage";
import { firebaseApp, UserData } from "../firebase/config";
import { getCreateUser } from "../firebase/user";
import { findByLabelText } from "@testing-library/react";

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

  //Taken off of the Material-ui.com website, from their complex button example
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

  const classes = useStyles();

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
      {/* <Button
          variant="contained"
          onClick={handleLoginButton}
          className={classes.login}
          color="primary"
        >
          Click here to login!
        </Button> */}
      {!userId && !isLoggingIn && (
        <span className={classes.root}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.root}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                The Buck Duck Demonstration
              </Typography>
              <Typography variant="h3" component="h3" color="primary">
                A Project Inspired By a Love of Ducks and Technology
              </Typography>
              <Typography className={classes.pos} color="secondary">
                Andrew Dimmer, Nathan Dimmer, James Lynott, Allison Broski
              </Typography>
              <Typography variant="body2" component="p" color="textPrimary">
                Walking talking what's going on. Come up with something that
                doesn't sound wrong
              </Typography>
            </CardContent>
            <CardActions>
              <StyledButton variant="contained" onClick={handleLoginButton}>
                Click Here to Login!
              </StyledButton>
            </CardActions>
          </Card>
        </span>
      )}
    </Fragment>
  );
};

export default MainPage;
