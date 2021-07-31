import {ITransitionActions, Query, SerialFormat, State, TGroupHandle, With, WithTag} from "sim-ecs";
import {InputSystem} from "../systems/input";
import {PauseSystem} from "../systems/pause";
import {gamePrefab} from "../prefabs/game";
import {Position} from "../components/position";
import {GameStore} from "../models/game-store";
import {Velocity} from "../components/velocity";
import {load} from "../app/persistence";
import {RenderUISystem} from "../systems/render-ui";
import {RenderGameSystem} from "../systems/render-game";
import {Shape} from "../components/shape";
import {PhysicsSystem} from "../systems/physics";
import {UIItem} from "../components/ui-item";
import {CollisionSystem} from "../systems/collision";
import { CharacterSystem } from "../systems/character";
import {savablePrefab} from "../prefabs/savable";
import { ETags } from "../models/tags";

export class GameState extends State {
    _systems = [
        CollisionSystem,
        InputSystem,
        CharacterSystem,
        PauseSystem,
        PhysicsSystem,
        RenderGameSystem,
        RenderUISystem,
    ];
    saveDataPrefabHandle?: TGroupHandle;
    staticDataPrefabHandle?: TGroupHandle;

    activate(actions: ITransitionActions) {
        actions.getResource(GameStore).currentState = this;
    }

    async create(actions: ITransitionActions) {
        const gameStore = actions.getResource(GameStore);

        this.staticDataPrefabHandle = createNewGame(actions);

        if (gameStore.continue) {
            this.saveDataPrefabHandle = load(actions);
        } else {
            this.saveDataPrefabHandle = createGameFromSaveData(actions);
        }

        await actions.flushCommands();

        for (const entity of actions.getEntities(new Query([
            With(Shape)
        ]))) {
            entity.getComponent(Shape)?.build();
        }

        // actions.commands.queueCommand(() => setScoreCaptionMod(actions));
        actions.commands.maintain();
    }

    destroy(actions: ITransitionActions) {
        if (this.staticDataPrefabHandle) {
            actions.commands.unloadPrefab(this.staticDataPrefabHandle);
        }

        if (this.saveDataPrefabHandle) {
            actions.commands.unloadPrefab(this.saveDataPrefabHandle);
        }

        actions.commands.maintain();
    }
}

const createNewGame = function (actions: ITransitionActions) {
    return actions.commands.load(
        SerialFormat.fromArray(gamePrefab));
};

const createGameFromSaveData = function (actions: ITransitionActions) {
    return actions.commands.load(
        SerialFormat.fromArray(savablePrefab));
};

// const setScoreCaptionMod = function (actions: ITransitionActions) {
//     const score = actions.getResource(ScoreBoard);

//     for (const entity of actions.getEntities(new Query([With(Paddle), With(UIItem)]))) {
//         const ui = entity.getComponent(UIItem)!;
//         const paddle = entity.getComponent(Paddle)!;

//         if (paddle.side == EPaddleSide.Left) {
//             ui.captionMod = strIn => strIn.replace('{}', score.left.toString());
//         } else {
//             ui.captionMod = strIn => strIn.replace('{}', score.right.toString());
//         }
//     }
// };
