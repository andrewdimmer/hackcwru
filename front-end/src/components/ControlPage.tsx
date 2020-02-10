import { Button, Container, Typography, CardActions } from "@material-ui/core";
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
  //const classes = useStyles();
  return (
    <Container>
      <Typography variant="h3" align="center" className={classes.margined}>
        Duck Configuration
      </Typography>
      <Typography variant="body1" className={classes.margined}>
        Setup your fowl friend to help you keep track of your finances and hone
        your studying skills! Use the "Study Skills" section to keep track of
        how long you've been studying and when you should take a break. In the
        "Budget" section, you can configure a monthly spending goal, and even
        fine-tune a weekly spending goal to account for variances in your
        personal financial situation.
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
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          className={classes.margined}
          onClick={handleLogout}
          color="secondary"
          size="large"
          variant="contained"
        >
          Log Out
        </Button>
      </CardActions>
    </Container>
  );
};

export default ControlPage;
