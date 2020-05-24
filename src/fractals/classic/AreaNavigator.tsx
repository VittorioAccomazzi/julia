import React from "react";
import AreaNavigatorBase from '../../features/map/AreaNavigationBase'
import cPoints from './Classic.json'
import {AreaNavigationProps} from '../../common/Types'



const AreaNavigatorClassic = ({x, y, width, height}: AreaNavigationProps)=>{
    return (
        <AreaNavigatorBase 
            x={x}
            y={y}
            width={width}
            height={height}
            cPoints={cPoints}
            mapImage={"Mandelbrot.png"}
        />
    )
}

export default AreaNavigatorClassic;

