import React from "react";
import Animator from "./features/animation/Animator";
import Navigator from './features/map/Navigator';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const AppRouter = ()=>{

    return (
        <>
        <Router>
        <Switch>
            <Route path="/map">
                <Navigator/>
            </Route>
          <Route path="/">
            <Animator/>
          </Route>
        </Switch>
        </Router>
        </>
    )

}

export default AppRouter;
