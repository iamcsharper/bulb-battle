import { _Box2D } from "../server";
import {ISystemActions, ReadEntity, Query, Read, System, Write} from "sim-ecs";
import { Position } from "../components/position";
import { Rotation } from "../components/rotation";
import {Velocity} from "../components/velocity";
import { GameStore } from "../models/game-store";
import { PhysicsBridge } from "../components/physics-bridge";


export class PhysicsSystem extends System {
    readonly query = new Query({
        entity: ReadEntity(),
        pos: Write(Position),
        rot: Write(Rotation),
        vel: Read(Velocity),
    });

    physWorld!: Box2D.b2World;

    setup(actions: ISystemActions) {
        const {
            physicsNamespace: {
                b2World
            }
        } = actions.getResource(GameStore);
        this.physWorld = actions.getResource(b2World);
    }

    run(actions: ISystemActions) {
        const dt = 0.016;

        const {
            physicsNamespace: {
                getPointer,
                NULL
            }
        } = actions.getResource(GameStore);

        // const hashBodies:Record<number, Box2D.b2Body> = {};
        // let ptr: number;

        // for (
        //     let body = this.physWorld.GetBodyList();
        //     (ptr = getPointer(body)) !== getPointer(NULL);
        //     body = body.GetNext()
        // ) {
        //     hashBodies[ptr] = body;
        // }

        this.query.execute(({entity, pos, rot, vel}) => {
            const phys = entity.getComponent(PhysicsBridge);
            if (phys) {
                const body = phys.bodyPtr;
                if (!body) return;
                const {x, y} = body.GetPosition();
                console.log(x, y);

                pos.x = x;
                pos.y = y;
            } else {
                pos.x += vel.x * dt;
                pos.y += vel.y * dt;
                rot.value += vel.angular * dt;
            }
        });

        this.physWorld.Step(dt, 1, 1);
    }
}
