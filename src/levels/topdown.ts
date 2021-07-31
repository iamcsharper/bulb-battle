import { ECS, IWorld } from "sim-ecs";
import { Character } from "../components/character";
import { Collision } from "../components/collision";
import { Material } from "../components/material";
import { Mesh } from "../components/mesh";
import { Position } from "../components/position";
import { Rotation } from "../components/rotation";
import { Shape } from "../components/shape";
import { UIItem } from "../components/ui-item";
import { Velocity } from "../components/velocity";
import { GameStore } from "../models/game-store";
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
    constructor() {
        super('topdown');

        const gameStore = new GameStore();
        
        this.world.addResource(gameStore);
    }

    destroy() {
        super.destroy();

        const ctx = this.world.getResource(CanvasRenderingContext2D);
        ctx.fillStyle = '#ececec';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    createWorld(): IWorld {
        return new ECS()
            .buildWorld()
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
            )
            .build();
    }
}