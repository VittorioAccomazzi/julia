## Julia fractal Generator

you can find the fractal generator live at [http://julia-live.s3-website-us-east-1.amazonaws.com/](http://julia-live.s3-website-us-east-1.amazonaws.com/)

#### Goal of the application
This experimental application, which attempt to **automatically** generate [Julia fractals](https://en.wikipedia.org/wiki/Julia_set) which are entertaining  and amazing to view. The application exploits the [relationship  between the Mandelbrot set and the Julia set](https://www.karlsims.com/julia.html) as well as heuristic  in order to generate interesting  images, and animate them.

#### The technology
The application is written  in typescript using React and Redux. It is based on the [redux typescript mui](https://www.npmjs.com/package/cra-template-redux-typescript-mui) template. It runs entirely in the browser and doesn't have any server resource.

The fractal generation is implemented using [WebGL and fragment shaders](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html). The fractal images have by their nature a lot of details, and so to prevent aliasing, the pixel sharder regenerate images which have double resolution of the viewport. Therefore this application require a recent device to run properly. 

#### The Fractal Animation
The application animate the julia fractals, finding a path around the Mandelbrot set. The path is pre-computed and it is the following :

![Julia Path](https://julia-live.s3.amazonaws.com/JuliaPath.png)

When you click on the Mandelbrot image, used for navigation during the animation, you can actually see the [Julia Map](http://julia-live.s3-website-us-east-1.amazonaws.com/mapClassic). This is an interactive map which display, for each point in the complex plane the corresponding Julia Fractal. This map clearly shows the location of the fractal which are 'interesting' to view, which are typically the one at the border of the Mandelbrot  set.

The application also supports the [Phoenix fractal](http://usefuljs.net/fractals/docs/mandelvariants.html) for which the path generated is the following :

![Phoenix Path](https://julia-live.s3.amazonaws.com/PhoenixPath.png)

As for the julia fractals, you can see [Phoenix Map](http://julia-live.s3-website-us-east-1.amazonaws.com/mapPhoenix) fractals and interactively explore the fractals which can be generated.