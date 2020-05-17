import React from "react";
import AppRouter from './AppRouter'
import ErrorBoundary from './common/ErrorBoundary';
import GitInfo from './common/GitInfo'
import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#fff"
    },
    background: {
      default: "#fff"
    }
  }
});

const styles: (theme: Theme) => StyleRules<string> = theme =>
  createStyles({
    root: {
      
    },
    app: {
      textAlign: "center"
    },
    appHeader: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)"
    }
  });

type AppProps = {} & WithStyles<typeof styles>;

const App = ({ classes }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <ErrorBoundary message="The browser doesn't support WebGL">
              <AppRouter/>
              <GitInfo label={"version "} baseURL='https://github.com/VittorioAccomazzi/julia' forkme={true}/>
       </ErrorBoundary>
      </header>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
