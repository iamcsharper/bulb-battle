/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/app/actions.ts":
/*!****************************!*\
  !*** ./src/app/actions.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EActions = void 0;
var EActions;
(function (EActions) {
    EActions[EActions["Continue"] = 0] = "Continue";
    EActions[EActions["Exit"] = 1] = "Exit";
    EActions[EActions["Play"] = 2] = "Play";
})(EActions = exports.EActions || (exports.EActions = {}));


/***/ }),

/***/ "./src/app/frame-transition-handlers.ts":
/*!**********************************************!*\
  !*** ./src/app/frame-transition-handlers.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.beforeFrameHandler = void 0;
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
function hrtime(previousTimestamp) {
    const clocktime = performance.now() * 1e-3;
    let seconds = Math.floor(clocktime);
    let nanoseconds = Math.floor((clocktime % 1) * 1e9);
    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
}
const hrtimeToSeconds = (s_ns) => (s_ns[0] + s_ns[1] * 1e-9);
let lastTransition = hrtime();
let deltaSum = 0;
async function beforeFrameHandler(actions) {
    const gameStore = actions.getResource(game_store_1.GameStore);
    gameStore.lastFrameDeltaTime = hrtimeToSeconds(hrtime(lastTransition));
    if (gameStore.lastFrameDeltaTime > 0.1) {
        gameStore.lastFrameDeltaTime = 0.1;
    }
    gameStore.timeSinceLevelLoaded +=
        gameStore.lastFrameDeltaTime;
    deltaSum += gameStore.lastFrameDeltaTime;
    gameStore.medianFps = ++gameStore.ticks / deltaSum;
    lastTransition = hrtime();
    const ctx = actions.getResource(CanvasRenderingContext2D);
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
exports.beforeFrameHandler = beforeFrameHandler;


/***/ }),

/***/ "./src/app/persistence.ts":
/*!********************************!*\
  !*** ./src/app/persistence.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.save = exports.load = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
const saveKey = 'save';
function load(actions) {
    const save = localStorage.getItem(saveKey);
    if (!save) {
        throw new Error('No save available. Cannot load!');
    }
    const handle = actions.commands.load(sim_ecs_1.SerialFormat.fromJSON(save));
    return handle;
}
exports.load = load;
function save(actions) {
    localStorage.setItem(saveKey, actions.save(new sim_ecs_1.Query([sim_ecs_1.WithTag(tags_1.ETags.save)])).toJSON());
}
exports.save = save;


/***/ }),

/***/ "./src/components/character.ts":
/*!*************************************!*\
  !*** ./src/components/character.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Character = void 0;
class Character {
    constructor(name = '') {
        this.name = name;
    }
}
exports.Character = Character;


/***/ }),

/***/ "./src/components/collision.ts":
/*!*************************************!*\
  !*** ./src/components/collision.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collision = void 0;
class Collision {
    constructor(shapeFromVisuals = true, shape = null) {
        this.shapeFromVisuals = shapeFromVisuals;
        this.shape = shape;
        this.collisionObjects = new Set();
        this.occurred = false;
        if (!shapeFromVisuals && !shape) {
            throw new Error('Either copy the collision shape\
                from visuals or provide a new one');
        }
    }
}
exports.Collision = Collision;


/***/ }),

/***/ "./src/components/material.ts":
/*!************************************!*\
  !*** ./src/components/material.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Material = void 0;
class Material {
    constructor(color) {
        this.color = color;
    }
}
exports.Material = Material;


/***/ }),

/***/ "./src/components/mesh.ts":
/*!********************************!*\
  !*** ./src/components/mesh.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mesh = void 0;
class Mesh {
    constructor(verticies) {
        this.verticies = verticies;
        this.isConvex = true;
    }
}
exports.Mesh = Mesh;


/***/ }),

/***/ "./src/components/position.ts":
/*!************************************!*\
  !*** ./src/components/position.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Position = void 0;
const vector2d_1 = __webpack_require__(/*! ../models/vector2d */ "./src/models/vector2d.ts");
class Position extends vector2d_1.Vector2D {
}
exports.Position = Position;


/***/ }),

/***/ "./src/components/rotation.ts":
/*!************************************!*\
  !*** ./src/components/rotation.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rotation = void 0;
class Rotation {
    constructor(value) {
        this.value = value;
    }
}
exports.Rotation = Rotation;


/***/ }),

/***/ "./src/components/shape.ts":
/*!*********************************!*\
  !*** ./src/components/shape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shape = exports.ShapePivot = exports.ShapePrimitive = void 0;
const rect_1 = __webpack_require__(/*! ../models/rect */ "./src/models/rect.ts");
const vector2d_1 = __webpack_require__(/*! ../models/vector2d */ "./src/models/vector2d.ts");
var ShapePrimitive;
(function (ShapePrimitive) {
    ShapePrimitive["Circle"] = "circle";
    ShapePrimitive["Rect"] = "rect";
    ShapePrimitive["Mesh"] = "mesh";
})(ShapePrimitive = exports.ShapePrimitive || (exports.ShapePrimitive = {}));
var ShapePivot;
(function (ShapePivot) {
    ShapePivot[ShapePivot["TopLeft"] = 0] = "TopLeft";
    ShapePivot[ShapePivot["TopMiddle"] = 1] = "TopMiddle";
    ShapePivot[ShapePivot["TopRight"] = 2] = "TopRight";
    ShapePivot[ShapePivot["Left"] = 3] = "Left";
    ShapePivot[ShapePivot["Middle"] = 4] = "Middle";
    ShapePivot[ShapePivot["Right"] = 5] = "Right";
    ShapePivot[ShapePivot["BottomLeft"] = 6] = "BottomLeft";
    ShapePivot[ShapePivot["BottomMiddle"] = 7] = "BottomMiddle";
    ShapePivot[ShapePivot["BottomRight"] = 8] = "BottomRight";
})(ShapePivot = exports.ShapePivot || (exports.ShapePivot = {}));
class Shape {
    constructor(zIndex = 0, pivot = ShapePivot.Middle, dimensions = vector2d_1.vecZero, primitive = ShapePrimitive.Rect, mesh = null) {
        this.zIndex = zIndex;
        this.pivot = pivot;
        this.dimensions = dimensions;
        this.primitive = primitive;
        this.mesh = mesh;
        this.bBox = new rect_1.Rect(0, 0, 0, 0);
        this.isBuilt = false;
    }
    build() {
        if (this.isBuilt)
            return;
        console.log('Building shape', this);
        if (this.primitive === ShapePrimitive.Mesh && !this.mesh) {
            throw new Error('Shapes with mesh primitive\
                must provide a mesh data');
        }
        if (this.primitive !== ShapePrimitive.Mesh && !this.dimensions) {
            console.error('dimensions:', this.dimensions, 'primitive:', this.primitive, 'mesh:', this.mesh);
            throw new Error('Shapes with non-mesh primitive\
                must provide dimensions');
        }
        if (this.primitive === ShapePrimitive.Circle) {
            const d = this.dimensions.x;
            const rad = d / 2;
            this.bBox.x = -rad;
            this.bBox.y = -rad;
            this.bBox.w = d;
            this.bBox.h = d;
        }
        else if (this.primitive === ShapePrimitive.Rect) {
            this.bBox.x = 0;
            this.bBox.y = 0;
            this.bBox.w = this.dimensions.x;
            this.bBox.h = this.dimensions.y;
        }
        else if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            let minX = this.mesh.verticies[0].x;
            let minY = this.mesh.verticies[0].y;
            let maxX = this.mesh.verticies[0].x;
            let maxY = this.mesh.verticies[0].y;
            for (let i = 1; i < this.mesh.verticies.length; ++i) {
                const { x, y } = this.mesh.verticies[i];
                if (x < minX)
                    minX = x;
                if (x > maxX)
                    maxX = x;
                if (y < minY)
                    minY = y;
                if (y > maxY)
                    maxY = y;
            }
            this.bBox.x = minX;
            this.bBox.y = minY;
            this.bBox.w = maxX - minX;
            this.bBox.h = maxY - minY;
        }
        this.isBuilt = true;
    }
    getBBox() {
        return this.bBox;
    }
}
exports.Shape = Shape;


/***/ }),

/***/ "./src/components/ui-item.ts":
/*!***********************************!*\
  !*** ./src/components/ui-item.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UIItem = void 0;
class UIItem {
    constructor(caption, color, fontSize, action, active, activeColor) {
        this.caption = caption;
        this.color = color;
        this.fontSize = fontSize;
        this.action = action;
        this.active = active;
        this.activeColor = activeColor;
        this.captionMod = (strIn) => strIn;
    }
    get finalCaption() {
        return this.captionMod(this.caption);
    }
}
exports.UIItem = UIItem;


/***/ }),

/***/ "./src/components/velocity.ts":
/*!************************************!*\
  !*** ./src/components/velocity.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Velocity = void 0;
const vector2d_1 = __webpack_require__(/*! ../models/vector2d */ "./src/models/vector2d.ts");
class Velocity extends vector2d_1.Vector2D {
}
exports.Velocity = Velocity;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareRenderContext = void 0;
const topdown_1 = __webpack_require__(/*! ./levels/topdown */ "./src/levels/topdown.ts");
__webpack_require__(/*! ./scss/app.scss */ "./src/scss/app.scss");
const prepareRenderContext = () => {
    const canvasEle = document.querySelector('canvas');
    if (!canvasEle)
        throw new Error('Could not find canvas element!');
    const renderContext = canvasEle.getContext('2d');
    if (!renderContext)
        throw new Error('Could not initialize 2D context');
    const canvasBoundingRect = canvasEle.getBoundingClientRect();
    canvasEle.width = canvasBoundingRect.width;
    canvasEle.height = canvasBoundingRect.height;
    renderContext.imageSmoothingEnabled = false;
    return renderContext;
};
exports.prepareRenderContext = prepareRenderContext;
window.addEventListener('resize', exports.prepareRenderContext);
const levels = {
    'topdown': topdown_1.Topdown,
};
(async () => {
    const options = Object.keys(levels)
        .map((e, i) => (`${i + 1}) ${e}`));
    options.push('exit (or empty)');
    let requestedLevel = 'topdown';
    while (requestedLevel !== 'exit') {
        const level = 'topdown';
        let world = new levels[level];
        await world.run();
        requestedLevel = prompt('What level would you like to check next?\n' +
            options.join('\n')) || 'exit';
    }
})().catch(console.error);


/***/ }),

/***/ "./src/levels/level.h.ts":
/*!*******************************!*\
  !*** ./src/levels/level.h.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Level = void 0;
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
const frame_transition_handlers_1 = __webpack_require__(/*! ../app/frame-transition-handlers */ "./src/app/frame-transition-handlers.ts");
const menu_1 = __webpack_require__(/*! ../states/menu */ "./src/states/menu.ts");
class Level {
    constructor(name) {
        this.name = name;
        console.log('Level loaded', name);
        const world = this.createWorld();
        if (!world) {
            throw new Error('A level must have a non-null \
            resuling createWorld function');
        }
        this.world = world;
        const renderContext = __1.prepareRenderContext();
        this.world.addResource(renderContext);
    }
    destroy() {
        this.world.commands.stopRun();
    }
    async run() {
        return this.world.run({
            beforeStepHandler: frame_transition_handlers_1.beforeFrameHandler,
            initialState: menu_1.MenuState,
        }).then(() => this.destroy());
    }
}
exports.Level = Level;


/***/ }),

/***/ "./src/levels/topdown.ts":
/*!*******************************!*\
  !*** ./src/levels/topdown.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Topdown = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const character_1 = __webpack_require__(/*! ../components/character */ "./src/components/character.ts");
const collision_1 = __webpack_require__(/*! ../components/collision */ "./src/components/collision.ts");
const material_1 = __webpack_require__(/*! ../components/material */ "./src/components/material.ts");
const mesh_1 = __webpack_require__(/*! ../components/mesh */ "./src/components/mesh.ts");
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const rotation_1 = __webpack_require__(/*! ../components/rotation */ "./src/components/rotation.ts");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const ui_item_1 = __webpack_require__(/*! ../components/ui-item */ "./src/components/ui-item.ts");
const velocity_1 = __webpack_require__(/*! ../components/velocity */ "./src/components/velocity.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const character_2 = __webpack_require__(/*! ../systems/character */ "./src/systems/character.ts");
const collision_2 = __webpack_require__(/*! ../systems/collision */ "./src/systems/collision.ts");
const input_1 = __webpack_require__(/*! ../systems/input */ "./src/systems/input.ts");
const menu_1 = __webpack_require__(/*! ../systems/menu */ "./src/systems/menu.ts");
const pause_1 = __webpack_require__(/*! ../systems/pause */ "./src/systems/pause.ts");
const physics_1 = __webpack_require__(/*! ../systems/physics */ "./src/systems/physics.ts");
const render_game_1 = __webpack_require__(/*! ../systems/render-game */ "./src/systems/render-game.ts");
const render_ui_1 = __webpack_require__(/*! ../systems/render-ui */ "./src/systems/render-ui.ts");
const level_h_1 = __webpack_require__(/*! ./level.h */ "./src/levels/level.h.ts");
class Topdown extends level_h_1.Level {
    constructor() {
        super('topdown');
        const gameStore = new game_store_1.GameStore();
        this.world.addResource(gameStore);
    }
    destroy() {
        super.destroy();
        const ctx = this.world.getResource(CanvasRenderingContext2D);
        ctx.fillStyle = '#ececec';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    createWorld() {
        return new sim_ecs_1.ECS()
            .buildWorld()
            .withSystem(physics_1.PhysicsSystem, [
            character_2.CharacterSystem
        ])
            .withSystem(character_2.CharacterSystem, [
            collision_2.CollisionSystem
        ])
            .withSystem(collision_2.CollisionSystem, [])
            .withSystem(input_1.InputSystem)
            .withSystem(menu_1.MenuSystem, [
            input_1.InputSystem
        ])
            .withSystem(pause_1.PauseSystem, [
            input_1.InputSystem
        ])
            .withSystem(render_game_1.RenderGameSystem, [
            physics_1.PhysicsSystem,
            character_2.CharacterSystem,
        ])
            .withSystem(render_ui_1.RenderUISystem, [
            physics_1.PhysicsSystem,
            menu_1.MenuSystem,
            pause_1.PauseSystem
        ])
            .withComponents(collision_1.Collision, material_1.Material, mesh_1.Mesh, position_1.Position, rotation_1.Rotation, shape_1.Shape, ui_item_1.UIItem, velocity_1.Velocity, character_1.Character)
            .build();
    }
}
exports.Topdown = Topdown;


/***/ }),

/***/ "./src/models/game-store.ts":
/*!**********************************!*\
  !*** ./src/models/game-store.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameStore = exports.EMovement = void 0;
var EMovement;
(function (EMovement) {
    EMovement[EMovement["idle"] = 0] = "idle";
    EMovement[EMovement["up"] = 1] = "up";
    EMovement[EMovement["down"] = 2] = "down";
    EMovement[EMovement["left"] = 4] = "left";
    EMovement[EMovement["right"] = 8] = "right";
})(EMovement = exports.EMovement || (exports.EMovement = {}));
class GameStore {
    constructor() {
        this.drawables = 0;
        this.rendered = 0;
        this.debugShapes = true;
        this.continue = false;
        this.lastFrameDeltaTime = 0;
        this.ticks = 0;
        this.medianFps = 30;
        this.timeSinceLevelLoaded = 0;
        this.input = {
            actions: {
                characterMovement: EMovement.idle,
                menuConfirm: false,
                menuMovement: EMovement.idle,
                togglePause: false,
            },
            keyStates: {},
        };
    }
}
exports.GameStore = GameStore;


/***/ }),

/***/ "./src/models/rect.ts":
/*!****************************!*\
  !*** ./src/models/rect.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = void 0;
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    static checkIntersects(r1, r2) {
        return !(r2.x > r1.x + r1.w ||
            r2.x + r2.w < r1.x ||
            r2.y > r1.y + r1.h ||
            r2.y + r2.h < r1.y);
    }
}
exports.Rect = Rect;


/***/ }),

/***/ "./src/models/tags.ts":
/*!****************************!*\
  !*** ./src/models/tags.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ETags = void 0;
var ETags;
(function (ETags) {
    ETags[ETags["ui"] = 0] = "ui";
    ETags[ETags["terrain"] = 1] = "terrain";
    ETags[ETags["character"] = 2] = "character";
    ETags[ETags["networkObject"] = 3] = "networkObject";
    ETags[ETags["save"] = 4] = "save";
})(ETags = exports.ETags || (exports.ETags = {}));


/***/ }),

/***/ "./src/models/vector2d.ts":
/*!********************************!*\
  !*** ./src/models/vector2d.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vecRight = exports.vecLeft = exports.vecDown = exports.vecUp = exports.vecOne = exports.vecZero = exports.Vector2D = void 0;
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.buf = new ArrayBuffer(4);
        this.f32 = new Float32Array(this.buf);
        this.u32 = new Uint32Array(this.buf);
    }
    addSelf(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }
    subSelf(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
    }
    normalize() {
        const inv = this.invSqrt();
        this.x *= inv;
        this.y *= inv;
    }
    invSqrt() {
        const x = this.x * this.x + this.y * this.y;
        const x2 = 0.5 * (this.f32[0] = x);
        this.u32[0] = (0x5f3759df - (this.u32[0] >> 1));
        let y = this.f32[0];
        y = y * (1.5 - (x2 * y * y));
        return y;
    }
    distance(to) {
        const dx = to.x - this.x;
        const dy = to.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    sqrDistance(to) {
        const dx = to.x - this.x;
        const dy = to.y - this.y;
        return dx * dx + dy * dy;
    }
    sqrLength() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
exports.Vector2D = Vector2D;
exports.vecZero = new Vector2D(0, 0);
exports.vecOne = new Vector2D(1, 1);
exports.vecUp = new Vector2D(0, 1);
exports.vecDown = new Vector2D(0, -1);
exports.vecLeft = new Vector2D(-1, 0);
exports.vecRight = new Vector2D(1, 0);


/***/ }),

/***/ "./src/prefabs/game.ts":
/*!*****************************!*\
  !*** ./src/prefabs/game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gamePrefab = void 0;
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
exports.gamePrefab = [
    {
        Collision: {},
        Position: {
            x: 60,
            y: 60,
        },
        Velocity: {
            x: 0,
            y: 0,
        },
        Material: {
            color: '#fdff03'
        },
        Shape: {
            dimensions: {
                x: 10,
                y: 10,
            },
            primitive: shape_1.ShapePrimitive.Rect,
        },
        Rotation: {
            value: Math.PI * 3 / 4
        }
    },
    {
        Collision: {},
        Position: {
            x: 30,
            y: 100,
        },
        Velocity: {
            x: 10,
            y: 0,
        },
        Material: {
            color: '#fdff03'
        },
        Shape: {
            zIndex: 10,
            dimensions: {
                x: 20,
            },
            primitive: shape_1.ShapePrimitive.Circle,
        },
    },
    {
        Collision: {},
        Position: {
            x: 100,
            y: 50,
        },
        Velocity: {
            x: 0,
            y: 0,
        },
        Material: {
            color: '#fdff03'
        },
        Shape: {
            mesh: {
                verticies: [
                    {
                        x: -10,
                        y: -10
                    },
                    {
                        x: 10,
                        y: -10,
                    },
                    {
                        x: 0,
                        y: 10
                    },
                    {
                        x: -5,
                        y: 100
                    }
                ]
            },
            primitive: shape_1.ShapePrimitive.Mesh,
        },
    },
];


/***/ }),

/***/ "./src/prefabs/menu.ts":
/*!*****************************!*\
  !*** ./src/prefabs/menu.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.menuPrefab = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const actions_1 = __webpack_require__(/*! ../app/actions */ "./src/app/actions.ts");
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
exports.menuPrefab = [
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.05 * 1024,
            y: 0.05 * 1024,
        },
        UIItem: {
            caption: 'PONG',
            color: '#ddd',
            fontSize: 64,
        }
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.05 * 1024,
            y: 0.12 * 1024,
        },
        UIItem: {
            caption: 'A sim-ecs usage demo',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.05 * 1024,
            y: 0.2 * 1024,
        },
        UIItem: {
            caption: 'How to play: Left paddle: W/S ; Right paddle: Up/Down ; Pause: Escape',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.05 * 1024,
            y: 0.24 * 1024,
        },
        UIItem: {
            caption: 'The game will be saved upon pausing!',
            color: '#ddd',
            fontSize: 24,
        }
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.15 * 1024,
            y: 0.35 * 1024,
        },
        UIItem: {
            action: actions_1.EActions.Play,
            active: true,
            color: '#ddd',
            caption: 'Play',
            fontSize: 32,
        },
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.15 * 1024,
            y: 0.4 * 1024,
        },
        UIItem: {
            action: actions_1.EActions.Continue,
            color: '#ddd',
            caption: 'Continue',
            fontSize: 32,
        },
    },
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 0.15 * 1024,
            y: 0.45 * 1024,
        },
        UIItem: {
            action: actions_1.EActions.Exit,
            color: '#ddd',
            caption: 'Exit',
            fontSize: 32,
        },
    },
];


/***/ }),

/***/ "./src/prefabs/pause.ts":
/*!******************************!*\
  !*** ./src/prefabs/pause.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pausePrefab = void 0;
exports.pausePrefab = [
    {
        Position: {
            x: 0.05,
            y: 0.02,
        },
        UIItem: {
            caption: '❚❚ PAUSE',
            color: '#ddd',
            fontSize: 64,
        }
    },
];


/***/ }),

/***/ "./src/prefabs/savable.ts":
/*!********************************!*\
  !*** ./src/prefabs/savable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.savablePrefab = void 0;
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
exports.savablePrefab = [
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.character,
        ],
        Character: {
            name: 'XuPoH'
        },
        Velocity: {
            x: 0,
            y: 0,
        },
        Collision: {},
        Position: {
            x: 250,
            y: 50,
        },
        Shape: {
            zIndex: 11,
            dimensions: {
                x: 30,
            },
            primitive: shape_1.ShapePrimitive.Circle
        },
        Material: {
            color: '#cca',
        },
    },
];


/***/ }),

/***/ "./src/states/game.ts":
/*!****************************!*\
  !*** ./src/states/game.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameState = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const input_1 = __webpack_require__(/*! ../systems/input */ "./src/systems/input.ts");
const pause_1 = __webpack_require__(/*! ../systems/pause */ "./src/systems/pause.ts");
const game_1 = __webpack_require__(/*! ../prefabs/game */ "./src/prefabs/game.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const persistence_1 = __webpack_require__(/*! ../app/persistence */ "./src/app/persistence.ts");
const render_ui_1 = __webpack_require__(/*! ../systems/render-ui */ "./src/systems/render-ui.ts");
const render_game_1 = __webpack_require__(/*! ../systems/render-game */ "./src/systems/render-game.ts");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const physics_1 = __webpack_require__(/*! ../systems/physics */ "./src/systems/physics.ts");
const collision_1 = __webpack_require__(/*! ../systems/collision */ "./src/systems/collision.ts");
const character_1 = __webpack_require__(/*! ../systems/character */ "./src/systems/character.ts");
const savable_1 = __webpack_require__(/*! ../prefabs/savable */ "./src/prefabs/savable.ts");
class GameState extends sim_ecs_1.State {
    constructor() {
        super(...arguments);
        this._systems = [
            collision_1.CollisionSystem,
            input_1.InputSystem,
            character_1.CharacterSystem,
            pause_1.PauseSystem,
            physics_1.PhysicsSystem,
            render_game_1.RenderGameSystem,
            render_ui_1.RenderUISystem,
        ];
    }
    activate(actions) {
        actions.getResource(game_store_1.GameStore).currentState = this;
    }
    async create(actions) {
        var _a;
        const gameStore = actions.getResource(game_store_1.GameStore);
        this.staticDataPrefabHandle = createNewGame(actions);
        if (gameStore.continue) {
            this.saveDataPrefabHandle = persistence_1.load(actions);
        }
        else {
            this.saveDataPrefabHandle = createGameFromSaveData(actions);
        }
        await actions.flushCommands();
        for (const entity of actions.getEntities(new sim_ecs_1.Query([
            sim_ecs_1.With(shape_1.Shape)
        ]))) {
            (_a = entity.getComponent(shape_1.Shape)) === null || _a === void 0 ? void 0 : _a.build();
        }
        actions.commands.maintain();
    }
    destroy(actions) {
        if (this.staticDataPrefabHandle) {
            actions.commands.unloadPrefab(this.staticDataPrefabHandle);
        }
        if (this.saveDataPrefabHandle) {
            actions.commands.unloadPrefab(this.saveDataPrefabHandle);
        }
        actions.commands.maintain();
    }
}
exports.GameState = GameState;
const createNewGame = function (actions) {
    return actions.commands.load(sim_ecs_1.SerialFormat.fromArray(game_1.gamePrefab));
};
const createGameFromSaveData = function (actions) {
    return actions.commands.load(sim_ecs_1.SerialFormat.fromArray(savable_1.savablePrefab));
};


/***/ }),

/***/ "./src/states/menu.ts":
/*!****************************!*\
  !*** ./src/states/menu.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuState = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const menu_1 = __webpack_require__(/*! ../prefabs/menu */ "./src/prefabs/menu.ts");
const input_1 = __webpack_require__(/*! ../systems/input */ "./src/systems/input.ts");
const menu_2 = __webpack_require__(/*! ../systems/menu */ "./src/systems/menu.ts");
const render_ui_1 = __webpack_require__(/*! ../systems/render-ui */ "./src/systems/render-ui.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
class MenuState extends sim_ecs_1.State {
    constructor() {
        super(...arguments);
        this._systems = [input_1.InputSystem, menu_2.MenuSystem, render_ui_1.RenderUISystem];
    }
    activate(actions) {
        actions.getResource(game_store_1.GameStore).currentState = this;
        this.prefabHandle = actions.commands.load(sim_ecs_1.SerialFormat.fromArray(menu_1.menuPrefab));
        actions.commands.maintain();
    }
    deactivate(actions) {
        actions.commands.unloadPrefab(this.prefabHandle);
        actions.commands.maintain();
    }
}
exports.MenuState = MenuState;


/***/ }),

/***/ "./src/states/pause.ts":
/*!*****************************!*\
  !*** ./src/states/pause.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PauseState = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const input_1 = __webpack_require__(/*! ../systems/input */ "./src/systems/input.ts");
const pause_1 = __webpack_require__(/*! ../systems/pause */ "./src/systems/pause.ts");
const pause_2 = __webpack_require__(/*! ../prefabs/pause */ "./src/prefabs/pause.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const persistence_1 = __webpack_require__(/*! ../app/persistence */ "./src/app/persistence.ts");
const render_ui_1 = __webpack_require__(/*! ../systems/render-ui */ "./src/systems/render-ui.ts");
const render_game_1 = __webpack_require__(/*! ../systems/render-game */ "./src/systems/render-game.ts");
class PauseState extends sim_ecs_1.State {
    constructor() {
        super(...arguments);
        this._systems = [input_1.InputSystem, pause_1.PauseSystem, render_game_1.RenderGameSystem, render_ui_1.RenderUISystem];
    }
    activate(actions) {
        const gameStore = actions.getResource(game_store_1.GameStore);
        persistence_1.save(actions);
        gameStore.currentState = this;
        this.prefabHandle = actions.commands.load(sim_ecs_1.SerialFormat.fromArray(pause_2.pausePrefab));
        actions.commands.maintain();
    }
    deactivate(actions) {
        actions.commands.unloadPrefab(this.prefabHandle);
        actions.commands.maintain();
    }
}
exports.PauseState = PauseState;


/***/ }),

/***/ "./src/systems/character.ts":
/*!**********************************!*\
  !*** ./src/systems/character.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharacterSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
const velocity_1 = __webpack_require__(/*! ../components/velocity */ "./src/components/velocity.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
class CharacterSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            _character: sim_ecs_1.WithTag(tags_1.ETags.character),
            velocity: sim_ecs_1.Write(velocity_1.Velocity),
        });
    }
    setup(actions) {
        this.gameStore = actions.getResource(game_store_1.GameStore);
    }
    run(actions) {
        this.query.execute(({ velocity }) => {
            const dt = this.gameStore.lastFrameDeltaTime;
            const { characterMovement: move } = this.gameStore.input.actions;
            if ((move & game_store_1.EMovement.left) === game_store_1.EMovement.left) {
                velocity.x = -1;
            }
            else if ((move & game_store_1.EMovement.right) === game_store_1.EMovement.right) {
                velocity.x = 1;
            }
            else {
                velocity.x = 0;
            }
            if ((move & game_store_1.EMovement.up) === game_store_1.EMovement.up) {
                velocity.y = -1;
            }
            else if ((move & game_store_1.EMovement.down) === game_store_1.EMovement.down) {
                velocity.y = 1;
            }
            else {
                velocity.y = 0;
            }
            velocity.normalize();
            velocity.scale(dt * 10000);
        });
    }
}
exports.CharacterSystem = CharacterSystem;


/***/ }),

/***/ "./src/systems/collision.ts":
/*!**********************************!*\
  !*** ./src/systems/collision.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollisionSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const collision_1 = __webpack_require__(/*! ../components/collision */ "./src/components/collision.ts");
const vector2d_1 = __webpack_require__(/*! ../models/vector2d */ "./src/models/vector2d.ts");
class CollisionSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            collision: sim_ecs_1.Write(collision_1.Collision),
            entity: sim_ecs_1.ReadEntity(),
            position: sim_ecs_1.Read(vector2d_1.Vector2D),
            shape: sim_ecs_1.Read(shape_1.Shape)
        });
    }
    run(actions) {
        const rects = Array.from(this.query.iter())
            .map(({ collision, entity, position, shape }) => {
            collision.collisionObjects.clear();
            collision.occurred = false;
            const { x, y, w, h } = shape.getBBox();
            return {
                collisionData: collision,
                entity,
                width: w,
                height: h,
                x: position.x + x,
                y: position.y + y,
            };
        });
        for (let i = 0; i < rects.length; i++) {
            for (let j = 0; j < rects.length; j++) {
                if (i == j) {
                    continue;
                }
                const rect1 = rects[i];
                const rect2 = rects[j];
                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y) {
                    if (!rect1.collisionData.occurred) {
                        rect1.collisionData.occurred = true;
                        rect1.collisionData.collisionObjects.add(rect2.entity);
                    }
                    if (!rect2.collisionData.occurred) {
                        rect2.collisionData.occurred = true;
                        rect2.collisionData.collisionObjects.add(rect1.entity);
                    }
                }
            }
        }
    }
}
exports.CollisionSystem = CollisionSystem;


/***/ }),

/***/ "./src/systems/input.ts":
/*!******************************!*\
  !*** ./src/systems/input.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputSystem = exports.EKeyState = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
var EKeyState;
(function (EKeyState) {
    EKeyState[EKeyState["Down"] = 0] = "Down";
    EKeyState[EKeyState["Up"] = 1] = "Up";
})(EKeyState = exports.EKeyState || (exports.EKeyState = {}));
class InputSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.inputEvents = [];
    }
    setup(actions) {
        this.gameStore = actions.getResource(game_store_1.GameStore);
        window.addEventListener('keydown', event => this.inputEvents.push({ key: event.key, type: EKeyState.Down }));
        window.addEventListener('keyup', event => this.inputEvents.push({ key: event.key, type: EKeyState.Up }));
    }
    run(actions) {
        {
            this.gameStore.input.actions.menuConfirm = false;
            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.idle;
            this.gameStore.input.actions.togglePause = false;
        }
        {
            for (const event of this.inputEvents) {
                this.gameStore.input.keyStates[event.key] = event.type;
                if (event.type == EKeyState.Down) {
                    switch (event.key) {
                        case 'ArrowLeft':
                        case 'a':
                        case 'A': {
                            this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.left;
                            break;
                        }
                        case 'ArrowRight':
                        case 'd':
                        case 'D': {
                            this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.right;
                            break;
                        }
                        case 'ArrowUp':
                        case 'w':
                        case 'W': {
                            this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.up;
                            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.up;
                            break;
                        }
                        case 'ArrowDown':
                        case 's':
                        case 'S': {
                            this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.down;
                            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.down;
                            break;
                        }
                        case 'Enter': {
                            this.gameStore.input.actions.menuConfirm = true;
                            break;
                        }
                        case 'Escape': {
                            this.gameStore.input.actions.togglePause = true;
                            break;
                        }
                    }
                }
                else {
                    switch (event.key) {
                        case 'ArrowLeft':
                        case 'a':
                        case 'A': {
                            this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.left;
                            break;
                        }
                        case 'ArrowRight':
                        case 'd':
                        case 'D': {
                            this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.right;
                            break;
                        }
                        case 'ArrowUp':
                        case 'w':
                        case 'W': {
                            this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.up;
                            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.idle;
                            break;
                        }
                        case 'ArrowDown':
                        case 's':
                        case 'S': {
                            this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.down;
                            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.idle;
                            break;
                        }
                    }
                }
            }
        }
        this.inputEvents.length = 0;
    }
}
exports.InputSystem = InputSystem;


/***/ }),

/***/ "./src/systems/menu.ts":
/*!*****************************!*\
  !*** ./src/systems/menu.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const ui_item_1 = __webpack_require__(/*! ../components/ui-item */ "./src/components/ui-item.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const actions_1 = __webpack_require__(/*! ../app/actions */ "./src/app/actions.ts");
const game_1 = __webpack_require__(/*! ../states/game */ "./src/states/game.ts");
const menu_1 = __webpack_require__(/*! ../states/menu */ "./src/states/menu.ts");
class MenuSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this._states = [
            game_1.GameState,
            menu_1.MenuState
        ];
        this.query = new sim_ecs_1.Query({
            uiItem: sim_ecs_1.Write(ui_item_1.UIItem)
        });
        this.menuAction = actions_1.EActions.Play;
    }
    setup(actions) {
        this.actions = actions;
        this.gameStore = actions.getResource(game_store_1.GameStore);
        console.log('setup Menu');
    }
    run(actions) {
        if (this.gameStore.input.actions.menuMovement == game_store_1.EMovement.down) {
            switch (this.menuAction) {
                case actions_1.EActions.Play:
                    this.menuAction = actions_1.EActions.Continue;
                    break;
                case actions_1.EActions.Continue:
                    this.menuAction = actions_1.EActions.Exit;
                    break;
                case actions_1.EActions.Exit:
                    this.menuAction = actions_1.EActions.Play;
                    break;
                default: {
                    throw new Error(`Action ${this.menuAction} not implemented!`);
                }
            }
        }
        else if (this.gameStore.input.actions.menuMovement == game_store_1.EMovement.up) {
            switch (this.menuAction) {
                case actions_1.EActions.Play:
                    this.menuAction = actions_1.EActions.Exit;
                    break;
                case actions_1.EActions.Continue:
                    this.menuAction = actions_1.EActions.Play;
                    break;
                case actions_1.EActions.Exit:
                    this.menuAction = actions_1.EActions.Continue;
                    break;
                default: {
                    throw new Error(`Action ${this.menuAction} not implemented!`);
                }
            }
        }
        if (this.gameStore.input.actions.menuConfirm) {
            if (this.menuAction == actions_1.EActions.Play) {
                this.actions.commands.pushState(game_1.GameState);
            }
            else if (this.menuAction == actions_1.EActions.Continue) {
                if (localStorage.getItem('save') == null) {
                    alert('Sorry you werent saved lol');
                    return;
                }
                this.gameStore.continue = true;
                this.actions.commands.pushState(game_1.GameState);
            }
            else {
                this.actions.commands.stopRun();
            }
            return;
        }
        for (const { uiItem } of this.query.iter()) {
            uiItem.active = uiItem.action == this.menuAction;
        }
    }
}
exports.MenuSystem = MenuSystem;


/***/ }),

/***/ "./src/systems/pause.ts":
/*!******************************!*\
  !*** ./src/systems/pause.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PauseSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const game_1 = __webpack_require__(/*! ../states/game */ "./src/states/game.ts");
const pause_1 = __webpack_require__(/*! ../states/pause */ "./src/states/pause.ts");
class PauseSystem extends sim_ecs_1.System {
    setup(actions) {
        this.actions = actions;
        this.gameStore = actions.getResource(game_store_1.GameStore);
    }
    run(actions) {
        var _a, _b;
        const isGameState = ((_a = this.gameStore.currentState) === null || _a === void 0 ? void 0 : _a.constructor) == game_1.GameState;
        const isPauseState = ((_b = this.gameStore.currentState) === null || _b === void 0 ? void 0 : _b.constructor) == pause_1.PauseState;
        if (!isGameState && !isPauseState) {
            return;
        }
        if (this.gameStore.input.actions.togglePause) {
            if (isGameState) {
                this.actions.commands.pushState(pause_1.PauseState);
            }
            else {
                this.actions.commands.popState();
            }
        }
    }
}
exports.PauseSystem = PauseSystem;


/***/ }),

/***/ "./src/systems/physics.ts":
/*!********************************!*\
  !*** ./src/systems/physics.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhysicsSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const velocity_1 = __webpack_require__(/*! ../components/velocity */ "./src/components/velocity.ts");
class PhysicsSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            pos: sim_ecs_1.Write(position_1.Position),
            vel: sim_ecs_1.Read(velocity_1.Velocity),
        });
    }
    run(_) {
        const dt = 0.016;
        this.query.execute(({ pos, vel }) => {
            pos.x += vel.x * dt;
            pos.y += vel.y * dt;
        });
    }
}
exports.PhysicsSystem = PhysicsSystem;


/***/ }),

/***/ "./src/systems/render-game.ts":
/*!************************************!*\
  !*** ./src/systems/render-game.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderGameSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const material_1 = __webpack_require__(/*! ../components/material */ "./src/components/material.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const rect_1 = __webpack_require__(/*! ../models/rect */ "./src/models/rect.ts");
const TWOPI = Math.PI * 2;
class RenderGameSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            pos: sim_ecs_1.Read(position_1.Position),
            shape: sim_ecs_1.Read(shape_1.Shape),
            material: sim_ecs_1.Read(material_1.Material),
        });
        this.runs = 0;
    }
    setup(actions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(game_store_1.GameStore);
    }
    run(actions) {
        const viewport = {
            x: 0,
            y: 0,
            w: this.ctx.canvas.width,
            h: this.ctx.canvas.height,
        };
        const iter = Array.from(this.query.iter());
        this.gameStore.drawables = iter.length;
        const drawables = iter.filter(({ pos, shape }) => {
            const bbox = shape.getBBox();
            const r = {
                x: pos.x + bbox.x,
                y: pos.y + bbox.y,
                w: bbox.w,
                h: bbox.h,
            };
            const inView = rect_1.Rect.checkIntersects(r, viewport);
            return inView;
        })
            .sort(({ shape: a }, { shape: b }) => {
            return a.zIndex - b.zIndex;
        });
        this.gameStore.rendered = drawables.length;
        for (let i = 0; i < drawables.length; i++) {
            const { pos, shape, material } = drawables[i];
            this.drawShape(pos, shape, material);
        }
    }
    drawShape(pos, shape, material) {
        const { x: w, y: h } = shape.dimensions;
        const { x, y } = pos;
        if (this.gameStore.debugShapes) {
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '1rem Arial';
            const txt = `Z=${shape.zIndex}`;
            this.ctx.fillText(txt, x, y - 30);
            this.ctx.strokeStyle = '#f0f';
            const { x: bx, y: by, w: bw, h: bh } = shape.getBBox();
            const padding = 5;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x + bx - padding, y + by - padding, bw + padding * 2, bh + padding * 2);
            this.ctx.restore();
        }
        this.ctx.fillStyle = material.color;
        if (shape.primitive === shape_1.ShapePrimitive.Rect) {
            this.ctx.fillRect(x, y, w, h);
        }
        else if (shape.primitive === shape_1.ShapePrimitive.Circle) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, w / 2, 0, TWOPI);
            this.ctx.fill();
        }
        else if (shape.primitive === shape_1.ShapePrimitive.Mesh
            && shape.mesh) {
            this.ctx.beginPath();
            for (let i = 0; i < shape.mesh.verticies.length; ++i) {
                const { x: dx, y: dy } = shape.mesh.verticies[i];
                this.ctx.lineTo(x + dx, y + dy);
            }
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
}
exports.RenderGameSystem = RenderGameSystem;


/***/ }),

/***/ "./src/systems/render-ui.ts":
/*!**********************************!*\
  !*** ./src/systems/render-ui.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderUISystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const ui_item_1 = __webpack_require__(/*! ../components/ui-item */ "./src/components/ui-item.ts");
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
class RenderUISystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            _tag: sim_ecs_1.WithTag(tags_1.ETags.ui),
            pos: sim_ecs_1.Read(position_1.Position),
            ui: sim_ecs_1.Read(ui_item_1.UIItem)
        });
        this.runs = 0;
    }
    setup(actions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
    }
    run(actions) {
        this.ctx.textBaseline = 'top';
        const gameStore = actions.getResource(game_store_1.GameStore);
        this.query.execute(({ pos, ui }) => {
            var _a;
            this.ctx.fillStyle = ui.active
                ? (_a = ui.activeColor) !== null && _a !== void 0 ? _a : 'red'
                : ui.color;
            this.ctx.font = ui.active
                ? `${ui.fontSize * 1.2}px serif`
                : `${ui.fontSize}px serif`;
            this.ctx.fillText(ui.finalCaption, pos.x, pos.y);
        });
        this.ctx.fillText(`${Math.floor(10 * gameStore.timeSinceLevelLoaded) / 10.0} s.`, this.ctx.canvas.width - 200, 20);
        this.ctx.fillText(`${Math.floor(gameStore.medianFps + 0.5)} FPS`, this.ctx.canvas.width - 200, 60);
        this.ctx.fillText(`${gameStore.rendered} / ${gameStore.drawables}`, this.ctx.canvas.width - 200, 100);
        let str = gameStore.input.actions.characterMovement.toString(2);
        str = '0'.repeat(4 - str.length) + str;
        this.ctx.fillText(`${str}`, this.ctx.canvas.width - 200, 140);
    }
}
exports.RenderUISystem = RenderUISystem;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcitylights"] = self["webpackChunkcitylights"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_sim-ecs_dist_index_js"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFOUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3Njc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9hcHAvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2FwcC9mcmFtZS10cmFuc2l0aW9uLWhhbmRsZXJzLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvYXBwL3BlcnNpc3RlbmNlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9jaGFyYWN0ZXIudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL21lc2gudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3Bvc2l0aW9uLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9yb3RhdGlvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvc2hhcGUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3VpLWl0ZW0udHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3ZlbG9jaXR5LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9sZXZlbHMvbGV2ZWwuaC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2xldmVscy90b3Bkb3duLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbW9kZWxzL2dhbWUtc3RvcmUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9tb2RlbHMvcmVjdC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL21vZGVscy90YWdzLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbW9kZWxzL3ZlY3RvcjJkLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvcHJlZmFicy9nYW1lLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvcHJlZmFicy9tZW51LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvcHJlZmFicy9wYXVzZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3ByZWZhYnMvc2F2YWJsZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N0YXRlcy9nYW1lLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3RhdGVzL21lbnUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zdGF0ZXMvcGF1c2UudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL2NoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvY29sbGlzaW9uLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9pbnB1dC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvbWVudS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvcGF1c2UudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL3BoeXNpY3MudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL3JlbmRlci1nYW1lLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9yZW5kZXItdWkudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZW51bSBFQWN0aW9ucyB7XG4gICAgQ29udGludWUsXG4gICAgRXhpdCxcbiAgICBQbGF5LFxufVxuIiwiaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHtJVHJhbnNpdGlvbkFjdGlvbnN9IGZyb20gXCJzaW0tZWNzXCI7XG5cbi8vIGdlbmVyYXRlIHRpbWVzdGFtcCBvciBkZWx0YVxuLy8gc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19wcm9jZXNzX2hydGltZVxuZnVuY3Rpb24gaHJ0aW1lKHByZXZpb3VzVGltZXN0YW1wPzogbnVtYmVyW10pe1xuICAgIGNvbnN0IGNsb2NrdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICogMWUtM1xuICAgIGxldCBzZWNvbmRzID0gTWF0aC5mbG9vcihjbG9ja3RpbWUpXG4gICAgbGV0IG5hbm9zZWNvbmRzID0gTWF0aC5mbG9vcigoY2xvY2t0aW1lJTEpKjFlOSlcbiAgICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMF1cbiAgICAgIG5hbm9zZWNvbmRzID0gbmFub3NlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFsxXVxuICAgICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgICAgc2Vjb25kcy0tXG4gICAgICAgIG5hbm9zZWNvbmRzICs9IDFlOVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIFtzZWNvbmRzLCBuYW5vc2Vjb25kc107XG59XG5cbmNvbnN0IGhydGltZVRvU2Vjb25kcyA9IChzX25zOiBudW1iZXJbXSkgPT4gKFxuICBzX25zWzBdICsgc19uc1sxXSAqIDFlLTlcbik7XG5cbmxldCBsYXN0VHJhbnNpdGlvbiA9IGhydGltZSgpO1xuXG5sZXQgZGVsdGFTdW0gPSAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmVmb3JlRnJhbWVIYW5kbGVyKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAvLyBVcGRhdGUgZGVsdGEgdGltZVxuICAgIGNvbnN0IGdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICBnYW1lU3RvcmUubGFzdEZyYW1lRGVsdGFUaW1lID0gaHJ0aW1lVG9TZWNvbmRzKFxuICAgICAgaHJ0aW1lKGxhc3RUcmFuc2l0aW9uKVxuICAgICk7XG5cbiAgICBpZiAoZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZSA+IDAuMSkge1xuICAgICAgZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZSA9IDAuMTtcbiAgICB9XG5cbiAgICBnYW1lU3RvcmUudGltZVNpbmNlTGV2ZWxMb2FkZWQgKz0gXG4gICAgICBnYW1lU3RvcmUubGFzdEZyYW1lRGVsdGFUaW1lOyBcblxuICAgIGRlbHRhU3VtICs9IGdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWU7XG4gICAgZ2FtZVN0b3JlLm1lZGlhbkZwcyA9ICsrZ2FtZVN0b3JlLnRpY2tzIC8gZGVsdGFTdW07XG5cbiAgICBsYXN0VHJhbnNpdGlvbiA9IGhydGltZSgpO1xuXG4gICAgLy8gQ2xlYXIgY2FudmFzXG4gICAgY29uc3QgY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG59XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgUXVlcnksIFNlcmlhbEZvcm1hdCwgVEdyb3VwSGFuZGxlLCBXaXRoVGFnfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtFVGFnc30gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5cblxuY29uc3Qgc2F2ZUtleSA9ICdzYXZlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWQoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKTogVEdyb3VwSGFuZGxlIHtcbiAgICBjb25zdCBzYXZlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc2F2ZUtleSk7XG5cbiAgICBpZiAoIXNhdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzYXZlIGF2YWlsYWJsZS4gQ2Fubm90IGxvYWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlID0gYWN0aW9ucy5jb21tYW5kcy5sb2FkKFNlcmlhbEZvcm1hdC5mcm9tSlNPTihzYXZlKSk7XG5cbiAgICByZXR1cm4gaGFuZGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzYXZlS2V5LCBhY3Rpb25zLnNhdmUobmV3IFF1ZXJ5KFtXaXRoVGFnKEVUYWdzLnNhdmUpXSkpLnRvSlNPTigpKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gJycsXG4gICAgKSB7fVxufSIsImltcG9ydCB7IElFbnRpdHkgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi9zaGFwZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNoYXBlRnJvbVZpc3VhbHM6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBwdWJsaWMgc2hhcGU6IFNoYXBlIHwgbnVsbCA9IG51bGxcbiAgICApIHtcbiAgICAgICAgaWYgKCFzaGFwZUZyb21WaXN1YWxzICYmICFzaGFwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgY29weSB0aGUgY29sbGlzaW9uIHNoYXBlXFxcbiAgICAgICAgICAgICAgICBmcm9tIHZpc3VhbHMgb3IgcHJvdmlkZSBhIG5ldyBvbmUnKVxuICAgICAgICB9IFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgY29sbGlzaW9uT2JqZWN0czogU2V0PElFbnRpdHk+ID0gbmV3IFNldDxJRW50aXR5PigpO1xuICAgIHB1YmxpYyBvY2N1cnJlZCA9IGZhbHNlO1xufVxuIiwiZXhwb3J0IGNsYXNzIE1hdGVyaWFsIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nXG4gICAgKSB7fVxufSIsImltcG9ydCB7IElWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIE1lc2gge1xuICAgIHB1YmxpYyBpc0NvbnZleDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgdmVydGljaWVzOiBJVmVjdG9yMkRbXSkge1xuICAgICAgICAvLyBUT0RPOiB0ZXN0IGZvciBjb252ZXhuZXNzXG4gICAgICAgIHRoaXMuaXNDb252ZXggPSB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgVmVjdG9yMkQge31cbiIsImV4cG9ydCBjbGFzcyBSb3RhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHt9XG59IiwiaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcmVjdFwiO1xuaW1wb3J0IHsgVmVjdG9yMkQsIHZlY1plcm8gfSBmcm9tIFwiLi4vbW9kZWxzL3ZlY3RvcjJkXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcIi4vbWVzaFwiO1xuXG5leHBvcnQgZW51bSBTaGFwZVByaW1pdGl2ZSB7XG4gICAgQ2lyY2xlID0gJ2NpcmNsZScsXG4gICAgUmVjdCA9ICdyZWN0JyxcbiAgICBNZXNoID0gJ21lc2gnLFxufVxuXG5leHBvcnQgZW51bSBTaGFwZVBpdm90IHtcbiAgICBUb3BMZWZ0ID0gMCxcbiAgICBUb3BNaWRkbGUgPSAxLFxuICAgIFRvcFJpZ2h0ID0gMixcbiAgICBMZWZ0ID0gMyxcbiAgICBNaWRkbGUgPSA0LFxuICAgIFJpZ2h0ID0gNSxcbiAgICBCb3R0b21MZWZ0ID0gNixcbiAgICBCb3R0b21NaWRkbGUgPSA3LFxuICAgIEJvdHRvbVJpZ2h0ID0gOFxufVxuXG4vLyB0b2RvIHRyaWFuZ2xlLCBjYXBzdWxlXG5cbmV4cG9ydCBjbGFzcyBTaGFwZSB7XG4gICAgcHVibGljIGJCb3g6IFJlY3QgPSBuZXcgUmVjdCgwLCAwLCAwLCAwKTtcblxuICAgIHB1YmxpYyBpc0J1aWx0ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGltZW5zaW9ucyAod2lkdGgsaGVpZ2h0KSBpZiByZWN0LCAoZGlhbWV0ZXIsYW55KSBpZiBjaXJjbGVcbiAgICAgKiBAcGFyYW0gcHJpbWl0aXZlIEVudW0gb3Igc3RyaW5nIHZhbHVlXG4gICAgICogQHBhcmFtIG1lc2ggdmVydGljaWVzIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHpJbmRleCA9IDAsXG4gICAgICAgIC8vIFRPRE86IG1ha2UgaXQgcmVhbFxuICAgICAgICBwdWJsaWMgcGl2b3QgPSBTaGFwZVBpdm90Lk1pZGRsZSxcbiAgICAgICAgcHVibGljIGRpbWVuc2lvbnM6IFZlY3RvcjJEID0gdmVjWmVybyxcbiAgICAgICAgcHVibGljIHByaW1pdGl2ZTogU2hhcGVQcmltaXRpdmUgPSBTaGFwZVByaW1pdGl2ZS5SZWN0LFxuICAgICAgICBwdWJsaWMgbWVzaDogTWVzaCB8IG51bGwgPSBudWxsLFxuICAgICkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBidWlsZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNCdWlsdCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdCdWlsZGluZyBzaGFwZScsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLk1lc2ggJiYgIXRoaXMubWVzaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFwZXMgd2l0aCBtZXNoIHByaW1pdGl2ZVxcXG4gICAgICAgICAgICAgICAgbXVzdCBwcm92aWRlIGEgbWVzaCBkYXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJpbWl0aXZlICE9PSBTaGFwZVByaW1pdGl2ZS5NZXNoICYmICF0aGlzLmRpbWVuc2lvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpbWVuc2lvbnM6JywgdGhpcy5kaW1lbnNpb25zLFxuICAgICAgICAgICAgICAgICdwcmltaXRpdmU6JywgdGhpcy5wcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgJ21lc2g6JywgdGhpcy5tZXNoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2hhcGVzIHdpdGggbm9uLW1lc2ggcHJpbWl0aXZlXFxcbiAgICAgICAgICAgICAgICBtdXN0IHByb3ZpZGUgZGltZW5zaW9ucycpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSkge1xuICAgICAgICAgICAgLy8gQSBjZW50ZXItcG9zaXRpb25lZCBjaXJjbGVcbiAgICAgICAgICAgIC8vIHdpbGwgZml0IGludG8gYSBtaWQtc2hpZnRlZFxuICAgICAgICAgICAgLy8gc3F1YXJlIHdpdGggc2lkZSA9IGRpYW1ldGVyXG4gICAgICAgICAgICBjb25zdCBkID0gdGhpcy5kaW1lbnNpb25zLnhcbiAgICAgICAgICAgIGNvbnN0IHJhZCA9IGQvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gLXJhZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ID0gLXJhZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC53ID0gZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC5oID0gZDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuUmVjdCkge1xuICAgICAgICAgICAgLy8gYSB0b3AtbGVmdCBwb3NpdGlvbmVkIHJlY3RhbmdsZVxuICAgICAgICAgICAgLy8gaXMgdGhlIGJvdW5kaW5nIGJveCBpdHNlbGZcbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gMDtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ID0gMDtcbiAgICAgICAgICAgIHRoaXMuYkJveC53ID0gdGhpcy5kaW1lbnNpb25zLng7XG4gICAgICAgICAgICB0aGlzLmJCb3guaCA9IHRoaXMuZGltZW5zaW9ucy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5NZXNoICYmIHRoaXMubWVzaCkge1xuICAgICAgICAgICAgbGV0IG1pblggPSB0aGlzLm1lc2gudmVydGljaWVzWzBdLng7XG4gICAgICAgICAgICBsZXQgbWluWSA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbMF0ueTtcblxuICAgICAgICAgICAgbGV0IG1heFggPSB0aGlzLm1lc2gudmVydGljaWVzWzBdLng7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbMF0ueTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0xO2k8dGhpcy5tZXNoLnZlcnRpY2llcy5sZW5ndGg7KytpKXtcbiAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLm1lc2gudmVydGljaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh4IDwgbWluWCkgbWluWCA9IHg7XG4gICAgICAgICAgICAgICAgaWYgKHggPiBtYXhYKSBtYXhYID0geDtcbiAgICAgICAgICAgICAgICBpZiAoeSA8IG1pblkpIG1pblkgPSB5O1xuICAgICAgICAgICAgICAgIGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gbWluWDtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ID0gbWluWTtcbiAgICAgICAgICAgIHRoaXMuYkJveC53ID0gbWF4WCAtIG1pblg7XG4gICAgICAgICAgICB0aGlzLmJCb3guaCA9IG1heFkgLSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0J1aWx0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRCQm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iQm94O1xuICAgIH1cbn1cbiIsImltcG9ydCB7RUFjdGlvbnN9IGZyb20gXCIuLi9hcHAvYWN0aW9uc1wiO1xuXG5leHBvcnQgY2xhc3MgVUlJdGVtIHtcbiAgICBwdWJsaWMgY2FwdGlvbk1vZCA9IChzdHJJbjogc3RyaW5nKSA9PiBzdHJJbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY2FwdGlvbjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgY29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGZvbnRTaXplOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBhY3Rpb24/OiBFQWN0aW9ucyxcbiAgICAgICAgcHVibGljIGFjdGl2ZT86IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBhY3RpdmVDb2xvcj86IHN0cmluZyxcbiAgICApIHt9XG5cbiAgICBnZXQgZmluYWxDYXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcHRpb25Nb2QodGhpcy5jYXB0aW9uKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi4vbW9kZWxzL3ZlY3RvcjJkXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWxvY2l0eSBleHRlbmRzIFZlY3RvcjJEIHt9XG4iLCJpbXBvcnQgeyBUb3Bkb3duIH0gZnJvbSAnLi9sZXZlbHMvdG9wZG93bic7XG5pbXBvcnQgJy4vc2Nzcy9hcHAuc2Nzcyc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlUmVuZGVyQ29udGV4dCA9ICgpID0+IHtcbiAgICBjb25zdCBjYW52YXNFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbiAgICBpZiAoIWNhbnZhc0VsZSkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBjYW52YXMgZWxlbWVudCEnKTtcblxuICAgIGNvbnN0IHJlbmRlckNvbnRleHQgPSBjYW52YXNFbGUuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIXJlbmRlckNvbnRleHQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGluaXRpYWxpemUgMkQgY29udGV4dCcpO1xuXG4gICAgY29uc3QgY2FudmFzQm91bmRpbmdSZWN0ID0gY2FudmFzRWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY2FudmFzRWxlLndpZHRoID0gY2FudmFzQm91bmRpbmdSZWN0LndpZHRoO1xuICAgIGNhbnZhc0VsZS5oZWlnaHQgPSBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0O1xuXG4gICAgcmVuZGVyQ29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiByZW5kZXJDb250ZXh0O1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcHJlcGFyZVJlbmRlckNvbnRleHQpO1xuXG5jb25zdCBsZXZlbHMgPSB7XG4gICAgJ3RvcGRvd24nOiBUb3Bkb3duLFxufTtcblxudHlwZSBsZXZlbFR5cGUgPSBrZXlvZiB0eXBlb2YgbGV2ZWxzO1xuXG4vLyBtYWluIGZ1bmN0aW9uXG4oYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3Qua2V5cyhsZXZlbHMpXG4gICAgICAgIC5tYXAoKGUsaSkgPT4gKGAke2krMX0pICR7ZX1gKSk7XG4gICAgb3B0aW9ucy5wdXNoKCdleGl0IChvciBlbXB0eSknKTtcblxuICAgIGxldCByZXF1ZXN0ZWRMZXZlbCA9ICd0b3Bkb3duJztcblxuICAgIHdoaWxlIChyZXF1ZXN0ZWRMZXZlbCAhPT0gJ2V4aXQnKSB7XG4gICAgICAgIGNvbnN0IGxldmVsOiBsZXZlbFR5cGUgPSAndG9wZG93bic7XG4gICAgICAgIGxldCB3b3JsZCA9IG5ldyBsZXZlbHNbbGV2ZWxdO1xuXG4gICAgICAgIGF3YWl0IHdvcmxkLnJ1bigpO1xuXG4gICAgICAgIHJlcXVlc3RlZExldmVsID0gcHJvbXB0KCdXaGF0IGxldmVsIHdvdWxkIHlvdSBsaWtlIHRvIGNoZWNrIG5leHQ/XFxuJyArXG4gICAgICAgICAgICBvcHRpb25zLmpvaW4oJ1xcbicpXG4gICAgICAgICkgfHwgJ2V4aXQnO1xuICAgIH1cbn0pKCkuY2F0Y2goY29uc29sZS5lcnJvcik7XG4iLCJpbXBvcnQgeyBJV29ybGQgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgcHJlcGFyZVJlbmRlckNvbnRleHQgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IGJlZm9yZUZyYW1lSGFuZGxlciB9IGZyb20gXCIuLi9hcHAvZnJhbWUtdHJhbnNpdGlvbi1oYW5kbGVyc1wiO1xuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlcy9tZW51XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxldmVsIHtcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvLyBUT0RPOiBsb2FkIGZyb20gZmlsZXN5c3RlbSwgZnJvbSBVUkxcbiAgICAvLyBwYXRoOiBzdHJpbmc7IFxuXG4gICAgd29ybGQ6IElXb3JsZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCByaWdodCBhZnRlciB0aGUgaW5pdGlhbGl6YXRpb24sIG1haW4gbG9vcCBnb2VzIGhlcmVcbiAgICAgKi9cbiAgICBydW4oKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSB0aGUgcmVzb3VyY2VzIHRvIHJ1biBhbm90aGVyIGxldmVsXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGV2ZWwgaW1wbGVtZW50cyBJTGV2ZWwge1xuXG4gICAgcHVibGljIHdvcmxkOiBJV29ybGQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMZXZlbCBsb2FkZWQnLCBuYW1lKTtcbiAgICAgICAgY29uc3Qgd29ybGQgPSB0aGlzLmNyZWF0ZVdvcmxkKCk7XG5cbiAgICAgICAgaWYgKCF3b3JsZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGxldmVsIG11c3QgaGF2ZSBhIG5vbi1udWxsIFxcXG4gICAgICAgICAgICByZXN1bGluZyBjcmVhdGVXb3JsZCBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlckNvbnRleHQgPSBwcmVwYXJlUmVuZGVyQ29udGV4dCgpO1xuXG4gICAgICAgIHRoaXMud29ybGQuYWRkUmVzb3VyY2UocmVuZGVyQ29udGV4dCk7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgY3JlYXRlV29ybGQoKTogSVdvcmxkO1xuICAgIFxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHlvdSBoYXZlIHRvIHJlbGVhc2UgbW9yZSByZXNvdXJjZXNcbiAgICAgKiAoYXVkaW8sIHZpZGVvLCBXZWJSVEMsIHRleHR1cmVzLCBmaWxlcywgZXRjLilcbiAgICAgKi9cbiAgICBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLndvcmxkLmNvbW1hbmRzLnN0b3BSdW4oKTtcbiAgICB9XG5cbiAgICBhc3luYyBydW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndvcmxkLnJ1bih7XG4gICAgICAgICAgICBiZWZvcmVTdGVwSGFuZGxlcjogYmVmb3JlRnJhbWVIYW5kbGVyLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiBNZW51U3RhdGUsXG4gICAgICAgIH0pLnRoZW4oKCk9PnRoaXMuZGVzdHJveSgpKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgRUNTLCBJV29ybGQgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyXCI7XG5pbXBvcnQgeyBDb2xsaXNpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaXNpb25cIjtcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tZXNoXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBSb3RhdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdGF0aW9uXCI7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQgeyBVSUl0ZW0gfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7IENoYXJhY3RlclN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2NoYXJhY3RlclwiO1xuaW1wb3J0IHsgQ29sbGlzaW9uU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBJbnB1dFN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2lucHV0XCI7XG5pbXBvcnQgeyBNZW51U3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvbWVudVwiO1xuaW1wb3J0IHsgUGF1c2VTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9wYXVzZVwiO1xuaW1wb3J0IHsgUGh5c2ljc1N5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL3BoeXNpY3NcIjtcbmltcG9ydCB7IFJlbmRlckdhbWVTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItZ2FtZVwiO1xuaW1wb3J0IHsgUmVuZGVyVUlTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWwuaFwiO1xuXG5leHBvcnQgY2xhc3MgVG9wZG93biBleHRlbmRzIExldmVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3RvcGRvd24nKTtcblxuICAgICAgICBjb25zdCBnYW1lU3RvcmUgPSBuZXcgR2FtZVN0b3JlKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndvcmxkLmFkZFJlc291cmNlKGdhbWVTdG9yZSk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMud29ybGQuZ2V0UmVzb3VyY2UoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZWNlY2VjJztcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgY3JlYXRlV29ybGQoKTogSVdvcmxkIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFQ1MoKVxuICAgICAgICAgICAgLmJ1aWxkV29ybGQoKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oUGh5c2ljc1N5c3RlbSwgW1xuICAgICAgICAgICAgICAgIENoYXJhY3RlclN5c3RlbVxuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmtTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShDaGFyYWN0ZXJTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBDb2xsaXNpb25TeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShDb2xsaXNpb25TeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrU3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oSW5wdXRTeXN0ZW0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShNZW51U3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgSW5wdXRTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShQYXVzZVN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIElucHV0U3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oUmVuZGVyR2FtZVN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIFBoeXNpY3NTeXN0ZW0sXG4gICAgICAgICAgICAgICAgQ2hhcmFjdGVyU3lzdGVtLFxuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmtTeXN0ZW0sXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oUmVuZGVyVUlTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBQaHlzaWNzU3lzdGVtLFxuICAgICAgICAgICAgICAgIE1lbnVTeXN0ZW0sXG4gICAgICAgICAgICAgICAgUGF1c2VTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aENvbXBvbmVudHMoXG4gICAgICAgICAgICAgICAgQ29sbGlzaW9uLFxuICAgICAgICAgICAgICAgIE1hdGVyaWFsLFxuICAgICAgICAgICAgICAgIE1lc2gsXG4gICAgICAgICAgICAgICAgUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgUm90YXRpb24sXG4gICAgICAgICAgICAgICAgU2hhcGUsXG4gICAgICAgICAgICAgICAgVUlJdGVtLFxuICAgICAgICAgICAgICAgIFZlbG9jaXR5LFxuICAgICAgICAgICAgICAgIENoYXJhY3RlcixcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFS2V5U3RhdGUgfSBmcm9tICcuLi9zeXN0ZW1zL2lucHV0J1xuaW1wb3J0IHtJU3RhdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5cbmV4cG9ydCBlbnVtIEVNb3ZlbWVudCB7XG4gICAgaWRsZSAgPSAwLCAvLyAwMDAwXG4gICAgdXAgICAgPSAxLCAvLyAwMDAxXG4gICAgZG93biAgPSAyLCAvLyAwMDEwXG4gICAgbGVmdCAgPSA0LCAvLyAwMTAwXG4gICAgcmlnaHQgPSA4LCAvLyAxMDAwXG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lU3RvcmUge1xuICAgIGRyYXdhYmxlcyA9IDBcbiAgICByZW5kZXJlZCA9IDBcblxuICAgIGRlYnVnU2hhcGVzID0gdHJ1ZVxuICAgIGNvbnRpbnVlID0gZmFsc2VcbiAgICBjdXJyZW50U3RhdGU/OiBJU3RhdGVcbiAgICBsYXN0RnJhbWVEZWx0YVRpbWUgPSAwXG4gICAgdGlja3MgPSAwXG4gICAgbWVkaWFuRnBzID0gMzBcbiAgICB0aW1lU2luY2VMZXZlbExvYWRlZCA9IDBcbiAgICBpbnB1dDoge1xuICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBjaGFyYWN0ZXJNb3ZlbWVudDogRU1vdmVtZW50XG4gICAgICAgICAgICBtZW51Q29uZmlybTogYm9vbGVhblxuICAgICAgICAgICAgdG9nZ2xlUGF1c2U6IGJvb2xlYW5cbiAgICAgICAgICAgIG1lbnVNb3ZlbWVudDogRU1vdmVtZW50XG4gICAgICAgIH1cbiAgICAgICAga2V5U3RhdGVzOiB7XG4gICAgICAgICAgICBba2V5OiBzdHJpbmddOiBFS2V5U3RhdGUgfCB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH0gPSB7XG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIGNoYXJhY3Rlck1vdmVtZW50OiBFTW92ZW1lbnQuaWRsZSxcbiAgICAgICAgICAgIG1lbnVDb25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIG1lbnVNb3ZlbWVudDogRU1vdmVtZW50LmlkbGUsXG4gICAgICAgICAgICB0b2dnbGVQYXVzZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGtleVN0YXRlczoge30sXG4gICAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJUmVjdCB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3OiBudW1iZXIsXG4gICAgaDogbnVtYmVyLFxufVxuXG5leHBvcnQgY2xhc3MgUmVjdCBpbXBsZW1lbnRzIElSZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHk6IG51bWJlcixcbiAgICAgICAgcHVibGljIHc6IG51bWJlcixcbiAgICAgICAgcHVibGljIGg6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBzdGF0aWMgY2hlY2tJbnRlcnNlY3RzKHIxOiBJUmVjdCwgcjI6IElSZWN0KSB7XG4gICAgICAgIHJldHVybiAhKHIyLnggPiByMS54K3IxLncgfHwgXG4gICAgICAgICAgICByMi54K3IyLncgPCByMS54IHx8IFxuICAgICAgICAgICAgcjIueSA+IHIxLnkrcjEuaCB8fFxuICAgICAgICAgICAgcjIueStyMi5oIDwgcjEueSk7XG4gICAgfVxufSIsImV4cG9ydCBlbnVtIEVUYWdzIHtcbiAgICB1aSxcbiAgICB0ZXJyYWluLFxuICAgIGNoYXJhY3RlcixcbiAgICBuZXR3b3JrT2JqZWN0LFxuICAgIHNhdmUsXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElWZWN0b3IyRCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFZlY3RvcjJEIGltcGxlbWVudHMgSVZlY3RvcjJEIHtcbiAgICBidWYgPSBuZXcgQXJyYXlCdWZmZXIoNCk7XG4gICAgZjMyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmJ1Zik7XG4gICAgdTMyID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuYnVmKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgeCA9IDAsXG4gICAgICAgIHB1YmxpYyB5ID0gMCxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgYWRkU2VsZih2ZWM6IFZlY3RvcjJEKSB7XG4gICAgICAgIHRoaXMueCArPSB2ZWMueDtcbiAgICAgICAgdGhpcy55ICs9IHZlYy55O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJTZWxmKHZlYzogVmVjdG9yMkQpIHtcbiAgICAgICAgdGhpcy54IC09IHZlYy54O1xuICAgICAgICB0aGlzLnkgLT0gdmVjLnk7XG4gICAgfVxuXG4gICAgcHVibGljIHNjYWxlKGZhY3RvcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCAqPSBmYWN0b3I7XG4gICAgICAgIHRoaXMueSAqPSBmYWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIG5vcm1hbGl6ZSgpIHtcbiAgICAgICAgY29uc3QgaW52ID0gdGhpcy5pbnZTcXJ0KCk7XG5cbiAgICAgICAgdGhpcy54ICo9IGludjtcbiAgICAgICAgdGhpcy55ICo9IGludjtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW52U3FydCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICAgICAgICBjb25zdCB4MiA9IDAuNSAqICh0aGlzLmYzMlswXSA9IHgpO1xuICAgICAgICB0aGlzLnUzMlswXSA9ICgweDVmMzc1OWRmIC0gKHRoaXMudTMyWzBdID4+IDEpKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmYzMlswXTtcbiAgICAgICAgeSAgPSB5ICogKCAxLjUgLSAoIHgyICogeSAqIHkgKSApOyAgIC8vIDFzdCBpdGVyYXRpb25cblxuICAgICAgICByZXR1cm4geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzdGFuY2UodG86IFZlY3RvcjJEKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gdG8ueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSB0by55IC0gdGhpcy55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzcXJEaXN0YW5jZSh0bzogVmVjdG9yMkQpIHtcbiAgICAgICAgY29uc3QgZHggPSB0by54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHRvLnkgLSB0aGlzLnk7XG4gICAgICAgIHJldHVybiBkeCpkeCArIGR5KmR5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzcXJMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgfVxuXG4gICAgcHVibGljIGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHZlY1plcm8gPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG5leHBvcnQgY29uc3QgdmVjT25lID0gbmV3IFZlY3RvcjJEKDEsIDEpO1xuZXhwb3J0IGNvbnN0IHZlY1VwID0gbmV3IFZlY3RvcjJEKDAsIDEpO1xuZXhwb3J0IGNvbnN0IHZlY0Rvd24gPSBuZXcgVmVjdG9yMkQoMCwgLTEpO1xuZXhwb3J0IGNvbnN0IHZlY0xlZnQgPSBuZXcgVmVjdG9yMkQoLTEsIDApO1xuZXhwb3J0IGNvbnN0IHZlY1JpZ2h0ID0gbmV3IFZlY3RvcjJEKDEsIDApOyIsImltcG9ydCB7U2hhcGUsIFNoYXBlUHJpbWl0aXZlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHtDb2xsaXNpb259IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbGxpc2lvblwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgVmVsb2NpdHkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi4vbW9kZWxzL3ZlY3RvcjJkXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWVzaFwiO1xuaW1wb3J0IHsgUm90YXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3RhdGlvblwiO1xuaW1wb3J0IHsgQ1RhZ01hcmtlciB9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBFVGFncyB9IGZyb20gXCIuLi9tb2RlbHMvdGFnc1wiO1xuXG4vLyBUaGlzIGNvdWxkIGFsc28gYmUgcHVyZSBKU09OLCBidXQgaW4gb3JkZXIgdG8gdXNlIFRTIHR5cGVzIGFuZCBoYXZlIHN0YXRpYyBjaGVja3MgaXQgaXMgcmVjb21tZW5kZWQgdG8gd3JpdGUgaXQgYXMgVFMgYXJyYXkuXG5leHBvcnQgY29uc3QgZ2FtZVByZWZhYiA9IFtcbiAgICB7XG4gICAgICAgIENvbGxpc2lvbjogPENvbGxpc2lvbj57fSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiA2MCxcbiAgICAgICAgICAgIHk6IDYwLFxuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eTogPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLCBcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNmZGZmMDMnXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgZGltZW5zaW9uczogPFZlY3RvcjJEPntcbiAgICAgICAgICAgICAgICB4OiAxMCxcbiAgICAgICAgICAgICAgICB5OiAxMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlLlJlY3QsXG4gICAgICAgIH0sXG4gICAgICAgIFJvdGF0aW9uOiA8Um90YXRpb24+e1xuICAgICAgICAgICAgdmFsdWU6IE1hdGguUEkgKiAzIC8gNFxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIENvbGxpc2lvbjogPENvbGxpc2lvbj57fSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAzMCxcbiAgICAgICAgICAgIHk6IDEwMCxcbiAgICAgICAgfSxcbiAgICAgICAgVmVsb2NpdHk6IDxWZWxvY2l0eT57XG4gICAgICAgICAgICB4OiAxMCxcbiAgICAgICAgICAgIHk6IDAsIFxuICAgICAgICB9LFxuICAgICAgICBNYXRlcmlhbDogPE1hdGVyaWFsPntcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZkZmYwMydcbiAgICAgICAgfSxcbiAgICAgICAgU2hhcGU6IDxTaGFwZT57XG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxuICAgICAgICAgICAgZGltZW5zaW9uczogPFZlY3RvcjJEPntcbiAgICAgICAgICAgICAgICB4OiAyMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgQ29sbGlzaW9uOiA8Q29sbGlzaW9uPnt9LFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDEwMCxcbiAgICAgICAgICAgIHk6IDUwLFxuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eTogPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLCBcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNmZGZmMDMnXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgbWVzaDogPE1lc2g+e1xuICAgICAgICAgICAgICAgIHZlcnRpY2llczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAtMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAtMTBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAtMTAsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAxMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAtNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDEwMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW1pdGl2ZTogU2hhcGVQcmltaXRpdmUuTWVzaCxcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IENUYWdNYXJrZXIgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtFQWN0aW9uc30gZnJvbSBcIi4uL2FwcC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQge1VJSXRlbX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcblxuLy8gVGhpcyBjb3VsZCBhbHNvIGJlIHB1cmUgSlNPTiwgYnV0IGluIG9yZGVyIHRvIHVzZSBUUyB0eXBlcyBhbmQgaGF2ZSBzdGF0aWMgY2hlY2tzIGl0IGlzIHJlY29tbWVuZGVkIHRvIHdyaXRlIGl0IGFzIFRTIGFycmF5LlxuZXhwb3J0IGNvbnN0IG1lbnVQcmVmYWIgPSBbXG4gICAgeyAvLyBUaXRsZVxuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4wNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4wNSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgY2FwdGlvbjogJ1BPTkcnLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiA2NCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgeyAvLyBTdWIgdGl0bGVcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMTIqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiB7XG4gICAgICAgICAgICBjYXB0aW9uOiAnQSBzaW0tZWNzIHVzYWdlIGRlbW8nLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4wNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4yKjEwMjQsXG4gICAgICAgIH0sXG4gICAgICAgIFVJSXRlbTogPFVJSXRlbT57XG4gICAgICAgICAgICBjYXB0aW9uOiAnSG93IHRvIHBsYXk6IExlZnQgcGFkZGxlOiBXL1MgOyBSaWdodCBwYWRkbGU6IFVwL0Rvd24gOyBQYXVzZTogRXNjYXBlJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMjQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMjQqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGNhcHRpb246ICdUaGUgZ2FtZSB3aWxsIGJlIHNhdmVkIHVwb24gcGF1c2luZyEnLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4xNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4zNSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5QbGF5LFxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGNhcHRpb246ICdQbGF5JyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMTUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuNCoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5Db250aW51ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBjYXB0aW9uOiAnQ29udGludWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDMyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4xNSoxMDI0LFxuICAgICAgICAgICAgeTogMC40NSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5FeGl0LFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGNhcHRpb246ICdFeGl0JyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5cbi8vIFRoaXMgY291bGQgYWxzbyBiZSBwdXJlIEpTT04sIGJ1dCBpbiBvcmRlciB0byB1c2UgVFMgdHlwZXMgYW5kIGhhdmUgc3RhdGljIGNoZWNrcyBpdCBpcyByZWNvbW1lbmRlZCB0byB3cml0ZSBpdCBhcyBUUyBhcnJheS5cbmV4cG9ydCBjb25zdCBwYXVzZVByZWZhYiA9IFtcbiAgICB7XG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4wNSxcbiAgICAgICAgICAgIHk6IDAuMDIsXG4gICAgICAgIH0sXG4gICAgICAgIFVJSXRlbTogPFVJSXRlbT57XG4gICAgICAgICAgICBjYXB0aW9uOiAn4p2a4p2aIFBBVVNFJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogNjQsXG4gICAgICAgIH1cbiAgICB9LFxuXTtcbiIsImltcG9ydCB7RVRhZ3N9IGZyb20gXCIuLi9tb2RlbHMvdGFnc1wiO1xuaW1wb3J0IHtDb2xsaXNpb259IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbGxpc2lvblwiO1xuaW1wb3J0IHtTaGFwZSwgU2hhcGVQcmltaXRpdmV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge1ZlbG9jaXR5fSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHtDVGFnTWFya2VyfSBmcm9tICdzaW0tZWNzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IENoYXJhY3RlciB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NoYXJhY3RlclwiO1xuXG5leHBvcnQgY29uc3Qgc2F2YWJsZVByZWZhYiA9IFtcbiAgICB7IC8vIENoYXJhY3RlclxuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLmNoYXJhY3RlcixcbiAgICAgICAgICAgIC8vIEVUYWdzLnNhdmVcbiAgICAgICAgXSxcbiAgICAgICAgQ2hhcmFjdGVyOiA8Q2hhcmFjdGVyPntcbiAgICAgICAgICAgIG5hbWU6ICdYdVBvSCdcbiAgICAgICAgfSxcbiAgICAgICAgVmVsb2NpdHk6IDxWZWxvY2l0eT57XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgQ29sbGlzaW9uOiA8Q29sbGlzaW9uPnt9LFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDI1MCxcbiAgICAgICAgICAgIHk6IDUwLFxuICAgICAgICB9LFxuICAgICAgICBTaGFwZTogPFNoYXBlPntcbiAgICAgICAgICAgIHpJbmRleDogMTEsXG4gICAgICAgICAgICBkaW1lbnNpb25zOiB7XG4gICAgICAgICAgICAgICAgeDogMzAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpbWl0aXZlOiBTaGFwZVByaW1pdGl2ZS5DaXJjbGVcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNjY2EnLFxuICAgICAgICB9LFxuICAgIH0sXG5dOyIsImltcG9ydCB7SVRyYW5zaXRpb25BY3Rpb25zLCBRdWVyeSwgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlLCBXaXRoLCBXaXRoVGFnfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtJbnB1dFN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvaW5wdXRcIjtcbmltcG9ydCB7UGF1c2VTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BhdXNlXCI7XG5pbXBvcnQge2dhbWVQcmVmYWJ9IGZyb20gXCIuLi9wcmVmYWJzL2dhbWVcIjtcbmltcG9ydCB7UG9zaXRpb259IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge1ZlbG9jaXR5fSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHtsb2FkfSBmcm9tIFwiLi4vYXBwL3BlcnNpc3RlbmNlXCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7UmVuZGVyR2FtZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLWdhbWVcIjtcbmltcG9ydCB7U2hhcGV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge1BoeXNpY3NTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BoeXNpY3NcIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQge0NvbGxpc2lvblN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXJTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7c2F2YWJsZVByZWZhYn0gZnJvbSBcIi4uL3ByZWZhYnMvc2F2YWJsZVwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBfc3lzdGVtcyA9IFtcbiAgICAgICAgQ29sbGlzaW9uU3lzdGVtLFxuICAgICAgICBJbnB1dFN5c3RlbSxcbiAgICAgICAgQ2hhcmFjdGVyU3lzdGVtLFxuICAgICAgICBQYXVzZVN5c3RlbSxcbiAgICAgICAgUGh5c2ljc1N5c3RlbSxcbiAgICAgICAgUmVuZGVyR2FtZVN5c3RlbSxcbiAgICAgICAgUmVuZGVyVUlTeXN0ZW0sXG4gICAgXTtcbiAgICBzYXZlRGF0YVByZWZhYkhhbmRsZT86IFRHcm91cEhhbmRsZTtcbiAgICBzdGF0aWNEYXRhUHJlZmFiSGFuZGxlPzogVEdyb3VwSGFuZGxlO1xuXG4gICAgYWN0aXZhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKS5jdXJyZW50U3RhdGUgPSB0aGlzO1xuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGljRGF0YVByZWZhYkhhbmRsZSA9IGNyZWF0ZU5ld0dhbWUoYWN0aW9ucyk7XG5cbiAgICAgICAgaWYgKGdhbWVTdG9yZS5jb250aW51ZSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlRGF0YVByZWZhYkhhbmRsZSA9IGxvYWQoYWN0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlID0gY3JlYXRlR2FtZUZyb21TYXZlRGF0YShhY3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGFjdGlvbnMuZmx1c2hDb21tYW5kcygpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGFjdGlvbnMuZ2V0RW50aXRpZXMobmV3IFF1ZXJ5KFtcbiAgICAgICAgICAgIFdpdGgoU2hhcGUpXG4gICAgICAgIF0pKSkge1xuICAgICAgICAgICAgZW50aXR5LmdldENvbXBvbmVudChTaGFwZSk/LmJ1aWxkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY3Rpb25zLmNvbW1hbmRzLnF1ZXVlQ29tbWFuZCgoKSA9PiBzZXRTY29yZUNhcHRpb25Nb2QoYWN0aW9ucykpO1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLm1haW50YWluKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljRGF0YVByZWZhYkhhbmRsZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5jb21tYW5kcy51bmxvYWRQcmVmYWIodGhpcy5zdGF0aWNEYXRhUHJlZmFiSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlKSB7XG4gICAgICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG5cbmNvbnN0IGNyZWF0ZU5ld0dhbWUgPSBmdW5jdGlvbiAoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgcmV0dXJuIGFjdGlvbnMuY29tbWFuZHMubG9hZChcbiAgICAgICAgU2VyaWFsRm9ybWF0LmZyb21BcnJheShnYW1lUHJlZmFiKSk7XG59O1xuXG5jb25zdCBjcmVhdGVHYW1lRnJvbVNhdmVEYXRhID0gZnVuY3Rpb24gKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgIHJldHVybiBhY3Rpb25zLmNvbW1hbmRzLmxvYWQoXG4gICAgICAgIFNlcmlhbEZvcm1hdC5mcm9tQXJyYXkoc2F2YWJsZVByZWZhYikpO1xufTtcblxuLy8gY29uc3Qgc2V0U2NvcmVDYXB0aW9uTW9kID0gZnVuY3Rpb24gKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuLy8gICAgIGNvbnN0IHNjb3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShTY29yZUJvYXJkKTtcblxuLy8gICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGFjdGlvbnMuZ2V0RW50aXRpZXMobmV3IFF1ZXJ5KFtXaXRoKFBhZGRsZSksIFdpdGgoVUlJdGVtKV0pKSkge1xuLy8gICAgICAgICBjb25zdCB1aSA9IGVudGl0eS5nZXRDb21wb25lbnQoVUlJdGVtKSE7XG4vLyAgICAgICAgIGNvbnN0IHBhZGRsZSA9IGVudGl0eS5nZXRDb21wb25lbnQoUGFkZGxlKSE7XG5cbi8vICAgICAgICAgaWYgKHBhZGRsZS5zaWRlID09IEVQYWRkbGVTaWRlLkxlZnQpIHtcbi8vICAgICAgICAgICAgIHVpLmNhcHRpb25Nb2QgPSBzdHJJbiA9PiBzdHJJbi5yZXBsYWNlKCd7fScsIHNjb3JlLmxlZnQudG9TdHJpbmcoKSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICB1aS5jYXB0aW9uTW9kID0gc3RySW4gPT4gc3RySW4ucmVwbGFjZSgne30nLCBzY29yZS5yaWdodC50b1N0cmluZygpKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH07XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHttZW51UHJlZmFifSBmcm9tIFwiLi4vcHJlZmFicy9tZW51XCI7XG5pbXBvcnQge0lucHV0U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9pbnB1dFwiO1xuaW1wb3J0IHtNZW51U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9tZW51XCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7R2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcblxuZXhwb3J0IGNsYXNzIE1lbnVTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBfc3lzdGVtcyA9IFtJbnB1dFN5c3RlbSwgTWVudVN5c3RlbSwgUmVuZGVyVUlTeXN0ZW1dO1xuICAgIHByZWZhYkhhbmRsZSE6IFRHcm91cEhhbmRsZTtcblxuICAgIGFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSkuY3VycmVudFN0YXRlID0gdGhpcztcbiAgICAgICAgdGhpcy5wcmVmYWJIYW5kbGUgPSBhY3Rpb25zLmNvbW1hbmRzLmxvYWQoU2VyaWFsRm9ybWF0LmZyb21BcnJheShtZW51UHJlZmFiKSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnByZWZhYkhhbmRsZSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtJbnB1dFN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvaW5wdXRcIjtcbmltcG9ydCB7UGF1c2VTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BhdXNlXCI7XG5pbXBvcnQge3BhdXNlUHJlZmFifSBmcm9tIFwiLi4vcHJlZmFicy9wYXVzZVwiO1xuaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHtzYXZlfSBmcm9tIFwiLi4vYXBwL3BlcnNpc3RlbmNlXCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7UmVuZGVyR2FtZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLWdhbWVcIjtcblxuZXhwb3J0IGNsYXNzIFBhdXNlU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgX3N5c3RlbXMgPSBbSW5wdXRTeXN0ZW0sIFBhdXNlU3lzdGVtLCBSZW5kZXJHYW1lU3lzdGVtLCBSZW5kZXJVSVN5c3RlbV07XG4gICAgcHJlZmFiSGFuZGxlITogVEdyb3VwSGFuZGxlO1xuXG5cbiAgICBhY3RpdmF0ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgICAgICBzYXZlKGFjdGlvbnMpO1xuXG4gICAgICAgIGdhbWVTdG9yZS5jdXJyZW50U3RhdGUgPSB0aGlzO1xuICAgICAgICB0aGlzLnByZWZhYkhhbmRsZSA9IGFjdGlvbnMuY29tbWFuZHMubG9hZChTZXJpYWxGb3JtYXQuZnJvbUFycmF5KHBhdXNlUHJlZmFiKSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnByZWZhYkhhbmRsZSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NUYWdNYXJrZXIsIElTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgUmVhZEVudGl0eSwgU3lzdGVtLCBXaXRoLCBXaXRoVGFnLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7U2hhcGV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge0NvbGxpc2lvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBFTW92ZW1lbnQsIEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgX2NoYXJhY3RlcjogV2l0aFRhZyhFVGFncy5jaGFyYWN0ZXIpLFxuICAgICAgICB2ZWxvY2l0eTogV3JpdGUoVmVsb2NpdHkpLFxuICAgIH0pO1xuXG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5nYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgfVxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMucXVlcnkuZXhlY3V0ZSgoe3ZlbG9jaXR5fSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHQgPSB0aGlzLmdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJNb3ZlbWVudDogbW92ZVxuICAgICAgICAgICAgfSA9IHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnM7XG5cbiAgICAgICAgICAgIGlmICgobW92ZSAmIEVNb3ZlbWVudC5sZWZ0KSA9PT0gRU1vdmVtZW50LmxlZnQpIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS54ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobW92ZSAmIEVNb3ZlbWVudC5yaWdodCkgPT09IEVNb3ZlbWVudC5yaWdodCkge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5LnggPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS54ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChtb3ZlICYgRU1vdmVtZW50LnVwKSA9PT0gRU1vdmVtZW50LnVwKSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkueSA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG1vdmUgJiBFTW92ZW1lbnQuZG93bikgPT09IEVNb3ZlbWVudC5kb3duKSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkueSA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5LnkgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2ZWxvY2l0eS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIHZlbG9jaXR5LnNjYWxlKGR0ICogMTAwMDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2ZWxvY2l0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBSZWFkRW50aXR5LCBTeXN0ZW0sIFdyaXRlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtTaGFwZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2hhcGVcIjtcbmltcG9ydCB7Q29sbGlzaW9ufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaXNpb25cIjtcbmltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9uU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICByZWFkb25seSBxdWVyeSA9IG5ldyBRdWVyeSh7XG4gICAgICAgIGNvbGxpc2lvbjogV3JpdGUoQ29sbGlzaW9uKSxcbiAgICAgICAgZW50aXR5OiBSZWFkRW50aXR5KCksXG4gICAgICAgIHBvc2l0aW9uOiBSZWFkKFZlY3RvcjJEKSxcbiAgICAgICAgc2hhcGU6IFJlYWQoU2hhcGUpXG4gICAgfSk7XG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVjdHMgPSBBcnJheS5mcm9tKHRoaXMucXVlcnkuaXRlcigpKVxuICAgICAgICAubWFwKCh7Y29sbGlzaW9uLCBlbnRpdHksIHBvc2l0aW9uLCBzaGFwZX0pID0+IHtcbiAgICAgICAgICAgIC8vIGlkZWFsbHksIHRoaXMgc2hvdWxkIGJlIHR3byBzZXBhcmF0ZSBzdGVwcyxcbiAgICAgICAgICAgIC8vIGJ1dCBKUyB3b3VsZCBsb29wIHR3aWNlLlxuICAgICAgICAgICAgLy8gQXMgYW4gb3B0aW1pemF0aW9uLCBJIHdpbGwgaW5jbHVkZVxuICAgICAgICAgICAgLy8gdGhpcyBkYXRhIGNoYW5nZSBpbnRvIHRoZSBtYXAoKSBmdW5jdGlvblxuICAgICAgICAgICAgY29sbGlzaW9uLmNvbGxpc2lvbk9iamVjdHMuY2xlYXIoKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5vY2N1cnJlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgeCx5LHcsaFxuICAgICAgICAgICAgfSA9IHNoYXBlLmdldEJCb3goKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25EYXRhOiBjb2xsaXNpb24sXG4gICAgICAgICAgICAgICAgZW50aXR5LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgICAgIGhlaWdodDogaCxcbiAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54ICsgeCxcbiAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55ICsgeSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb24gYmV0d2VlbiBhbGwgY29sbGlzaW9uLWVuYWJsZWQgc2hhcGVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QxID0gcmVjdHNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdDIgPSByZWN0c1tqXTtcblxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZWN0MS54IDwgcmVjdDIueCArIHJlY3QyLndpZHRoICYmXG4gICAgICAgICAgICAgICAgICAgIHJlY3QxLnggKyByZWN0MS53aWR0aCA+IHJlY3QyLnggJiZcbiAgICAgICAgICAgICAgICAgICAgcmVjdDEueSA8IHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVjdDEueSArIHJlY3QxLmhlaWdodCA+IHJlY3QyLnlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWN0MS5jb2xsaXNpb25EYXRhLm9jY3VycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN0MS5jb2xsaXNpb25EYXRhLm9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QxLmNvbGxpc2lvbkRhdGEuY29sbGlzaW9uT2JqZWN0cy5hZGQocmVjdDIuZW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVjdDIuY29sbGlzaW9uRGF0YS5vY2N1cnJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdDIuY29sbGlzaW9uRGF0YS5vY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN0Mi5jb2xsaXNpb25EYXRhLmNvbGxpc2lvbk9iamVjdHMuYWRkKHJlY3QxLmVudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBTeXN0ZW19IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0VNb3ZlbWVudCwgR2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcblxuZXhwb3J0IGVudW0gRUtleVN0YXRlIHtcbiAgICBEb3duLFxuICAgIFVwLFxufVxuXG5pbnRlcmZhY2UgSUlucHV0RXZlbnQge1xuICAgIGtleTogc3RyaW5nXG4gICAgdHlwZTogRUtleVN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dFN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuICAgIGlucHV0RXZlbnRzOiBJSW5wdXRFdmVudFtdID0gW107XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHRoaXMuaW5wdXRFdmVudHMucHVzaCh7a2V5OiBldmVudC5rZXksIHR5cGU6IEVLZXlTdGF0ZS5Eb3dufSkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB0aGlzLmlucHV0RXZlbnRzLnB1c2goe2tleTogZXZlbnQua2V5LCB0eXBlOiBFS2V5U3RhdGUuVXB9KSk7XG4gICAgfVxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHsgLy8gUmVzZXQgaW5wdXQgYWN0aW9uc1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51Q29uZmlybSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuaWRsZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMudG9nZ2xlUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHsgLy8gV29yayBvbiBhbGwgZXZlbnRzIHdoaWNoIG9jY3VycmVkIGR1cmluZyB0aGUgbGFzdCBmcmFtZVxuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiB0aGlzLmlucHV0RXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQua2V5U3RhdGVzW2V2ZW50LmtleV0gPSBldmVudC50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gRUtleVN0YXRlLkRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCB8PSBFTW92ZW1lbnQubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgfD0gRU1vdmVtZW50LnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1cnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCB8PSBFTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgfD0gRU1vdmVtZW50LmRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuZG93bjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudUNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMudG9nZ2xlUGF1c2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuaWRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1MnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LmRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuaWRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENsZWFyIGV2ZW50IHF1ZXVlXG4gICAgICAgIHRoaXMuaW5wdXRFdmVudHMubGVuZ3RoID0gMDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQge0VNb3ZlbWVudCwgR2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7RUFjdGlvbnN9IGZyb20gXCIuLi9hcHAvYWN0aW9uc1wiO1xuaW1wb3J0IHtHYW1lU3RhdGV9IGZyb20gXCIuLi9zdGF0ZXMvZ2FtZVwiO1xuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlcy9tZW51XCI7XG5cbmV4cG9ydCBjbGFzcyBNZW51U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICByZWFkb25seSBfc3RhdGVzID0gW1xuICAgICAgICBHYW1lU3RhdGUsXG4gICAgICAgIE1lbnVTdGF0ZVxuICAgIF1cblxuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgdWlJdGVtOiBXcml0ZShVSUl0ZW0pXG4gICAgfSk7XG5cbiAgICBhY3Rpb25zITogSVN5c3RlbUFjdGlvbnNcbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG4gICAgbWVudUFjdGlvbiA9IEVBY3Rpb25zLlBsYXk7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldHVwIE1lbnUnKTtcbiAgICB9XG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgLy8gdG9kbzogdXNlIGluZGV4XG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVNb3ZlbWVudCA9PSBFTW92ZW1lbnQuZG93bikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm1lbnVBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLlBsYXk6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLkNvbnRpbnVlOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLkNvbnRpbnVlOiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5FeGl0OyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLkV4aXQ6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLlBsYXk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBY3Rpb24gJHt0aGlzLm1lbnVBY3Rpb259IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPT0gRU1vdmVtZW50LnVwKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubWVudUFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgRUFjdGlvbnMuUGxheTogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuRXhpdDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5Db250aW51ZTogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuUGxheTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5FeGl0OiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5Db250aW51ZTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFjdGlvbiAke3RoaXMubWVudUFjdGlvbn0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVDb25maXJtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZW51QWN0aW9uID09IEVBY3Rpb25zLlBsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucHVzaFN0YXRlKEdhbWVTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1lbnVBY3Rpb24gPT0gRUFjdGlvbnMuQ29udGludWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmUnKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdTb3JyeSB5b3Ugd2VyZW50IHNhdmVkIGxvbCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jb21tYW5kcy5wdXNoU3RhdGUoR2FtZVN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jb21tYW5kcy5zdG9wUnVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3Qge3VpSXRlbX0gb2YgdGhpcy5xdWVyeS5pdGVyKCkpIHtcbiAgICAgICAgICAgIHVpSXRlbS5hY3RpdmUgPSB1aUl0ZW0uYWN0aW9uID09IHRoaXMubWVudUFjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBTeXN0ZW19IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge0dhbWVTdGF0ZX0gZnJvbSBcIi4uL3N0YXRlcy9nYW1lXCI7XG5pbXBvcnQge1BhdXNlU3RhdGV9IGZyb20gXCIuLi9zdGF0ZXMvcGF1c2VcIjtcblxuXG5leHBvcnQgY2xhc3MgUGF1c2VTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGFjdGlvbnMhOiBJU3lzdGVtQWN0aW9uc1xuICAgIGdhbWVTdG9yZSE6IEdhbWVTdG9yZTtcblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgIH1cblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCBpc0dhbWVTdGF0ZSA9IHRoaXMuZ2FtZVN0b3JlLmN1cnJlbnRTdGF0ZT8uY29uc3RydWN0b3IgPT0gR2FtZVN0YXRlO1xuICAgICAgICBjb25zdCBpc1BhdXNlU3RhdGUgPSB0aGlzLmdhbWVTdG9yZS5jdXJyZW50U3RhdGU/LmNvbnN0cnVjdG9yID09IFBhdXNlU3RhdGU7XG5cbiAgICAgICAgaWYgKCFpc0dhbWVTdGF0ZSAmJiAhaXNQYXVzZVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy50b2dnbGVQYXVzZSkge1xuICAgICAgICAgICAgaWYgKGlzR2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnB1c2hTdGF0ZShQYXVzZVN0YXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnBvcFN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7VmVsb2NpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcblxuXG5leHBvcnQgY2xhc3MgUGh5c2ljc1N5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBwb3M6IFdyaXRlKFBvc2l0aW9uKSxcbiAgICAgICAgdmVsOiBSZWFkKFZlbG9jaXR5KSxcbiAgICB9KTtcblxuICAgIHJ1bihfOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCBkdCA9IDAuMDE2O1xuXG4gICAgICAgIHRoaXMucXVlcnkuZXhlY3V0ZSgoe3BvcywgdmVsfSkgPT4ge1xuICAgICAgICAgICAgcG9zLnggKz0gdmVsLnggKiBkdDtcbiAgICAgICAgICAgIHBvcy55ICs9IHZlbC55ICogZHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBTeXN0ZW19IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge1NoYXBlLCBTaGFwZVByaW1pdGl2ZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2hhcGVcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgSVJlY3QsIFJlY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3JlY3RcIjtcblxuY29uc3QgVFdPUEkgPSBNYXRoLlBJICogMjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlckdhbWVTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgcG9zOiBSZWFkKFBvc2l0aW9uKSxcbiAgICAgICAgc2hhcGU6IFJlYWQoU2hhcGUpLFxuICAgICAgICBtYXRlcmlhbDogUmVhZChNYXRlcmlhbCksXG4gICAgfSk7XG5cbiAgICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICB9XG5cbiAgICBydW5zID0gMDtcblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCB2aWV3cG9ydDogSVJlY3QgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHc6IHRoaXMuY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgIGg6IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaXRlciA9IEFycmF5LmZyb20odGhpcy5xdWVyeS5pdGVyKCkpO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmRyYXdhYmxlcyA9IGl0ZXIubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IGRyYXdhYmxlcyA9IGl0ZXIuZmlsdGVyKFxuICAgICAgICAgICAgKHtwb3MsIHNoYXBlfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmJveCA9IHNoYXBlLmdldEJCb3goKTtcbiAgICAgICAgICAgIGNvbnN0IHI6IElSZWN0ID0ge1xuICAgICAgICAgICAgICAgIHg6IHBvcy54ICsgYmJveC54LFxuICAgICAgICAgICAgICAgIHk6IHBvcy55ICsgYmJveC55LFxuICAgICAgICAgICAgICAgIHc6IGJib3gudyxcbiAgICAgICAgICAgICAgICBoOiBiYm94LmgsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBpblZpZXcgPSBSZWN0LmNoZWNrSW50ZXJzZWN0cyhyLCB2aWV3cG9ydCk7XG5cbiAgICAgICAgICAgIHJldHVybiBpblZpZXc7XG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KCh7c2hhcGU6IGF9LCB7c2hhcGU6IGJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYS56SW5kZXggLSBiLnpJbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RvcmUucmVuZGVyZWQgPSBkcmF3YWJsZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhd2FibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7cG9zLCBzaGFwZSwgbWF0ZXJpYWx9ID0gZHJhd2FibGVzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRyYXdTaGFwZShwb3MsIHNoYXBlLCBtYXRlcmlhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3U2hhcGUocG9zOiBQb3NpdGlvbiwgc2hhcGU6IFNoYXBlLCBtYXRlcmlhbDogTWF0ZXJpYWwpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgeDogdywgeTogaFxuICAgICAgICB9ID0gc2hhcGUuZGltZW5zaW9ucztcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB4LCB5XG4gICAgICAgIH0gPSBwb3M7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FtZVN0b3JlLmRlYnVnU2hhcGVzKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gJzFyZW0gQXJpYWwnO1xuICAgICAgICAgICAgY29uc3QgdHh0ID0gYFo9JHtzaGFwZS56SW5kZXh9YDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHR4dCwgeCwgeS0zMCk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyNmMGYnO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHg6YngseTpieSx3OmJ3LGg6YmhcbiAgICAgICAgICAgIH0gPSBzaGFwZS5nZXRCQm94KCk7XG4gICAgICAgICAgICBjb25zdCBwYWRkaW5nID0gNTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KFxuICAgICAgICAgICAgICAgIHggKyBieCAtIHBhZGRpbmcsXG4gICAgICAgICAgICAgICAgeSArIGJ5IC0gcGFkZGluZyxcbiAgICAgICAgICAgICAgICBidyArIHBhZGRpbmcqMixcbiAgICAgICAgICAgICAgICBiaCArIHBhZGRpbmcqMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IG1hdGVyaWFsIG9wdGlvbnNcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gbWF0ZXJpYWwuY29sb3I7XG5cbiAgICAgICAgaWYgKHNoYXBlLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuUmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgdywgaCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5DaXJjbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguYXJjKHgsIHksIHcvMiwgMCwgVFdPUEkpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuTWVzaFxuICAgICAgICAgICAgJiYgc2hhcGUubWVzaCkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgIGkgPCBzaGFwZS5tZXNoLnZlcnRpY2llcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgKytpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7eDpkeCwgeTpkeX0gPSBzaGFwZS5tZXNoLnZlcnRpY2llc1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCtkeCwgeStkeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbmltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBTeXN0ZW0sIFdpdGgsIFdpdGhUYWd9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge1VJSXRlbX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgR2FtZVN0b3JlIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQgeyBFVGFncyB9IGZyb20gXCIuLi9tb2RlbHMvdGFnc1wiO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyVUlTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgX3RhZzogV2l0aFRhZyhFVGFncy51aSksXG4gICAgICAgIHBvczogUmVhZChQb3NpdGlvbiksXG4gICAgICAgIHVpOiBSZWFkKFVJSXRlbSlcbiAgICB9KTtcblxuICAgIGN0eCE6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICB0b1NjcmVlbkNvb3JkcyE6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gW251bWJlciwgbnVtYmVyXTtcblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmN0eCA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgICB9XG5cbiAgICBydW5zID0gMDtcblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuICAgICAgICBjb25zdCBnYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG5cbiAgICAgICAgdGhpcy5xdWVyeS5leGVjdXRlKCh7cG9zLCB1aX0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHVpLmFjdGl2ZVxuICAgICAgICAgICAgICAgID8gdWkuYWN0aXZlQ29sb3IgPz8gJ3JlZCdcbiAgICAgICAgICAgICAgICA6IHVpLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHVpLmFjdGl2ZVxuICAgICAgICAgICAgICAgID8gYCR7dWkuZm9udFNpemUgKiAxLjJ9cHggc2VyaWZgXG4gICAgICAgICAgICAgICAgOiBgJHt1aS5mb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh1aS5maW5hbENhcHRpb24sIHBvcy54LCBwb3MueSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigxMCpnYW1lU3RvcmUudGltZVNpbmNlTGV2ZWxMb2FkZWQpLzEwLjBcbiAgICAgICAgICAgIH0gcy5gLFxuICAgICAgICAgICAgdGhpcy5jdHguY2FudmFzLndpZHRoIC0gMjAwLCAyMFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihnYW1lU3RvcmUubWVkaWFuRnBzKzAuNSlcbiAgICAgICAgICAgIH0gRlBTYCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgNjBcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICAgIGAke2dhbWVTdG9yZS5yZW5kZXJlZH0gLyAke2dhbWVTdG9yZS5kcmF3YWJsZXN9YCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgMTAwXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHN0ciA9IGdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50LnRvU3RyaW5nKDIpO1xuICAgICAgICBzdHIgPSAnMCcucmVwZWF0KDQgLSBzdHIubGVuZ3RoKSArIHN0cjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgICAgICBgJHtzdHJ9YCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgMTQwXG4gICAgICAgIClcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2l0eWxpZ2h0c1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaXR5bGlnaHRzXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19zaW0tZWNzX2Rpc3RfaW5kZXhfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==