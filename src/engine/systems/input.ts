import {ISystemActions, System} from "sim-ecs";
import { CommonStore } from '../models/common-store';

export enum EKeyState {
    Up,
    Down,
}

export enum EMouseState {
    Down,
    Up,
    Move
}

interface IMouseEvent {
    type: EMouseState
    button: number
    x: number
    y: number
}

export class InputSystem extends System {
    commonStore!: CommonStore;
    mouseEvents: IMouseEvent[] = [];
    wheelEvents: number[] = [];

    resetPrevState(code: string) {
        const prevState = this.commonStore.input.keyStates.get(code);

        this.commonStore.input.prevKeyStates.set(
            code, prevState
        );
    }

    readonly listeners = {
        wheel: (e: WheelEvent) => (
            this.wheelEvents.push(-e.deltaY / 125
        )),
        keydown: (e: KeyboardEvent) => {
            this.resetPrevState(e.code);
            this.commonStore.input.keyStates.set(e.code, EKeyState.Down);
        },
        keyup: (e: KeyboardEvent) => {
            this.resetPrevState(e.code);
            this.commonStore.input.keyStates.set(e.code, EKeyState.Up);
        },
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
        contextmenu: (e: MouseEvent) => e.preventDefault(),
    }

    setup(actions: ISystemActions) {
        this.commonStore = actions.getResource(CommonStore);

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
        let mouseEvent: IMouseEvent | undefined;
        this.commonStore.input.mouseStates.clear();

        while ((mouseEvent = this.mouseEvents.pop())) {
            const {
                type,
                x, y,
                button
            } = mouseEvent;

            this.commonStore.input.mouseStates.set(button, type);

            this.commonStore.input.cursorPos.x = x;
            this.commonStore.input.cursorPos.y = y;
        }

        let wheelDelta: number | undefined;

        this.commonStore.input.wheel = 0;

        while ((wheelDelta = this.wheelEvents.pop())) {
            this.commonStore.input.wheel = wheelDelta;
        }
    }
}
