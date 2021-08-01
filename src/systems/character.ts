import {CTagMarker, ISystemActions, Query, Read, ReadEntity, System, With, WithTag, Write} from "sim-ecs";
import {Shape} from "../components/shape";
import {Collision} from "../components/collision";
import { Vector2D } from "../models/vector2d";
import { ETags } from "../models/tags";
import { Velocity } from "../components/velocity";
import { EMovement, GameStore } from "../models/game-store";
import { Character } from "../components/character";
import { Position } from "../components/position";
import { Camera, CameraFollowMethod } from "../models/camera";
import { lerp, PIXELS_PER_METER } from "../app/util";

export class CharacterSystem extends System {
    readonly query = new Query({
        _character: WithTag(ETags.character),
        pos: Read(Position),
        velocity: Write(Velocity),
    });

    gameStore!: GameStore;
    camera!: Camera;
    ctx!: CanvasRenderingContext2D;

    setup(actions: ISystemActions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(GameStore);
        this.camera = actions.getResource(Camera);

        this.camera.elasticity = 0.008;

        this.camera.follow = {
            method: CameraFollowMethod.Elastic,
            target: {
                x: this.camera.x,
                y: this.camera.y,
            },
            prevX: this.camera.x,
            prevY: this.camera.y,
        }
    }

    runs = 0

    run(actions: ISystemActions) {
        this.camera.zoom += this.gameStore.input.wheel / 10;

        this.query.execute(({pos, velocity}) => {
            this.camera.follow!.target = pos;

            const dt = this.gameStore.lastFrameDeltaTime;

            const {
                characterMovement: move
            } = this.gameStore.input.actions;

            const isLeft = (move & EMovement.left) === EMovement.left;
            const isRight = (move & EMovement.right) === EMovement.right;
            
            velocity.x = 0;

            if (isLeft && !isRight) {
                velocity.x = -1;
            }
            if (isRight && !isLeft) {
                velocity.x = 1;
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
            velocity.scale(dt * 1000 * 10/PIXELS_PER_METER);
            
            // console.log(velocity);
        });
    }
}
