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
    let ratio = useRef<WindowSize>(defaultSize)

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        setPos({
            x:0,
            y:0
        })
    }

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

    }

    const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

    }

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

        setZoom({ zoom: 1.0 });
    }

    const onMouseWheel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

    }

    const onViewportSize = ( newSize : WindowSize ) =>{
        ratio.current = newSize;
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