import { Topdown } from './levels/topdown';
import './scss/app.scss';

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

const levels = {
    'topdown': Topdown,
};

type levelType = keyof typeof levels;

// main function
(async () => {
    const options = Object.keys(levels)
        .map((e,i) => (`${i+1}) ${e}`));
    options.push('exit (or empty)');

    let requestedLevel = 'topdown';

    while (requestedLevel !== 'exit') {
        const level: levelType = 'topdown';
        let world = new levels[level];

        await world.run();

        requestedLevel = prompt('What level would you like to check next?\n' +
            options.join('\n')
        ) || 'exit';
    }
})().catch(console.error);
