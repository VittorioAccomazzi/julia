import React, {useRef} from "react";
import {C, Lut, ViewportZoom} from '../../common/Types';
import FractalEngine from '../../common/FractalEngine';

type JuliaBaseProps = {
    c: C,
    lut : Lut,
    fragmentSource : string,
    zoom : ViewportZoom
}

const pos ={
    x: 0,
    y: 0
}

const JuliaBase = ({c, lut, fragmentSource, zoom} : JuliaBaseProps) =>{
    let uC = useRef<WebGLUniformLocation|null>(null);

    let createUniform = function ( context : WebGLRenderingContext, wglProgram : WebGLProgram ){
        uC.current= context.getUniformLocation(wglProgram,"uC");
    }

    let setUniform = function ( context : WebGLRenderingContext ){
        if( uC.current ) context.uniform2f(uC.current, c.x, c.y);
    }

    return (
        <FractalEngine 
            fragShaderCode={fragmentSource}
            vPos={pos}
            vZoom={zoom}
            createUniform = {createUniform}
            setUniform={setUniform}
            lut={lut}
             />
    )
}

export default JuliaBase;
