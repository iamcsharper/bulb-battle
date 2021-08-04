import { ECS, IWorld } from "sim-ecs";
import { Character } from "../components/character";
import { UIItem } from "../components/ui-item";
import { Collision } from "../engine/components/collision";
import { Material } from "../engine/components/material";
import { Mesh } from "../engine/components/mesh";
import { PhysicsBridge } from "../engine/components/physics-bridge";
import { Position } from "../engine/components/position";
import { Rotation } from "../engine/components/rotation";
import { Shape } from "../engine/components/shape";
import { Velocity } from "../engine/components/velocity";
import { Level } from "../engine/level.h";
import { Camera } from "../engine/models/camera";
import { CommonStore } from "../engine/models/common-store";
import { _Box2D } from "../engine/server";
import { CameraSystem } from "../engine/systems/camera";
import { CollisionSystem } from "../engine/systems/collision";
import { GcSystem } from "../engine/systems/gc";
import { InputSystem } from "../engine/systems/input";
import { PhysicsSystem } from "../engine/systems/physics";
import { GameStore } from "../models/game-store";
import { MenuState } from "../states/menu";
import { ActionsSystem } from "../systems/actions";
import { CharacterSystem } from "../systems/character";
import { MenuSystem } from "../systems/menu";
import { PauseSystem } from "../systems/pause";
import { RenderGameSystem } from "../systems/render-game";
import { RenderUISystem } from "../systems/render-ui";

export class Topdown extends Level {
    readonly initialState = MenuState;

    constructor(physics: _Box2D) {
        super(physics, 'topdown');

        const {
            b2Vec2,
            b2World
        } = physics;

        const gravity = new b2Vec2(0, 9.81);
        const physWorld = new b2World(gravity);
        this.world.addResource(physWorld);

        const zero = new b2Vec2(0, 0);

        const gameStore = new GameStore();
        const camera = new Camera();

        const commonStore = new CommonStore();
        commonStore.physicsNamespace = physics;
        commonStore.physicsZero = zero;

        this.world.addResource(commonStore);
        this.world.addResource(gameStore);
        this.world.addResource(camera);
    }

    destroy() {
        super.destroy();

        const {
            physicsNamespace,
            physicsZero
        } = this.world.getResource(CommonStore);
        const physicsWorld = this.world.getResource(physicsNamespace.b2World);

        physicsNamespace.destroy(physicsWorld);
        physicsNamespace.destroy(physicsZero);

        const ctx = this.world.getResource(CanvasRenderingContext2D);
        ctx.fillStyle = '#ececec';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    createWorld(): IWorld {
        return new ECS()
            .buildWorld()
            .withSystem(CameraSystem, [
                CharacterSystem
            ])
            .withSystem(PhysicsSystem, [
                CharacterSystem
                // NetworkSystem
            ])
            .withSystem(CharacterSystem, [
                CollisionSystem
            ])
            .withSystem(CollisionSystem, [
                // NetworkSystem
            ])
            .withSystem(ActionsSystem, [
                PauseSystem
            ])
            .withSystem(InputSystem)
            .withSystem(MenuSystem, [
                InputSystem,
            ])
            .withSystem(PauseSystem, [
                InputSystem
            ])
            .withSystem(RenderGameSystem, [
                PhysicsSystem,
                CharacterSystem,
                // NetworkSystem,
            ])
            .withSystem(GcSystem, [
                RenderGameSystem,
            ])
            .withSystem(RenderUISystem, [
                PhysicsSystem,
                MenuSystem,
                PauseSystem
            ])
            .withComponents(
                Collision,
                Material,
                Mesh,
                Position,
                Rotation,
                Shape,
                UIItem,
                Velocity,
                Character,
                PhysicsBridge,
            )
            .build();
    }
}