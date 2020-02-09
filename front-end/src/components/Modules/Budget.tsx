import React, { Fragment, useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
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
      <TextField
        label="Monthly budget"
        variant="outlined"
        onChange={e => handleChangeMonth(e.target.value)}
      ></TextField>
      <TextField
        label="Week 1"
        variant="filled"
        value={week1Budget}
        onChange={e => handleChangeWeek1(e.target.value)}
      ></TextField>
      <TextField
        label="Week 2"
        variant="filled"
        value={week2Budget}
        onChange={e => handleChangeWeek2(e.target.value)}
      ></TextField>
      <TextField
        label="Week 3"
        variant="filled"
        value={week3Budget}
        onChange={e => handleChangeWeek3(e.target.value)}
      ></TextField>
      <TextField
        label="Week 4"
        variant="filled"
        value={week4Budget}
        onChange={e => handleChangeWeek4(e.target.value)}
      ></TextField>
      <Button onClick={SaveBudget}> Save Budget Settings </Button>
    </Fragment>
  );
};

export default BudgetPage;
