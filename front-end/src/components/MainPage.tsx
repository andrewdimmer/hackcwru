import React, { Fragment, useState } from "react";
import {User} from "firebase";
import {Typography} from "@material-ui/core";
import ControlPage from "../../src/components/ControlPage";
import LoginPage from "./LoginPage";

const MainPage: React.FunctionComponent = () =>
{
      const [isLoggedIn, setIfLoggedIn] = useState(false)

      const handleLogin = () => 
      {
        setIfLoggedIn(true);
      }

      const handleLogout = () => 
      {
        setIfLoggedIn(false);
      }
      /*
      if(isLoggedIn)
      {
        return(
        <Fragment>
           <LoginPage handleLogin = {handleLogin}/>
        </Fragment>)
      }
      else
      {
        return(
            <Fragment>
                <ControlPage handleLogout = {handleLogout}/>
            </Fragment>
        ); */
      return(  
      <Fragment>
        <ControlPage handleLogout = {handleLogout}/>
      </Fragment>)
  }

export default MainPage;