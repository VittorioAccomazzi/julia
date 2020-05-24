export   interface C {
    x : number, // real part
    y : number  // imaginary part
}
export interface Lut {
   wl : {
       w : number,
       l : number
   }
   c1: string,
   c2: string,
   c3: string,
   c4: string
}

export type AnimationPoint = Array<C>;

export interface AnimationPath {
    xMin : number,
    yMin : number,
    xMax : number,
    yMax : number,
    nx : number,
    ny : number,
    steps : Array<AnimationPoint>
}

export interface ViewportZoom {
    zoom : number
}

export interface ViewportPos {
    x : number,
    y : number
}

export interface WindowSize {
    width : number,
    height: number
}
export type WindowSizeEvent  = ( ratio: WindowSize ) => void
export type AnimationCompletedEvent = ()=> void

export type  FractalProps = {
    c: C,
    lut : Lut
}

export type PointNavigationProps = {
    c : C
}

export type AreaNavigationProps = {
    x: number,
    y: number,
    width : number,
    height: number
}

export type MapProps = {
    lut : Lut,
    zoom: ViewportZoom,
    pos : ViewportPos,
    onViewportSize? : WindowSizeEvent
}

export type AnimationProps = {
    onCompleted? : AnimationCompletedEvent
}

export const defaultZoom ={
    zoom : 2
}

export const defaultPos ={
    x: -1,
    y: 0
}

export const defaultViewport ={
    x:-1,
    y:-1,
    width:2,
    height:2
}

export {}