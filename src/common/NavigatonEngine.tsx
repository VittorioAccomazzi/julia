import React, { useEffect } from "react";


const imageStyle : React.CSSProperties = {
    position: 'absolute', 
    right: '8px', 
    bottom: '8px', 
    width: '150px',
    height: '100px',
    userSelect:'none'
}

type canvasDraw = ( context : CanvasRenderingContext2D  ) => void;

type NavigationEngineProps = {
    onCanvasDraw : canvasDraw
}

const NavigationEngine = ({onCanvasDraw} : NavigationEngineProps) =>{
    let canvas = React.useRef<HTMLCanvasElement> (null);
    useEffect(()=>{
        if( canvas.current ){
            // set the canvas full size 
            let width = canvas.current.clientWidth;
            let height= canvas.current.clientHeight;
            canvas.current.width = width;
            canvas.current.height= height;
            let ctx = canvas.current.getContext("2d");
            if( ctx ) onCanvasDraw(ctx);
        }
    });

    return (
        <>
            <img src={"Mandelbrot.png"}  style={imageStyle} alt="navigation window"/>
            <canvas ref={canvas} style={imageStyle} />
        </>
    )
}

export default NavigationEngine;