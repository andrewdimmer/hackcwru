import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { ConcentrationSettings, UserData } from "../../firebase/config";
import { updateConcentrationMode } from "../../firebase/user";

declare interface ConcentrationProps {
  userId: string;
  userData: UserData;
  classes: any;
}

const ConcentrationModule: React.FunctionComponent<ConcentrationProps> = ({
  userId,
  userData,
  classes
}) => {
  const [settings, setSettings] = React.useState<ConcentrationSettings>({
    work: userData.concentration.work,
    break: userData.concentration.break
  });

  return (
    <Paper className={classes.marginedPadded} elevation={3}>
      <Typography variant="h4">Concentration Mode</Typography>
      <Typography variant="h5">
        Swipe Left to enter Concentration Mode
      </Typography>
      <Typography variant="h5">
        Tap Center to exit Concentration Mode
      </Typography>
      <Typography variant="body1">
        In this mode, your duck acts as a timer for you to help keep yourself on
        focus while working.
      </Typography>
      <Typography variant="body1">
        First, your duck will act as a timer for the amount of time you plan to
        work. During this time, the lights will appear red.
      </Typography>
      <Typography variant="body1">
        After that, your duck will quack and blink, before the blue lights turn
        on for the duration of your break.
      </Typography>
      <Typography variant="body1">
        This cycle will be continued for as long as you remain in Concentration
        mode.
      </Typography>
      <Typography variant="body1">
        To modify the amount of time that your duck spends in each mode, adjust
        the numbers below, and save settings.
      </Typography>
      <Typography variant="body1">
        Then, from your duck simply exit and reenter Concentration Mode, and the
        times will be updated.
      </Typography>
      <TextField
        className={classes.margined}
        label="Work Time (minutes)"
        variant="outlined"
        onChange={e => {
          setSettings({
            work: parseInt(e.target.value),
            break: settings.break
          });
        }}
        type="number"
        defaultValue={settings.work}
      ></TextField>
      <TextField
        className={classes.margined}
        label="Break Time (minutes)"
        variant="outlined"
        onChange={e => {
          setSettings({
            work: settings.work,
            break: parseInt(e.target.value)
          });
        }}
        type="number"
        defaultValue={settings.break}
      ></TextField>
      <Button
        className={classes.marginedPadded}
        onClick={() => {
          updateConcentrationMode(settings, userId);
        }}
        color="primary"
        size="large"
        variant="contained"
      >
        Save Settings
      </Button>
    </Paper>
  );
};

export default ConcentrationModule;
