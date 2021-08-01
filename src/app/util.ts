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

export const lerp = (value1: number, value2: number, amount: number) => {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}