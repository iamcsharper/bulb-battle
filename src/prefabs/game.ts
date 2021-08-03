import { CTagMarker } from "sim-ecs";
import { Collision, Material, PhysicsBridge, Position, Rotation, Shape, ShapePivot, ShapePrimitive, Vector2D, Velocity } from "../engine/";

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
