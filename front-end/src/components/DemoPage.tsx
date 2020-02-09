import React, { Fragment } from "react";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Modal,
  TextField,
  FormControl,
  InputAdornment
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RestoreIcon from "@material-ui/icons/Restore";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import HearingIcon from "@material-ui/icons/Hearing";
import ForwardIcon from "@material-ui/icons/Forward";

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
      },
      modelMask: {
        position: "absolute",

        top: "50vh",
        left: "50vw", //Need to fix once items are included

        "margin-top": "-10%",

        "margin-left": "-20%",
        height: "20%",
        width: "40%",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
      },

      inputbox: {
        width: "80%"
      }
    })
  );

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            onClick={handleOpen}
          >
            Pay Amount
          </Button>
          <Modal
            aria-labelledby="pay-amount-model"
            aria-describedby="pay-amount-popup"
            open={open}
            onClose={handleClose}
          >
            <div className={classes.modelMask}>
              <h2>Please Insert How Much You Have Spent Today</h2>
              <TextField
                className={classes.inputbox}
                label="Dollar Amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                variant="filled"
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ForwardIcon />}
              ></Button>
            </div>
          </Modal>
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
            Unpair All Ducks
          </Button>
        </Grid>
      </div>
    </Fragment>
  );
};

export default DemoPage;
