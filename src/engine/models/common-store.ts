import { EKeyState, EMouseState } from "../systems/input"
import { IVector2D } from "./vector2d"

export class CommonStore {
    drawables = 0
    rendered = 0
    
    lastFrameDeltaTime = 0
    ticks = 0
    medianFps = 30
    timeSinceLevelLoaded = 0

    physicsNamespace!: typeof Box2D;
    physicsZero!: Box2D.b2Vec2;

    screenToWorld!: DOMMatrix;
    worldToScreen!: DOMMatrix;

    toWorldSpace({
        x, y
    }: IVector2D): IVector2D {
        const {
            a,b,c,d,e,f
        } = this.screenToWorld;

        // a c e  x  a*x + c*y + e*z
        // b d f  y  b*x + d*y + f*z
        // 0 0 1  z  ?

        return {
            x: a*x + c*y + e,
            y: b*x + d*y + f,
        };
    }

    toScreenSpace({
        x, y
    }: IVector2D): IVector2D {
        const {
            a,b,c,d,e,f
        } = this.worldToScreen;

        // a c e  x  a*x + c*y + e*z
        // b d f  y  b*x + d*y + f*z
        // 0 0 1  z  ?

        return {
            x: a*x + c*y + e,
            y: b*x + d*y + f,
        };
    }

    input: {
        wheel: number
        cursorPos: IVector2D
        keyStates: Map<string, EKeyState>
        prevKeyStates: Map<string, EKeyState | undefined>
        mouseStates: Map<number, EMouseState>

        resetPrevKey(key: string): void,

        isKeyDown(key: string): boolean,
        isKeyUp(key: string): boolean,

        isAnyKey(keys: string[], state: EKeyState): boolean,
        isAnyKeyDifferent(key: string[], state: EKeyState): boolean

        wasKeyPressed(key: string): boolean,
        wasKeyReleased(key: string): boolean,
    } = {
        wheel: 0,
        cursorPos: {x:-1, y:-1},
        keyStates: new Map<string, EKeyState>(),
        prevKeyStates: new Map<string, EKeyState | undefined>(),
        mouseStates: new Map<number, EMouseState>(),

        resetPrevKey(key: string): void {
            this.prevKeyStates.set(key, this.keyStates.get(key));
        },

        isAnyKey(key: string[], state: EKeyState): boolean {
            return key.some(e => (
                this.keyStates.get(e) === state
            ));
        },

        isAnyKeyDifferent(key: string[], state: EKeyState): boolean {
            const res = key.some(e => (
                this.keyStates.get(e) === state &&
                this.prevKeyStates.get(e) !== state
            ));

            if (res) {
                for (const k of key)
                    this.resetPrevKey(k);
            }

            return res;
        },

        isKeyDown(key: string): boolean {
            return this.keyStates.get(key) === EKeyState.Down;
        },

        isKeyUp(key: string): boolean {
            return this.keyStates.get(key) === EKeyState.Up;
        },

        wasKeyPressed(key: string): boolean {
            if (this.keyStates.get(key) === EKeyState.Down &&
                this.prevKeyStates.get(key) !== EKeyState.Down) {
                this.resetPrevKey(key);

                return true;
            }

            return false;
        },

        wasKeyReleased(key: string): boolean {
            if (this.keyStates.get(key) === EKeyState.Up &&
                this.prevKeyStates.get(key) !== EKeyState.Up) {
                this.resetPrevKey(key);

                return true;
            }

            return false;
        },
    }

    // enabled easily
    debugShapes = false
    wasBlurred = false
    wasIntentionallyPaused = false
}