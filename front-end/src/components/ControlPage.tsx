import { Button, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { firebaseApp, UserData } from "../firebase/config";
import Concentration from "../components/Modules/Concentration";
import BudgetPage from "./Modules/Budget";
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
      <Concentration userID={userId} userData={userData} />
      <BudgetPage userID={userId} userData={userData} />
      <Button onClick={handleLogout}> Log Out </Button>
    </Fragment>
  );
};

export default ControlPage;
