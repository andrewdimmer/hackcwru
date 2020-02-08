import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

declare interface DemoProps {
  }
  const DemoPage: React.FunctionComponent<DemoProps> = ({
  }) => {
    return(
        <Fragment>
      <div>
      <Typography variant="h1">
        Hello Corgis
      </Typography>
      </div>
    </Fragment>
    );
}

export default DemoPage;