import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Classic.json'
import JuliaClassic from './Julia'
import PointNavigationClassic from './PointNavigation'
import Luts from '../../common/Luts.json'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .
const defaultC  = { x:0, y:0}

const AnimatorClassic = () =>{
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
     />
 )  
}

export default AnimatorClassic;
