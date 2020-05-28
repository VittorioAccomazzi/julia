import React from "react";
import MapClassic from './Map'
import AreaNavigatorClassic from './AreaNavigator'
import MapViewerBase from '../../features/map/MapViewerBase'
import { MapProps, AreaNavigationProps} from '../../common/Types'


const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            map ={ (props : MapProps ) => <MapClassic {...props}  /> }
            nav = { (props : AreaNavigationProps ) => <AreaNavigatorClassic {...props} />  }
        />
    )
}

export default MapViewerClassic;