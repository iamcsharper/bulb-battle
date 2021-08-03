import {ETags} from "../models/tags";
import {CTagMarker} from 'sim-ecs';
import { verticies } from "../../res/meshes/1";
import { Character } from "../components/character";
import { Collision, Material, Mesh, Position, Rotation, Shape, ShapePivot, ShapePrimitive, Velocity } from "../engine";

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