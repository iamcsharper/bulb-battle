import { ECS, IWorld } from "sim-ecs";
import { Character } from "../components/character";
import { Collision } from "../components/collision";
import { Material } from "../components/material";
import { Mesh } from "../components/mesh";
import { PhysicsBridge } from "../components/physics-bridge";
import { Position } from "../components/position";
import { Rotation } from "../components/rotation";
import { Shape } from "../components/shape";
import { UIItem } from "../components/ui-item";
import { Velocity } from "../components/velocity";
import { Camera } from "../models/camera";
import { GameStore } from "../models/game-store";
import { _Box2D } from "../server";
import { CameraSystem } from "../systems/camera";
import { CharacterSystem } from "../systems/character";
import { CollisionSystem } from "../systems/collision";
import { InputSystem } from "../systems/input";
import { MenuSystem } from "../systems/menu";
import { PauseSystem } from "../systems/pause";
import { PhysicsSystem } from "../systems/physics";
import { RenderGameSystem } from "../systems/render-game";
import { RenderUISystem } from "../systems/render-ui";
import { Level } from "./level.h";

export class Topdown extends Level {
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
        gameStore.physicsNamespace = physics;
        gameStore.physicsZero = zero;

        const camera = new Camera();

        this.world.addResource(gameStore);
        this.world.addResource(camera);
    }

    destroy() {
        super.destroy();

        const {
            physicsNamespace,
            physicsZero
        } = this.world.getResource(GameStore);
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
            .withSystem(InputSystem)
            .withSystem(MenuSystem, [
                InputSystem
            ])
            .withSystem(PauseSystem, [
                InputSystem
            ])
            .withSystem(RenderGameSystem, [
                PhysicsSystem,
                CharacterSystem,
                // NetworkSystem,
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