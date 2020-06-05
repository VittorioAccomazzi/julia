import React, {useRef} from "react";
import {C, Lut, ViewportZoom, ViewportPos, WindowSizeEvent} from './Types';
import WebGLViewport from './WebGLVIewport';

type JuliaBaseProps = {
    c: C,
    lut : Lut,
    fragmentSource : string,
    zoom? : ViewportZoom,
    pos? : ViewportPos,
    onViewportSize? : WindowSizeEvent
}

const defaultZoom ={
    zoom : 2.5
}

const defaultPos ={
    x: 0,
    y: 0
}

const JuliaBase = ({c, lut, fragmentSource, zoom=defaultZoom, pos = defaultPos, onViewportSize} : JuliaBaseProps) =>{
    let uC = useRef<WebGLUniformLocation|null>(null);

    let createUniform = function ( context : WebGLRenderingContext, wglProgram : WebGLProgram ){
        uC.current= context.getUniformLocation(wglProgram,"uC");
    }

    let setUniform = function ( context : WebGLRenderingContext ){
        if( uC.current ) context.uniform2f(uC.current, c.x, c.y);
    }

    return (
        <WebGLViewport 
            fragShaderCode={fragmentSource}
            vPos={pos}
            vZoom={zoom}
            createUniform = {createUniform}
            setUniform={setUniform}
            lut={lut}
            onViewportSize={onViewportSize}
        />
    )
}

export default JuliaBase;
