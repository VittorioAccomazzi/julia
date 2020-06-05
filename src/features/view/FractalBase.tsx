import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import FractalViewportBase from './FractalViewport'
import {ViewportPos, ViewportZoom} from '../../common/Types'
 
type FractalBaseProps ={
    fragmentSource : string,
    startZoom? : ViewportZoom,
    startPos? : ViewportPos 
}

function FractalBase({location, fragmentSource, startPos, startZoom}: RouteComponentProps & FractalBaseProps) {
    let parser = new URLSearchParams(location.search);
    let getFloat = ( key : string ) => Number.parseFloat( parser.get(key) ?? "0.0" )
    let getColor = ( key : string ) => parser.get(key) ?? "000000"
    let c = {
        x : getFloat("cx"),
        y : getFloat("cy")
    }
    let lut = {
        wl : {
            w : getFloat("w"),
            l : getFloat("l")
        },
        c1 : getColor("c1"),
        c2 : getColor("c2"),
        c3 : getColor("c3"),
        c4 : getColor("c4")
    }

    return (
        <FractalViewportBase 
            c={c} 
            lut={lut}
            startPos={startPos}
            startZoom={startZoom} 
            fragmentSource={fragmentSource}
            />
    )
}
export default FractalBase;