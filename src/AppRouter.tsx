import React from "react";
import Animator from "./features/animation/Animator";
import Map from './features/map/Map';
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
                <Map/>
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
