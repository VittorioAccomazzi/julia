## Julia fractal Generator

#### Goal of the application
This experimental application, which attempt to **automatically** generate [Julia fractals](https://en.wikipedia.org/wiki/Julia_set) which are entertaining  and amazing to view. The application exploits the [relationship  between the Mandelbrot set and the Julia set](https://www.karlsims.com/julia.html) as well as heuristic  in order to generate interesting  images, and animate them.

#### The technology
The application is written  in typescript using React and Redux. It is based on the [redux typescript mui](https://www.npmjs.com/package/cra-template-redux-typescript-mui) template. It runs entirely in the browser and doesn't have any server resource.

The fractal generation is implemented using [WebGL and fragment shaders](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html). The fractal images have by their nature a lot of details, and so to prevent aliasing, the pixel sharder regenerate images which have double resolution of the viewport. Therefore this application require a recent device to run properly. 