import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Phoenix.json'
import JuliaPhoenix from './Julia'
import PointNavigationPhoenix from './PointNavigation'
import Luts from '../../common/Luts.json'
import {AnimationProps, FractalProps, PointNavigationProps} from '../../common/Types'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .

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
        fractal ={( props : FractalProps ) => <JuliaPhoenix {...props} />}
        mapURL="/mapPhoenix"
        navigation={( props : PointNavigationProps) => <PointNavigationPhoenix  {...props} />}
        onCompleted={completed}
     />
 )  
}

export default AnimatorPhoenix;
