import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { C, Lut, AnimationPath, FractalProps, PointNavigationProps } from '../../common/Types';
import luts from '../../common/Luts.json'
import NoInteraction from './NoInteraction';
import Clickable from '../../common/Clickable'


    type FractalComponent = FunctionComponent<FractalProps>;
    type NovigationComponent = FunctionComponent<PointNavigationProps>;


    type AnimatorBaseProps = {
        cPoints : AnimationPath,
        resetTime : number,
        frameTime : number,
        flipY : boolean,
        fractal : React.ReactElement<FractalComponent>,
        navigation : React.ReactElement<NovigationComponent>,
        mapURL : string
    }

    const AnimatorBase = ({cPoints, resetTime, frameTime, flipY, fractal, navigation, mapURL}:AnimatorBaseProps) => {
        let pathStart = useRef<number>(0);
        let pathEnd   = useRef<number>(1);
        let pathIndex = useRef<number>(0);
        let cStart    = useRef<C>({x:0,y:0});
        let cEnd      = useRef<C>({x:0,y:0});
        let pos       = useRef<number>(0);
        let ySign     = useRef<number>(0);
        let lut       = useRef<Lut>(luts[0]);
        let [cPoint, setCPoint] = useState<C|null>(null)

        // function to init the animation
        const resetPoints= () =>{
            pathIndex.current++;
            if ( pathIndex.current === pathEnd.current){
                // select the lut
                lut.current=selectRandomElement(luts);
                // Path is completed, need to create a new one.
                let p1 =0;
                let p2 =0;
                while (p1 === p2 ){
                    p1 = Math.floor(cPoints.steps.length * Math.random());
                    p2 = Math.floor(cPoints.steps.length * Math.random());
                }
                pathStart.current = Math.min(p1,p2);    // group to start
                pathEnd.current   = Math.max(p1,p2);    // group to end
                pathIndex.current = pathStart.current;  
                ySign.current     = Math.random() > 0.5 ? 1 : -1;
                ySign.current     = flipY ? ySign.current : 1; 
                cStart.current    = selectRandomElement(cPoints.steps[pathStart.current]);
                cStart.current.y *= ySign.current;
                console.log(`New Animation from ${pathStart.current} to ${pathEnd.current}`)
            } else {
                cStart.current = cEnd.current;      
            }
            cEnd.current = selectRandomElement(cPoints.steps[pathIndex.current+1]);
            cEnd.current.y *= ySign.current;
            pos.current =0;
            console.log(`  New Step from ${cStart.current.x}, ${cStart.current.y} to ${cEnd.current.x},${cEnd.current.y}`)
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
            pos.current = pos.current +1;
            setCPoint(point);
        }

        //Initialization
        useEffect(()=>{
            // timer.
            resetPoints();
            nextCPoint()
            let frameInterval = setInterval(nextCPoint, frameTime);
            let resetInterval = setInterval(resetPoints, resetTime)
            return ()=> { 
                clearInterval(resetInterval);
                clearInterval(frameInterval);
            }
        },[]);

        return (
            <>
                { cPoint != null && (
                    <NoInteraction>
                        <>
                        {
                            React.cloneElement(fractal as React.ReactElement, {c:cPoint, lut:lut.current}) 
                        }
                        <Clickable link={mapURL}>
                            {
                                React.cloneElement(navigation as React.ReactElement, {c:cPoint}) 
                            }
                        </Clickable>
                        </>
                    </NoInteraction>
                ) }
            </>
        );
    }

    export default AnimatorBase;

    // Utility functions

    function selectRandomElement<T>(  list : Array<T>) : T {
        let len = list.length;
        let el = list[Math.floor(len*Math.random())];
        return {...el}; // clone -- not supported by Edge
    }