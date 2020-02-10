import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import React, { Fragment } from "react";
import { pairDuck, unpairDuck } from "../../firebase/user";
declare interface PairModuleProps {
  userId: string;
  myDucks: string[];
  unpairedDucks: string[];
  classes: any;
}

const PairDucksModule: React.FunctionComponent<PairModuleProps> = ({
  userId,
  myDucks,
  unpairedDucks,
  classes
}) => {
  const [newDuck, setNewDuck] = React.useState("");

  return (
    <Paper className={classes.marginedPadded} elevation={3}>
      <Typography variant="h4">Duck Management</Typography>
      <Typography variant="h5">Connect a New Duck!</Typography>
      <Typography variant="body1">
        To get all the features from your duck, simply select it below, they
        click the pair with duck button. This will link your duck to your
        account, where you can manage your settings and enable additional modes.
      </Typography>
      {unpairedDucks.length > 0 && (
        <Fragment>
          <FormControl fullWidth>
            <InputLabel>Select a Duck</InputLabel>
            <Select
              variant="outlined"
              value={newDuck}
              name="newDuckId"
              onChange={event => setNewDuck(event.target.value as string)}
            >
              {unpairedDucks.map(value => (
                <MenuItem
                  key={value}
                  value={value}
                  className={classes.margined}
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className={classes.marginedPadded}
            disabled={!newDuck}
            onClick={() => {
              pairDuck(newDuck, userId).then(worked => {
                if (worked) {
                  setNewDuck("");
                } else {
                }
              });
            }}
            color="primary"
            variant="contained"
          >
            Pair with Duck!
          </Button>
        </Fragment>
      )}
      {unpairedDucks.length === 0 && (
        <Typography variant="h6">
          Sorry, but there are no unpaired ducks nearby.
        </Typography>
      )}
      <Typography variant="h5">Manage My Ducks</Typography>
      <Typography variant="body1">
        Want to see how many and which ducks you have linked to your account?
        They are all listed below.
      </Typography>
      <Typography variant="body1">
        Want to disconnect from a duck so others can try the expirence that is
        Buck Duck? Just click the minus symbol in the circle next to the duck
        you wish to unpair.
      </Typography>
      {myDucks.length > 0 && (
        <List>
          {myDucks.map(value => {
            return (
              <ListItem key={value}>
                <Typography variant="h6">{value}</Typography>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => unpairDuck(value)}>
                    <RemoveCircleIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
      {myDucks.length === 0 && (
        <Typography variant="h6">
          You do not yet have any ducks. If one is nearby, you can add it above!
        </Typography>
      )}
    </Paper>
  );
};

export default PairDucksModule;
