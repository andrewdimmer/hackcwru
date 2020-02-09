import React, { Fragment } from "react";
import {
  Typography,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  ListItem,
  List,
  ListItemSecondaryAction,
  ListItemText,
  IconButton
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { firebaseApp } from "../../firebase/config";
import { pairDuck, unpairDuck } from "../../firebase/user";
declare interface PairModuleProps {
  userId: string;
  myDucks: string[];
  unpairedDucks: string[];
}

const PairDucksModule: React.FunctionComponent<PairModuleProps> = ({
  userId,
  myDucks,
  unpairedDucks
}) => {
  const [newDuck, setNewDuck] = React.useState("");

  return (
    <Fragment>
      <Typography variant="h3">Pair Ducks!</Typography>
      <Typography variant="h4">Connect a new duck!</Typography>
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
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disabled={!newDuck}
            variant="contained"
            onClick={() => {
              console.log("Pairing with duck...");
              pairDuck(newDuck, userId).then(worked => {
                if (worked) {
                  setNewDuck("");
                } else {
                  console.log("Failed to pair...");
                }
              });
            }}
          >
            Pair with Duck!
          </Button>
        </Fragment>
      )}
      {unpairedDucks.length === 0 && (
        <Typography variant="h4">
          There are no unpaired ducks nearby.
        </Typography>
      )}
      <Typography variant="h4">My Ducks</Typography>
      <List>
        {myDucks.map(value => {
          return (
            <ListItem key={value}>
              <ListItemText primary={value} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => unpairDuck(value)}>
                  <RemoveCircleIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};

export default PairDucksModule;
