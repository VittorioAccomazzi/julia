import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Phoenix.json'
import {AnimationProps} from '../../common/Types'

const resetTime = 1000; // time of new animation
const frameTime = 100;  // ms per frame .

const AnimatorPhoenix = ({onCompleted}:AnimationProps) =>{
    const completed = ()=>{
        if( onCompleted ) onCompleted();
    }
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={false}
        fragmentSource={fragmentSource}
        mapURL="/mapPhoenix"
        mapImg="Phoenix.png"
        onCompleted={completed}
     />
 )  
}

export default AnimatorPhoenix;


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
 
        vec3 outCol = uCol4;
        float p0_r=0.0;
        float p0_i=0.0;
        float p1_r=y;
        float p1_i=x;
        float p2_r=0.0;
        float p2_i=0.0;
        float c_r=uC.x;
        float c_i=uC.y;
    
        for( int it=0;it<MaxIteration; it++ )
        {
            float p1_r2 = p1_r * p1_r;
            float p1_i2 = p1_i * p1_i;
            p2_r = p1_r2-p1_i2+c_r+p0_r*c_i;
            p2_i = 2.0*p1_r*p1_i+p0_i*c_i;
    
            if( p1_r2 + p1_i2 > 4.0)
            {
                // use  normalized iteration count algorithm, see http://math.unipa.it/~grim/Jbarrallo.PDF 
                float gray=float(it);
                gray = gray +1.0- (log(log(sqrt(p1_r2 + p1_i2)))/log(2.0));
			    gray = min(256.0, gray);
			    gray = max( 0.0, gray);
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
