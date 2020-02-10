import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ForwardIcon from "@material-ui/icons/Forward";
import HearingIcon from "@material-ui/icons/Hearing";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { Fragment } from "react";
import { firebaseApp } from "../firebase/config";
import {
  makePayment,
  nextWeek,
  quack,
  resetUser,
  unpairAllDucks
} from "../firebase/demo";

declare interface DemoProps {
  getInitialUsers: () => string[];
  getInitialDucks: () => string[];
  setInitialUsers: (users: string[]) => void;
  setInitialDucks: (ducks: string[]) => void;
}

const DemoPage: React.FunctionComponent<DemoProps> = ({
  getInitialUsers,
  getInitialDucks,
  setInitialUsers,
  setInitialDucks
}) => {
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
        width: "80%",
        marginTop: theme.spacing(1)
      }
    })
  );

  const classes = useStyles();
  const [open, setOpen] = React.useState<number>(0);
  const [allUsers, setAllUsers] = React.useState<string[]>(getInitialUsers());
  const [allDucks, setAllDucks] = React.useState<string[]>(getInitialDucks());
  const [user1, setUser1] = React.useState<string>("");
  const [amount1, setAmount1] = React.useState<number>(0);
  const [user2, setUser2] = React.useState<string>("");
  const [duck3, setDuck3] = React.useState<string>("");
  const [user4, setUser4] = React.useState<string>("");

  firebaseApp
    .firestore()
    .collection("ducks")
    .doc("DUCKS")
    .onSnapshot({
      next: snapshot => {
        const data = snapshot.data();
        if (data) {
          const ducks: string[] = [];
          for (let duck in data.ducks) {
            ducks.push(duck);
          }
          updateAllDucks(ducks);
        }
      }
    });

  firebaseApp
    .firestore()
    .collection("users")
    .onSnapshot({
      next: snapshot => {
        updateAllUsers(snapshot.docs.map(value => value.id));
      }
    });

  const updateAllDucks = (newDucks: string[]): void => {
    let update = false;
    const initialDucks = getInitialDucks();
    if (initialDucks.length !== newDucks.length) {
      update = true;
    } else {
      for (let i = 0; i < initialDucks.length; i++) {
        const oldDuck = initialDucks[0];
        if (newDucks.indexOf(oldDuck) < 0) {
          console.log(`${oldDuck} is no longer in allDucks`);
          update = true;
          break;
        }
      }
    }

    if (update) {
      console.log("Update allDucks");
      setInitialDucks(newDucks);
      setAllDucks(newDucks);
    }
  };

  const updateAllUsers = (newUsers: string[]): void => {
    let update = false;
    const initialUsers = getInitialUsers();
    if (initialUsers.length !== newUsers.length) {
      update = true;
    } else {
      for (let i = 0; i < initialUsers.length; i++) {
        const oldUser = initialUsers[0];
        if (newUsers.indexOf(oldUser) < 0) {
          console.log(`${oldUser} is no longer in allUsers`);
          update = true;
          break;
        }
      }
    }

    if (update) {
      console.log("Update allUsers");
      setInitialUsers(newUsers);
      setAllUsers(newUsers);
    }
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
            onClick={() => {
              setOpen(1);
            }}
          >
            Pay Amount
          </Button>
          <Modal
            aria-labelledby="pay-amount-model"
            aria-describedby="pay-amount-popup"
            open={open === 1}
            onClose={() => {
              setOpen(0);
            }}
          >
            <div className={classes.modelMask}>
              <Typography variant="h6">
                Please Select a User to Update and the Amount Spent
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select a User</InputLabel>
                <Select
                  variant="outlined"
                  value={user1}
                  name="newUserId"
                  onChange={event => setUser1(event.target.value as string)}
                >
                  {allUsers.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption">.</Typography>
              <TextField
                className={classes.inputbox}
                label="Dollar Amount"
                type="number"
                defaultValue={amount1}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                onChange={e =>
                  setAmount1(
                    parseInt(e.target.value) ? parseInt(e.target.value) : 0
                  )
                }
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ForwardIcon />}
                disabled={!user1 || !amount1}
                onClick={() => {
                  makePayment(amount1, user1);
                  setAmount1(0);
                  setUser1("");
                  setOpen(0);
                }}
              ></Button>
            </div>
          </Modal>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<DateRangeIcon />}
            onClick={() => {
              setOpen(2);
            }}
          >
            Next Week
          </Button>
          <Modal
            aria-labelledby="pay-amount-model"
            aria-describedby="pay-amount-popup"
            open={open === 2}
            onClose={() => {
              setOpen(0);
            }}
          >
            <div className={classes.modelMask}>
              <Typography variant="h6">
                Please Select a User to Update
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select a User</InputLabel>
                <Select
                  variant="outlined"
                  value={user2}
                  name="newUserId"
                  onChange={event => setUser2(event.target.value as string)}
                >
                  {allUsers.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ForwardIcon />}
                disabled={!user2}
                onClick={() => {
                  nextWeek(user2);
                  setUser2("");
                  setOpen(0);
                }}
              ></Button>
            </div>
          </Modal>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<HearingIcon />}
            onClick={() => {
              setOpen(3);
            }}
          >
            Quack
          </Button>
          <Modal
            aria-labelledby="pay-amount-model"
            aria-describedby="pay-amount-popup"
            open={open === 3}
            onClose={() => {
              setOpen(0);
            }}
          >
            <div className={classes.modelMask}>
              <Typography variant="h6">
                Please Select a Duck to Quack
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select a Duck</InputLabel>
                <Select
                  variant="outlined"
                  value={duck3}
                  name="newDuckId"
                  onChange={event => setDuck3(event.target.value as string)}
                >
                  {allDucks.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ForwardIcon />}
                disabled={!duck3}
                onClick={() => {
                  quack(duck3);
                  setDuck3("");
                  setOpen(0);
                }}
              ></Button>
            </div>
          </Modal>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<RestoreIcon />}
            onClick={() => {
              setOpen(4);
            }}
          >
            Reset User
          </Button>
          <Modal
            aria-labelledby="pay-amount-model"
            aria-describedby="pay-amount-popup"
            open={open === 4}
            onClose={() => {
              setOpen(0);
            }}
          >
            <div className={classes.modelMask}>
              <Typography variant="h6">
                Please Select a User to Reset
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select a User</InputLabel>
                <Select
                  variant="outlined"
                  value={user4}
                  name="newUserId"
                  onChange={event => setUser4(event.target.value as string)}
                >
                  {allUsers.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ForwardIcon />}
                disabled={!user4}
                onClick={() => {
                  console.log(resetUser(user4));
                  setUser4("");
                  setOpen(0);
                }}
              ></Button>
            </div>
          </Modal>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<LinkOffIcon />}
            onClick={() => {
              unpairAllDucks();
            }}
          >
            Unpair All Ducks
          </Button>
        </Grid>
      </div>
    </Fragment>
  );
};

export default DemoPage;
