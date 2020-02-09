import React, { Fragment } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  CardActions
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
      <Box component="div" display="inline" p={1} m={1}>
        <CardActions>
          <Typography variant="h5" align="right" gutterBottom>
            {" "}
            Study time settings:{" "}
          </Typography>
        </CardActions>
      </Box>
      <Grid container xs={9}>
        <Grid item xs={3}>
          <TextField
            label="Study time (minutes)"
            variant="standard"
            onChange={e => (tempWork = e.target.value)}
          >
            {" "}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Break time (minutes)"
            variant="standard"
            onChange={e => (tempBreak = e.target.value)}
          >
            {" "}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={SaveConcentration}
          >
            {" "}
            Save study time settings{" "}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Concentration;
