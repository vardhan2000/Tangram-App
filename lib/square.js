import {Shape} from './shape.js';

export class Square extends Shape
{
	constructor(centerX, centerY, color) {
		super(centerX, centerY,color);
		this.vertexPositions = new Float32Array([
			//  x , y,  z 
			centerX - 0.1, centerY + 0.1, 0.0,
			centerX - 0.1, centerY - 0.1, 0.0,
            centerX + 0.1, centerY + 0.1, 0.0,
            centerX - 0.1, centerY - 0.1, 0.0,
            centerX + 0.1, centerY - 0.1, 0.0,
            centerX + 0.1, centerY + 0.1, 0.0,
		]);
	}
}