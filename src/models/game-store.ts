import { EKeyState } from '../systems/input'
import {IState} from "sim-ecs";

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
        keyStates: {
            [key: string]: EKeyState | undefined
        }
    } = {
        actions: {
            characterMovement: EMovement.idle,
            menuConfirm: false,
            menuMovement: EMovement.idle,
            togglePause: false,
        },
        keyStates: {},
    }
}
