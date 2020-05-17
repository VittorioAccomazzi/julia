import React, {useRef} from "react";
import Map from './Map'
import Luts from '../../common/Luts.json'
import Interactor from './Interactor'

const defaultZoom ={
    zoom : 2
}

const defaultPos ={
    x: -1,
    y: 0
}

const Navigator = () =>{

    return (
        <Interactor display = {
            (<Map
                zoom={defaultZoom}
                pos={defaultPos}
                lut={Luts[1]}
            />)}
        />
    )
}

export default Navigator;