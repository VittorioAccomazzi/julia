import React from "react";
import MapPhoenix from './Map'
import AreaNavigatorPhoenix from './AreaNavigator'
import MapViewerBase from '../../features/map/MapViewerBase'
import { MapProps, AreaNavigationProps} from '../../common/Types'


const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            map ={ (props : MapProps ) => <MapPhoenix {...props} />  }
            nav ={ (props : AreaNavigationProps ) => <AreaNavigatorPhoenix {...props} />  }
        />
    )
}

export default MapViewerClassic;