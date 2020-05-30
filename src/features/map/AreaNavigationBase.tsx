import React  from "react";
import { AnimationPath } from '../../common/Types'
import NavigationEngine from '../../common/NavigatonEngine'

type AreaNavigationBaseProps = {
    x: number,
    y: number,
    width : number,
    height: number,
    mapImage : string,
    cPoints : AnimationPath
}

const AreaNavigationBase = ({x,y,width, height, mapImage, cPoints} : AreaNavigationBaseProps) => {

    const onCanvasDraw = ( ctx : CanvasRenderingContext2D ) => {
        let canvas = ctx.canvas;
        let wCanvas = canvas.clientWidth;
        let hCanvas = canvas.clientHeight;

        let xScale = wCanvas/(cPoints.xMax-cPoints.xMin);
        let yScale = hCanvas/(cPoints.yMax-cPoints.yMin);

        let xRect = ( x - cPoints.xMin ) * xScale;
        let yRect = ( y - cPoints.yMin ) * yScale;
        let wRect = width * xScale;
        let hRect = height* yScale;

        ctx.clearRect(0,0,width, height);
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle="#00000000";
        ctx.rect(xRect, yRect, wRect, hRect);      
        ctx.stroke();
    }

    return (
        <NavigationEngine
            onCanvasDraw={onCanvasDraw}
            mapImage={mapImage}
        />
    )
}

export default AreaNavigationBase;