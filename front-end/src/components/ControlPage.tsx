import React, { Fragment } from "react";
import Paper, {
  Typography,
  CardActions,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Box
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import container from "@material-ui/core/Container";
import { firebaseApp, UserData } from "../firebase/config";
// import PairDucksModule from "./Modules/PairDuckModule";
import Concentration from "../components/Modules/Concentration";
import BudgetPage from "./Modules/Budget";
import { Container } from "@material-ui/core";
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
  //const classes = useStyles();
  return (
    <Fragment>
      <Typography variant="h3" align="center">
        {" "}
        Duck Configuration{" "}
      </Typography>
      <Box width="50%" m="auto">
        <Typography variant="body1" align="center">
          {" "}
          Setup your fowl friend to help you keep track of your finances and
          hone your studying skills! Use the "Study Skills" section to time how
          long you've been studying and when you should take a break. In the
          "Budget" section, you can configure a monthly spending goal, and even
          fine-tune a weekly budget to account for variances in your personal
          financial situation.{" "}
        </Typography>{" "}
      </Box>

      {/*<PairDucksModule
        userId={userId}
        myDucks={userData.ducks}
      ></PairDucksModule>*/}
      <Container>
        <Concentration userID={userId} userData={userData} />
      </Container>

      <Container>
        <BudgetPage userID={userId} userData={userData} />
      </Container>
      <CardActions style={{ justifyContent: "center" }}>
        <Button color="secondary" variant="contained" onClick={handleLogout}>
          {" "}
          Log Out{" "}
        </Button>
      </CardActions>
    </Fragment>
  );
};

export default ControlPage;
