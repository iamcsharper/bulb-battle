
import {ISystemActions, Query, Read, System, With, WithTag} from "sim-ecs";
import {UIItem} from "../components/ui-item";
import { Position } from "../components/position";
import { GameStore } from "../models/game-store";
import { ETags } from "../models/tags";

export class RenderUISystem extends System {
    readonly query = new Query({
        _tag: WithTag(ETags.ui),
        pos: Read(Position),
        ui: Read(UIItem)
    });

    ctx!: CanvasRenderingContext2D;
    toScreenCoords!: (x: number, y: number) => [number, number];

    setup(actions: ISystemActions): void | Promise<void> {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
    }

    runs = 0;

    run(actions: ISystemActions) {
        this.ctx.textBaseline = 'top';

        const gameStore = actions.getResource(GameStore);

        this.query.execute(({pos, ui}) => {
            this.ctx.fillStyle = ui.active
                ? ui.activeColor ?? 'red'
                : ui.color;
            this.ctx.font = ui.active
                ? `${ui.fontSize * 1.2}px serif`
                : `${ui.fontSize}px serif`;
            this.ctx.fillText(ui.finalCaption, pos.x, pos.y);
        });

        this.ctx.fillText(
            `${
                Math.floor(10*gameStore.timeSinceLevelLoaded)/10.0
            } s.`,
            this.ctx.canvas.width - 200, 20
        );

        this.ctx.fillText(
            `${
                Math.floor(gameStore.medianFps+0.5)
            } FPS`,
            this.ctx.canvas.width - 200, 60
        );

        this.ctx.fillText(
            `${gameStore.rendered} / ${gameStore.drawables}`,
            this.ctx.canvas.width - 200, 100
        );

        let str = gameStore.input.actions.characterMovement.toString(2);
        str = '0'.repeat(4 - str.length) + str;
        this.ctx.fillText(
            `${str}`,
            this.ctx.canvas.width - 200, 140
        )
    }
}
