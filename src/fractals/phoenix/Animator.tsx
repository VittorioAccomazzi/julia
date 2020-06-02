import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Phoenix.json'
import {AnimationProps} from '../../common/Types'
import {fractalSource} from './Shaders'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .

const AnimatorPhoenix = ({onCompleted}:AnimationProps) =>{
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={false}
        fragmentSource={fractalSource}
        mapURL="/mapPhoenix"
        mapImg="Phoenix.png"
        onCompleted={onCompleted}
     />
 )  
}

export default AnimatorPhoenix;

