import { IEntity } from "sim-ecs";
import { Shape } from "./shape";

export class Collision {
    constructor(
        public shapeFromVisuals: boolean = true,
        public shape: Shape | null = null
    ) {
        if (!shapeFromVisuals && !shape) {
            throw new Error('Either copy the collision shape\
                from visuals or provide a new one')
        } 
    }
    
    public collisionObjects: Set<IEntity> = new Set<IEntity>();
    public occurred = false;
}
