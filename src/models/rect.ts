export interface IRect {
    x: number,
    y: number,
    w: number,
    h: number,
}

export class Rect implements IRect {
    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
    ) {}

    static checkIntersects(r1: IRect, r2: IRect) {
        return !(r2.x > r1.x+r1.w || 
            r2.x+r2.w < r1.x || 
            r2.y > r1.y+r1.h ||
            r2.y+r2.h < r1.y);
    }
}