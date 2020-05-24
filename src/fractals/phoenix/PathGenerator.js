//
// this is a utiity to generate the path for the Phoenix fractal
//
// This file is in Javascript because I can not find the type definition of the canvas 
// library
//

const {createCanvas} = require('canvas');
const fs = require('fs');

// definition in complex plane, for the C value
let xMin = -2;
let xMax = 1;
let yMin = -1.4;
let yMax = 1.6;
let nx = 512;
let ny = (yMax-yMin)/(xMax-xMin)*nx;
let neigStep = 8; // number of sampleStep to find a neigbour 
let seedLowThr = 60;
let seedHighThr = 120;
let cPoints = [];
let JsonFilename = 'src/fractals/phoenix/Phoenix.json' 

// definition for the Julia set computation
const jMin = -1;
const jMax = 1;
const nStep= 5;
const MaxIterations = 255;

// data used for generating the random C
let data = {
    xMin : xMin,
    yMin : yMin,
    xMax : xMax,
    yMax : yMax,
    nx : nx,
    ny : ny,
    steps : []
}

async function  PhoenixProcessing (){
    const canvas = createCanvas(nx,ny);
    const ctx = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, nx, ny);

    sampleStep = (xMax-xMin)/nx;

    for ( let x=0; x<nx; x++ ){
        for( let y=0; y<=ny; y++){
            let xP = x*sampleStep+xMin; // coordinate in mandelbrot space
            let yP = y*sampleStep+yMin;
            let nI = Phoenix(xP, yP);
            SetPixel(x,y,nI,imgData);
            if( nI > seedLowThr && nI < seedHighThr){
                cPoints.push({
                        x: xP,
                        y :yP, 
                        i :nI
                    }
                )
            }
        }
    }

    // save image
    ctx.putImageData(imgData, 0, 0);
    console.log(`Found ${cPoints.length} CPoints`);

    await SaveCanvas(canvas, 'Public/Phoenix.png'); // save the image

    // point manually identified
    let steps = 
        [
            {
                start : { x: 190, y:65 }, // top path
                end   : { x: 440, y:68 }
            },
            {
                start : { x: 447, y:141 }, // top right
                end   : { x: 414, y:188 }
            },
            {
                start : { x: 408, y:195 }, // mid right
                end   : { x: 365, y:287 }
            },
            {
                start : { x: 361, y:315 },  // bottom right path
                end   : { x: 390, y:398 }
            },
            {
                start : { x: 350, y:410 },   // bottom path
                end   : { x: 300, y:408 }
            }
            
        ]

        let ptsPath = [];
        let fullPath=[];
        let tollerance=neigStep * sampleStep;
        steps.forEach(s =>{
            let sIndex = findIndex( cPoints, s.start, sampleStep, xMin, yMin );
            let eIndex = findIndex( cPoints, s.end,   sampleStep, xMin, yMin );
            let path = FindMinPath(cPoints, sIndex, eIndex, tollerance);
            ptsPath.push(sIndex);
            ptsPath.push(eIndex);
            if( path ){
                fullPath = fullPath.concat(path);
                console.log(`found a path with ${path.length} elements`)
            } else {
                console.error("the current settings do not allow to find a valid path for the animation !");
            }
        })

        // now for each point in the path find all the pont which are closeby
        // and so can be selected during the animation
        let noIndex =-1;

        let indexNearestInPath = cPoints.map((c)=>{
            let dst = fullPath.map((p)=>dist(c,cPoints[p]));
            let min = Math.min(...dst);
            return min < tollerance ? fullPath[dst.indexOf(min)] : noIndex;
        })

        data.steps= fullPath.map((p)=>{
            let neigb = indexNearestInPath.map((v,i)=> v==p ? cPoints[i] : null);
            return neigb.filter((v)=> v!==null);
        });

        drawAllPoints(ctx, data.steps.flat() , "#0000FFA0"); // draw all possible c points.
        drawPath( ctx, fullPath, "#00FFFF") // draw the path
        drawIndexes( ctx, ptsPath, "#FF0000") // draw start and end points

        // draw the most popular point, so we make sure that we can visit it
        drawAllPoints(ctx, [{x:0.56667, y:-0.5}], "#FFFF00");

        SaveCanvas(canvas, "Public/PhoenixPath.png");

        // save json file
        fs.writeFile(JsonFilename, JSON.stringify(data,4,1), (err)=> {
            if( err ) console.error(err);
            else      console.log('The JSON file was created.');
        });

}

PhoenixProcessing();

//
// Path releated functions
//

// see https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm with 
// length(u,v) =
//   | seeds[u].x - seeds[v].x | +  | seeds[u].y - seeds[v].y | if less then tollerance
//   infinite otherwise.
function FindMinPath( seeds, sIndex, eIndex, tollerance ){

    const noValue =-1; // and invalid index
    const length = (u,v) => Math.abs(seeds[u].x-seeds[v].x) + Math.abs(seeds[u].y-seeds[v].y);

    let path = [];            // indexes for which we found the min path
    let front=[sIndex];       // point for which we just found the min path. We need to analyze their connections.
    let ends = seeds.map((v,i)=>i); // indexes of all the element which which don't have the min path
    let prev = seeds.map((v)=>noValue);   // for the indexes in 'path' the index which connets them. It is used to determine teh actual path. See below.

    while( front.length > 0  && !path.includes(eIndex)){
        ends = ends.filter((i)=>!front.includes(i)); // remove the element of the path from the ends.
        // for each element in end, find the nearest element in the `front` set
        let nearest= ends.map((e)=>{
            let dsts =front.map((p)=>length(e,p));
            let minDst = Math.min(...dsts);
            let minIdx = dsts.indexOf(minDst);
            return minDst < tollerance ?  front[minIdx] : noValue;
            }
        )
        // add the path on front to the actual path
        path = path.concat(front);
        // clen up the front indexes
        front = [];
        // for each point in nearest add to path and prev
        nearest.forEach((v,i)=>{
            if( v!= noValue){
                prev[ends[i]] = v;
                front.push(ends[i]);
            }
        });
    }

    let pathIndexes = null;
    if( path.includes(eIndex) ){
        pathIndexes = [];
        let p = eIndex;
        while( p!= sIndex ){
            p=prev[p];
            pathIndexes.push(p);
        }
        pathIndexes.reverse(); // so we start with sIndex and finish with eIndex
    }
    return pathIndexes;
}


function findIndex( points, pixel, scale, xMin, yMin ){
    let c = {
        x : pixel.x * scale + xMin,
        y : pixel.y * scale + yMin
    }
    let dst = points.map(p=>dist(p,c));
    let min = Math.min(...dst);
    return dst.indexOf(min);
}

function dist( a, b ){
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.abs(dx)+Math.abs(dy);
}

//
//  Phoenix function
//

// instead of using the normal iteration (as we do for Mondelbrot) draws a very small julia set
// with the C passed, and return the maximum number of iterations. This will 
// allows us to have a better predictiction of the actual image.
// See http://www.jamesh.id.au/fractals/mandel/Phoenix.html the Julia/Mandelbrot set relationship is not
// hold for this fractal



function Phoenix( c_r, c_i ){
    let maxSteps = 0;
    let scale = ( jMax-jMin )/nStep;
    for( let y=0; y<nStep; y++ ){
        for( let x=0; x<nStep; x++ ){
            let jx = x * scale + jMin; // from pixel coordinate to complex 
            let jy = y * scale + jMin; // coordinates.
            let i = PhoenixIterations(jx, jy, c_r, c_i );
            maxSteps = i > maxSteps ? i : maxSteps;
            if( maxSteps == MaxIterations ) return maxSteps;
        }
    }
    return maxSteps;
}

function PhoenixIterations( p_r, p_i, c_r, c_i ){
    let p0_r = 0;
    let p0_i = 0;
    let p1_r = p_i;
    let p1_i = p_r;
    let p2_r = 0;
    let p2_i = 0;

    for(let i=0; i<MaxIterations; i++ ){
        let p1_r2 = p1_r * p1_r;
        let p1_i2 = p1_i * p1_i;
        p2_r = p1_r2-p1_i2+c_r+p0_r*c_i;
        p2_i = 2*p1_r*p1_i+p0_i*c_i;

        if( p1_r2 + p1_i2 > 4 ) return i; // diverge

        p0_r = p1_r;
        p0_i = p1_i;
        p1_r = p2_r;
        p1_i = p2_i;
    }

    return MaxIterations;
}

//
// Canvas Manipulation
//

async function SaveCanvas(canvas, filename){
    return new Promise( (resolve, reject)=>{
        const out = fs.createWriteStream(filename);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => resolve());
        out.on('error', ()=> reject());
    } )
}

function drawPath( ctx, indexes, style) {
    const xMap = (i)=> (cPoints[i].x-xMin)/sampleStep;
    const yMap = (i)=> (cPoints[i].y-yMin)/sampleStep;
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.moveTo(xMap(indexes[0]), yMap(indexes[0]).y);
    indexes.forEach((p)=>{
        ctx.lineTo(xMap(p),yMap(p));
    })
    ctx.stroke();
}

function drawIndexes( ctx, indexes, style) {
    ctx.beginPath();
    ctx.strokeStyle = style;
    indexes.forEach((p)=>{
        let x = (cPoints[p].x-xMin)/sampleStep;
        let y = (cPoints[p].y-yMin)/sampleStep;
        ctx.moveTo(x,y);
        ctx.arc(x,y,2,0,2*Math.PI,false)
    })
    ctx.stroke();
}

function drawAllPoints( ctx, points, style) {
    ctx.beginPath();
    ctx.strokeStyle = style;
    points.forEach((p)=>{
        let x = (p.x-xMin)/sampleStep;
        let y = (p.y-yMin)/sampleStep;
        ctx.moveTo(x,y);
        ctx.arc(x,y,0.5,0,2*Math.PI,false)
    })
    ctx.stroke();
}

function SetPixel(x,y,g, imgData){
    let offset = (y*nx+x)*4;
    imgData.data[offset + 0] = g;
    imgData.data[offset + 1] = g;
    imgData.data[offset + 2] = g;
    imgData.data[offset + 3] = 255;
}
