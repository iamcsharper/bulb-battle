import {ETags} from "../models/tags";
import {CTagMarker} from 'sim-ecs';
import { verticies } from "../../res/meshes/1";
import { Character } from "../components/character";
import { Collision } from "../engine/components/collision";
import { Material } from "../engine/components/material";
import { Mesh } from "../engine/components/mesh";
import { Position } from "../engine/components/position";
import { Rotation } from "../engine/components/rotation";
import { Shape, ShapePrimitive, ShapePivot } from "../engine/components/shape";
import { Velocity } from "../engine/components/velocity";

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
            mesh: <Mesh>{
                verticies
            },
            primitive: ShapePrimitive.Mesh,
            pivot: ShapePivot.Middle,
        },
        Material: <Material>{
            color: '#cca',
        },
    },
];