import { _Box2D } from "../server";
import {ISystemActions, ReadEntity, Query, Read, System, Write} from "sim-ecs";
import { Position } from "../components/position";
import { Rotation } from "../components/rotation";
import {Velocity} from "../components/velocity";
import { GameStore } from "../models/game-store";
import { PhysicsBridge } from "../components/physics-bridge";
import { Camera, CameraFollowMethod } from "../models/camera";
import { lerp, PIXELS_PER_METER } from "../app/util";

export class CameraSystem extends System {
    camera!: Camera;
    ctx!: CanvasRenderingContext2D;

    setup(actions: ISystemActions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.camera = actions.getResource(Camera);
    }

    run(_: ISystemActions) {
        if (this.camera.rotation > 2*Math.PI) {
            this.camera.rotation -= 2*Math.PI;
        }
        if (this.camera.rotation < -2*Math.PI) {
            this.camera.rotation += 2*Math.PI;
        }

        if (this.camera.zoom < 0.1) {
            this.camera.zoom = 0.1;
        }

        if (this.camera.zoom > 1.5) {
            this.camera.zoom = 1.5;
        }

        const {
            follow,
            offset,
        } = this.camera;

        if (!follow) return;

        const {
            target,
            method,
        } = follow;

        let tx = target.x;
        let ty = target.y;

        offset.x = -this.ctx.canvas.width / (2*this.camera.zoom*PIXELS_PER_METER);;
        offset.y = -this.ctx.canvas.height / (2*this.camera.zoom*PIXELS_PER_METER);

        if (method === CameraFollowMethod.Immediate) {
            this.camera.x = tx;
            this.camera.y = ty;
        } else if (method === CameraFollowMethod.Smooth) {
            this.camera.x = lerp(this.camera.x, tx, 0.01);
            this.camera.y = lerp(this.camera.y, ty, 0.01);
        } else if (method === CameraFollowMethod.Elastic) {
            const dx = (tx - this.camera.x) * this.camera.elasticity;
            const dy = (ty - this.camera.y) * this.camera.elasticity;

            this.camera.vel.x += dx;
            this.camera.vel.y += dy;

            const fx = -this.camera.friction * this.camera.vel.x;
            const fy = -this.camera.friction * this.camera.vel.y;

            this.camera.vel.x += fx;
            this.camera.vel.y += fy;

            this.camera.x += this.camera.vel.x / this.camera.zoom;
            this.camera.y += this.camera.vel.y / this.camera.zoom;
        }
    }
}
