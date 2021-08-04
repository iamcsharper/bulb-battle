import { Topdown } from './levels/topdown';
import './scss/app.scss';
import { Level } from './engine/level.h';
import { updateRenderContext } from './engine';
import { _Box2D, loadPhysics } from './engine/server';

window.addEventListener('resize', updateRenderContext);

const _fetch = window.fetch;
window.fetch = (
    input: RequestInfo,
    init?: RequestInit | undefined): Promise<Response> => {
    if (init?.credentials === 'same-origin') {
        delete init.credentials;
    }
    return _fetch(input, init);
}

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
