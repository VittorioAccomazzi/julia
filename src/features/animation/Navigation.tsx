import React  from "react";
import { C } from '../../common/Types';
import cPoints from '../../common/data.json';
import NavigationEngine from '../../common/NavigatonEngine'


type NavigationProp = {
    c : C
}

const Navigation = ({c} : NavigationProp) => {

    const onCanvasDraw = ( ctx : CanvasRenderingContext2D ) => {
        let canvas = ctx.canvas;
        let width = canvas.clientWidth;
        let height= canvas.clientHeight;

        let xScale = width/(cPoints.xMax-cPoints.xMin);
        let yScale = height/(cPoints.yMax-cPoints.yMin);

        let xC = ( c.x - cPoints.xMin ) * xScale;
        let yC = ( c.y - cPoints.yMin ) * yScale;

        ctx.clearRect(0,0,width, height);
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle="#FF0000";
        ctx.arc(xC,yC,2, 0, 2*Math.PI, false);     
        ctx.fill();   
        ctx.stroke();
    }

    return (
        <NavigationEngine
            onCanvasDraw={onCanvasDraw}
        />
    )
}

export default Navigation;