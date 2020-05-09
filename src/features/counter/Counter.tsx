import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount
} from "./counterSlice";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
  CircularProgress
} from "@material-ui/core";

const styles: (theme: Theme) => StyleRules<string> = theme =>
  createStyles({
    value: {
      fontSize: "78px",
      fontFamily: "'Courier New', Courier, monospace"
    },
    button: {
      color: "rgb(112, 76, 182)",
      appearance: "none",
      background: "none",
      fontSize: "calc(16px + 2vmin)",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingBottom: "4px",
      cursor: "pointer",
      backgroundColor: "rgba(112, 76, 182, 0.1)",
      borderRadius: "2px",
      transition: "all 0.15s",
      outline: "none",
      border: "2px solid transparent",
      textTransform: "none",
      "&:hover": {
        border: "2px solid rgba(112, 76, 182, 0.4)"
      },
      "&:focus": {
        border: "2px solid rgba(112, 76, 182, 0.4)"
      },
      "&:active": {
        backgroundColor: "rgba(112, 76, 182, 0.2)"
      }
    },
    textbox: {
      fontSize: "32px",
      width: "64px",
      textAlign: "center"
    },
    asyncButton: {
      "&:after": {
        content: "",
        backgroundColor: "rgba(112, 76, 182, 0.15)",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        opacity: "0",
        transition: "width 1s linear, opacity 0.5s ease 1s"
      },
      "&:active:after": {
        width: "0%",
        opacity: "1",
        transition: "0s"
      }
    }
  });

type CounterProps = {} & WithStyles<typeof styles>;

const Counter = ({ classes }: CounterProps) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [isWorking, setIsWorking] = useState(false);

  const doAsyncInc = () => {
    setIsWorking(true);
    dispatch(incrementAsync(Number(incrementAmount || 0)));

    setTimeout(() => {
      setIsWorking(false);
    }, 1000);
  };
  return (
    <React.Fragment>
      <Grid container xs={12} alignItems="center" justify="center" spacing={3}>
        <Grid item>
          <Button
            className={classes.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
        </Grid>
        <Grid item>
          <Typography className={classes.value} variant="body1">
            {count}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={3}
      >
        <Grid item>
          <Input
            className={classes.textbox}
            inputProps={{ className: classes.textbox }}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
          >
            Add Amount
          </Button>
        </Grid>
        <Grid item>
          {!isWorking && (
            <Button
              className={[classes.button, classes.asyncButton].join(" ")}
              onClick={() => {
                doAsyncInc();
              }}
            >
              Add Async
            </Button>
          )}
          {isWorking && <CircularProgress />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Counter);
