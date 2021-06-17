import React from "react";

import * as MaterialUi from "@material-ui/core";
import GameSetup from "../components/memory-game/GameSetup.jsx";

export default function MemoryGame () {
    return (
    <>
      <MaterialUi.Box padding={2}>
          <MaterialUi.Card>
              <MaterialUi.CardHeader title="Memory Game" />
              <MaterialUi.CardContent>
                  <GameSetup />
              </MaterialUi.CardContent>
          </MaterialUi.Card>
      </MaterialUi.Box>
    </>
    );
}
