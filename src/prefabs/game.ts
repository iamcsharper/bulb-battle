import { CTagMarker } from "sim-ecs";
import { Collision } from "../engine/components/collision";
import { Material } from "../engine/components/material";
import { PhysicsBridge } from "../engine/components/physics-bridge";
import { Position } from "../engine/components/position";
import { Rotation } from "../engine/components/rotation";
import { Shape, ShapePivot, ShapePrimitive } from "../engine/components/shape";
import { Velocity } from "../engine/components/velocity";
import { Vector2D } from "../engine/models/vector2d";
import { ETags } from "../models/tags";

// This could also be pure JSON, but in order to use TS types and have static checks it is recommended to write it as TS array.
export const gamePrefab = [
    {
        PhysicsBridge: <PhysicsBridge>{},
        Collision: <Collision>{},
        Position: <Position>{
            x: 0,
            y: 0,
        },
        Rotation: <Rotation>{
            value: 0
        },
        Velocity: <Velocity>{
            x: 0,
            y: 0, 
        },
        Material: <Material>{
            color: '#fdff03'
        },
        Shape: <Shape>{
            dimensions: <Vector2D>{
                x: 2,
                y: 0.7,
            },
            pivot: ShapePivot.TopLeft,
            primitive: ShapePrimitive.Rect,
        },
    },
    {
        Collision: <Collision>{},
        Position: <Position>{
            x: 1,
            y: 3,
        },
        Rotation: <Rotation>{
            value: 0
        },
        Velocity: <Velocity>{
            x: 2,
            y: 0, 
        },
        Material: <Material>{
            color: '#fdff03'
        },
        Shape: <Shape>{
            zIndex: 10,
            pivot: ShapePivot.TopLeft,
            dimensions: <Vector2D>{
                x: 0.7,
            },
            primitive: ShapePrimitive.Circle,
        },
    },
    {
        Collision: <Collision>{},
        Position: <Position>{
            x: 18,
            y: 0,
        },
        Rotation: <Rotation>{
            value: 7 * Math.PI / 4
        },
        Velocity: <Velocity>{
            x: 0,
            y: 0, 
        },
        Material: <Material>{
            color: '#0bb'
        },
    },
];
