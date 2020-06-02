import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Newton.json'
import {AnimationProps} from '../../common/Types'
import lut from './Lut'
import {fractalSource} from './Shaders'

const resetTime = 600; // time of new animation
const frameTime = 100;  // ms per frame .


const AnimatorNewton = ({onCompleted}:AnimationProps) =>{
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={true}
        fragmentSource={fractalSource}
        mapURL="/mapNewton"
        mapImg="Newton.png"
        startZoom={{zoom:3.5}}
        singleLut={lut}
        onCompleted={onCompleted}
     />
 )  
}

export default AnimatorNewton;

