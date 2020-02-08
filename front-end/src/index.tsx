import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MainPage from "./components/MainPage";
import QuackPage from "./components/QuackPage";

const url = window.location.href.toLowerCase();
if (url.indexOf("demo") > 0) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else if (url.indexOf("quack") > 0) {
  ReactDOM.render(<QuackPage />, document.getElementById("root"));
} else {
  ReactDOM.render(<MainPage />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
