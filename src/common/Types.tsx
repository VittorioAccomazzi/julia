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

export {}