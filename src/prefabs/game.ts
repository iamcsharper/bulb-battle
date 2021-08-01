import {Shape, ShapePivot, ShapePrimitive} from "../components/shape";
import {Collision} from "../components/collision";
import { Material } from "../components/material";
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { Vector2D } from "../models/vector2d";
import { Mesh } from "../components/mesh";
import { Rotation } from "../components/rotation";
import { CTagMarker } from "sim-ecs";
import { ETags } from "../models/tags";

// This could also be pure JSON, but in order to use TS types and have static checks it is recommended to write it as TS array.
export const gamePrefab = [
    {
        Collision: <Collision>{},
        Position: <Position>{
            x: 0,
            y: 0,
        },
        Rotation: <Rotation>{
            value: 0
        },
        Velocity: <Velocity>{
            x: 1.5,
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
        Shape: <Shape>{
            pivot: ShapePivot.Middle,
            mesh: <Mesh>{
                verticies: [
                    {
                        x: -3,
                        y: -1.25
                    },
                    {
                        x: 0.31,
                        y: -0.31,
                    },
                    {
                        x: 0,
                        y: 0.31
                    },
                    {
                        x: -1.6,
                        y: 3
                    }
                ]
            },
            primitive: ShapePrimitive.Mesh,
        },
    },
];
