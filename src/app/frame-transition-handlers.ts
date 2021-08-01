import {GameStore} from "../models/game-store";
import {ITransitionActions} from "sim-ecs";
import { PauseState } from "../states/pause";

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp?: number[]){
    const clocktime = performance.now() * 1e-3
    let seconds = Math.floor(clocktime)
    let nanoseconds = Math.floor((clocktime%1)*1e9)
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0]
      nanoseconds = nanoseconds - previousTimestamp[1]
      if (nanoseconds<0) {
        seconds--
        nanoseconds += 1e9
      }
    }
  
    return [seconds, nanoseconds];
}

const hrtimeToSeconds = (s_ns: number[]) => (
  s_ns[0] + s_ns[1] * 1e-9
);

let lastTransition = hrtime();

let deltaSum = 0;

export async function beforeFrameHandler(actions: ITransitionActions) {
    const gameStore = actions.getResource(GameStore);

    const isPauseState = gameStore.currentState?.constructor == PauseState;

    if (!isPauseState) {
      gameStore.lastFrameDeltaTime = hrtimeToSeconds(
        hrtime(lastTransition)
      );
  
      if (gameStore.lastFrameDeltaTime > 0.1) {
        gameStore.lastFrameDeltaTime = 0.1;
      }
  
      gameStore.timeSinceLevelLoaded += 
        gameStore.lastFrameDeltaTime; 
  
      deltaSum += gameStore.lastFrameDeltaTime;
      gameStore.medianFps = ++gameStore.ticks / deltaSum;
  
      lastTransition = hrtime();  
    }

    // Clear canvas
    const ctx = actions.getResource(CanvasRenderingContext2D);
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
