import React from "react";
import AnimatorBase from '../../features/animation/AnimatorBase'
import cPoints from './Newton.json'
import {AnimationProps} from '../../common/Types'
import lut from './Lut'

const resetTime = 600; // time of new animation
const frameTime = 100;  // ms per frame .


const AnimatorNewton = ({onCompleted}:AnimationProps) =>{
    const completed = ()=>{
        if( onCompleted ) onCompleted();
    }
 return (
     <AnimatorBase
        cPoints={cPoints}
        resetTime={resetTime}
        frameTime={frameTime}
        flipY={true}
        fragmentSource={fragmentSource}
        mapURL="/mapNewton"
        mapImg="Newton.png"
        startZoom={{zoom:3.5}}
        singleLut={lut}
        onCompleted={completed}
     />
 )  
}

export default AnimatorNewton;


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

vec2 sqr( vec2 a ){
    return vec2( a.x*a.x-a.y*a.y,2.0*a.x*a.y  );
}

vec2 mult( vec2 a, vec2 b) {
    return vec2(a.x*b.x-a.y*b.y,a.x*b.y+a.y*b.x);
}

float eps = 0.00000001;

vec2 div( vec2 a, vec2 b){
    vec2 res = vec2(0.0,0.0);
    float s =0.0;
    if( abs(b.y)< eps){
        s=b.x;
    } else {
        vec2 con = vec2(b.x, -b.y);
        a = mult(a,con);
        s = b.x*b.x+b.y*b.y;
    }
    if( abs(s) > eps ){
        res.x = a.x/s;
        res.y = a.y/s;
    }
    return res;
}


    void main() {
        #define MaxIteration  255
        float x = (gl_FragCoord.x /uCanvasSize.x ) * uViewportSize.x + uViewportPos.x; // in viewport coordinates
        float y = ((uCanvasSize.y-gl_FragCoord.y) /uCanvasSize.y ) * uViewportSize.y + uViewportPos.y; // in viewport coordinate
 
        vec3 outCol = uCol4;
        vec2 p = vec2(x,y);
    
        for( int it=0;it<MaxIteration; it++ )
        {
            vec2 sq= sqr(p);
            vec2 p3= mult(sq,p);
            vec2 n=vec2(p3.x-1.0,p3.y);
            vec2 f=div(n,3.0*sq);
            p = p - mult(uC,f);
    
            if( length(p) > 2.0)
            {
                // use  normalized iteration count algorithm, see http://math.unipa.it/~grim/Jbarrallo.PDF 
                float gray=float(it);
                gray = gray +1.0-(log(log(length(p)))/log(2.0));
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
        }
        gl_FragColor = vec4(outCol.xyz,1.0);
}
`
