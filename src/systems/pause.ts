import {ISystemActions, Query, Read, System} from "sim-ecs";
import { CommonStore } from "../engine/models/common-store";
import {GameStore} from "../models/game-store";
import {GameState} from "../states/game";
import {PauseState} from "../states/pause";


export class PauseSystem extends System {
    actions!: ISystemActions
    gameStore!: GameStore;
    commonStore!: CommonStore;

    setup(actions: ISystemActions) {
        this.actions = actions;
        this.gameStore = actions.getResource(GameStore);
        this.commonStore = actions.getResource(CommonStore);

        // if only we could create an inline function...
        window.addEventListener('blur', () => {
            const isGameState = this.gameStore.currentState?.constructor == GameState;
            const isPauseState = this.gameStore.currentState?.constructor == PauseState;
        
            if (!isGameState && !isPauseState)
                return;

            if (!isPauseState) {
                this.actions.commands.pushState(PauseState);
                this.commonStore.wasBlurred = true;
            }
        });

        window.addEventListener('focus', () => {
            if (
                this.commonStore.wasBlurred &&
                !this.commonStore.wasIntentionallyPaused
            ) {
                this.actions.commands.popState();
            }
        });
    }

    run(actions: ISystemActions) {
        const isGameState = this.gameStore.currentState?.constructor == GameState;
        const isPauseState = this.gameStore.currentState?.constructor == PauseState;

        if (!isGameState && !isPauseState) {
            return;
        }

        if (this.gameStore.actions.togglePause) {
            if (isGameState) {
                this.commonStore.wasIntentionallyPaused = true;
                this.actions.commands.pushState(PauseState);
            } else {
                this.commonStore.wasIntentionallyPaused = false;
                this.actions.commands.popState();
            }
        }
    }
}
