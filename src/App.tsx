import React from "react";
import Julia from "./features/julia/Julia";
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
    appLogo: {
      height: "40vmin",
      pointerEvents: "none",
      "@media (prefers-reduced-motion: no-preference) ": {
        animation: "App-logo-float infinite 3s ease-in-out"
      }
    },
    appHeader: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)"
    },
    appLink: {
      color: "rgb(112, 76, 182)"
    }
  });

type AppProps = {} & WithStyles<typeof styles>;

const App = ({ classes }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.app}>
      <header className={classes.appHeader}>
       <Julia lut={{}}/>
      </header>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
