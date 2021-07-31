import {Shape, ShapePrimitive} from "../components/shape";
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
            x: 60,
            y: 60,
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
                x: 10,
                y: 10,
            },
            primitive: ShapePrimitive.Rect,
        },
        Rotation: <Rotation>{
            value: Math.PI * 3 / 4
        }
    },
    {
        Collision: <Collision>{},
        Position: <Position>{
            x: 30,
            y: 100,
        },
        Velocity: <Velocity>{
            x: 10,
            y: 0, 
        },
        Material: <Material>{
            color: '#fdff03'
        },
        Shape: <Shape>{
            zIndex: 10,
            dimensions: <Vector2D>{
                x: 20,
            },
            primitive: ShapePrimitive.Circle,
        },
    },
    {
        Collision: <Collision>{},
        Position: <Position>{
            x: 100,
            y: 50,
        },
        Velocity: <Velocity>{
            x: 0,
            y: 0, 
        },
        Material: <Material>{
            color: '#fdff03'
        },
        Shape: <Shape>{
            mesh: <Mesh>{
                verticies: [
                    {
                        x: -10,
                        y: -10
                    },
                    {
                        x: 10,
                        y: -10,
                    },
                    {
                        x: 0,
                        y: 10
                    },
                    {
                        x: -5,
                        y: 100
                    }
                ]
            },
            primitive: ShapePrimitive.Mesh,
        },
    },
];
