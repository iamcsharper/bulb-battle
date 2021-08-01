import {ETags} from "../models/tags";
import {Collision} from "../components/collision";
import {Shape, ShapePivot, ShapePrimitive} from "../components/shape";
import {Velocity} from "../components/velocity";
import {CTagMarker} from 'sim-ecs';
import { Position } from "../components/position";
import { Material } from "../components/material";
import { Character } from "../components/character";
import { Rotation } from "../components/rotation";
import { PhysicsBridge } from "../components/physics-bridge";

export const savablePrefab = [
    { // Character
        [CTagMarker]: [
            ETags.character,
            // ETags.save
        ],
        // PhysicsBridge: <PhysicsBridge>{},
        Character: <Character>{
            name: 'XuPoH'
        },
        Velocity: <Velocity>{
            x: 0,
            y: 0,
            angular: 0,
        },
        Collision: <Collision>{},
        Rotation: <Rotation>{
            value: 0
        },
        Position: <Position>{
            x: 0,
            y: 0,
        },
        Shape: <Shape>{
            zIndex: 11,
            dimensions: {
                x: 1,
            },
            pivot: ShapePivot.Middle,
            primitive: ShapePrimitive.Circle
        },
        Material: <Material>{
            color: '#cca',
        },
    },
];