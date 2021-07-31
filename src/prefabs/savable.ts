import {ETags} from "../models/tags";
import {Collision} from "../components/collision";
import {Shape, ShapePrimitive} from "../components/shape";
import {Velocity} from "../components/velocity";
import {CTagMarker} from 'sim-ecs';
import { Position } from "../components/position";
import { Material } from "../components/material";
import { Character } from "../components/character";

export const savablePrefab = [
    { // Character
        [CTagMarker]: [
            ETags.character,
            // ETags.save
        ],
        Character: <Character>{
            name: 'XuPoH'
        },
        Velocity: <Velocity>{
            x: 0,
            y: 0,
        },
        Collision: <Collision>{},
        Position: <Position>{
            x: 250,
            y: 50,
        },
        Shape: <Shape>{
            zIndex: 11,
            dimensions: {
                x: 30,
            },
            primitive: ShapePrimitive.Circle
        },
        Material: <Material>{
            color: '#cca',
        },
    },
];