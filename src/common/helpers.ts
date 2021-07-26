export const indexByColRow = (cols:number) => (
    (col:number, row:number): number => (cols * row + col)
);

export const getRandomIndex = (length: number) => Math.floor(Math.random()*length);

export const getRandomSprite = (minCol: number, maxCol: number, minRow: number, maxRow: number) => {
    const randomCol = Math.floor(Math.random() * (maxCol - minCol)) + minCol;
    const randomRow = Math.floor(Math.random() * (maxRow - minRow)) + minRow;

    return randomRow * (maxCol - minCol) + randomCol;
};