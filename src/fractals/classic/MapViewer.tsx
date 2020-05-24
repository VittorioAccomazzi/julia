import React from "react";
import MapClassic from './Map'
import AreaNavigatorClassic from './AreaNavigator'
import MapViewerBase from '../../features/map/MapViewerBase'
import Luts from '../../common/Luts.json'
import { defaultViewport, defaultZoom, defaultPos} from '../../common/Types'


const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            map ={
                (<MapClassic
                    zoom={defaultZoom} 
                    pos={defaultPos}
                    lut={Luts[0]}
                />)
            }
            nav = {
                (<AreaNavigatorClassic
                    x={defaultViewport.x}
                    y={defaultViewport.y}
                    width={defaultViewport.width}
                    height={defaultViewport.height}
                />)
            }
        />
    )
}

export default MapViewerClassic;