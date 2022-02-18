import { Scene, Triangle, Square, WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';

const scene = new Scene();

const triangle1 = new Triangle(0,0,[1,0.647,0,1]);
const square1 = new Square(0,0,[0,1,0,1]);

// const triangle3 = new Triangle(0.5,0.5,[255,0,0,1]);
// const triangle4 = new Triangle(0.5,-0.5,[0,0,0,1]);

scene.add(triangle1);
scene.add(square1);

// scene.add(triangle3);
// scene.add(triangle4);

const renderer = new WebGLRenderer();
renderer.setSize( 500, 500 );
document.body.appendChild( renderer.domElement );

const shader = new Shader(renderer.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader.use();


let mode = 0;
let prims = scene.getPrimitives();
let count = -1;
let start = 0;
let move_by = 0.1;
let rotate_by = 0.1;
let scale_by = 1.2;

window.onload = () => {
    renderer.getDomElement().addEventListener('click', (event) => {
        
        if (mode == 1) {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            let dist = 10;

            const clipCoordinates = renderer.mouseToClipCoord(mouseX, mouseY);

            const position = new Float32Array([clipCoordinates[0], clipCoordinates[1]]);

            for (let i = start; i < prims.length; i++) {
                let sum = ((position[0] - prims[i].getCenterX()) ** 2 + (position[1] - prims[i].getCenterY()) ** 2) ** (1 / 2);
                if (sum < dist) {
                    dist = sum;
                    count = i;
                }
            }
            console.log(prims[count].getCenterX());
        }
        else { }
    });

    window.addEventListener('keydown', function (event) {
        console.log("Key pressed = ", event.key);
        if(event.key=="m"){
            mode = (mode += 1) % 4;
            console.log("mode = ",mode);
        }
        else if(event.key == "(" || event.key == ")"){
            if(mode == 1){
                prims[count].rotate_shape(event.key,rotate_by);

            } else if(mode == 2) {
                scene.rotate_shape(event.key,rotate_by);
            }
        }
        else if(event.key == "+" || event.key=="-"){
            if(mode == 1){
                prims[count].scale_shape(event.key,scale_by);
            } else if(mode == 2){
                scene.scale_shape(event.key, scale_by);
            }
        }
        else{
            if(mode==1){
                prims[count].translate_shape(event.key,move_by);
            } else if(mode == 2) {
                scene.translate_shape(event.key,move_by);
            }
        }
            
    }, true
);

    window.addEventListener
};


renderer.setAnimationLoop( animation );

//Draw loop
function animation()
{	
	renderer.clear(0.9,0.9,0.9,1);
	renderer.render(scene, shader);	
}