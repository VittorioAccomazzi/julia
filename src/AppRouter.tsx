import React, { useEffect } from "react";
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
  import ReactGA from 'react-ga';


const AppRouter = ()=>{

    useEffect(()=>{
      ReactGA.initialize('UA-167495801-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    },[])

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
