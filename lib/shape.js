import {Transform} from './transform.js';

export class Shape{
    constructor(centerX, centerY, color){
        this.centerX = centerX;
		this.centerY = centerY;
        this.color = color;
		this.transform = new Transform();
    }

    getCenterX(){
        return this.centerX;
    }

    getCenterY(){
        return this.centerY;
    }

    setCenterX(c){
        this.centerX = c;
    }

    setCenterY(c){
        this.centerY = c;
    }

    translate_shape(key, move_by){
        switch(key){
            case "ArrowRight":
                this.centerX += move_by;
                this.transform.setTranslate([this.transform.getTranslate()[0] + move_by, this.transform.getTranslate()[1], 0]);
            break;
            case "ArrowLeft":
                this.centerX -= move_by;
                this.transform.setTranslate([this.transform.getTranslate()[0] - move_by, this.transform.getTranslate()[1], 0]);
            break;
            case "ArrowUp":
                this.centerY += move_by;
                this.transform.setTranslate([this.transform.getTranslate()[0], this.transform.getTranslate()[1] + move_by, 0]);

            break;
            case "ArrowDown":
                this.centerY -= move_by;
                this.transform.setTranslate([this.transform.getTranslate()[0], this.transform.getTranslate()[1] - move_by, 0]);
            break;
        }
    }

    rotate_shape(key, rotate_by){
        switch(key){
            case "(":
                this.transform.setRotationAngle(this.transform.getRotationAngle()-rotate_by);
            break;
            case ")":
                this.transform.setRotationAngle(this.transform.getRotationAngle()+rotate_by);
            break;
        }
    }

    scale_shape(key, scale_by){
        switch(key){
            case "+":
                this.transform.setScale([this.transform.getScale()[0] * scale_by, this.transform.getScale()[0] * scale_by, 1]);
            break;
            case "-":
                this.transform.setScale([this.transform.getScale()[0] / scale_by, this.transform.getScale()[0] / scale_by, 1]);
            break;
        }
    }
}