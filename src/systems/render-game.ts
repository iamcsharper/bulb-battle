import {ISystemActions, Query, Read, System} from "sim-ecs";
import {Shape, ShapePrimitive} from "../components/shape";
import { Position } from "../components/position";
import { Material } from "../components/material";
import { GameStore } from "../models/game-store";
import { IRect, Rect } from "../models/rect";

const TWOPI = Math.PI * 2;

export class RenderGameSystem extends System {
    readonly query = new Query({
        pos: Read(Position),
        shape: Read(Shape),
        material: Read(Material),
    });

    ctx!: CanvasRenderingContext2D;
    gameStore!: GameStore;

    setup(actions: ISystemActions): void | Promise<void> {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(GameStore);
    }

    runs = 0;

    run(actions: ISystemActions) {
        const viewport: IRect = {
            x: 0,
            y: 0,
            w: this.ctx.canvas.width,
            h: this.ctx.canvas.height,
        };

        const iter = Array.from(this.query.iter());

        this.gameStore.drawables = iter.length;

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

        this.gameStore.rendered = drawables.length;

        for (let i = 0; i < drawables.length; i++) {
            const {pos, shape, material} = drawables[i];
            
            this.drawShape(pos, shape, material);
        }
    }

    drawShape(pos: Position, shape: Shape, material: Material) {
        const {
            x: w, y: h
        } = shape.dimensions;

        const {
            x, y
        } = pos;

        if (this.gameStore.debugShapes) {
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '1rem Arial';
            const txt = `Z=${shape.zIndex}`;
            this.ctx.fillText(txt, x, y-30);

            this.ctx.strokeStyle = '#f0f';
            const {
                x:bx,y:by,w:bw,h:bh
            } = shape.getBBox();
            const padding = 5;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(
                x + bx - padding,
                y + by - padding,
                bw + padding*2,
                bh + padding*2
            );
            this.ctx.restore();
        }

        // TODO: material options
        this.ctx.fillStyle = material.color;

        if (shape.primitive === ShapePrimitive.Rect) {
            this.ctx.fillRect(x, y, w, h);
        } else if (shape.primitive === ShapePrimitive.Circle) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, w/2, 0, TWOPI);
            this.ctx.fill();
        } else if (shape.primitive === ShapePrimitive.Mesh
            && shape.mesh) {
            this.ctx.beginPath();

            for (
                let i = 0;
                i < shape.mesh.verticies.length;
                ++i
            ) {
                const {x:dx, y:dy} = shape.mesh.verticies[i];
                this.ctx.lineTo(x+dx, y+dy);
            }

            this.ctx.closePath();

            this.ctx.fill();
        }
    }
}
