import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Phoenix.json'
import JuliaPhoenix from './Julia'
import PointNavigationPhoenix from './PointNavigation'
import Luts from '../../common/Luts.json'
import {AnimationProps} from '../../common/Types'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .
const defaultC  = { x:0, y:0}

const AnimatorPhoenix = ({onCompleted}:AnimationProps) =>{
    const completed = ()=>{
        if( onCompleted ) onCompleted();
    }
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={false}
        fractal ={(
            <JuliaPhoenix c={defaultC} lut={Luts[0]} />
        )}
        mapURL="/mapPhoenix"
        navigation={(
            <PointNavigationPhoenix  c={defaultC} />
        )}
        onCompleted={completed}
     />
 )  
}

export default AnimatorPhoenix;
