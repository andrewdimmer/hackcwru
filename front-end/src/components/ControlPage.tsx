import React, { Fragment } from "react";
import {User} from "firebase";
import {Typography, Button} from "@material-ui/core";
import {firebaseApp} from "../firebase/config";
declare interface ControlPageProps {
    handleLogout: () => void;
  }

  const ControlPage: React.FunctionComponent<ControlPageProps> = ({
    handleLogout
  }) => 
  {
    firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user === null) {
          handleLogout();
        }
      }); 
    return(
        <Fragment>
            <Typography variant="h3"> Logged in! </Typography>
            <Button onClick={handleLogout}> Log Out </Button>
        </Fragment>
    ); 
  }


export default ControlPage;