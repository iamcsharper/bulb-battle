import {ISystemActions, System} from "sim-ecs";
import {EMovement, GameStore} from "../models/game-store";

export enum EKeyState {
    Down,
    Up,
}

interface IInputEvent {
    key: string
    type: EKeyState
}

export class InputSystem extends System {
    gameStore!: GameStore;
    inputEvents: IInputEvent[] = [];

    setup(actions: ISystemActions) {
        this.gameStore = actions.getResource(GameStore);

        window.addEventListener('keydown', event => this.inputEvents.push({key: event.key, type: EKeyState.Down}));
        window.addEventListener('keyup', event => this.inputEvents.push({key: event.key, type: EKeyState.Up}));
    }

    run(actions: ISystemActions) {
        { // Reset input actions
            this.gameStore.input.actions.menuConfirm = false;
            this.gameStore.input.actions.menuMovement = EMovement.idle;
            this.gameStore.input.actions.togglePause = false;
        }

        { // Work on all events which occurred during the last frame
            for (const event of this.inputEvents) {
                this.gameStore.input.keyStates[event.key] = event.type;

                if (event.type == EKeyState.Down) {
                    switch (event.key) {
                        case 'ArrowLeft':
                        case 'a':
                        case 'A': {
                            this.gameStore.input.actions.characterMovement |= EMovement.left;
                            break;
                        }
                        case 'ArrowRight':
                        case 'd':
                        case 'D': {
                            this.gameStore.input.actions.characterMovement |= EMovement.right;
                            break;
                        }
                        case 'ArrowUp':
                        case 'w':
                        case 'W': {
                            this.gameStore.input.actions.characterMovement |= EMovement.up;
                            this.gameStore.input.actions.menuMovement = EMovement.up;
                            
                            break;
                        }
                        case 'ArrowDown':
                        case 's':
                        case 'S': {
                            this.gameStore.input.actions.characterMovement |= EMovement.down;
                            this.gameStore.input.actions.menuMovement = EMovement.down;
                            
                            break;
                        }
                        case 'Enter': {
                            this.gameStore.input.actions.menuConfirm = true;
                            break;
                        }
                        case 'Escape': {
                            this.gameStore.input.actions.togglePause = true;
                            break;
                        }
                    }
                } else {
                    switch (event.key) {
                        case 'ArrowLeft':
                        case 'a':
                        case 'A': {
                            this.gameStore.input.actions.characterMovement &= ~EMovement.left;
                            break;
                        }
                        case 'ArrowRight':
                        case 'd':
                        case 'D': {
                            this.gameStore.input.actions.characterMovement &= ~EMovement.right;
                            break;
                        }
                        case 'ArrowUp':
                        case 'w':
                        case 'W': {
                            this.gameStore.input.actions.characterMovement &= ~EMovement.up;
                            this.gameStore.input.actions.menuMovement = EMovement.idle;
                            
                            break;
                        }
                        case 'ArrowDown':
                        case 's':
                        case 'S': {
                            this.gameStore.input.actions.characterMovement &= ~EMovement.down;
                            this.gameStore.input.actions.menuMovement = EMovement.idle;
                            
                            break;
                        }
                    }
                }
            }
        }

        // Clear event queue
        this.inputEvents.length = 0;
    }
}
