import React  from "react";
import { PointNavigationProps } from '../../common/Types';
import cPoints from './Phoenix.json'
import PointNavigationBase from '../../features/animation/PointNavigationBase'


const PointNavigation = ({c}: PointNavigationProps) => {
    return (
        <PointNavigationBase
            c={c}
            cPoints={cPoints}
            mapImage={"Phoenix.png"}
        />
    )
}

export default PointNavigation;