import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Classic.json'
import JuliaClassic from './Julia'
import PointNavigationClassic from './PointNavigation'
import Luts from '../../common/Luts.json'
import {AnimationProps} from '../../common/Types'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .
const defaultC  = { x:0, y:0}

const AnimatorClassic = ({onCompleted} : AnimationProps) =>{
    const completed = ()=>{
        if( onCompleted ) onCompleted();
    }
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={true}
        fractal ={(
            <JuliaClassic c={defaultC} lut={Luts[0]} />
        )}
        mapURL="/mapClassic"
        navigation={(
            <PointNavigationClassic  c={defaultC} />
        )}
        onCompleted = {completed}
     />
 )  
}

export default AnimatorClassic;
