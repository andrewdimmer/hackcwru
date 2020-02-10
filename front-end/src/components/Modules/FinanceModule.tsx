import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { FinanceSettings, UserData } from "../../firebase/config";
import { updateFinanceMode } from "../../firebase/user";

declare interface FinancialProps {
  userId: string;
  userData: UserData;
  classes: any;
}

const FinancialModule: React.FunctionComponent<FinancialProps> = ({
  userId,
  userData,
  classes
}) => {
  const [monthBudget, setMonthBudget] = React.useState(userData.finance.total);
  const [week1Budget, setWeek1Budget] = React.useState(userData.finance.week1);
  const [week2Budget, setWeek2Budget] = React.useState(userData.finance.week2);
  const [week3Budget, setWeek3Budget] = React.useState(userData.finance.week3);
  const [week4Budget, setWeek4Budget] = React.useState(userData.finance.week4);
  const weeklyBudget = () =>
    (monthBudget - week1Budget - week2Budget - week3Budget - week4Budget) / 4;

  const SaveBudget = () => {
    let newSettings: FinanceSettings = {
      total: monthBudget,
      week1: week1Budget,
      week2: week2Budget,
      week3: week3Budget,
      week4: week4Budget,
      weekly: monthBudget
    };

    updateFinanceMode(newSettings, userId);
  };

  return (
    <Paper className={classes.marginedPadded} elevation={3}>
      <Typography variant="h4">Financial Mode</Typography>
      <Typography variant="h5">Swipe Down to enter Financial Mode</Typography>
      <Typography variant="h5">Tap Center to exit Financial Mode</Typography>
      <Typography variant="body1">
        In this mode, your duck acts as an indicator of how much you have left
        in your weekly budget.
      </Typography>
      <Typography variant="body1">
        Closer to the white-blue end of the specturm means you have extra money
        left over to save for later.
      </Typography>
      <Typography variant="body1">
        Closer to the red end of the specturm means you have gone over your
        budget.
      </Typography>
      <Typography variant="body1">
        First, set your monthly budget in the specified box below. This is the
        amount of money you expect to spend this month. If you wish to save
        money for the future, try setting your budgeted amount below what you
        currently make.
      </Typography>
      <Typography variant="body1">
        If you expect to spend the same amount of money each week, you're all
        set!
      </Typography>
      <Typography variant="body1">
        If you have recurring payments that are due on a monthy cycle however,
        you can more accurately model your weekly budget by specifying those
        amounts in the boxes marked for Extra Expenses during the week.
      </Typography>
      <Typography variant="body1">
        Your final weekly budget will be displayed in the weekly budget boxed.
        Those account for you paying all of your extra expenses first, they
        spreading the rest of your budget evenly across all four weeks.
      </Typography>
      <Typography variant="body1">
        Once you've completed your budget, you can save it and upload it to your
        duck by clicking save settings.
      </Typography>
      <TextField
        className={classes.margined}
        label="Monthly Budget"
        variant="outlined"
        onChange={e =>
          setMonthBudget(
            parseInt(e.target.value) ? parseInt(e.target.value) : 0
          )
        }
        type="number"
        defaultValue={monthBudget}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 1 Extra Expenses"
        variant="outlined"
        onChange={e =>
          setWeek1Budget(
            parseInt(e.target.value) ? parseInt(e.target.value) : 0
          )
        }
        type="number"
        defaultValue={week1Budget}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 1 Budget"
        variant="filled"
        value={week1Budget + weeklyBudget()}
        type="number"
        disabled
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 2 Extra Expenses"
        variant="outlined"
        onChange={e =>
          setWeek2Budget(
            parseInt(e.target.value) ? parseInt(e.target.value) : 0
          )
        }
        type="number"
        defaultValue={week2Budget}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 2 Budget"
        variant="filled"
        value={week2Budget + weeklyBudget()}
        type="number"
        disabled
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 3 Extra Expenses"
        variant="outlined"
        onChange={e =>
          setWeek3Budget(
            parseInt(e.target.value) ? parseInt(e.target.value) : 0
          )
        }
        type="number"
        defaultValue={week3Budget}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 3 Budget"
        variant="filled"
        value={week3Budget + weeklyBudget()}
        type="number"
        disabled
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 4 Extra Expenses"
        variant="outlined"
        onChange={e =>
          setWeek4Budget(
            parseInt(e.target.value) ? parseInt(e.target.value) : 0
          )
        }
        type="number"
        defaultValue={week4Budget}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Week 4 Budget"
        variant="filled"
        value={week4Budget + weeklyBudget()}
        type="number"
        disabled
      ></TextField>
      <Button
        className={classes.marginedPadded}
        onClick={SaveBudget}
        color="primary"
        size="large"
        variant="contained"
      >
        Save Settings
      </Button>
    </Paper>
  );
};

export default FinancialModule;
