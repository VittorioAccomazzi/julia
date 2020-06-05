import React from "react";
import PanZoomInteractor  from '../../common/interactors/PanZoomInteractor'
import {C, Lut, ViewportZoom, ViewportPos, ViewportProps} from '../../common/Types'
import JuliaBase from  '../../common/JuliaBase'

type viewBaseProps ={
    c : C,
    lut : Lut,
    fragmentSource : string,
    startZoom? : ViewportZoom,
    startPos? : ViewportPos
}

const ViewBase = ({c, lut, startZoom, startPos, fragmentSource}:viewBaseProps)=>{

    return (
        <PanZoomInteractor 
            display = { (props : ViewportProps )=> <JuliaBase {...props} fragmentSource={fragmentSource} lut={lut} c={c}/> }
            startPos={startPos}
            startZoom={startZoom}
        />
    )
}

export default ViewBase;