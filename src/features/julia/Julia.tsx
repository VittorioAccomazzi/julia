import React, { useState, useEffect, useRef } from "react";
import { C, Lut } from './jTypes';
import JFractal from './jFractal';
import cPoints from './data.json';
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
    })

    type JuliaProps = { lut : Lut } & WithStyles<typeof styles>;

    const Julia = ({lut, classes } : JuliaProps) => {
        let [cPoint, setCPoint] = useState<C>({x:0.31, y:-0.5668})

        // function to change the CPoint
        const nextCPoint = ()=>{
            let ySign = Math.random() < 0.5 ? 1 : -1;
            let point = cPoints.seeds[Math.floor(cPoints.seeds.length * Math.random())];
            console.log(`C : (${point.x}, ${point.y}) iterations ${point.i}`);
            setCPoint({x:point.x, y:ySign*point.y});
        }

        //Initialization
        useEffect(()=>{
            // timer.
            nextCPoint();
            let interval = setInterval(nextCPoint, 2000);
            return ()=> clearInterval(interval);
        },[]);

        return (
                <JFractal c={cPoint} lut={lut} />
        );
    }

    export default withStyles(styles)(Julia);