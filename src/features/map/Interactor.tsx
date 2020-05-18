import React, { FunctionComponent,  useRef, useState } from 'react';
import {ViewportPos, ViewportZoom, WindowSizeEvent, WindowSize } from '../../common/Types'
import {isMobile} from 'react-device-detect';

// Important : the line below on touchAction is FUNDAMENTAL since
// React will not stop the native event. It shall be stopped using
// CSS. For more information see :
// https://github.com/facebook/react/issues/9809#issuecomment-414072263 
// and 
// https://medium.com/@Esakkimuthu/passive-event-listeners-5dbb1b011fb1


const divStyle : React.CSSProperties = {
    touchAction: 'none' 
}

const labelStyle : React.CSSProperties = {
    position: 'absolute', 
    right: '8px', 
    bottom: '8px',
    fontSize : '10px',
    color:'white'
    
}

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

const zoomMin = isMobile ? 0.1 : 0.01;
const zoomMax = 4.0;

const Interactor = ({display }: InteractorProps) =>{
    let [pos,setPos] = useState<ViewportPos>(defaultPos)
    let [zoom,setZoom] = useState<ViewportZoom>(defaultZoom)
    let pointerPos     = useRef<ViewportPos|null>(null);
    let pointersDst    = useRef<number|null>(null) ;
    let windowSize     = useRef<WindowSize>(defaultSize)


    // reset all
    const resetAll = ()=>{
        pointerPos.current =null;
        pointersDst.current=null;
    }
    const doPan = (x:number, y:number )=>{
        if( pointerPos.current){
            let mSize = Math.min( windowSize.current.width, windowSize.current.height);
            let vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
            let vH = windowSize.current.height/mSize*zoom.zoom;
            let dx = x-pointerPos.current.x;
            let dy = y-pointerPos.current.y;
            setPos({
                x:pos.x-dx/windowSize.current.width*vW,
                y:pos.y-dy/windowSize.current.height*vH
            });
            pointerPos.current = { x,y };  
        }     
    }

    const doZoom = (factor : number, x: number, y: number )=>{
        let nZoom = zoom.zoom*factor;
        nZoom = nZoom > zoomMax ? zoomMax : (nZoom < zoomMin ? zoomMin : nZoom);
        let mSize = Math.min( windowSize.current.width, windowSize.current.height);
        let vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
        let vH = windowSize.current.height/mSize*zoom.zoom;
        let xB = -vW/2+pos.x+x/windowSize.current.width*vW;    //(xC,yC) in complex space before zoom
        let yB = -vH/2+pos.y+y/windowSize.current.height*vH;
        zoom ={
            zoom : nZoom
        };
        vW = windowSize.current.width/mSize*zoom.zoom; // size of the complex plane
        vH = windowSize.current.height/mSize*zoom.zoom;
        let xA = -vW/2+pos.x+x/windowSize.current.width*vW; 
        let yA = -vH/2+pos.y+y/windowSize.current.height*vH;
         // xA should be the same of xB and yA should be the same of yB
         pos = {
            x:pos.x+xB-xA,
            y:pos.y+yB-yA
        };
         setPos(pos);
         setZoom(zoom);
    }

    // Mouse Events

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        pointerPos.current = { x:event.clientX, y:event.clientY};
    }

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        doPan(event.clientX, event.clientY);  
    }

    const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        resetAll()
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

        resetAll()
    }

    const onMouseWheel = (event: React.WheelEvent<HTMLDivElement>) =>{
        let ds=1-event.deltaY/100;
        doZoom(ds, event.clientX, event.clientY);

    }

    // Touch Events
    const onTouchStart = ( event : React.TouchEvent<HTMLDivElement>) => {
        resetAll();
        if( event.touches.length > 0 ){
            pointerPos.current = {
                x : event.touches[0].clientX,
                y : event.touches[0].clientY
            }
            if( event.touches.length > 1 ){
                let dx = event.touches[0].clientX-event.touches[1].clientX;
                let dy = event.touches[0].clientY-event.touches[1].clientY;
                pointersDst.current = Math.sqrt(dx*dx+dy*dy);
                pointerPos.current = {
                    x : (event.touches[0].clientX+event.touches[1].clientX)/2,
                    y : (event.touches[0].clientY+event.touches[1].clientY)/2
                }
            }
        }
    }

    const onTouchMove = ( event : React.TouchEvent<HTMLDivElement>) => {
        if( event.touches.length > 0 ){
            let mid = {
                x : event.touches[0].clientX,
                y : event.touches[0].clientY
            };
            let dst = null;
            if( event.touches.length > 1 ){
                let dx = event.touches[0].clientX-event.touches[1].clientX;
                let dy = event.touches[0].clientY-event.touches[1].clientY;
                dst = Math.sqrt(dx*dx+dy*dy);
                mid = {
                    x : (event.touches[0].clientX+event.touches[1].clientX)/2,
                    y : (event.touches[0].clientY+event.touches[1].clientY)/2
                }
            }
            doPan(mid.x, mid.y);
            if( pointersDst.current && dst && pointersDst.current > 0 && dst >0 ){
                doZoom(pointersDst.current/dst, mid.x, mid.y);
            }
            pointersDst.current=dst;
            
        }
    }

    const onTouchEnd = ( event : React.TouchEvent<HTMLDivElement>) => {
        resetAll();
    }


    // Window Resize event
    const onViewportSize = ( newSize : WindowSize ) =>{
        windowSize.current = newSize;
        console.log(`viewport ratio ${newSize.width}x${newSize.height}`)
    }

    return (
        <div 
            style={divStyle}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onWheel={onMouseWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            >
            { 
                React.cloneElement(display as React.ReactElement, {zoom, pos, onViewportSize}) 
            }
            <div style={labelStyle}>{zoom.zoom}</div>
        </div>
    )
}

export default Interactor;

