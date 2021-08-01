import { EKeyState, EMouseState } from '../systems/input'
import {IState} from "sim-ecs";
import { _Box2D } from '../server';
import { IVector2D } from './vector2d';

export enum EMovement {
    idle  = 0, // 0000
    up    = 1, // 0001
    down  = 2, // 0010
    left  = 4, // 0100
    right = 8, // 1000
}

export class GameStore {
    drawables = 0
    rendered = 0

    debugShapes = true
    wasBlurred = false
    wasIntentionallyPaused = false
    continue = false
    currentState?: IState
    lastFrameDeltaTime = 0
    ticks = 0
    medianFps = 30
    timeSinceLevelLoaded = 0
    input: {
        actions: {
            characterMovement: EMovement
            menuConfirm: boolean
            togglePause: boolean
            menuMovement: EMovement
        }
        wheel: number
        cursorPos: IVector2D
        cursorPosWorld: IVector2D
        keyStates: Map<string, EKeyState>
        mouseStates: Map<number, EMouseState>
    } = {
        actions: {
            characterMovement: EMovement.idle,
            menuConfirm: false,
            menuMovement: EMovement.idle,
            togglePause: false,
        },
        wheel: 0,
        cursorPos: {x:-1, y:-1},
        cursorPosWorld: {x:-1, y:-1},
        keyStates: new Map<string, EKeyState>(),
        mouseStates: new Map<number, EMouseState>(),
    }
    physicsNamespace!: _Box2D;
    physicsZero!: Box2D.b2Vec2;
    screenToWorld?: DOMMatrix;
    worldToScreen?: DOMMatrix;
}
