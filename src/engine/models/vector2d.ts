export interface IVector2D {
    x: number;
    y: number;
}

export class Vector2D implements IVector2D {
    buf = new ArrayBuffer(4);
    f32 = new Float32Array(this.buf);
    u32 = new Uint32Array(this.buf);

    constructor(
        public x = 0,
        public y = 0,
    ) {}

    public addSelf(vec: Vector2D) {
        this.x += vec.x;
        this.y += vec.y;
    }

    public subSelf(vec: Vector2D) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    public scale(factor: number) {
        this.x *= factor;
        this.y *= factor;
    }

    public normalize() {
        const inv = this.invSqrt();

        this.x *= inv;
        this.y *= inv;
    }

    public invSqrt(): number {
        const x = this.x * this.x + this.y * this.y;
        const x2 = 0.5 * (this.f32[0] = x);
        this.u32[0] = (0x5f3759df - (this.u32[0] >> 1));
        let y = this.f32[0];
        y  = y * ( 1.5 - ( x2 * y * y ) );   // 1st iteration

        return y;
    }

    public distance(to: Vector2D) {
        const dx = to.x - this.x;
        const dy = to.y - this.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    public sqrDistance(to: Vector2D) {
        const dx = to.x - this.x;
        const dy = to.y - this.y;
        return dx*dx + dy*dy;
    }

    public sqrLength() {
        return this.x * this.x + this.y * this.y;
    }

    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

export const vecZero = new Vector2D(0, 0);
export const vecOne = new Vector2D(1, 1);
export const vecUp = new Vector2D(0, 1);
export const vecDown = new Vector2D(0, -1);
export const vecLeft = new Vector2D(-1, 0);
export const vecRight = new Vector2D(1, 0);