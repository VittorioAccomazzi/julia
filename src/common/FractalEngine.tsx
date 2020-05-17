import React, {useEffect, useState} from "react";
import {Lut, ViewportSize, ViewportPos} from './Types'
import {isMobile} from 'react-device-detect';


// based on https://stackblitz.com/edit/typescript-start-webgl-with-layout

interface WebGLViewport {
    program : WebGLProgram,
    vertexPositionAttribute : number,
    uViewportSize : WebGLUniformLocation | null,
    uViewportPos : WebGLUniformLocation | null,
    uCanvasSize : WebGLUniformLocation | null,
    uWL : WebGLUniformLocation | null,
    uCol1 : WebGLUniformLocation | null,
    uCol2 : WebGLUniformLocation | null,
    uCol3 : WebGLUniformLocation | null,
    uCol4 : WebGLUniformLocation | null,
    squareVertexPositionBuffer : WebGLBuffer | null,
    itemSize : number,
    numItems : number,
    context : WebGLRenderingContext
}

const canvasStyle : React.CSSProperties = {
    position: 'absolute', 
    top: '0px', 
    left: '0px', 
    width: '100%', 
    height: '100%', 
    backgroundColor:'Blue', 
}

type webGLCreateU = ( context : WebGLRenderingContext, program : WebGLProgram ) => void
type webGLUseU    = ( context : WebGLRenderingContext ) => void

type FractalEngingProps = {
    vSize : ViewportSize,
    vPos : ViewportPos,
    lut : Lut,
    fragShaderCode : string,
    createUniform? : webGLCreateU,
    setUniform? : webGLUseU
}


const FractalEngine = ({vSize, vPos, lut, createUniform, setUniform, fragShaderCode } : FractalEngingProps) => {
    let canvas = React.useRef<HTMLCanvasElement> (null);
    let glViewport = React.useRef<WebGLViewport> ();
    let [, setSize] = useState<ViewportSize>({width:0, height:0});

    // init the WebGL
    useEffect(()=>{
        function updateSize() {
            if( canvas.current ){
                setSize({width:canvas.current.clientWidth, height:canvas.current.clientHeight})
            }
        }
        
        if( canvas.current ){
            let context = canvas.current.getContext('webgl');
            if( context ){
                let viewport = initWebGL( context, fragShaderCode, createUniform );
                if( viewport ) {
                    initBuffers( context, viewport );
                    setWebGLDefaults(context);
                    glViewport.current = viewport;
                } else {
                    console.error('WebGL not supported');
                    throw 'WebGL not supported !';
                }
            }
        } 
        // handle the window resize
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize',updateSize);
    }, [])

    // Render the object
    useEffect(()=>{
        // render
        if( canvas && canvas.current && glViewport && glViewport.current)  drawFractal(canvas.current, glViewport.current, vSize, vPos, lut, setUniform );
    })

    return (
        <canvas id="GlCanvas" style={canvasStyle} ref={canvas}></canvas>
    );
}

export default FractalEngine;

/*********************************************************************/
/**                                                                 **/
/**                        WebGL Code                               **/
/**                                                                 **/
/*********************************************************************/

function initWebGL ( context : WebGLRenderingContext, fragmentSource : string, createUniform? : webGLCreateU) : WebGLViewport |  null  {
   
    // upload the shaders
    let fShader = initShader(context, context.FRAGMENT_SHADER, fragmentSource);
    let vShader = initShader(context, context.VERTEX_SHADER, vertexSource)

    // create program
    let wglProgram = context.createProgram();
    if(fShader && vShader && wglProgram ){
        context.attachShader(wglProgram, fShader);
        context.attachShader(wglProgram, vShader);
        context.linkProgram(wglProgram);
        if(context.getProgramParameter(wglProgram, context.LINK_STATUS)) {
            context.useProgram(wglProgram);
            let viewport : WebGLViewport = {
                program : wglProgram,
                vertexPositionAttribute : context.getAttribLocation( wglProgram,  "aVertexPosition"),
                uViewportSize : context.getUniformLocation(wglProgram,"uViewportSize"),
                uViewportPos : context.getUniformLocation(wglProgram,"uViewportPos"),
                uCanvasSize : context.getUniformLocation(wglProgram,"uCanvasSize"),
                uWL : context.getUniformLocation(wglProgram,"uWL"),
                uCol1 : context.getUniformLocation(wglProgram,"uCol1"),
                uCol2 : context.getUniformLocation(wglProgram,"uCol2"),
                uCol3 : context.getUniformLocation(wglProgram,"uCol3"),
                uCol4 : context.getUniformLocation(wglProgram,"uCol4"),
                squareVertexPositionBuffer : null,
                itemSize :0,
                numItems :0,
                context : context
            }
            if(createUniform) createUniform(context, wglProgram);
            context.enableVertexAttribArray( viewport.vertexPositionAttribute );
            return viewport;
        } 
    }
    return null;
}

function initBuffers( context : WebGLRenderingContext, viewport : WebGLViewport ) : void {
    viewport.squareVertexPositionBuffer  = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, viewport.squareVertexPositionBuffer);
    let val = 1.0;
    let vertices = [
        val,  val, 0.0,
       -val,  val, 0.0,
        val, -val, 0.0,
       -val, -val, 0.0
   ];
   context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
   viewport.itemSize=3;
   viewport.numItems=4;
}

function setWebGLDefaults( context : WebGLRenderingContext ) : void {
    context.clearColor(0.0, 0.0, 0.0, 1.0);
    context.disable(context.DEPTH_TEST);
}

function initShader( context : WebGLRenderingContext, shaderType : number, source : string  ) : WebGLShader | null {
    let shader : WebGLShader | null = context.createShader(shaderType);
    if( shader ){
        let platform = isMobile ?  "#define MOBILE":"#define DESKTOP";
        let code = source.replace("__DEFINE__PLATFORM__",platform);
        context.shaderSource(shader, code);
        context.compileShader(shader);
        if( !context.getShaderParameter( shader, context.COMPILE_STATUS) ){
            console.error('compiling the shaders: ' + context.getShaderInfoLog(shader));
            shader = null;
        }
    }
    return shader;
}

//
// Main rendering function.
//

function drawFractal( canvas : HTMLCanvasElement, glViewport : WebGLViewport, vSize : ViewportSize, vPos : ViewportPos, lut : Lut, setUniform? : webGLUseU ) : void {
    let ratio =  2.0;
    let vpWidth = canvas.clientWidth * ratio;
    let vpHeight= canvas.clientHeight* ratio;
    let context = glViewport.context;

    canvas.width = vpWidth ;
    canvas.height=vpHeight ;

    let size = {
        width  : vpWidth/Math.min(vpWidth,vpHeight) * vSize.width,
        height : vpHeight/Math.min(vpWidth,vpHeight) * vSize.height
    }
    let pos = {
        x : -size.width/2 + vPos.x,
        y : -size.height/2 + vPos.y
    }

    context.viewport(0, 0, vpWidth, vpHeight);
    context.clear(context.COLOR_BUFFER_BIT);

    context.uniform2f(glViewport.uViewportSize, size.width, size.height);
    context.uniform2f(glViewport.uViewportPos, pos.x, pos.y);
    context.uniform2f(glViewport.uCanvasSize, vpWidth, vpHeight);
    context.uniform2f(glViewport.uWL, lut.wl.l, lut.wl.w);
    if( setUniform ) setUniform(context);

    SetUniformColor( context, glViewport.uCol1, lut.c1 );
    SetUniformColor( context, glViewport.uCol2, lut.c2 );
    SetUniformColor( context, glViewport.uCol3, lut.c3 );
    SetUniformColor( context, glViewport.uCol4, lut.c4 );

    context.bindBuffer( context.ARRAY_BUFFER, glViewport.squareVertexPositionBuffer);
    context.vertexAttribPointer(glViewport.vertexPositionAttribute, glViewport.itemSize, context.FLOAT, false, 0, 0);
    context.drawArrays(context.TRIANGLE_STRIP, 0, glViewport.numItems);
}

function SetUniformColor ( context : WebGLRenderingContext,  unifrom : WebGLUniformLocation | null, color : string  ) : void {
    let red = parseInt(color.substr(0,2),16);
    let green = parseInt(color.substr(2,2),16);
    let blue = parseInt(color.substr(4,2),16);
    context.uniform3f(unifrom, red/255.0, green/255.0, blue/255.0 );
}

const vertexSource = `
attribute vec3 aVertexPosition;

void main() {
    gl_Position = vec4(aVertexPosition, 1.0);
}
`

