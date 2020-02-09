import React, { Fragment, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  CardActions
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { FinanceSettings, UserData, firebaseApp } from "../../firebase/config";
import { User } from "firebase";
import {
  updateConcentrationMode,
  updateFinanceMode
} from "../../firebase/user";

let tempMonthly: string;
let tempWeek1: string;
let tempWeek2: string;
let tempWeek3: string;
let tempWeek4: string;

declare interface BudgetProps {
  userID: string;
  userData: UserData;
}

const BudgetPage: React.FunctionComponent<BudgetProps> = ({
  userID,
  userData
}) => {
  const [monthBudget, setMonthBudget] = useState("1000");
  const [week1Budget, setWeek1Budget] = useState("250");
  const [week2Budget, setWeek2Budget] = useState("250");
  const [week3Budget, setWeek3Budget] = useState("250");
  const [week4Budget, setWeek4Budget] = useState("250");

  const handleChangeMonth = (newMonth: string) => {
    let tempMonthNum: number;
    tempMonthNum = parseInt(newMonth);
    setMonthBudget(tempMonthNum.toString());
    setWeek1Budget((tempMonthNum / 4).toString());
    setWeek2Budget((tempMonthNum / 4).toString());
    setWeek3Budget((tempMonthNum / 4).toString());
    setWeek4Budget((tempMonthNum / 4).toString());
  };

  const handleChangeWeek1 = (newVal: string) => {
    setWeek1Budget(newVal);
  };

  const handleChangeWeek2 = (newVal: string) => {
    setWeek2Budget(newVal);
  };

  const handleChangeWeek3 = (newVal: string) => {
    setWeek3Budget(newVal);
  };

  const handleChangeWeek4 = (newVal: string) => {
    setWeek4Budget(newVal);
  };

  const SaveBudget = () => {
    let newSettings: FinanceSettings = {
      total: parseInt(monthBudget),
      week1: parseInt(week1Budget),
      week2: parseInt(week2Budget),
      week3: parseInt(week3Budget),
      week4: parseInt(week4Budget),
      weekly: parseInt(monthBudget) / 4
    };

    updateFinanceMode(newSettings, userID);
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
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField
            label="Monthly budget"
            variant="standard"
            onChange={e => handleChangeMonth(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Week 1"
            variant="standard"
            value={week1Budget}
            onChange={e => handleChangeWeek1(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Week 2"
            variant="standard"
            value={week2Budget}
            onChange={e => handleChangeWeek2(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Week 3"
            variant="standard"
            value={week3Budget}
            onChange={e => handleChangeWeek3(e.target.value)}
          ></TextField>{" "}
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Week 4"
            variant="standard"
            value={week4Budget}
            onChange={e => handleChangeWeek4(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Button color="primary" variant="contained" onClick={SaveBudget}>
            {" "}
            Save Budget Settings{" "}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BudgetPage;
