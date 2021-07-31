import { CTagMarker } from "sim-ecs";
import {EActions} from "../app/actions";
import { Position } from "../components/position";
import {UIItem} from "../components/ui-item";
import { ETags } from "../models/tags";

// This could also be pure JSON, but in order to use TS types and have static checks it is recommended to write it as TS array.
export const menuPrefab = [
    { // Title
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.05*1024,
            y: 0.05*1024,
        },
        UIItem: <UIItem>{
            caption: 'PONG',
            color: '#ddd',
            fontSize: 64,
        }
    },
    { // Sub title
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.05*1024,
            y: 0.12*1024,
        },
        UIItem: {
            caption: 'A sim-ecs usage demo',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.05*1024,
            y: 0.2*1024,
        },
        UIItem: <UIItem>{
            caption: 'How to play: Left paddle: W/S ; Right paddle: Up/Down ; Pause: Escape',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.05*1024,
            y: 0.24*1024,
        },
        UIItem: <UIItem>{
            caption: 'The game will be saved upon pausing!',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.15*1024,
            y: 0.35*1024,
        },
        UIItem: <UIItem>{
            action: EActions.Play,
            active: true,
            color: '#ddd',
            caption: 'Play',
            fontSize: 32,
        },
    },
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.15*1024,
            y: 0.4*1024,
        },
        UIItem: <UIItem>{
            action: EActions.Continue,
            color: '#ddd',
            caption: 'Continue',
            fontSize: 32,
        },
    },
    {
        [CTagMarker]: [
            ETags.ui
        ],
        Position: <Position>{
            x: 0.15*1024,
            y: 0.45*1024,
        },
        UIItem: <UIItem>{
            action: EActions.Exit,
            color: '#ddd',
            caption: 'Exit',
            fontSize: 32,
        },
    },
];
