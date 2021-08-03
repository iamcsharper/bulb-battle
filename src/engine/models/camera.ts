import { Velocity } from "../components/velocity";
import { IRect } from "./rect";
import { IVector2D } from "./vector2d";

export enum CameraFollowMethod {
    Immediate,
    Smooth,
    Elastic
}

export interface CameraFollow {
    target: IVector2D
    targetAngle?: number
    method: CameraFollowMethod
    prevX: number
    prevY: number
}

export class Camera {
    public viewport!: IRect;

    constructor(
        public x: number = 0,
        public y: number = 0,
        public offset: IVector2D = {
            x: 0,
            y: 0,
        },
        public vel: Velocity = <Velocity>{
            x: 0,
            y: 0
        },
        public zoom: number = 1,
        public rotation: number = 0,
        public follow?: CameraFollow,
        public elasticity: number = 0.01,
        public friction: number = 0.15,
    ) {}
}