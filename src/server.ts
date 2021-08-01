import Box2DFactory from 'box2d-wasm';

export type _Box2D = typeof Box2D & EmscriptenModule;

export const loadPhysics = async () => {
    return Box2DFactory().then((box2D: _Box2D) => {
        return box2D;
    });
}