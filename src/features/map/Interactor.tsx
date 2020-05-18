import React, { FunctionComponent,  useRef, useState } from 'react';
import {ViewportPos, ViewportZoom, WindowSizeEvent, WindowSize } from '../../common/Types'

type displayComponentProps = {
    zoom : ViewportZoom,
    pos  : ViewportPos,
    onViewportSize : WindowSizeEvent
}

type displayComponent = FunctionComponent<displayComponentProps>;

type InteractorProps = {
    display : React.ReactElement<displayComponent>
}

const defaultZoom ={
    zoom : 2
}

const defaultPos ={
    x: -1,
    y: 0
}

const defaultSize ={
    width : 0,
    height: 0
}

const Interactor = ({display }: InteractorProps) =>{
    let [pos,setPos] = useState<ViewportPos>(defaultPos)
    let [zoom,setZoom] = useState<ViewportZoom>(defaultZoom)
    let mousePos    = useRef<ViewportPos|null>(null);
    let windowSize  = useRef<WindowSize>(defaultSize)

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        mousePos.current = { x:event.clientX, y:event.clientY};
    }

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        if( mousePos.current ){
            let mSize = Math.min( windowSize.current.width, windowSize.current.height);
            let vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
            let vH = windowSize.current.height/mSize*zoom.zoom;
            let dx = event.clientX-mousePos.current.x;
            let dy = event.clientY-mousePos.current.y;
            setPos({
                x:pos.x-dx/windowSize.current.width*vW,
                y:pos.y-dy/windowSize.current.height*vH
            });
            mousePos.current = { x:event.clientX, y:event.clientY};   
        }    
    }

    const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        mousePos.current=null;
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

        mousePos.current=null;
    }

    const onMouseWheel = (event: React.WheelEvent<HTMLDivElement>) =>{
        let ds=1-event.deltaY/100;
        let xC=event.clientX;
        let yC=event.clientY;
        let mSize = Math.min( windowSize.current.width, windowSize.current.height);
        let vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
        let vH = windowSize.current.height/mSize*zoom.zoom;
        let xB = -vW/2+pos.x+xC/windowSize.current.width*vW;    //(xC,yC) in complex space before zoom
        let yB = -vH/2+pos.y+yC/windowSize.current.height*vH;
        zoom ={
            zoom : zoom.zoom*ds
        };
        vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
        vH = windowSize.current.height/mSize*zoom.zoom;
        let xA = -vW/2+pos.x+xC/windowSize.current.width*vW; 
        let yA = -vH/2+pos.y+yC/windowSize.current.height*vH;
         // xA should be the same of xB and yA should be the same of yB
         pos = {
            x:pos.x+xB-xA,
            y:pos.y+yB-yA
        };
         setPos(pos);
         setZoom(zoom);
    }

    const onViewportSize = ( newSize : WindowSize ) =>{
        windowSize.current = newSize;
        console.log(`viewport ratio ${newSize.width}x${newSize.height}`)
    }

    return (
        <div 
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onWheel={onMouseWheel}
            >
            { 
                React.cloneElement(display as React.ReactElement, {zoom, pos, onViewportSize}) 
            }
        </div>
    )
}

export default Interactor;

