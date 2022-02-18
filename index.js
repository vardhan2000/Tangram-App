import { Scene, Triangle, Square, Parallelogram,  WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';

const scene = new Scene();

const t0 = new Triangle(0,0,[1,0.647,0,1]); // orange
const t1 = new Triangle(0,0,[0,0,1,1]); // blue
const t2 = new Triangle(0,0,[1, 0.8, 0.0,1]); // yellow
const t3 = new Triangle(0,0,[0,1,0,1]); // green
const t4 = new Triangle(0,0,[0.039, 0.796, 0.933,1]); // light blue
const s1 = new Square(0,0,[1,0,0,1]);
const p1 = new Parallelogram(0,0,[1,0.062,0.94,1]);

scene.add(t0);
scene.add(t1);
scene.add(t2);
scene.add(t3);
scene.add(t4);
scene.add(s1);
scene.add(p1);

t0.setCenterX(0.09999);
t0.setCenterY(0.33);
t0.transform.setTranslate([0.09999, 0.33, 0]);
t0.transform.setRotationAngle(-3.129999);

t1.setCenterX(0.42);
t1.setCenterY(0.03);
t1.transform.setTranslate([0.42, 0.03, 0]);
t1.transform.setRotationAngle(1.59);

t2.setCenterX(0.34);
t2.setCenterY(-0.35);
t2.transform.setTranslate([0.34, -0.35, 0]);
t2.transform.setRotationAngle(0);

t3.setCenterX(-0.2);
t3.setCenterY(-0.28);
t3.transform.setTranslate([-0.2, -0.28, 0]);
t3.transform.setRotationAngle(2.34999);

t4.setCenterX(-0.03999);
t4.setCenterY(0.02);
t4.transform.setTranslate([-0.03999, 0.02, 0]);
t4.transform.setRotationAngle(-1.58);

t0.transform.setScale([3.071523, 3.071523,1]);
t1.transform.setScale([3.071523, 3.071523,1]);
t2.transform.setScale([1.477455, 1.477455,1]);
t3.transform.setScale([2.07893, 2.07893,1]);
t4.transform.setScale([1.477455, 1.477455,1]);

s1.setCenterX(0.10999);
s1.setCenterY(-0.1999);
s1.transform.setTranslate([0.10999, -0.1999, 0]);
s1.transform.setRotationAngle(-0.79);
s1.transform.setScale([1.6289, 1.6289,1]);

p1.setCenterX(-0.23);
p1.setCenterY(0.12999);
p1.transform.setTranslate([-0.23, 0.12999, 0]);
p1.transform.setRotationAngle(0);
p1.transform.setScale([0.907, 0.907,1]);

const renderer = new WebGLRenderer();
renderer.setSize( 500, 500 );
document.body.appendChild( renderer.domElement );

const shader = new Shader(renderer.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader.use();


let mode = 0;
let prims = scene.getPrimitives();
let count = -1;
let start = 0;
let move_by = 0.01;
let rotate_by = 0.01;
let scale_by = 1.05;

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