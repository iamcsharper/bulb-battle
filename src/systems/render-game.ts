import {ISystemActions, Query, Read, System, Write} from "sim-ecs";
import { Material } from "../engine/components/material";
import { Position } from "../engine/components/position";
import { Rotation } from "../engine/components/rotation";
import { Shape, ShapePrimitive, ShapePivotNames } from "../engine/components/shape";
import { Camera } from "../engine/models/camera";
import { CommonStore } from "../engine/models/common-store";
import { IRect, Rect } from "../engine/models/rect";
import { PIXELS_PER_METER, TWOPI, drawPoint } from "../engine/util";
import { GameStore } from "../models/game-store";

export class RenderGameSystem extends System {
    readonly query = new Query({
        pos: Read(Position),
        rot: Write(Rotation),
        shape: Read(Shape),
        material: Read(Material),
    });

    ctx!: CanvasRenderingContext2D;
    gameStore!: GameStore;
    commonStore!: CommonStore;
    camera!: Camera;

    // TODO: remove
    controls!: HTMLElement;

    setup(actions: ISystemActions): void | Promise<void> {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(GameStore);
        this.commonStore = actions.getResource(CommonStore);
        this.camera = actions.getResource(Camera);

        this.controls = document.querySelector('#controls')!;
    }

    runs = 0;

    run(actions: ISystemActions) {
        const viewport: IRect = {
            x: this.camera.x + this.camera.offset.x,
            y: this.camera.y + this.camera.offset.y,
            w: this.ctx.canvas.width / (this.camera.zoom*PIXELS_PER_METER),
            h: this.ctx.canvas.height / (this.camera.zoom*PIXELS_PER_METER),
        };

        this.camera.viewport = viewport;

        this.ctx.save();
        this.ctx.scale(
            PIXELS_PER_METER*this.camera.zoom,
            PIXELS_PER_METER*this.camera.zoom
        );

        this.ctx.translate(
            -viewport.x,
            -viewport.y
        );

        this.ctx.translate(
            this.camera.x,
            this.camera.y
        );
        this.ctx.rotate(this.camera.rotation);
        this.ctx.translate(
            -this.camera.x,
            -this.camera.y
        );

        this.commonStore.worldToScreen = this.ctx.getTransform();
        this.commonStore.screenToWorld = this.ctx.getTransform().inverse();

        //mx,my - cursor coords in Screen space
        const {
            x:mx, y:my
        } = this.commonStore.input.cursorPos;

        // transform matrix significat values
        

        // cursor coords in world space
        

        const rows = 10;
        const cols = 18;

        const perCol = this.ctx.canvas.width/(cols*PIXELS_PER_METER);
        const perRow = this.ctx.canvas.height/(rows*PIXELS_PER_METER);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * perCol;
                const y = i * perRow;
                this.ctx.lineWidth = 2/32;
                this.ctx.strokeStyle = '#dadada';
                this.ctx.strokeRect(
                    x,y, perCol, perRow
                );
            }
        }

        const iter = Array.from(this.query.iter());

        this.commonStore.drawables = iter.length;

        const drawables = iter.filter(
            ({pos, shape}) => {
            const bbox = shape.getBBox();
            const r: IRect = {
                x: pos.x + bbox.x,
                y: pos.y + bbox.y,
                w: bbox.w,
                h: bbox.h,
            };

            const inView = Rect.checkIntersects(r, viewport);

            return inView;
        })
        .sort(({shape: a}, {shape: b}) => {
            return a.zIndex - b.zIndex;
        });

        this.commonStore.rendered = drawables.length;

        for (let i = 0; i < drawables.length; i++) {
            const {pos, shape, rot, material} = drawables[i];
            
            this.drawShape(pos, shape, material, rot as Rotation);
        }

        this.ctx.restore();
    }

    drawShape(pos: Position, shape: Shape, material: Material, rot: Rotation) {
        const {
            x: w, y: h
        } = shape.dimensions;

        const {
            x: bx, y: by,
            w: bw, h: bh,
        } = shape.getBBox();

        const {
            x, y
        } = pos;

        // TODO: one system that checks all raycasts
        // Rect.checkPointInside(r, mouse);

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rot.value);

        // TODO: material options
        this.ctx.fillStyle = material.color;

        if (shape.primitive === ShapePrimitive.Rect) {
            this.ctx.fillRect(bx, by, w, h);
        } else if (shape.primitive === ShapePrimitive.Circle) {
            this.ctx.beginPath();
            this.ctx.arc(bx+w/2, bx+w/2, w/2, 0, TWOPI);
            this.ctx.fill();
        } else if (shape.primitive === ShapePrimitive.Mesh
            && shape.mesh) {
            this.ctx.beginPath();

            const {offsetX, offsetY} = shape;
            
            for (
                let i = 0;
                i < shape.mesh.verticies.length;
                ++i
            ) {
                const {x:dx, y:dy} = shape.mesh.verticies[i];
                this.ctx.lineTo(dx+offsetX, dy+offsetY);
            }

            this.ctx.closePath();
            this.ctx.fill();
        }

        if (this.commonStore.debugShapes) {
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '0.1rem Arial';
            this.ctx.fillText(`Z=${
                shape.zIndex
            },x=${Math.floor(x)},y=${Math.floor(y)}`, 0, -by-2);
            this.ctx.fillText(`Pivot=${ShapePivotNames[shape.pivot]}`, 0, -by-3);

            this.ctx.strokeStyle = '#f0f';
            const padding = 0;
            this.ctx.lineWidth = 0.1;
            this.ctx.strokeRect(
                bx - padding,
                by - padding,
                bw + padding*2,
                bh + padding*2
            );
            this.ctx.restore();

            drawPoint(this.ctx, 0, 0);
        }
        
        this.ctx.restore();
    }
}
