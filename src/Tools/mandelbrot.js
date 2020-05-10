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

// data used for generating the random C
let data = {
    xMin : xMin,
    yMin : yMin,
    xMax : xMax,
    yMax : yMax,
    nx : nx,
    ny : ny,
    seeds : []
}

let seedLowThr = 100;
let seedHighThr = 250;

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
            data.seeds.push({
                    x: xM,
                    y :yM, 
                    i :nI
                }
            )
        }
    }
}
ctx.putImageData(imgData, 0, 0);
console.log(`Found ${data.seeds.length} seeds`);

// save json file
fs.writeFile('src/features/julia/data.json', JSON.stringify(data,4,1), (err)=> {
    if( err ) console.err(err);
    else      console.log('The JSON file was created.');
});

// save the image
const out = fs.createWriteStream('Public/Mandelbrot.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))


function SetPixel(x,y,g, imgData){
    let offset = (y*nx+x)*4;
    imgData.data[offset + 0] = g;
    imgData.data[offset + 1] = g;
    imgData.data[offset + 2] = g;
    imgData.data[offset + 3] = 255;
}

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