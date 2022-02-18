import {Shape} from './shape.js';

export class Triangle extends Shape
{
	constructor(centerX, centerY, color) {
		super(centerX, centerY,color);
		this.vertexPositions = new Float32Array([
			//  x , y,  z 
			centerX, centerY + 0.1, 0.0,
			centerX - 0.15, centerY - 0.05, 0.0,
			centerX + 0.15, centerY - 0.05, 0.0,
		]);
	}
}