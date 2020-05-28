import React from "react";
import Interactor  from './Interactor'
import MapHelp from "./MapHelp";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Clickable from '../../common/Clickable';
import {MapRender, NavRender, MapProps, AreaNavigationProps} from '../../common/Types'

type MapViewerBaseProps ={
    map : MapRender,
    nav : NavRender
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
                display = { (props : MapProps )=> map({...props}) }
                navigation = { (props : AreaNavigationProps ) =>  nav( {...props})  } /> }
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