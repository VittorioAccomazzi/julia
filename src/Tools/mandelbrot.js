//
// this is a utiity to generate the mandelbrot set used for the generation of the 
// C location for the Julia set (see https://www.karlsims.com/julia.html)
//
// This file is in Javascript because I can not find the type definition of the canvas 
// library
//

const {createCanvas} = require('canvas');
const fs = require('fs');

// definition in Mandelbrot space
let xMin = -2;
let xMax = 1;
let yMin = -1;
let yMax = 1;
let sampleStep = 0.001;
let nx = ( xMax - xMin )/sampleStep;
let ny = ( yMax - yMin )/sampleStep;
let neigStep = 10; // number of sampleStep to find a neigbour 
let seedLowThr = 30;
let seedHighThr = 55;
let cPoints = [];

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

// create  canvas object
const canvas = createCanvas(nx,ny);
const ctx = canvas.getContext('2d');
let imgData = ctx.getImageData(0, 0, nx, ny);

// generate the point. Remember that the image is simmetric around the origin

for ( let x=0; x<nx; x++ ){
    for( let y=0; y<=ny/2; y++){
        let xM = x*sampleStep+xMin; // coordinate in mandelbrot space
        let yM = y*sampleStep+yMin;
        let nI = MandelbrotIterations(xM, yM);
        SetPixel(x,y,nI,imgData);
        SetPixel(x,ny-y, nI, imgData);
        if( nI > seedLowThr && nI < seedHighThr){
            cPoints.push({
                    x: xM,
                    y :yM, 
                    i :nI
                }
            )
        }
    }
}

// save image
ctx.putImageData(imgData, 0, 0);
console.log(`Found ${cPoints.length} CPoints`);

let smallCanvas = Resize(canvas, 150);
SaveCanvas(smallCanvas, 'Public/Mandelbrot.png'); // save the image

// Now identify the path which allows to walk around the mandelbrot set
console.log(`processing CPoint, please wait ... `);
let start =  Date.now();

// Find the point which we'll be use to compute the path around the Mandelbrot set
let sPoint = FindPointIndex(cPoints, -0.01, 0, 1, neigStep * sampleStep );
let ePoint = FindPointIndex(cPoints, -0.01, -2, 0, neigStep * sampleStep/2 );
let path = FindMinPath(cPoints, sPoint, ePoint, neigStep * sampleStep);
console.log(`Path computed in ${parseInt((Date.now()-start)/1000)} sec`)

if( path != null ){
    console.log(`found a path with ${path.length} elements`)

    let minDst = cPoints.map((a)=>
        path
          .map((p)=>dist(a,cPoints[p])) // map each element with its distance to a.
          .reduce((iMin,dst,i,arr) => dst < arr[iMin]? i : iMin,0) // index min distance.
    );
    let minDstIndexes = minDst.map((e,i)=>({e:path[e],i})) //map ech element with its index.
    data.steps = path.map((p)=>
        minDstIndexes
          .filter((v)=> v.e===p && dist(cPoints[v.i], cPoints[p]) < neigStep * sampleStep ) // keep the ones for which this p is the closest and they are 'close enough'
          .map((v)=>cPoints[v.i])
    );

    drawAllPoints(ctx, data.steps.flat(), "#0000FF"); // draw all possible c points.
    drawPath( ctx, path, "#00FFFF") // draw the path
    drawIndexes( ctx, [sPoint,ePoint], "#FF0000") // draw start and end points
    SaveCanvas(canvas, "Public/JuliaPath.png");

    // sanity check on the values found
    // make sure that in each animation step, we have at least one point.
    data.steps.forEach((list,i)=>{
        if(list.length == 0 ) throw `Error step ${i} has no points !`
        list.forEach(p=>{
            if(p.y >0 ) throw `Error step ${i} has positive y coordinate`
        })
    })
    
    // save json file
    fs.writeFile('src/common/data.json', JSON.stringify(data,4,1), (err)=> {
        if( err ) console.error(err);
        else      console.log('The JSON file was created.');
    });
} else {
    console.error("the current settings do not allow to find a valid path for the animation !");
    throw("Unable to complete the processing. Review settings !")
}

//
// Path releated functions
//

// see https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm with 
// length(u,v) =
//   1   | seeds[u].x - seeds[v].x | < tollerance &&   | seeds[u].y - seeds[v].y | < tollerance
//   infinite otherwise.
function FindMinPath( seeds, sIndex, eIndex, tollerance ){

    const noValue =-1; // and invalid inde
    const length = (u,v) => Math.abs(seeds[u].x-seeds[v].x) < tollerance && Math.abs(seeds[u].y-seeds[v].y) < tollerance;

    let path = [];            // indexes for which we found the min path
    let front=[sIndex];       // point for which we just found the min path. We need to analyze their connections.
    let ends = seeds.map((v,i)=>i); // indexes of all the element which which don't have the min path
    let prev = seeds.map((v)=>noValue);   // for the indexes in 'path' the index which connets them. It is used to determine teh actual path. See below.

    while( front.length > 0  && !path.includes(eIndex)){
        ends = ends.filter((i)=>!front.includes(i)); // remove the element of the path from the ends.
        // for each element in end, find the nearest element in the path
        let nearest= ends.map((e)=>
            Math.max(...(front.map((p)=>length(e,p) ? p : noValue))) // index of a node in path which can reach the point, or 'noValue'
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
        let p = prev[eIndex];
        while( p!= sIndex ){
            pathIndexes.push(p);
            p=prev[p];
        }
    }
    return pathIndexes;
}

function FindPointIndex( seeds, yTollerance, xStart, xEnd, neigTollerance ){
    let invalid = -1;
    let indexes = seeds.map((p,i)=> (p.y > yTollerance && p.x > xStart && p.x < xEnd) ? i : invalid ) 
                       .filter((i)=> i!=invalid);
    let neigbours = indexes.map((i)=>seeds.reduce((s,v)=> s+( Math.abs((v.x-seeds[i].x)<neigTollerance &&  Math.abs(v.y-seeds[i].y)<neigTollerance ) ? 1 : 0), 0));
    let neigboursIndexMax = neigbours.indexOf(Math.max(...neigbours));
    return indexes[neigboursIndexMax];
}

function dist( a, b ){
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.max(Math.abs(dx),Math.abs(dy))
}

//
//  Mandelbrot function
//

function MandelbrotIterations( c_re, c_im ){
    let i=0;
    let z_re =0;
    let z_im =0

    for( i=0; i<256; i++ ){
        let z_re2 = z_re*z_re;
        let z_im2 = z_im*z_im;
        if( z_re2+z_im2 > 4 ) break; // diverge
        z_im= 2*z_re*z_im+c_im; // notice the order of these two line.
        z_re= z_re2+c_re-z_im2;
    }
    return i;
}

//
// Canvas Manipulation
//

function Resize(canvas, width){
    let scale = width / canvas.width;
    let height= canvas.height * scale;
    const resized = createCanvas(width,height);
    const ctx = resized.getContext('2d');
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, resized.width, resized.height);
    return resized;
}

// this is asyncronous.
function SaveCanvas(canvas, filename) {
    const out = fs.createWriteStream(filename);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
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
        ctx.arc(x,y,1,0,2*Math.PI,false)
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
