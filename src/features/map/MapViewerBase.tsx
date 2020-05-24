import React, { FunctionComponent } from "react";
import Luts from '../../common/Luts.json'
import Interactor from './Interactor'
import MapHelp from "./MapHelp";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Clickable from '../../common/Clickable';
import {MapProps, AreaNavigationProps, defaultViewport, defaultZoom, defaultPos} from '../../common/Types'

type mapComponent = FunctionComponent<MapProps>;
type navComponent = FunctionComponent<AreaNavigationProps>

type MapViewerBaseProps ={
    map : React.ReactElement<mapComponent>,
    nav : React.ReactElement<navComponent>
}

const labelStyle : React.CSSProperties = {
    position: 'absolute', 
    left : '16px', 
    top  : '4px',
    color: 'white',
    display:'flex',
    alignItems:'center'
}

const MapViewerBase = ({map, nav} : MapViewerBaseProps) =>{

    return (
        <>
            <Interactor 
                display = {
                        React.cloneElement(map as React.ReactElement, {zoom:defaultZoom, pos:defaultPos, lut:Luts[1]}) 
                    }
                navigation = {
                    React.cloneElement(nav as React.ReactElement, {
                        x:defaultViewport.x,
                        y:defaultViewport.y ,
                        width:defaultViewport.width,
                        height:defaultViewport.height
                    })
                }
                />
                )}
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