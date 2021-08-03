import { Vector2D } from "../models/vector2d";

export class Velocity extends Vector2D {
    constructor(x:number, y: number, public angular: number) {
        super(x, y);
    }
}
