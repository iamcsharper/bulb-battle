import {ISystemActions, System} from "sim-ecs";
import { Camera, CameraFollowMethod } from "../models/camera";
import { angleLerp, lerp, PIXELS_PER_METER } from "../util";

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
            targetAngle,
            target,
            method,
        } = follow;

        let tx = target.x;
        let ty = target.y;

        offset.x = -this.ctx.canvas.width / (2*PIXELS_PER_METER * this.camera.zoom);
        offset.y = -this.ctx.canvas.height / (2*PIXELS_PER_METER * this.camera.zoom);

        if (targetAngle !== undefined) {
            this.camera.rotation = angleLerp(this.camera.rotation, -targetAngle, 0.01);
        }

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
