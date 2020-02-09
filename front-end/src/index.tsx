import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MainPage from "./components/MainPage";
import QuackPage from "./components/QuackPage";
import { UserData } from "./firebase/config";

const url = window.location.href.toLowerCase();
if (url.indexOf("demo") > 0) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else if (url.indexOf("quack") > 0) {
  ReactDOM.render(<QuackPage />, document.getElementById("root"));
} else {
  // The initial values of all the states to prevent infinite reloads
  let initUserId: string = "";
  let initUserData: UserData | null = null;
  let initUnpairedDucks: string[] = [];

  // Getters so that the state initializes with a different value after an initial value is found.
  const getInitUserId = () => initUserId;
  const getInitUserData = () => initUserData;
  const getInitUnpairedDucks = () => initUnpairedDucks;

  // Setters to update what the initial state should be after a state change.
  const setInitUserId = (newUserId: string): void => {
    initUserId = newUserId;
  };
  const setInitUserData = (newUserData: UserData | null): void => {
    initUserData = newUserData;
  };
  const setInitUnpairedDucks = (newUnpairedDucks: string[]): void => {
    initUnpairedDucks = newUnpairedDucks;
  };
  ReactDOM.render(
    <MainPage
      getInitUserId={getInitUserId}
      getInitUserData={getInitUserData}
      getInitUnpairedDucks={getInitUnpairedDucks}
      setInitUserId={setInitUserId}
      setInitUserData={setInitUserData}
      setInitUnpairedDucks={setInitUnpairedDucks}
    />,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
