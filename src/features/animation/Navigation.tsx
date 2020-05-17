import React, { useEffect } from "react";
import { C } from '../../common/Types';
import cPoints from './data.json';

const imageStyle : React.CSSProperties = {
    position: 'absolute', 
    right: '8px', 
    bottom: '8px', 
    width: '150px',
    height: '100px'
}

type NavigationProp = {
    c : C
}

const Navigation = ({c} : NavigationProp) => {
    let canvas = React.useRef<HTMLCanvasElement> (null);

    useEffect(()=>{
        if( canvas.current ){
            let ctx = canvas.current.getContext("2d");
            if( ctx ){

                let width = canvas.current.clientWidth;
                let height= canvas.current.clientHeight;
                canvas.current.width = width;
                canvas.current.height= height;

                let xScale = width/(cPoints.xMax-cPoints.xMin);
                let yScale = height/(cPoints.yMax-cPoints.yMin);

                let xC = ( c.x - cPoints.xMin ) * xScale;
                let yC = height - ( c.y - cPoints.yMin ) * yScale;

                ctx.clearRect(0,0,width, height);
                ctx.beginPath();
                ctx.strokeStyle = "#FF0000";
                ctx.fillStyle="#FF0000";
                ctx.arc(xC,yC,2, 0, 2*Math.PI, false);     
                ctx.fill();   
                ctx.stroke();

            }
        }

    },[c]);

    return (
        <>
            <img src={"Mandelbrot.png"}  style={imageStyle} alt="nvaigation window"/>
            <canvas ref={canvas} style={imageStyle} />
        </>
    )
}

export default Navigation;