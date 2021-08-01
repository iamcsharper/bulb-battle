import * as KeyCode from 'keycode-js';
import {ISystemActions, System} from "sim-ecs";
import {EMovement, GameStore} from "../models/game-store";

export enum EKeyState {
    Down,
    Up,
}

export enum EMouseState {
    Down,
    Up,
    Move
}

interface IKeyEvent {
    code: string
    type: EKeyState
}

interface IMouseEvent {
    type: EMouseState
    button: number
    x: number
    y: number
}

export class InputSystem extends System {
    gameStore!: GameStore;
    inputEvents: IKeyEvent[] = [];
    mouseEvents: IMouseEvent[] = [];
    wheelEvents: number[] = [];

    readonly listeners = {
        wheel: (e: WheelEvent) => (
            this.wheelEvents.push(-e.deltaY / 125
        )),
        keydown: (e: KeyboardEvent) => this.inputEvents.push({
            code: e.code,
            type: EKeyState.Down
        }),
        keyup: (e: KeyboardEvent) => this.inputEvents.push({
            code: e.code,
            type: EKeyState.Up
        }),
        mousedown: (e: MouseEvent) => this.mouseEvents.push({
            button: e.button,
            type: EMouseState.Down,
            x: e.clientX,
            y: e.clientY,
        }),
        mouseup: (e:MouseEvent) => this.mouseEvents.push({
            button: e.button,
            type: EMouseState.Up,
            x: e.clientX,
            y: e.clientY,
        }),
        mousemove: (e: MouseEvent) => this.mouseEvents.push({
            button: e.button,
            type: EMouseState.Move,
            x: e.clientX,
            y: e.clientY,
        }),
        blur: () => {
            this.gameStore.input.actions.characterMovement = EMovement.idle;
            this.gameStore.input.actions.menuMovement = EMovement.idle;
            this.gameStore.input.actions.togglePause = false;
        },
        focus: () => this.listeners.blur(),
        contextmenu: (e: MouseEvent) => e.preventDefault(),
    }

    setup(actions: ISystemActions) {
        this.gameStore = actions.getResource(GameStore);

        for (const [event, handler] of Object.entries(this.listeners)) {
            window.addEventListener(
                event,
                handler as EventListenerOrEventListenerObject
            );
        }
    }

    destroy(_: ISystemActions) {
        super.destroy(_);

        for (const [event, handler] of Object.entries(this.listeners)) {
            window.removeEventListener(
                event,
                handler as EventListenerOrEventListenerObject
            );
        }
    }

    run(actions: ISystemActions) {
        { // Reset input actions
            this.gameStore.input.actions.menuConfirm = false;
            this.gameStore.input.actions.menuMovement = EMovement.idle;
            this.gameStore.input.actions.togglePause = false;
        }

        let event: IKeyEvent | undefined;

        this.gameStore.input.keyStates.clear();

        while ((event = this.inputEvents.pop())) {
            this.gameStore.input.keyStates.set(event.code, event.type);

            switch (event.code) {
                case KeyCode.CODE_ENTER:
                    if (event.type === EKeyState.Down)
                        this.gameStore.input.actions.menuConfirm = true;
                    break;
                case KeyCode.CODE_ESCAPE:
                    if (event.type === EKeyState.Down)
                        this.gameStore.input.actions.togglePause = true;
                    break;

                case KeyCode.CODE_W:
                case KeyCode.CODE_UP:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= EMovement.up;
                        this.gameStore.input.actions.characterMovement &= ~EMovement.down;
                        this.gameStore.input.actions.menuMovement = EMovement.up;
                    } else {
                        this.gameStore.input.actions.characterMovement &= ~EMovement.up;
                    }
                    break;
                case KeyCode.CODE_A:
                case KeyCode.CODE_LEFT:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= EMovement.left;
                        this.gameStore.input.actions.characterMovement &= ~EMovement.right;
                    } else
                        this.gameStore.input.actions.characterMovement &= ~EMovement.left;
                    break;
                case KeyCode.CODE_S:
                case KeyCode.CODE_DOWN:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= EMovement.down;
                        this.gameStore.input.actions.characterMovement &= ~EMovement.up;
                        this.gameStore.input.actions.menuMovement = EMovement.down;
                    } else {
                        this.gameStore.input.actions.characterMovement &= ~EMovement.down;
                    }
                    this.gameStore.input.actions.menuMovement = this.gameStore.input.actions.characterMovement;
                    break;
                case KeyCode.CODE_D:
                case KeyCode.CODE_RIGHT:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= EMovement.right;
                        this.gameStore.input.actions.characterMovement &= ~EMovement.left;
                    } else
                        this.gameStore.input.actions.characterMovement &= ~EMovement.right;
                    break;
            }
        }

        let mouseEvent: IMouseEvent | undefined;
        this.gameStore.input.mouseStates.clear();

        while ((mouseEvent = this.mouseEvents.pop())) {
            const {
                type,
                x, y,
                button
            } = mouseEvent;

            this.gameStore.input.mouseStates.set(button, type);

            this.gameStore.input.cursorPos.x = x;
            this.gameStore.input.cursorPos.y = y;
        }

        let wheelDelta: number | undefined;

        this.gameStore.input.wheel = 0;

        while ((wheelDelta = this.wheelEvents.pop())) {
            this.gameStore.input.wheel = wheelDelta;
        }
    }
}
