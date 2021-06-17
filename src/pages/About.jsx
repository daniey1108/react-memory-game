import React from "react";

import * as MaterialUi from "@material-ui/core";

export default function About () {
    return (
    <>
      <MaterialUi.Box padding={2}>
          <MaterialUi.Card>
              <MaterialUi.CardHeader title="About" />
              <MaterialUi.CardContent>
                  <MaterialUi.Typography>
              <>
                Hi there! Im Dani :wave: ! I graduated from Niagara University
                with a Bachelor's in Science in Computer and Information
                Sciences in 2018! I started coding back in 2017, with an
                internship that taught me all the things college doesn't! I then
                transferred jobs to a more conducive learning environment where
                I could learn to establish myself, as well as start to strive
                toward a better understanding of various languages. I grew fond
                of React after leaving my self proclaimed safe space of C#, and
                the rest is history!
                <br />
                <br /> I couldn't imagine my life without all of my React
                knowledge and the various React communities I actively
                participate in! I frequently visit the ReactJS subreddit, as
                well as the stateOfX discord!
                <br /> <br /> Outside of coding, I am a true crime addict, I
                love documentaries, podcasts, books, and articles. I also adore
                my two cats Crowley and Castiel!
              </>
                  </MaterialUi.Typography>
              </MaterialUi.CardContent>
          </MaterialUi.Card>
      </MaterialUi.Box>
    </>
    );
}
