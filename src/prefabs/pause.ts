import { CTagMarker } from "sim-ecs";
import { Position } from "../components/position";
import {UIItem} from "../components/ui-item";
import { ETags } from "../models/tags";

// This could also be pure JSON, but in order to use TS types and have static checks it is recommended to write it as TS array.
export const pausePrefab = [
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 50,
            y: 30,
        },
        UIItem: <UIItem>{
            caption: '❚❚ PAUSE',
            color: '#ddd',
            fontSize: 64,
        }
    },
];
