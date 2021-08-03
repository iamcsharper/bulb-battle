export const updateRenderContext = () => {
    const canvasEle = document.querySelector('canvas');
    if (!canvasEle) throw new Error('Could not find canvas element!');

    const renderContext = canvasEle.getContext('2d');
    if (!renderContext) throw new Error('Could not initialize 2D context');

    const canvasBoundingRect = canvasEle.getBoundingClientRect();

    canvasEle.width = canvasBoundingRect.width;
    canvasEle.height = canvasBoundingRect.height;

    renderContext.imageSmoothingEnabled = false;

    return renderContext;
}

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
export const hrtime = (previousTimestamp?: number[]) => {
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

import Box2DFactory from 'box2d-wasm';

export type _Box2D = typeof Box2D & EmscriptenModule;

export const loadPhysics = async () => {
    return Box2DFactory().then((box2D: _Box2D) => {
        return box2D;
    });
}

export * from './systems';
export * from './components';
export * from './models';