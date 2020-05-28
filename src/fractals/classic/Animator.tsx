import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Classic.json'
import JuliaClassic from './Julia'
import PointNavigationClassic from './PointNavigation'
import {AnimationProps, FractalProps, PointNavigationProps} from '../../common/Types'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .

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
        fractal ={( props : FractalProps ) =>   <JuliaClassic {...props} />}
        mapURL="/mapClassic"
        navigation={( props: PointNavigationProps ) =>   <PointNavigationClassic  {...props} /> }
        onCompleted = {completed}
     />
 )  
}

export default AnimatorClassic;
