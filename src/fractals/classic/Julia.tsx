import React from "react";
import {FractalProps} from '../../common/Types';
import JuliaBase from '../../features/animation/JuliaBase'

const vZoom ={
    zoom : 2.5
}

const JuliaClassic = ({c, lut}:FractalProps ) => {

    return (
        <JuliaBase
            c={c}
            lut={lut}
            fragmentSource={fragmentSource}
            zoom={vZoom}
         />
    )
}

export default JuliaClassic;


const fragmentSource = `
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
    #define MaxIteration  255
    float x = (gl_FragCoord.x /uCanvasSize.x ) * uViewportSize.x + uViewportPos.x; // in viewport coordinates
    float y = ((uCanvasSize.y-gl_FragCoord.y) /uCanvasSize.y ) * uViewportSize.y + uViewportPos.y; // in viewport coordinate
    float d;
    float r = x;
    float i = y;
    vec3 outCol = uCol4;
    for( int it=0;it<MaxIteration; it++ )
    {
        float tmp = r;
    
        r = r * r - i * i + uC.x;
        i = 2.0 * tmp * i + uC.y;
        d = r * r + i * i;
    
        if( d > 4.0)
        {
            // use  normalized iteration count algorithm, see http://math.unipa.it/~grim/Jbarrallo.PDF 
            float gray=float(it);
            gray = gray +1.0- (log(log(sqrt(d)))/log(2.0));
            gray = min(256.0, gray);
            gray = max( 0.0, gray);

            // lookup
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




