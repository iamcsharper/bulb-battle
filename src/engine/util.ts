export const TWOPI = Math.PI * 2;
export const drawPoint = (
    ctx: CanvasRenderingContext2D,
    x:number,
    y:number,
    size:number = 0.1
) => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.arc(x, y, size, 0, TWOPI);
    ctx.fill();
}

export const PIXELS_PER_METER = 32;

export const lerp = (value1: number, value2: number, factor: number) => {
    factor = factor < 0 ? 0 : factor;
    factor = factor > 1 ? 1 : factor;
    return value1 + (value2 - value1) * factor;
}

export function shortAngleDist(a0: number, a1: number) {
    const max = Math.PI * 2;
    const da = (a1 - a0) % max;
    return 2 * da % max - da;
}

export function angleLerp(a0: number, a1: number, t: number) {
    return a0 + shortAngleDist(a0, a1) * t;
}