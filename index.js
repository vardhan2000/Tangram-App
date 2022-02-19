import { Scene, Triangle, Square, Parallelogram,  WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';

const scene1 = new Scene();

const t0 = new Triangle(0,0,[1,0.647,0,1]); // orange
const t1 = new Triangle(0,0,[0,0,1,1]); // blue
const t2 = new Triangle(0,0,[1, 0.8, 0.0,1]); // yellow
const t3 = new Triangle(0,0,[0,1,0,1]); // green
const t4 = new Triangle(0,0,[0.039, 0.796, 0.933,1]); // light blue
const s1 = new Square(0,0,[1,0,0,1]); // red
const p1 = new Parallelogram(0,0,[1,0.062,0.94,1]); // pink

scene1.add(t0);
scene1.add(t1);
scene1.add(t2);
scene1.add(t3);
scene1.add(t4);
scene1.add(s1);
scene1.add(p1);

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


const renderer1 = new WebGLRenderer();
renderer1.setSize( 500, 500 );
document.body.appendChild( renderer1.domElement );

const shader1 = new Shader(renderer1.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader1.use();

renderer1.setAnimationLoop( animation1 );

//Draw loop
function animation1()
{	
	renderer1.clear(0.9,0.9,0.9,1);
    renderer1.render(scene1, shader1);
}


const scene2 = new Scene();


const t0_ = new Triangle(0,0,[1,0.647,0,1]); // orange
const t1_ = new Triangle(0,0,[0,0,1,1]); // blue
const t2_ = new Triangle(0,0,[1, 0.8, 0.0,1]); // yellow
const t3_ = new Triangle(0,0,[0,1,0,1]); // green
const t4_ = new Triangle(0,0,[0.039, 0.796, 0.933,1]); // light blue
const s1_ = new Square(0,0,[1,0,0,1]); // red
const p1_ = new Parallelogram(0,0,[1,0.062,0.94,1]); // pink

scene2.add(t0_);
scene2.add(t1_);
scene2.add(t2_);
scene2.add(t3_);
scene2.add(t4_);
scene2.add(s1_);
scene2.add(p1_);

t0_.transform.setScale([3.071523, 3.071523,1]);
t1_.transform.setScale([3.071523, 3.071523,1]);
t2_.transform.setScale([1.477455, 1.477455,1]);
t3_.transform.setScale([2.07893, 2.07893,1]);
t4_.transform.setScale([1.477455, 1.477455,1]);
s1_.transform.setScale([1.6289, 1.6289,1]);
p1_.transform.setScale([0.907, 0.907,1]);


const renderer2 = new WebGLRenderer();
renderer2.setSize( 500, 500 );
document.body.appendChild( renderer2.domElement );

const shader2 = new Shader(renderer2.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader2.use();


let mode = 0;
let prims = scene2.getPrimitives();
let count = -1;
let start = 0;
let move_by = 0.01;
let rotate_by = 0.01;
let scale_by = 1.05;

window.onload = () => {
    renderer2.getDomElement().addEventListener('click', (event) => {
        
        if (mode == 1) {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            let dist = 10;

            const clipCoordinates = renderer2.mouseToClipCoord(mouseX, mouseY,500);
            console.log("mouseX = ", mouseX, "; mouseY = ", mouseY);
            const position = new Float32Array([clipCoordinates[0], clipCoordinates[1]]);
            console.log("positionX = ", position[0], "; positionY = ", position[1]);

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
                scene2.rotate_shape(event.key,rotate_by);
            }
        }
        else if(event.key == "+" || event.key=="-"){
            if(mode == 1){
                prims[count].scale_shape(event.key,scale_by);
            } else if(mode == 2){
                scene2.scale_shape(event.key, scale_by);
            }
        }
        else{
            if(mode==1){
                prims[count].translate_shape(event.key,move_by);
            } else if(mode == 2) {
                scene2.translate_shape(event.key,move_by);
            }
        }
            
    }, true
);

    window.addEventListener
};


renderer2.setAnimationLoop( animation2 );

//Draw loop
function animation2()
{	
	renderer2.clear(0.9,0.9,0.9,1);
    renderer2.render(scene2, shader2);
}