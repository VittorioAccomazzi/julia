import React from "react";
import MapViewerBase from '../../features/map/MapViewerBase'
import cPoints from './Phoenix.json'

const MapViewerClassic = () =>{
    return (
        <MapViewerBase
            cPoints={cPoints}
            mapImg="Phoenix.png"
            fragmentSource={fragmentSource}
        />
    )
}

export default MapViewerClassic;


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
	
	vec2 mult( vec2 a, vec2 b) {
		return vec2(a.x*b.x-a.y*b.y,a.x*b.y+a.y*b.x);
	}
	
		void main() {
	
			#define juliaSize (128.0)
			#define MaxIteration  255
		   
			 float xM = (gl_FragCoord.x /uCanvasSize.x ) * uViewportSize.x + uViewportPos.x; // pixel in the coordinate of Mondelbrot
			 float yM = ((uCanvasSize.y-gl_FragCoord.y) /uCanvasSize.y ) * uViewportSize.y + uViewportPos.y; // pixel in the coordinate of Mondelbrot
	
			float xP = xM * uCanvasSize.x/uViewportSize.x; // pixel in pixel coordinate respect the mandelbrout origin
			float yP = yM  * uCanvasSize.y /uViewportSize.y ;
	
			float xTile = floor(xP/juliaSize);
			float yTile = floor(yP/juliaSize);
			float xPos = floor(xP)- juliaSize*xTile;
			float yPos = floor(yP)- juliaSize*yTile;
			xPos += ( xPos < 0.0 ? juliaSize : 0.0 );
			yPos += ( yPos < 0.0 ? juliaSize : 0.0 );
			
			float xCPos= juliaSize*xTile+juliaSize/2.0;
			float yCPos= juliaSize*yTile+juliaSize/2.0;	   
		
			float xC = xCPos* uViewportSize.x/uCanvasSize.x;
			float yC = yCPos* uViewportSize.y/uCanvasSize.y; 
	
			float x= 2.0 * xPos/juliaSize-1.0;
			float y= 2.0 * yPos/juliaSize-1.0;
			
			vec3 outCol = uCol4;
			float p0_r=0.0;
			float p0_i=0.0;
			float p1_r=y;
			float p1_i=x;
			float p2_r=0.0;
			float p2_i=0.0;
			float c_r=xC;
			float c_i=yC;
		
			for( int it=0;it<MaxIteration; it++ )
			{
				float p1_r2 = p1_r * p1_r;
				float p1_i2 = p1_i * p1_i;
				p2_r = p1_r2-p1_i2+c_r+p0_r*c_i;
				p2_i = 2.0*p1_r*p1_i+p0_i*c_i;
		
				if( p1_r2 + p1_i2 > 4.0)
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
				p0_r = p1_r;
				p0_i = p1_i;
				p1_r = p2_r;
				p1_i = p2_i;
		}
		gl_FragColor = vec4(outCol.xyz,1.0);
    }
`