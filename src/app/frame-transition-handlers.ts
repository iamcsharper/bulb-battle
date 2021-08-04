import {GameStore} from "../models/game-store";
import {ITransitionActions} from "sim-ecs";
import { PauseState } from "../states/pause";
import { hrtime } from "../engine";
import { CommonStore } from "../engine/models/common-store";

const hrtimeToSeconds = (s_ns: number[]) => (
  s_ns[0] + s_ns[1] * 1e-9
);

let lastTransition = hrtime();

let deltaSum = 0;

export async function beforeFrameHandler(actions: ITransitionActions) {
    const gameStore = actions.getResource(GameStore);
    const commonStore = actions.getResource(CommonStore);

    const isPauseState = gameStore.currentState?.constructor == PauseState;

    if (!isPauseState) {
      commonStore.lastFrameDeltaTime = hrtimeToSeconds(
        hrtime(lastTransition)
      );
  
      if (commonStore.lastFrameDeltaTime > 0.1) {
        commonStore.lastFrameDeltaTime = 0.1;
      }
  
      commonStore.timeSinceLevelLoaded += 
        commonStore.lastFrameDeltaTime; 
  
      deltaSum += commonStore.lastFrameDeltaTime;
      commonStore.medianFps = ++commonStore.ticks / deltaSum;
  
      lastTransition = hrtime();  
    }

    // Clear canvas
    const ctx = actions.getResource(CanvasRenderingContext2D);
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
