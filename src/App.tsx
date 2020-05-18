import React from "react";
import AppRouter from './AppRouter'
import ErrorBoundary from './common/ErrorBoundary';
import GitInfo from './common/GitInfo'
import { makeStyles} from "@material-ui/core/styles";
import './App.css'

const useStyles = makeStyles(() => ({
  app: {
    textAlign: "center",
  }
}));



const App = () => {
  const classes = useStyles();
  return (
  <>
    <div className={classes.app}>
        <ErrorBoundary message="The browser doesn't support WebGL">
              <AppRouter/>
              <GitInfo label={"version "} baseURL='https://github.com/VittorioAccomazzi/julia' forkme={true}/>
       </ErrorBoundary>
    </div>
  </>
);}

export default App;
