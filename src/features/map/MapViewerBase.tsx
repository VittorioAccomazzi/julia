import React from "react";
import Interactor  from './Interactor'
import MapHelp from "./MapHelp";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Clickable from '../../common/Clickable';
import {MapProps, AreaNavigationProps, AnimationPath, ViewportZoom, ViewportPos, Lut} from '../../common/Types'
import AreaNavigationBase from './AreaNavigationBase'
import MapBase from './MapBase'

type MapViewerBaseProps ={
    cPoints : AnimationPath,
    mapImg : string, 
    fragmentSource: string,
    startZoom? : ViewportZoom,
    startPos? : ViewportPos,
    startLut? : Lut
}

const labelStyle : React.CSSProperties = {
    position: 'absolute', 
    left : '16px', 
    top  : '4px',
    color: 'white',
    display:'flex',
    alignItems:'center'
}

const MapViewerBase = ({mapImg, cPoints, fragmentSource, startPos, startLut, startZoom} : MapViewerBaseProps) =>{

    return (
        <>
            <Interactor 
                display = { (props : MapProps )=> <MapBase {...props} fragmentSource={fragmentSource} lut={startLut??props.lut}/> }
                navigation = { (props : AreaNavigationProps ) =>  <AreaNavigationBase {...props} mapImage={mapImg} cPoints={cPoints}/>  }
                startPos={startPos}
                startZoom={startZoom}
            />
            <Clickable>
                <div style={labelStyle}>
                    <ArrowBackIcon/>
                    <small>Back to Animation</small>
                </div>
            </Clickable>
            <MapHelp/>
        </>
    )
}

export default MapViewerBase;