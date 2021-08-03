import { IWorld, TStateProto } from "sim-ecs";
import { updateRenderContext, _Box2D } from "..";
import { beforeFrameHandler } from "../../app/frame-transition-handlers";

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

    readonly initialState?: TStateProto;

    constructor(
        public physics: _Box2D,
        public name: string,
    ) {
        const world = this.createWorld();

        if (!world) {
            throw new Error(`The level ${name} must have a non-null \
            resulting createWorld function`);
        }

        this.world = world;

        const renderContext = updateRenderContext();

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
            initialState: this.initialState,
        }).then(()=>this.destroy());
    }
}