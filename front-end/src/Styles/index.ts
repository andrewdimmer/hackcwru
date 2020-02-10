import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { THEME } from "./theme";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2)
    },
    margined: {
      margin: theme.spacing(2)
    },
    marginedPadded: {
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    homeRoot: {
      //minWidth: 275,
      display: "flex",

      "justify-content": "center",

      "flex-direction": "column",

      "align-items": "center",

      "flex-wrap": "wrap"
    },
    homeTitle: {
      fontSize: 14
    },
    homePos: {
      marginBottom: 12
    }
  })
);

export const theme = THEME;
