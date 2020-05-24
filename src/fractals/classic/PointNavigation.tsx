import React  from "react";
import { PointNavigationProps } from '../../common/Types';
import cPoints from './Classic.json'
import PointNavigationBase from '../../features/animation/PointNavigationBase'


const PointNavigation = ({c}: PointNavigationProps) => {
    return (
        <PointNavigationBase
            c={c}
            cPoints={cPoints}
            mapImage={"Mandelbrot.png"}
        />
    )
}

export default PointNavigation;