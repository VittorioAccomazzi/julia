import React from "react";
import {Lut, ViewportPos, ViewportZoom, WindowSizeEvent} from '../../common/Types';
import FractalEngine from '../../common/FractalEngine';

type MapBaseProps = {
    lut : Lut,
    zoom: ViewportZoom,
    pos : ViewportPos,
	onViewportSize? : WindowSizeEvent,
	fragmentSource : string
}

const MapBase = ({lut, zoom, pos, onViewportSize, fragmentSource} : MapBaseProps) =>{

    return (
        <FractalEngine 
            fragShaderCode={fragmentSource}
            vPos={pos}
            vZoom={zoom}
            lut={lut}
            onViewportSize={onViewportSize}
             />
    )
}

export default MapBase;
