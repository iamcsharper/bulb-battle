import {ITransitionActions, SerialFormat, State, TGroupHandle} from "sim-ecs";
import {PauseSystem} from "../systems/pause";
import {pausePrefab} from "../prefabs/pause";
import {GameStore} from "../models/game-store";
import {save} from "../app/persistence";
import {RenderUISystem} from "../systems/render-ui";
import {RenderGameSystem} from "../systems/render-game";
import { InputSystem } from "../engine/systems/input";
import { ActionsSystem } from "../systems/actions";

export class PauseState extends State {
    _systems = [InputSystem, ActionsSystem, PauseSystem, RenderGameSystem, RenderUISystem];
    prefabHandle!: TGroupHandle;


    activate(actions: ITransitionActions) {
        const gameStore = actions.getResource(GameStore);
        save(actions);

        gameStore.currentState = this;
        this.prefabHandle = actions.commands.load(SerialFormat.fromArray(pausePrefab));
        actions.commands.maintain();
    }

    deactivate(actions: ITransitionActions) {
        actions.commands.unloadPrefab(this.prefabHandle);
        actions.commands.maintain();
    }
}
