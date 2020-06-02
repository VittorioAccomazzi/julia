import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Classic.json'
import {AnimationProps} from '../../common/Types'
import {fractalSource} from './Shaders'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .

const AnimatorClassic = ({onCompleted} : AnimationProps) =>{
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={true}
        fragmentSource={fractalSource}
        mapURL="/mapClassic"
        mapImg="Mandelbrot.png"
        onCompleted = {onCompleted}
     />
 )  
}

export default AnimatorClassic;


