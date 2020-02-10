import { Button, Typography, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import ControlPage from "../../src/components/ControlPage";
import { firebaseApp, UserData } from "../firebase/config";
import { getCreateUser } from "../firebase/user";
import { styles } from "../Styles";
import LoginPage from "./LoginPage";

declare interface MainPageProps {
  getInitUserId: () => string;
  getInitUserData: () => UserData | null;
  getInitUnpairedDucks: () => string[];
  setInitUserId: (newUserId: string) => void;
  setInitUserData: (newUserData: UserData | null) => void;
  setInitUnpairedDucks: (newUnpairedDucks: string[]) => void;
}

const MainPage: React.FunctionComponent<MainPageProps> = ({
  getInitUserId,
  getInitUserData,
  getInitUnpairedDucks,
  setInitUserId,
  setInitUserData,
  setInitUnpairedDucks
}) => {
  console.log("Rendering Main Page...");

  // The React state for this component
  const [userId, setUserId] = React.useState<string>(getInitUserId());
  const [userData, setUserData] = React.useState<UserData | null>(
    getInitUserData()
  );
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const [unpairedDucks, setUnpairedDucks] = React.useState<string[]>(
    getInitUnpairedDucks()
  );

  // Update both the initial value for the first reload and the state
  const updateUserId = (newUserId: string): void => {
    if (getInitUserId() !== newUserId) {
      console.log("Update userId");
      setInitUserId(newUserId);
      setUserId(newUserId);
    }
  };

  const updateUserData = (newUserData: UserData | null): void => {
    let update = false;
    const initUserData = getInitUserData();
    if (newUserData === null && initUserData === null) {
      // Do nothing, they are both null;
    } else if (newUserData === null || initUserData === null) {
      //Going to or from a null, clearly a change
      update = true;
    } else if (
      initUserData.amountSpent !== newUserData.amountSpent ||
      initUserData.weekNumber !== newUserData.weekNumber ||
      initUserData.userId !== newUserData.userId ||
      initUserData.concentration.break !== newUserData.concentration.break ||
      initUserData.concentration.work !== newUserData.concentration.work ||
      initUserData.finance.total !== newUserData.finance.total ||
      initUserData.finance.week1 !== newUserData.finance.week1 ||
      initUserData.finance.week2 !== newUserData.finance.week2 ||
      initUserData.finance.week3 !== newUserData.finance.week3 ||
      initUserData.finance.week4 !== newUserData.finance.week4 ||
      initUserData.finance.weekly !== newUserData.finance.weekly ||
      initUserData.ducks.length !== newUserData.ducks.length
    ) {
      update = true;
    } else {
      for (let i = 0; i < initUserData.ducks.length; i++) {
        const oldDuck = initUserData.ducks[0];
        if (newUserData.ducks.indexOf(oldDuck) < 0) {
          console.log(`${oldDuck} is no longer in userData`);
          update = true;
          break;
        }
      }
    }

    if (update) {
      console.log("Update userData");
      setInitUserData(newUserData);
      setUserData(newUserData);
    }
  };

  const updateUnpairedDucks = (newUnpairedDucks: string[]): void => {
    let update = false;
    const initUnpairedDucks = getInitUnpairedDucks();
    if (initUnpairedDucks.length !== newUnpairedDucks.length) {
      update = true;
    } else {
      for (let i = 0; i < initUnpairedDucks.length; i++) {
        const oldDuck = initUnpairedDucks[0];
        if (newUnpairedDucks.indexOf(oldDuck) < 0) {
          console.log(`${oldDuck} is no longer in unpairedDucks`);
          update = true;
          break;
        }
      }
    }

    if (update) {
      console.log("Update unpairedDucks");
      setInitUnpairedDucks(newUnpairedDucks);
      setUnpairedDucks(newUnpairedDucks);
    }
  };

  const handleLogin = () => {
    setIsLoggingIn(false);
    const currentUser = firebaseApp.auth().currentUser;
    if (currentUser !== null) {
      updateUserId(currentUser.uid);
      getCreateUser(currentUser.uid).then(value => {
        if (value) {
          updateUserData(value);
        } else {
          console.log("Something went wrong");
        }
      });
    }
  };

  const handleLogout = () => {
    updateUserData(null);
    updateUserId("");
    firebaseApp.auth().signOut();
  };

  const classes = styles();

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
            updateUserData(data);
          }
        }
      });
  }

  firebaseApp
    .firestore()
    .collection("ducks")
    .doc("DUCKS")
    .onSnapshot({
      next: snapshot => {
        const data = snapshot.data();
        if (data) {
          const ducks = data.ducks as { [key: string]: string };
          const availableDucks = [];
          for (const duck in ducks) {
            if (!ducks[duck]) {
              availableDucks.push(duck);
            }
          }
          updateUnpairedDucks(availableDucks);
        }
      }
    });

  const handleLoginButton = () => {
    setIsLoggingIn(true);
  };

  return (
    <Fragment>
      {!userId && isLoggingIn && <LoginPage />}
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
              unpairedDucks={unpairedDucks}
              classes={classes}
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
