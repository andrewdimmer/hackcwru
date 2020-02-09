import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { firebaseApp, UserData } from "../firebase/config";
// import PairDucksModule from "./Modules/PairDuckModule";
import Concentration from "../components/Modules/Concentration";
declare interface ControlPageProps {
  userId: string;
  userData: UserData;
  handleLogout: () => void;
}

const ControlPage: React.FunctionComponent<ControlPageProps> = ({
  userId,
  userData,
  handleLogout
}) => {
  return (
    <Fragment>
      <Typography variant="h3"> Ducks! </Typography>
      {/*<PairDucksModule
        userId={userId}
        myDucks={userData.ducks}
      ></PairDucksModule>*/}
      <Concentration userID={userId} userData={userData} />
      <Button onClick={handleLogout}> Log Out </Button>
    </Fragment>
  );
};

export default ControlPage;
