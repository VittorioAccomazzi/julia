import * as React from "react";
import FractalBase from '../../features/view/FractalBase'
import {fractalSource} from './Shaders'
import {RouteComponentProps, withRouter} from "react-router-dom";

const defaultZoom ={
    zoom : 3.5
}

const defaultPos ={
    x: 0,
    y: 0
}

const FractalNetwton = (props:RouteComponentProps)=>{
    return (
        <FractalBase {...props } fragmentSource={fractalSource}  startPos={defaultPos} startZoom={defaultZoom}/>
    )
}
export default withRouter(FractalNetwton)

