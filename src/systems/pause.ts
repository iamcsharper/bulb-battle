import {ISystemActions, Query, Read, System} from "sim-ecs";
import {GameStore} from "../models/game-store";
import {GameState} from "../states/game";
import {PauseState} from "../states/pause";


export class PauseSystem extends System {
    actions!: ISystemActions
    gameStore!: GameStore;

    setup(actions: ISystemActions) {
        this.actions = actions;
        this.gameStore = actions.getResource(GameStore);

        // if only we could create an inline function...
        window.addEventListener('blur', () => {
            const isGameState = this.gameStore.currentState?.constructor == GameState;
            const isPauseState = this.gameStore.currentState?.constructor == PauseState;
        
            if (!isGameState && !isPauseState)
                return;

            if (!isPauseState) {
                this.actions.commands.pushState(PauseState);
                this.gameStore.wasBlurred = true;
            }
        });

        window.addEventListener('focus', () => {
            if (
                this.gameStore.wasBlurred &&
                !this.gameStore.wasIntentionallyPaused
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

        if (this.gameStore.input.actions.togglePause) {
            if (isGameState) {
                this.gameStore.wasIntentionallyPaused = true;
                this.actions.commands.pushState(PauseState);
            } else {
                this.gameStore.wasIntentionallyPaused = false;
                this.actions.commands.popState();
            }
        }
    }
}
