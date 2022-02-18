import {Shape} from './shape.js';

export class Parallelogram extends Shape
{
	constructor(centerX, centerY, color) {
		super(centerX, centerY,color);
		this.vertexPositions = new Float32Array([
			//  x , y,  z 
			centerX - 0.125, centerY + 0.375, 0.0,
			centerX - 0.125, centerY - 0.125, 0.0,
			centerX + 0.125, centerY + 0.125, 0.0,
            centerX + 0.125, centerY + 0.125, 0.0,
            centerX - 0.125, centerY - 0.125, 0.0,
            centerX + 0.125, centerY - 0.375, 0.0,
		]);
	}
}