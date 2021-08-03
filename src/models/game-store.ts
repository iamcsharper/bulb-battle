import {IState} from "sim-ecs";
import { EMovement } from "../engine/models/movement";

export class GameStore {
    continue = false
    currentState?: IState
    actions: {
        characterMovement: EMovement
        menuConfirm: boolean
        togglePause: boolean
        menuMovement: EMovement
    } = {
        characterMovement: EMovement.idle,
        menuConfirm: false,
        menuMovement: EMovement.idle,
        togglePause: false,
    }
}
