import { Paper, Typography } from "@material-ui/core";
import React from "react";

declare interface DebugProps {
  classes: any;
}

const DebugModule: React.FunctionComponent<DebugProps> = ({ classes }) => {
  return (
    <Paper className={classes.marginedPadded} elevation={3}>
      <Typography variant="h4">Debug Mode</Typography>
      <Typography variant="h5">Swipe Right to enter Debug Mode</Typography>
      <Typography variant="h5">Tap Center to exit Debug Mode</Typography>
      <Typography variant="body1">
        In this mode, your duck acts as an eager listener as you walk though any
        problems with them.
      </Typography>
      <Typography variant="body1">
        They will pay attention to everything that you say, and quack and blink
        in response.
      </Typography>
      <Typography variant="body1">
        You can use this mode with any and all ducks, even if they are not
        paired with your account.
      </Typography>
      <Typography variant="body1">Enjoy!</Typography>
    </Paper>
  );
};

export default DebugModule;
