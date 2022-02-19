import {Shape} from './shape.js';

export class Scene
{
	constructor()
	{
		this.primitives = []
	}

	add(primitive)
	{
		if( this.primitives && primitive )
		{
			this.primitives.push(primitive)
		}
	}

	getPrimitives(){
		return this.primitives
	}

	centroid(move_by)
	{
		let cx=0;
		let cy=0;

		// @ToDo : Return the centroid as per the requirements of mode-2
		let maxX = this.primitives[0].getCenterX();
		let minX = this.primitives[0].getCenterX();
		let maxY = this.primitives[0].getCenterY();
		let minY = this.primitives[0].getCenterY();
		for (let i = 0; i < this.primitives.length; i++) {
			if (maxX < this.primitives[i].getCenterX()) {
				maxX = this.primitives[i].getCenterX();
			}
			if (minX > this.primitives[i].getCenterX()) {
				minX = this.primitives[i].getCenterX();
			}
			if (maxY < this.primitives[i].getCenterY()) {
				maxY = this.primitives[i].getCenterY();
			}
			if (minY > this.primitives[i].getCenterY()) {
				minY = this.primitives[i].getCenterY();
			}
		}
		maxX += move_by;
		maxY += move_by;
		minX -= move_by;
		minY -= move_by;
		cx = (maxX + minX) / 2;
		cy = (maxY + minY) / 2;

		return [cx,cy];
	}


	translate_shape(key,move_by){
		for(let i=0; i<this.primitives.length; i++){
			this.primitives[i].translate_shape(key,move_by);
		}
	}

	rotate_shape(key,rotate_by){
		let l = this.centroid(0.02);
		let bbx = l[0]; 
		let bby = l[1];

		switch(key){
			case "(":
				for (let i = 0; i < this.primitives.length; i++) {
					let prim = this.primitives[i];
                    prim.transform.setTranslate([Math.cos(-rotate_by) * (prim.transform.getTranslate()[0] - bbx) - Math.sin(-rotate_by) * (prim.transform.getTranslate()[1] - bby) + bbx, Math.sin(-rotate_by) * (prim.transform.getTranslate()[0] - bbx) + Math.cos(-rotate_by) * (prim.transform.getTranslate()[1] - bby) + bby, 0]);
                    prim.transform.setRotationAngle(prim.transform.getRotationAngle()-rotate_by);
                }
			break;
			case ")":
				for (let i = 0; i < this.primitives.length; i++) {
					let prim = this.primitives[i];
					prim.transform.setTranslate([Math.cos(rotate_by) * (prim.transform.getTranslate()[0] - bbx) - Math.sin(rotate_by) * (prim.transform.getTranslate()[1] - bby) + bbx, Math.sin(rotate_by) * (prim.transform.getTranslate()[0] - bbx) + Math.cos(rotate_by) * (prim.transform.getTranslate()[1] - bby) + bby, 0]);
					prim.transform.setRotationAngle(prim.transform.getRotationAngle()+rotate_by);
				}
			break;

		}
    }

	scale_shape(key, scale_by){
		switch(key){
			case "+":
				for (let i = 0; i < this.primitives.length; i++) {
                    let prim = this.primitives[i];
					prim.setCenterX(prim.getCenterX()*scale_by);
                    prim.setCenterY(prim.getCenterY()*scale_by);
                
                    prim.transform.setTranslate([prim.transform.getTranslate()[0] * scale_by, prim.transform.getTranslate()[1] * scale_by, 0]);

                    prim.transform.setScale([prim.transform.getScale()[0] * scale_by, prim.transform.getScale()[0] * scale_by, 1]);
                }
			break;
			case "-":
				for (let i = 0; i < this.primitives.length; i++) {
                    let prim = this.primitives[i];
					prim.setCenterX(prim.getCenterX()/scale_by);
                    prim.setCenterY(prim.getCenterY()/scale_by);
                
                    prim.transform.setTranslate([prim.transform.getTranslate()[0] / scale_by, prim.transform.getTranslate()[1] / scale_by, 0]);

                    prim.transform.setScale([prim.transform.getScale()[0] / scale_by, prim.transform.getScale()[0] / scale_by, 1]);
                }
			break;
		}
	}
}
