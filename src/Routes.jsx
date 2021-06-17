import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import MemoryGame from "./pages/MemoryGame.jsx";

export default function Routes () {
    return (
        <Router>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/memory-game">
                    <MemoryGame />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
