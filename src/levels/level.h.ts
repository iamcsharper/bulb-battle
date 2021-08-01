import { IWorld } from "sim-ecs";
import { prepareRenderContext } from "..";
import { beforeFrameHandler } from "../app/frame-transition-handlers";
import { _Box2D } from "../server";
import { MenuState } from "../states/menu";

export interface ILevel {
    name: string;

    // TODO: load from filesystem, from URL
    // path: string; 

    world: IWorld;

    /**
     * Called right after the initialization, main loop goes here
     */
    run(): Promise<any>;

    /**
     * Release the resources to run another level
     */
    destroy(): void;
}

export abstract class Level implements ILevel {

    public world: IWorld;

    constructor(
        public physics: _Box2D,
        public name: string,
    ) {
        console.log('Level loaded', name);
        const world = this.createWorld();

        if (!world) {
            throw new Error('A level must have a non-null \
            resuling createWorld function');
        }

        this.world = world;

        const renderContext = prepareRenderContext();

        this.world.addResource(renderContext);
    }

    abstract createWorld(): IWorld;
    
    /**
     * Override this method if you have to release more resources
     * (audio, video, WebRTC, textures, files, etc.)
     */
    destroy(): void {
        this.world.commands.stopRun();
    }

    async run() {
        return this.world.run({
            beforeStepHandler: beforeFrameHandler,
            initialState: MenuState,
        }).then(()=>this.destroy());
    }
}