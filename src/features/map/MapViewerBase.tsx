import React from "react";
import PanZoomInteractor  from '../../common/interactors/PanZoomInteractor'
import MapHelp from "./MapHelp";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClickableLink from '../../common/interactors/ClickableLink';
import {ViewportProps, AreaNavigationProps, AnimationPath, ViewportZoom, ViewportPos, Lut, WindowSize} from '../../common/Types'
import AreaNavigationBase from './AreaNavigationBase'
import MapBase from './MapBase'

type MapViewerBaseProps ={
    cPoints : AnimationPath,
    mapImg : string, 
    fragmentSource: string,
    startZoom? : ViewportZoom,
    startPos? : ViewportPos,
    startLut? : Lut,
    clickUrl? : string
}

const labelStyle : React.CSSProperties = {
    position: 'absolute', 
    left : '16px', 
    top  : '4px',
    color: 'white',
    display:'flex',
    alignItems:'center'
}

const MapViewerBase = ({mapImg, cPoints, fragmentSource, startPos, startLut, startZoom, clickUrl} : MapViewerBaseProps) =>{

    const onClick = (x:number, y:number, size : WindowSize, pos : ViewportPos, zoom : ViewportZoom, lut : Lut)=>{
        if( clickUrl ){
            // unfortunately here we have to replicate the logic of the pixel shader in order to locate the 
            // exact C where the user has clicked on.
            let ratio=2.0;
            let juliaSize=128;
            let mSize = Math.min( size.width, size.height);
            let vW = size.width/mSize*zoom.zoom; // size of the complex plane
            let vH = size.height/mSize*zoom.zoom;
            let xC = -vW/2+pos.x+x/size.width*vW;    //(xC,yC) in complex plane
            let yC = -vH/2+pos.y+y/size.height*vH;
            let xP = xC*ratio*size.width/vW; // in the complex plane in pixel unit
            let yP = yC*ratio*size.height/vH;
            let xTile = Math.floor(xP/juliaSize) * juliaSize + juliaSize/2; // center of the tile.
            let yTile = Math.floor(yP/juliaSize) * juliaSize + juliaSize/2;
            let cx = xTile*vW/(size.width*ratio); // center of the tile in complex plane
            let cy = yTile*vH/(size.height*ratio);
            lut = startLut ?? lut;
            // componse the URL
            let url = `${clickUrl}?cx=${cx}&cy=${cy}&c1=${lut.c1}&c2=${lut.c2}&c3=${lut.c3}&c4=${lut.c4}&w=${lut.wl.w}&l=${lut.wl.l}`;
            // open a new window
            window.open(url, "_blank");
        }
    }

    return (
        <>
            <PanZoomInteractor 
                display = { (props : ViewportProps )=> <MapBase {...props} fragmentSource={fragmentSource} lut={startLut??props.lut}/> }
                navigation = { (props : AreaNavigationProps ) =>  <AreaNavigationBase {...props} mapImage={mapImg} cPoints={cPoints}/>  }
                startPos={startPos}
                startZoom={startZoom}
                onClick={onClick}
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