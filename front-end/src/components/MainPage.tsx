import React, { Fragment, useState } from "react";
import { User } from "firebase";
import { Typography, Button } from "@material-ui/core";
import ControlPage from "../../src/components/ControlPage";
import LoginPage from "./LoginPage";
import { firebaseApp, UserData } from "../firebase/config";
import { getCreateUser } from "../firebase/user";
import { cpus } from "os";

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
