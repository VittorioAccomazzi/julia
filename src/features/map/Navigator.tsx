import React from "react";
import Map from './Map'
import Luts from '../../common/Luts.json'
import Interactor from './Interactor'
import Navigation from "./Navigation";

const defaultZoom ={
    zoom : 2
}

const defaultPos ={
    x: -1,
    y: 0
}

const defaultViewport ={
    x:-1,
    y:-1,
    width:2,
    height:2
}

const Navigator = () =>{

    return (
        <Interactor display = {
            (<Map
                zoom={defaultZoom}
                pos={defaultPos}
                lut={Luts[1]}
            />)}
            navigation = {(
                <Navigation 
                x={defaultViewport.x} 
                y={defaultViewport.y} 
                width={defaultViewport.width}
                height={defaultViewport.height}
            />
            )}
        />
    )
}

export default Navigator;