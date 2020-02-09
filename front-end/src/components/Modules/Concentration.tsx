import React, { Fragment } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import {
  FinanceSettings,
  ConcentrationSettings,
  UserData,
  firebaseApp
} from "../../firebase/config";
import { updateConcentrationMode } from "../../firebase/user";

let tempWork: string;
let tempBreak: string;
declare interface ConcentrationProps {
  userID: string;
  userData: UserData;
}

const Concentration: React.FunctionComponent<ConcentrationProps> = ({
  userID,
  userData
}) => {
  const SaveConcentration = () => {
    let tempWorkNum: number;

    tempWorkNum = parseInt(tempWork); //Convert work textfield string to int

    let tempBreakNum: number;
    tempBreakNum = parseInt(tempBreak); //Convert break textfield string to int

    let newSettings: ConcentrationSettings = {
      work: tempWorkNum,
      break: tempBreakNum
    };
    console.log("Break: " + newSettings.break);
    console.log("Work: " + tempWorkNum);
    updateConcentrationMode(newSettings, userID);
    console.log("Break Real: " + userData.concentration.break);
    console.log("Work Real: " + userData.concentration.work);
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {" "}
        Study time settings:{" "}
      </Typography>
      <TextField
        label="Study time (minutes)"
        variant="outlined"
        onChange={e => (tempWork = e.target.value)}
      >
        {" "}
      </TextField>
      <TextField
        label="Break time (minutes)"
        variant="outlined"
        onChange={e => (tempBreak = e.target.value)}
      >
        {" "}
      </TextField>
      <Button onClick={SaveConcentration}> Save study time settings </Button>
    </Fragment>
  );
};

export default Concentration;
