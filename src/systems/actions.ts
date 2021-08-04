import { ISystemActions, System } from "sim-ecs";
import * as KeyCode from 'keycode-js';

import { EMovement } from "../engine/models/movement";
import { EKeyState } from "../engine/systems/input";
import { GameStore } from "../models/game-store";
import { CommonStore } from "../engine/models/common-store";

export class ActionsSystem extends System {
    gameStore!: GameStore;
    commonStore!: CommonStore;

    readonly listeners = {
        blur: () => {
            this.gameStore.actions.characterMovement = EMovement.idle;
            this.gameStore.actions.menuMovement = EMovement.idle;
            this.gameStore.actions.togglePause = false;

            this.commonStore.input.keyStates.clear();
        },
        focus: () => this.listeners.blur(),
    }

    setup(actions: ISystemActions) {
        this.commonStore = actions.getResource(CommonStore);
        this.gameStore = actions.getResource(GameStore);

        for (const [event, handler] of Object.entries(this.listeners)) {
            window.addEventListener(
                event,
                handler as EventListenerOrEventListenerObject
            );
        }
    }

    updateAction(
        triggers: string[],
        pos: EMovement,
        neg: EMovement,
        menu?: EMovement
    ) {
        if (menu) {
            if (this.commonStore.input.isAnyKeyDifferent(triggers, EKeyState.Down)) {
                this.gameStore.actions.menuMovement = menu;
            }
        }

        if (this.commonStore.input.isAnyKey(triggers, EKeyState.Down)) {
            this.gameStore.actions.characterMovement |= pos;
            this.gameStore.actions.characterMovement &= ~neg;
        } else if (this.commonStore.input.isAnyKeyDifferent(
            triggers, EKeyState.Up)) {
            this.gameStore.actions.characterMovement &= ~pos;        
        }
    }

    run(actions: ISystemActions) {
        { // Reset input actions
            this.gameStore.actions.menuConfirm = false;
            this.gameStore.actions.menuMovement = EMovement.idle;
            this.gameStore.actions.togglePause = false;
        }

        const {
            input
        } = this.commonStore;

        if (input.wasKeyPressed(KeyCode.CODE_ENTER)) {
            this.gameStore.actions.menuConfirm = true;
        }

        if (input.wasKeyPressed(KeyCode.CODE_ESCAPE)) {
            console.log(input);
            this.gameStore.actions.togglePause = true;
        }

        this.updateAction(
            [
                KeyCode.CODE_W,
                KeyCode.CODE_UP
            ],
            EMovement.up,
            EMovement.down,
            EMovement.up
        );

        this.updateAction(
            [
                KeyCode.CODE_A,
                KeyCode.CODE_LEFT
            ],
            EMovement.left,
            EMovement.right
        );

        this.updateAction(
            [
                KeyCode.CODE_S,
                KeyCode.CODE_DOWN
            ],
            EMovement.down,
            EMovement.up,
            EMovement.down
        );

        this.updateAction(
            [
                KeyCode.CODE_D,
                KeyCode.CODE_RIGHT
            ],
            EMovement.right,
            EMovement.left
        );
    }
}