import React from "react";
import MapViewerBase from '../../features/map/MapViewerBase'
import cPoints from './Phoenix.json'
import {mapSource} from './Shaders'

const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            cPoints={cPoints}
            mapImg="Phoenix.png"
            fragmentSource={mapSource}
            clickUrl="/View/Phoenix"
        />
    )
}

export default MapViewerClassic;

