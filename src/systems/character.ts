import {CTagMarker, ISystemActions, Query, Read, ReadEntity, System, With, WithTag, Write} from "sim-ecs";
import {Shape} from "../components/shape";
import {Collision} from "../components/collision";
import { Vector2D } from "../models/vector2d";
import { ETags } from "../models/tags";
import { Velocity } from "../components/velocity";
import { EMovement, GameStore } from "../models/game-store";
import { Character } from "../components/character";

export class CharacterSystem extends System {
    readonly query = new Query({
        _character: WithTag(ETags.character),
        velocity: Write(Velocity),
    });

    gameStore!: GameStore;

    setup(actions: ISystemActions) {
        this.gameStore = actions.getResource(GameStore);
    }

    run(actions: ISystemActions) {
        this.query.execute(({velocity}) => {
            const dt = this.gameStore.lastFrameDeltaTime;

            const {
                characterMovement: move
            } = this.gameStore.input.actions;

            if ((move & EMovement.left) === EMovement.left) {
                velocity.x = -1;
            }
            else if ((move & EMovement.right) === EMovement.right) {
                velocity.x = 1;
            } else {
                velocity.x = 0;
            }

            if ((move & EMovement.up) === EMovement.up) {
                velocity.y = -1;
            }
            else if ((move & EMovement.down) === EMovement.down) {
                velocity.y = 1;
            } else {
                velocity.y = 0;
            }

            velocity.normalize();
            velocity.scale(dt * 10000);
            
            // console.log(velocity);
        });
    }
}
