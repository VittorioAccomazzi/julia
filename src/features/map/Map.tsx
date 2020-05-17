import React from "react";
import {Lut, ViewportPos, ViewportZoom, WindowSizeEvent} from '../../common/Types';
import FractalEngine from '../../common/FractalEngine';

type MapProps = {
    lut : Lut,
    zoom: ViewportZoom,
    pos : ViewportPos,
    onViewportSize? : WindowSizeEvent
}

const Map = ({lut, zoom, pos, onViewportSize} : MapProps) =>{

    return (
        <FractalEngine 
            fragShaderCode={fragmentSource}
            vPos={pos}
            vZoom={zoom}
            lut={lut}
            onViewportSize={onViewportSize}
             />
    )
}

export default Map;

const fragmentSource =`
__DEFINE__PLATFORM__
	
	#ifdef DESKTOP
		precision mediump    float;
	#else
		precision highp    float;
	#endif
	
    uniform vec2 uCanvasSize;   // Canvas size.
    uniform vec2 uViewportSize; // viewport size.
    uniform vec2 uViewportPos;  // viewport position (bottom right)
    uniform vec2 uC;            // Julia C 
	uniform vec2 uWL;           // window level
	uniform vec3 uCol1;
	uniform vec3 uCol2;
	uniform vec3 uCol3;
	uniform vec3 uCol4;
	

    void main() {

		#define juliaSize 128
        #define MaxIteration  255
        

         float xM = (gl_FragCoord.x /uCanvasSize.x ) * uViewportSize.x + uViewportPos.x; // pixel in the coordinate of Mondelbrot
         float yM = ((uCanvasSize.y-gl_FragCoord.y) /uCanvasSize.y ) * uViewportSize.y + uViewportPos.y; // pixel in the coordinate of Mondelbrot

	    float xP = abs( xM ) * uCanvasSize.x/uViewportSize.x; // pixel in pixel coordinate respect the mandelbrout origin
	    float yP = abs( yM ) * uCanvasSize.y /uViewportSize.y ;

        int xTile = int(xP)/juliaSize;
        int yTile = int(yP)/juliaSize;
        int xPos = int(xP)- juliaSize*xTile;
	    int yPos = int(yP)- juliaSize*yTile;
	    int xCPos= juliaSize*xTile+juliaSize/2;
	    int yCPos= juliaSize*yTile+juliaSize/2;	    
	
		float xC = sign(xM)*float(xCPos)* uViewportSize.x/uCanvasSize.x;
		float yC = sign(yM)*float(yCPos)* uViewportSize.y/uCanvasSize.y; 

	    float x= 2.0 * float(xPos)/float(juliaSize)-1.0;
	    float y= 2.0 * float(yPos)/float(juliaSize)-1.0;
	    
        float d;
	    float r = x;
	    float i = y;
	    vec3 outCol = uCol4;
    
	    for( int it=0;it<MaxIteration; it++ )
	    {
		    float tmp = r;
		
		    r = r * r - i * i + xC;
		    i = 2.0 * tmp * i + yC;
		    d = r * r + i * i;
		
		    if( d > 4.0)
		    {
			    float gray=float(it);
				if( gray < uWL.x ){
					outCol= mix( uCol1, uCol2, gray/uWL.x);
				} else if ( gray < uWL.y+uWL.x ) {
					outCol= mix( uCol2, uCol3, (gray-uWL.x)/uWL.y);
				} else {
					outCol= mix( uCol3, uCol4, (gray-uWL.x-uWL.y)/(256.0-uWL.y-uWL.x));
				}				
                break; // diverge
		    }
	    }
		
        gl_FragColor = vec4(outCol.xyz,1.0);
    }


`