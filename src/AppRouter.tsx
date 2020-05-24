import React from "react";
import AnimatorClassic from './fractals/classic/Animator'
import MapClassic from './fractals/classic/MapViewer'
import AnimatorPhoenix from './fractals/phoenix/Animator'
import MapPhoenix from './fractals/phoenix/MapViewer'
import AnimatorMix from './fractals/AnimatorMix'
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
          <Route path="/mapClassic">
              <MapClassic/>
          </Route>
          <Route path="/mapPhoenix">
              <MapPhoenix/>
          </Route>
          <Route path="/Phoenix">
            <AnimatorPhoenix/>
          </Route>
          <Route path="/Classic">
            <AnimatorClassic/>
          </Route>
          <Route path="/">
            <AnimatorMix/>
          </Route>
        </Switch>
        </Router>
        </>
    )

}

export default AppRouter;
