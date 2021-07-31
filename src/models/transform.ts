import { Position } from "../components/position";

export class Transform {
    constructor(
        public position: Position,
        public rotation: number,
        public scale: number,
    ) {}
}
