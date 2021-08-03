export class Rotation {
    private _val: number = 0;
    private _sin: number = 0;
    private _cos: number = 0;

    public get sin_cos() {
        return [this._sin, this._cos];
    }

    public get value() {
        return this._val;
    }

    public set value(newval: number) {
        this._sin = Math.sin(newval);
        this._cos = Math.cos(newval);

        this._val = newval;
    }

    constructor(value: number) {
        this.value = value;
    }
}