import './server';
import { Level } from './levels/level.h';
import { Topdown } from './levels/topdown';
import './scss/app.scss';
import { loadPhysics, _Box2D } from './server';

export const prepareRenderContext = () => {
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

window.addEventListener('resize', prepareRenderContext);

const levels:{
    [name: string]: new (...args:[_Box2D]) => Level,
} = {
    'topdown': Topdown,
};

type levelType = keyof typeof levels;

// main function
(async () => {
    const box2D = await loadPhysics();

    const options = Object.keys(levels)
        .map((e,i) => (`${i+1}) ${e}`));
    options.push('exit (or empty)');

    let requestedLevel = 'topdown';

    while (requestedLevel !== 'exit') {
        const level = requestedLevel as levelType;
        let world = new levels[level](box2D);

        await world.run();

        requestedLevel = prompt('What level would you like to check next?\n' +
            options.join('\n')
        ) || 'exit';
    }
})().catch(console.error);
