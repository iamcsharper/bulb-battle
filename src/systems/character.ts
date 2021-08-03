import { CODE_E, CODE_Q } from "keycode-js";
import {ISystemActions, Query, Read, ReadEntity, System, WithTag, Write} from "sim-ecs";
import { Position } from "../engine/components/position";
import { Rotation } from "../engine/components/rotation";
import { Velocity } from "../engine/components/velocity";
import { Camera, CameraFollowMethod } from "../engine/models/camera";
import { CommonStore } from "../engine/models/common-store";
import { EMovement } from "../engine/models/movement";
import { EKeyState } from "../engine/systems/input";
import { GameStore } from "../models/game-store";
import { ETags } from "../models/tags";

export class CharacterSystem extends System {
    readonly query = new Query({
        _character: WithTag(ETags.character),
        entity: ReadEntity(),
        pos: Read(Position),
        rotation: Write(Rotation),
        velocity: Write(Velocity),
    });

    gameStore!: GameStore;
    commonStore!: CommonStore;
    camera!: Camera;
    ctx!: CanvasRenderingContext2D;

    setup(actions: ISystemActions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.commonStore = actions.getResource(CommonStore);
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
        this.camera.zoom += this.commonStore.input.wheel / 10;

        this.query.execute(({rotation, pos, velocity}) => {
            // delete test passed.
            // if (this.camera.zoom < 0.8) {
            //     entity.addTag(ETags.destroyEntity);
            // }

            if (this.commonStore.input.isKeyDown(CODE_E)) {
                rotation.value += 0.01;
            }

            if (this.commonStore.input.isKeyDown(CODE_Q)) {
                rotation.value -= 0.01;
            }

            this.camera.follow!.target = pos;
            this.camera.follow!.targetAngle = rotation.value;

            const dt = this.commonStore.lastFrameDeltaTime;

            const {
                characterMovement: move
            } = this.gameStore.actions;

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

            const {
                x: vx, 
                y: vy
            } = velocity;

            const [sin, cos] = rotation.sin_cos;

            velocity.x = vx * cos - vy * sin;
            velocity.y = vx * sin + vy * cos;

            velocity.normalize();
            velocity.scale(dt * 60 * 2);
        });
    }
}
