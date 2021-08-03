import { CTagMarker } from "sim-ecs";
import {EActions} from "../app/actions";
import {UIItem} from "../components/ui-item";
import { Position } from "../engine";
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
            caption: 'SHPEK',
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
            caption: 'Pen is game',
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
            caption: 'How to play: Move: WASD, Rotate Q/E, Pause: Escape',
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
            caption: 'The game will be saved upon pausing (not yet lmao)',
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
            caption: 'Exit (really?)',
            fontSize: 32,
        },
    },
];
