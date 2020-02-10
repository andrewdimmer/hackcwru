import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { UserData } from "../firebase/config";
import ConcentrationModule from "./Modules/ConcentrationModule";
import DebugModule from "./Modules/DebugModule";
import FinancialModule from "./Modules/FinanceModule";
import PairDucksModule from "./Modules/PairDuckModule";
declare interface ControlPageProps {
  userId: string;
  userData: UserData;
  unpairedDucks: string[];
  handleLogout: () => void;
  classes: any;
}

const ControlPage: React.FunctionComponent<ControlPageProps> = ({
  userId,
  userData,
  unpairedDucks,
  handleLogout,
  classes
}) => {
  return (
    <Container>
      <Typography variant="h3" className={classes.margined}>
        Ducks!
      </Typography>
      <PairDucksModule
        userId={userId}
        myDucks={userData.ducks}
        unpairedDucks={unpairedDucks}
        classes={classes}
      ></PairDucksModule>
      <ConcentrationModule
        userId={userId}
        userData={userData}
        classes={classes}
      />
      <FinancialModule userId={userId} userData={userData} classes={classes} />
      <DebugModule classes={classes} />
      <Button
        className={classes.margined}
        onClick={handleLogout}
        color="primary"
        size="large"
        variant="contained"
      >
        {" "}
        Log Out{" "}
      </Button>
    </Container>
  );
};

export default ControlPage;
