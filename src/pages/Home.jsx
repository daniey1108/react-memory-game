import React from "react";

import * as MaterialUi from "@material-ui/core";

export default function Home () {
    return (
    <>
      <MaterialUi.Box padding={2}>
          <MaterialUi.Card>
              <MaterialUi.CardHeader title="Home" />
              <MaterialUi.CardContent>
                  <MaterialUi.Typography>
              Welcome to my home page!!!
                  </MaterialUi.Typography>
                  <MaterialUi.Typography>
              Here is a collection of various stuff, between things ive built,
              and my accounts on different platforms!
                  </MaterialUi.Typography>
              </MaterialUi.CardContent>
          </MaterialUi.Card>
      </MaterialUi.Box>
    </>
    );
}
