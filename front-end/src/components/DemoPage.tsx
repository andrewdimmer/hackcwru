import React, { Fragment } from "react";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Grid
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RestoreIcon from "@material-ui/icons/Restore";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import HearingIcon from "@material-ui/icons/Hearing";

declare interface DemoProps {}
const DemoPage: React.FunctionComponent<DemoProps> = ({}) => {
  //Controls styling, where each term, like 'button' controls various styling options
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1)
      },
      title: {
        color: "#388e3c",
        "font-size": "5vw"
      }
    })
  );

  const classes = useStyles();

  return (
    <Fragment>
      <div>
        <Grid
          id="turnstyle"
          container
          alignContent="center"
          direction="column"
          justify="center"
        >
          <Typography variant="h1" className={classes.title}>
            The Buck Duck Demonstration
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<MonetizationOnIcon />}
          >
            Pay Amount
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<DateRangeIcon />}
          >
            Next Week
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<HearingIcon />}
          >
            Quack
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<RestoreIcon />}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<LinkOffIcon />}
          >
            Unpair Duck
          </Button>
        </Grid>
      </div>
    </Fragment>
  );
};

export default DemoPage;
