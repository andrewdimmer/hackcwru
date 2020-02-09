import { Button, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { UserData } from "../firebase/config";
import PairDucksModule from "./Modules/PairDuckModule";
declare interface ControlPageProps {
  userId: string;
  userData: UserData;
  unpairedDucks: string[];
  handleLogout: () => void;
}

const ControlPage: React.FunctionComponent<ControlPageProps> = ({
  userId,
  userData,
  unpairedDucks,
  handleLogout
}) => {
  return (
    <Fragment>
      <Typography variant="h3"> Ducks! </Typography>
      <PairDucksModule
        userId={userId}
        myDucks={userData.ducks}
        unpairedDucks={unpairedDucks}
      ></PairDucksModule>
      <Button onClick={handleLogout}> Log Out </Button>
    </Fragment>
  );
};

export default ControlPage;
