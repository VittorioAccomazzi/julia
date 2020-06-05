import React from "react";
import cPoints from './Classic.json'
import MapViewerBase from '../../features/map/MapViewerBase'
import {mapSource} from './Shaders'

const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            cPoints={cPoints}
            mapImg={"Mandelbrot.png"}
            fragmentSource={mapSource}
            clickUrl="/View/Classic"
        />
    )
}

export default MapViewerClassic;
