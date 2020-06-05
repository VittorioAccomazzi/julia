import React from "react";
import cPoints from './Newton.json'
import MapViewerBase from '../../features/map/MapViewerBase'
import lut from './Lut'
import {mapSource} from './Shaders'

const defaultZoom ={
    zoom : 3
}

const defaultPos ={
    x: 2,
    y: 0
}

const MapViewerNewton = () =>{
    return (
        <MapViewerBase
            cPoints={cPoints}
            mapImg={"Newton.png"}
            fragmentSource={mapSource}
            startZoom={defaultZoom}
            startPos={defaultPos}
            startLut={lut}
            clickUrl="/View/Newton"
        />
    )
}

export default MapViewerNewton;
