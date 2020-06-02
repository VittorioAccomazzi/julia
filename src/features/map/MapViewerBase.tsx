import React from "react";
import PanZoomInteractor  from '../../common/interactors/PanZoomInteractor'
import MapHelp from "./MapHelp";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClickableLink from '../../common/interactors/ClickableLink';
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
            <PanZoomInteractor 
                display = { (props : MapProps )=> <MapBase {...props} fragmentSource={fragmentSource} lut={startLut??props.lut}/> }
                navigation = { (props : AreaNavigationProps ) =>  <AreaNavigationBase {...props} mapImage={mapImg} cPoints={cPoints}/>  }
                startPos={startPos}
                startZoom={startZoom}
            />
            <ClickableLink>
                <div style={labelStyle}>
                    <ArrowBackIcon/>
                    <small>Back to Animation</small>
                </div>
            </ClickableLink>
            <MapHelp/>
        </>
    )
}

export default MapViewerBase;