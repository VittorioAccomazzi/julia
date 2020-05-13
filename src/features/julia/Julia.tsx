import React, { useState, useEffect, useRef } from "react";
import { C, Lut } from './jTypes';
import JFractal from './jFractal';
import cPoints from './data.json';
import {
    withStyles,
    Theme,
    StyleRules,
    createStyles,
    WithStyles
  } from "@material-ui/core";
  
  const styles: (theme: Theme) => StyleRules<string> = theme =>
    createStyles({
    })

    type JuliaProps = { lut : Lut } & WithStyles<typeof styles>;

    const resetTime  = 3000; // a new animation every 5 seconds.
    const frameTime = 200;  // 5 frame sec.
    const maxDistance= 10; // in sampling step (pixels)
    const noValue : number = -1;

    const Julia = ({lut, classes } : JuliaProps) => {
        let cStart = useRef<C>({x:-2,y:0});
        let cEnd   = useRef<C>({x:-2,y:0});
        let pos    = useRef<number>(0);
        let iEnd   = useRef<number>(noValue);
        let [cPoint, setCPoint] = useState<C|null>(null)

        // function to init the animation
        const resetPoints= () =>{
            let sIndex = Math.floor(cPoints.seeds.length * Math.random());
            if( iEnd.current != noValue ) sIndex = iEnd.current;
            let sPoint = cPoints.seeds[sIndex];  
            let dst = maxDistance * (cPoints.xMax-cPoints.xMin)/cPoints.nx;
            let nMap = cPoints.seeds.map( (pt,i) => (i != sIndex && Math.abs(pt.x - sPoint.x) < dst && Math.abs( pt.y - sPoint.y ) < dst) ? i : noValue );
            let nIndexes = nMap.filter((i)=> i!=noValue);
            let ePoint = {x:sPoint.x + Math.random() * dst/2, y: sPoint.y+Math.random() *dst/2, i:0} // just to set an end point.
            iEnd.current = noValue;
            if( nIndexes.length > 0 ){
                iEnd.current = nIndexes[Math.floor(nIndexes.length*Math.random())];
                ePoint = cPoints.seeds[iEnd.current];
            } 
            cStart.current = sPoint;
            cEnd.current = ePoint;
            pos.current = 0;
            console.log(`Animation start (${sPoint.x},${sPoint.y}) with ${sPoint.i} end (${ePoint.x},${ePoint.y}) width ${ePoint.i}`)
        }

        // function to change the CPoint
        const nextCPoint = ()=>{
            let dx = cEnd.current.x - cStart.current.x;
            let dy = cEnd.current.y - cStart.current.y;
            let dst = Math.sqrt( dx * dx + dy * dy );
            dx /= dst;
            dy /= dst;
            let nSteps = resetTime/frameTime;
            let step = dst / nSteps;
            let xStep = dx * step * pos.current;
            let yStep = dy * step * pos.current;
            let point = { 
                x: cStart.current.x + xStep,
                y: cStart.current.y + yStep
            }
            //console.log(`   nextCPoint : (${point.x}, ${point.y})`);
            pos.current = pos.current +1;
            setCPoint(point);
        }

        //Initialization
        useEffect(()=>{
            // timer.
            resetPoints();
            nextCPoint()
            let resetInterval = setInterval(nextCPoint, frameTime);
            let frameInterval = setInterval(resetPoints, resetTime)
            return ()=> { 
                clearInterval(resetInterval);
                clearInterval(frameInterval);
            }
        },[]);

        return (
            <>
                { cPoint != null && (<JFractal c={cPoint} lut={lut} />) }
            </>
        );
    }

    export default withStyles(styles)(Julia);