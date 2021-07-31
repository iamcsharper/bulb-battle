import {ISystemActions, Query, Read, System, Write} from "sim-ecs";
import { Position } from "../components/position";
import {Velocity} from "../components/velocity";
import { GameStore } from "../models/game-store";


export class PhysicsSystem extends System {
    readonly query = new Query({
        pos: Write(Position),
        vel: Read(Velocity),
    });

    run(_: ISystemActions) {
        const dt = 0.016;

        this.query.execute(({pos, vel}) => {
            pos.x += vel.x * dt;
            pos.y += vel.y * dt;
        });
    }
}
