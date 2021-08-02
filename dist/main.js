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
const pause_1 = __webpack_require__(/*! ../states/pause */ "./src/states/pause.ts");
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
    var _a;
    const gameStore = actions.getResource(game_store_1.GameStore);
    const isPauseState = ((_a = gameStore.currentState) === null || _a === void 0 ? void 0 : _a.constructor) == pause_1.PauseState;
    if (!isPauseState) {
        gameStore.lastFrameDeltaTime = hrtimeToSeconds(hrtime(lastTransition));
        if (gameStore.lastFrameDeltaTime > 0.1) {
            gameStore.lastFrameDeltaTime = 0.1;
        }
        gameStore.timeSinceLevelLoaded +=
            gameStore.lastFrameDeltaTime;
        deltaSum += gameStore.lastFrameDeltaTime;
        gameStore.medianFps = ++gameStore.ticks / deltaSum;
        lastTransition = hrtime();
    }
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

/***/ "./src/app/util.ts":
/*!*************************!*\
  !*** ./src/app/util.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lerp = exports.PIXELS_PER_METER = exports.drawPoint = exports.TWOPI = void 0;
exports.TWOPI = Math.PI * 2;
const drawPoint = (ctx, x, y, size = 0.1) => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.arc(x, y, size, 0, exports.TWOPI);
    ctx.fill();
};
exports.drawPoint = drawPoint;
exports.PIXELS_PER_METER = 32;
const lerp = (value1, value2, amount) => {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
};
exports.lerp = lerp;


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

/***/ "./src/components/physics-bridge.ts":
/*!******************************************!*\
  !*** ./src/components/physics-bridge.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhysicsBridge = void 0;
class PhysicsBridge {
    constructor(bodyPtr = null) {
        this.bodyPtr = bodyPtr;
    }
}
exports.PhysicsBridge = PhysicsBridge;


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
exports.Shape = exports.ShapePivotNames = exports.ShapePivot = exports.ShapePrimitive = void 0;
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
exports.ShapePivotNames = {
    [ShapePivot.TopLeft]: 'TopLeft',
    [ShapePivot.TopMiddle]: 'TopMiddle',
    [ShapePivot.TopRight]: 'TopRight',
    [ShapePivot.Left]: 'Left',
    [ShapePivot.Middle]: 'Middle',
    [ShapePivot.Right]: 'Right',
    [ShapePivot.BottomLeft]: 'BottomLeft',
    [ShapePivot.BottomMiddle]: 'BottomMiddle',
    [ShapePivot.BottomRight]: 'BottomRight',
};
class Shape {
    constructor(zIndex = 0, pivot = ShapePivot.Middle, offsetX = 0, offsetY = 0, dimensions = vector2d_1.vecZero, primitive = ShapePrimitive.Rect, mesh = null) {
        this.zIndex = zIndex;
        this.pivot = pivot;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.dimensions = dimensions;
        this.primitive = primitive;
        this.mesh = mesh;
        this.bBox = new rect_1.Rect(0, 0, 0, 0);
        this.isBuilt = false;
    }
    build() {
        if (this.isBuilt)
            return;
        if (this.primitive === ShapePrimitive.Mesh && !this.mesh) {
            throw new Error('Shapes with mesh primitive\
                must provide a mesh data');
        }
        if (this.primitive !== ShapePrimitive.Mesh && !this.dimensions) {
            console.error('dimensions:', this.dimensions, 'primitive:', this.primitive, 'mesh:', this.mesh);
            throw new Error('Shapes with non-mesh primitive\
                must provide dimensions');
        }
        let minX = 0, minY = 0, maxX = 0, maxY = 0;
        if (this.primitive === ShapePrimitive.Circle) {
            const d = this.dimensions.x;
            const rad = d / 2;
            this.bBox.x = -rad;
            this.bBox.y = -rad;
            this.bBox.w = d;
            this.bBox.h = d;
        }
        else if (this.primitive === ShapePrimitive.Rect) {
            this.bBox.x = -this.dimensions.x / 2;
            this.bBox.y = -this.dimensions.y / 2;
            this.bBox.w = this.dimensions.x;
            this.bBox.h = this.dimensions.y;
        }
        else if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            minX = this.mesh.verticies[0].x;
            minY = this.mesh.verticies[0].y;
            maxX = this.mesh.verticies[0].x;
            maxY = this.mesh.verticies[0].y;
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
            this.bBox.w = maxX - minX;
            this.bBox.h = maxY - minY;
            this.bBox.x = -this.bBox.w / 2;
            this.bBox.y = -this.bBox.h / 2;
        }
        if (this.pivot === ShapePivot.TopLeft) {
            this.bBox.x += this.bBox.w / 2;
            this.bBox.y += this.bBox.h / 2;
        }
        else if (this.pivot === ShapePivot.TopMiddle) {
            this.bBox.y += this.bBox.h / 2;
        }
        else if (this.pivot === ShapePivot.TopRight) {
            this.bBox.x -= this.bBox.w / 2;
            this.bBox.y += this.bBox.h / 2;
        }
        else if (this.pivot === ShapePivot.Left) {
            this.bBox.x += this.bBox.w / 2;
        }
        else if (this.pivot === ShapePivot.Right) {
            this.bBox.x -= this.bBox.w / 2;
        }
        else if (this.pivot === ShapePivot.BottomLeft) {
            this.bBox.x += this.bBox.w / 2;
            this.bBox.y -= this.bBox.h / 2;
        }
        else if (this.pivot === ShapePivot.BottomMiddle) {
            this.bBox.y -= this.bBox.h / 2;
        }
        else if (this.pivot === ShapePivot.BottomRight) {
            this.bBox.x -= this.bBox.w / 2;
            this.bBox.y -= this.bBox.h / 2;
        }
        if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            for (let i = 0; i < this.mesh.verticies.length; ++i) {
                this.mesh.verticies[i].x += (this.bBox.x - minX);
                this.mesh.verticies[i].y += (this.bBox.y - minY);
            }
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
    constructor(x, y, angular) {
        super(x, y);
        this.angular = angular;
    }
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
__webpack_require__(/*! ./server */ "./src/server.ts");
const topdown_1 = __webpack_require__(/*! ./levels/topdown */ "./src/levels/topdown.ts");
__webpack_require__(/*! ./scss/app.scss */ "./src/scss/app.scss");
const server_1 = __webpack_require__(/*! ./server */ "./src/server.ts");
const _fetch = window.fetch;
window.fetch = (input, init) => {
    if ((init === null || init === void 0 ? void 0 : init.credentials) === 'same-origin') {
        delete init.credentials;
    }
    console.log(input, init);
    return _fetch(input, init);
};
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
    const box2D = await server_1.loadPhysics();
    const options = Object.keys(levels)
        .map((e, i) => (`${i + 1}) ${e}`));
    options.push('exit (or empty)');
    let requestedLevel = 'topdown';
    while (requestedLevel !== 'exit') {
        const level = requestedLevel;
        let world = new levels[level](box2D);
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
    constructor(physics, name) {
        this.physics = physics;
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
const physics_bridge_1 = __webpack_require__(/*! ../components/physics-bridge */ "./src/components/physics-bridge.ts");
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const rotation_1 = __webpack_require__(/*! ../components/rotation */ "./src/components/rotation.ts");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const ui_item_1 = __webpack_require__(/*! ../components/ui-item */ "./src/components/ui-item.ts");
const velocity_1 = __webpack_require__(/*! ../components/velocity */ "./src/components/velocity.ts");
const camera_1 = __webpack_require__(/*! ../models/camera */ "./src/models/camera.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const camera_2 = __webpack_require__(/*! ../systems/camera */ "./src/systems/camera.ts");
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
    constructor(physics) {
        super(physics, 'topdown');
        const { b2Vec2, b2World } = physics;
        const gravity = new b2Vec2(0, 9.81);
        const physWorld = new b2World(gravity);
        this.world.addResource(physWorld);
        const zero = new b2Vec2(0, 0);
        const gameStore = new game_store_1.GameStore();
        gameStore.physicsNamespace = physics;
        gameStore.physicsZero = zero;
        const camera = new camera_1.Camera();
        this.world.addResource(gameStore);
        this.world.addResource(camera);
    }
    destroy() {
        super.destroy();
        const { physicsNamespace, physicsZero } = this.world.getResource(game_store_1.GameStore);
        const physicsWorld = this.world.getResource(physicsNamespace.b2World);
        physicsNamespace.destroy(physicsWorld);
        physicsNamespace.destroy(physicsZero);
        const ctx = this.world.getResource(CanvasRenderingContext2D);
        ctx.fillStyle = '#ececec';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    createWorld() {
        return new sim_ecs_1.ECS()
            .buildWorld()
            .withSystem(camera_2.CameraSystem, [
            character_2.CharacterSystem
        ])
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
            .withComponents(collision_1.Collision, material_1.Material, mesh_1.Mesh, position_1.Position, rotation_1.Rotation, shape_1.Shape, ui_item_1.UIItem, velocity_1.Velocity, character_1.Character, physics_bridge_1.PhysicsBridge)
            .build();
    }
}
exports.Topdown = Topdown;


/***/ }),

/***/ "./src/models/camera.ts":
/*!******************************!*\
  !*** ./src/models/camera.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Camera = exports.CameraFollowMethod = void 0;
var CameraFollowMethod;
(function (CameraFollowMethod) {
    CameraFollowMethod[CameraFollowMethod["Immediate"] = 0] = "Immediate";
    CameraFollowMethod[CameraFollowMethod["Smooth"] = 1] = "Smooth";
    CameraFollowMethod[CameraFollowMethod["Elastic"] = 2] = "Elastic";
})(CameraFollowMethod = exports.CameraFollowMethod || (exports.CameraFollowMethod = {}));
class Camera {
    constructor(x = 0, y = 0, offset = {
        x: 0,
        y: 0,
    }, vel = {
        x: 0,
        y: 0
    }, zoom = 1, rotation = 0, follow, elasticity = 0.01, friction = 0.15) {
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.vel = vel;
        this.zoom = zoom;
        this.rotation = rotation;
        this.follow = follow;
        this.elasticity = elasticity;
        this.friction = friction;
    }
}
exports.Camera = Camera;


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
        this.wasBlurred = false;
        this.wasIntentionallyPaused = false;
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
            wheel: 0,
            cursorPos: { x: -1, y: -1 },
            cursorPosWorld: { x: -1, y: -1 },
            keyStates: new Map(),
            mouseStates: new Map(),
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
    static checkPointInside(r, { x, y }) {
        return !(x < r.x ||
            x > r.x + r.w ||
            y < r.y ||
            y > r.y + r.h);
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
            x: 0,
            y: 0,
        },
        Rotation: {
            value: 0
        },
        Velocity: {
            x: 1.5,
            y: 0,
        },
        Material: {
            color: '#fdff03'
        },
        Shape: {
            dimensions: {
                x: 2,
                y: 0.7,
            },
            pivot: shape_1.ShapePivot.TopLeft,
            primitive: shape_1.ShapePrimitive.Rect,
        },
    },
    {
        Collision: {},
        Position: {
            x: 1,
            y: 3,
        },
        Rotation: {
            value: 0
        },
        Velocity: {
            x: 2,
            y: 0,
        },
        Material: {
            color: '#fdff03'
        },
        Shape: {
            zIndex: 10,
            pivot: shape_1.ShapePivot.TopLeft,
            dimensions: {
                x: 0.7,
            },
            primitive: shape_1.ShapePrimitive.Circle,
        },
    },
    {
        Collision: {},
        Position: {
            x: 18,
            y: 0,
        },
        Rotation: {
            value: 7 * Math.PI / 4
        },
        Velocity: {
            x: 0,
            y: 0,
        },
        Material: {
            color: '#0bb'
        },
        Shape: {
            pivot: shape_1.ShapePivot.Middle,
            mesh: {
                verticies: [
                    {
                        x: -3,
                        y: -1.25
                    },
                    {
                        x: 0.31,
                        y: -0.31,
                    },
                    {
                        x: 0,
                        y: 0.31
                    },
                    {
                        x: -1.6,
                        y: 3
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pausePrefab = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const tags_1 = __webpack_require__(/*! ../models/tags */ "./src/models/tags.ts");
exports.pausePrefab = [
    {
        [sim_ecs_1.CTagMarker]: [
            tags_1.ETags.ui
        ],
        Position: {
            x: 50,
            y: 30,
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
            angular: 0,
        },
        Collision: {},
        Rotation: {
            value: 0
        },
        Position: {
            x: 0,
            y: 0,
        },
        Shape: {
            zIndex: 11,
            dimensions: {
                x: 1,
            },
            pivot: shape_1.ShapePivot.Middle,
            primitive: shape_1.ShapePrimitive.Circle
        },
        Material: {
            color: '#cca',
        },
    },
];


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadPhysics = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const box2d_wasm_1 = tslib_1.__importDefault(__webpack_require__(/*! box2d-wasm */ "./node_modules/box2d-wasm/dist/es/entry.js"));
const loadPhysics = async () => {
    return box2d_wasm_1.default().then((box2D) => {
        return box2D;
    });
};
exports.loadPhysics = loadPhysics;


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
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const persistence_1 = __webpack_require__(/*! ../app/persistence */ "./src/app/persistence.ts");
const render_ui_1 = __webpack_require__(/*! ../systems/render-ui */ "./src/systems/render-ui.ts");
const render_game_1 = __webpack_require__(/*! ../systems/render-game */ "./src/systems/render-game.ts");
const shape_1 = __webpack_require__(/*! ../components/shape */ "./src/components/shape.ts");
const physics_1 = __webpack_require__(/*! ../systems/physics */ "./src/systems/physics.ts");
const collision_1 = __webpack_require__(/*! ../systems/collision */ "./src/systems/collision.ts");
const character_1 = __webpack_require__(/*! ../systems/character */ "./src/systems/character.ts");
const savable_1 = __webpack_require__(/*! ../prefabs/savable */ "./src/prefabs/savable.ts");
const physics_bridge_1 = __webpack_require__(/*! ../components/physics-bridge */ "./src/components/physics-bridge.ts");
const camera_1 = __webpack_require__(/*! ../systems/camera */ "./src/systems/camera.ts");
class GameState extends sim_ecs_1.State {
    constructor() {
        super(...arguments);
        this._systems = [
            physics_1.PhysicsSystem,
            character_1.CharacterSystem,
            collision_1.CollisionSystem,
            input_1.InputSystem,
            camera_1.CameraSystem,
            pause_1.PauseSystem,
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
        const { b2World, b2CircleShape, b2Shape, b2PolygonShape, b2BodyDef, b2_dynamicBody, b2Vec2, destroy, } = gameStore.physicsNamespace;
        const physWorld = actions.getResource(b2World);
        const zero = gameStore.physicsZero;
        let physShape = null;
        for (const entity of actions.getEntities(new sim_ecs_1.Query([
            sim_ecs_1.With(shape_1.Shape),
            sim_ecs_1.With(position_1.Position),
            sim_ecs_1.With(physics_bridge_1.PhysicsBridge)
        ]))) {
            const pos = entity.getComponent(position_1.Position);
            const shape = entity.getComponent(shape_1.Shape);
            const physicsBridge = entity.getComponent(physics_bridge_1.PhysicsBridge);
            console.log('Adding to physics world:', pos, shape);
            const vec = new b2Vec2(pos.x, pos.y);
            const bd = new b2BodyDef();
            const { w, h } = shape.getBBox();
            if (shape.primitive === shape_1.ShapePrimitive.Rect) {
                const _shape = new b2PolygonShape();
                _shape.SetAsBox(w, h);
                physShape = _shape;
            }
            else if (shape.primitive === shape_1.ShapePrimitive.Circle) {
                const _shape = new b2CircleShape();
                _shape.set_m_radius(shape.dimensions.x / 2);
                physShape = _shape;
            }
            else {
                console.error(shape.primitive, 'is not supported by physics now');
            }
            if (physShape) {
                bd.set_type(b2_dynamicBody);
                bd.set_position(vec);
                const body = physWorld.CreateBody(bd);
                vec.Set(0, 0);
                body.SetTransform(vec, 0);
                body.CreateFixture(physShape, 1);
                destroy(vec);
                destroy(physShape);
                body.SetLinearVelocity(zero);
                body.SetAwake(true);
                body.SetEnabled(true);
                physicsBridge.bodyPtr = body;
            }
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
        const { physicsNamespace: { b2World, destroy } } = actions.getResource(game_store_1.GameStore);
        destroy(actions.getResource(b2World));
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

/***/ "./src/systems/camera.ts":
/*!*******************************!*\
  !*** ./src/systems/camera.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CameraSystem = void 0;
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const camera_1 = __webpack_require__(/*! ../models/camera */ "./src/models/camera.ts");
const util_1 = __webpack_require__(/*! ../app/util */ "./src/app/util.ts");
class CameraSystem extends sim_ecs_1.System {
    setup(actions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.camera = actions.getResource(camera_1.Camera);
    }
    run(_) {
        if (this.camera.rotation > 2 * Math.PI) {
            this.camera.rotation -= 2 * Math.PI;
        }
        if (this.camera.rotation < -2 * Math.PI) {
            this.camera.rotation += 2 * Math.PI;
        }
        if (this.camera.zoom < 0.1) {
            this.camera.zoom = 0.1;
        }
        if (this.camera.zoom > 1.5) {
            this.camera.zoom = 1.5;
        }
        const { follow, offset, } = this.camera;
        if (!follow)
            return;
        const { target, method, } = follow;
        let tx = target.x;
        let ty = target.y;
        offset.x = -this.ctx.canvas.width / (2 * this.camera.zoom * util_1.PIXELS_PER_METER);
        ;
        offset.y = -this.ctx.canvas.height / (2 * this.camera.zoom * util_1.PIXELS_PER_METER);
        if (method === camera_1.CameraFollowMethod.Immediate) {
            this.camera.x = tx;
            this.camera.y = ty;
        }
        else if (method === camera_1.CameraFollowMethod.Smooth) {
            this.camera.x = util_1.lerp(this.camera.x, tx, 0.01);
            this.camera.y = util_1.lerp(this.camera.y, ty, 0.01);
        }
        else if (method === camera_1.CameraFollowMethod.Elastic) {
            const dx = (tx - this.camera.x) * this.camera.elasticity;
            const dy = (ty - this.camera.y) * this.camera.elasticity;
            this.camera.vel.x += dx;
            this.camera.vel.y += dy;
            const fx = -this.camera.friction * this.camera.vel.x;
            const fy = -this.camera.friction * this.camera.vel.y;
            this.camera.vel.x += fx;
            this.camera.vel.y += fy;
            this.camera.x += this.camera.vel.x / this.camera.zoom;
            this.camera.y += this.camera.vel.y / this.camera.zoom;
        }
    }
}
exports.CameraSystem = CameraSystem;


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
const position_1 = __webpack_require__(/*! ../components/position */ "./src/components/position.ts");
const camera_1 = __webpack_require__(/*! ../models/camera */ "./src/models/camera.ts");
const util_1 = __webpack_require__(/*! ../app/util */ "./src/app/util.ts");
class CharacterSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            _character: sim_ecs_1.WithTag(tags_1.ETags.character),
            pos: sim_ecs_1.Read(position_1.Position),
            velocity: sim_ecs_1.Write(velocity_1.Velocity),
        });
        this.runs = 0;
    }
    setup(actions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(game_store_1.GameStore);
        this.camera = actions.getResource(camera_1.Camera);
        this.camera.elasticity = 0.008;
        this.camera.follow = {
            method: camera_1.CameraFollowMethod.Elastic,
            target: {
                x: this.camera.x,
                y: this.camera.y,
            },
            prevX: this.camera.x,
            prevY: this.camera.y,
        };
    }
    run(actions) {
        this.camera.zoom += this.gameStore.input.wheel / 10;
        this.query.execute(({ pos, velocity }) => {
            this.camera.follow.target = pos;
            const dt = this.gameStore.lastFrameDeltaTime;
            const { characterMovement: move } = this.gameStore.input.actions;
            const isLeft = (move & game_store_1.EMovement.left) === game_store_1.EMovement.left;
            const isRight = (move & game_store_1.EMovement.right) === game_store_1.EMovement.right;
            velocity.x = 0;
            if (isLeft && !isRight) {
                velocity.x = -1;
            }
            if (isRight && !isLeft) {
                velocity.x = 1;
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
            velocity.scale(dt * 1000 * 10 / util_1.PIXELS_PER_METER);
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
exports.InputSystem = exports.EMouseState = exports.EKeyState = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const KeyCode = tslib_1.__importStar(__webpack_require__(/*! keycode-js */ "./node_modules/keycode-js/dist/keycode.esm.js"));
const sim_ecs_1 = __webpack_require__(/*! sim-ecs */ "./node_modules/sim-ecs/dist/index.js");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
var EKeyState;
(function (EKeyState) {
    EKeyState[EKeyState["Down"] = 0] = "Down";
    EKeyState[EKeyState["Up"] = 1] = "Up";
})(EKeyState = exports.EKeyState || (exports.EKeyState = {}));
var EMouseState;
(function (EMouseState) {
    EMouseState[EMouseState["Down"] = 0] = "Down";
    EMouseState[EMouseState["Up"] = 1] = "Up";
    EMouseState[EMouseState["Move"] = 2] = "Move";
})(EMouseState = exports.EMouseState || (exports.EMouseState = {}));
class InputSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.inputEvents = [];
        this.mouseEvents = [];
        this.wheelEvents = [];
        this.listeners = {
            wheel: (e) => (this.wheelEvents.push(-e.deltaY / 125)),
            keydown: (e) => this.inputEvents.push({
                code: e.code,
                type: EKeyState.Down
            }),
            keyup: (e) => this.inputEvents.push({
                code: e.code,
                type: EKeyState.Up
            }),
            mousedown: (e) => this.mouseEvents.push({
                button: e.button,
                type: EMouseState.Down,
                x: e.clientX,
                y: e.clientY,
            }),
            mouseup: (e) => this.mouseEvents.push({
                button: e.button,
                type: EMouseState.Up,
                x: e.clientX,
                y: e.clientY,
            }),
            mousemove: (e) => this.mouseEvents.push({
                button: e.button,
                type: EMouseState.Move,
                x: e.clientX,
                y: e.clientY,
            }),
            blur: () => {
                this.gameStore.input.actions.characterMovement = game_store_1.EMovement.idle;
                this.gameStore.input.actions.menuMovement = game_store_1.EMovement.idle;
                this.gameStore.input.actions.togglePause = false;
            },
            focus: () => this.listeners.blur(),
            contextmenu: (e) => e.preventDefault(),
        };
    }
    setup(actions) {
        this.gameStore = actions.getResource(game_store_1.GameStore);
        for (const [event, handler] of Object.entries(this.listeners)) {
            window.addEventListener(event, handler);
        }
    }
    destroy(_) {
        super.destroy(_);
        for (const [event, handler] of Object.entries(this.listeners)) {
            window.removeEventListener(event, handler);
        }
    }
    run(actions) {
        {
            this.gameStore.input.actions.menuConfirm = false;
            this.gameStore.input.actions.menuMovement = game_store_1.EMovement.idle;
            this.gameStore.input.actions.togglePause = false;
        }
        let event;
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
                        this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.up;
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.down;
                        this.gameStore.input.actions.menuMovement = game_store_1.EMovement.up;
                    }
                    else {
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.up;
                    }
                    break;
                case KeyCode.CODE_A:
                case KeyCode.CODE_LEFT:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.left;
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.right;
                    }
                    else
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.left;
                    break;
                case KeyCode.CODE_S:
                case KeyCode.CODE_DOWN:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.down;
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.up;
                        this.gameStore.input.actions.menuMovement = game_store_1.EMovement.down;
                    }
                    else {
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.down;
                    }
                    this.gameStore.input.actions.menuMovement = this.gameStore.input.actions.characterMovement;
                    break;
                case KeyCode.CODE_D:
                case KeyCode.CODE_RIGHT:
                    if (event.type === EKeyState.Down) {
                        this.gameStore.input.actions.characterMovement |= game_store_1.EMovement.right;
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.left;
                    }
                    else
                        this.gameStore.input.actions.characterMovement &= ~game_store_1.EMovement.right;
                    break;
            }
        }
        let mouseEvent;
        this.gameStore.input.mouseStates.clear();
        while ((mouseEvent = this.mouseEvents.pop())) {
            const { type, x, y, button } = mouseEvent;
            this.gameStore.input.mouseStates.set(button, type);
            this.gameStore.input.cursorPos.x = x;
            this.gameStore.input.cursorPos.y = y;
        }
        let wheelDelta;
        this.gameStore.input.wheel = 0;
        while ((wheelDelta = this.wheelEvents.pop())) {
            this.gameStore.input.wheel = wheelDelta;
        }
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
        window.addEventListener('blur', () => {
            var _a, _b;
            const isGameState = ((_a = this.gameStore.currentState) === null || _a === void 0 ? void 0 : _a.constructor) == game_1.GameState;
            const isPauseState = ((_b = this.gameStore.currentState) === null || _b === void 0 ? void 0 : _b.constructor) == pause_1.PauseState;
            if (!isGameState && !isPauseState)
                return;
            if (!isPauseState) {
                this.actions.commands.pushState(pause_1.PauseState);
                this.gameStore.wasBlurred = true;
            }
        });
        window.addEventListener('focus', () => {
            if (this.gameStore.wasBlurred &&
                !this.gameStore.wasIntentionallyPaused) {
                this.actions.commands.popState();
            }
        });
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
                this.gameStore.wasIntentionallyPaused = true;
                this.actions.commands.pushState(pause_1.PauseState);
            }
            else {
                this.gameStore.wasIntentionallyPaused = false;
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
const rotation_1 = __webpack_require__(/*! ../components/rotation */ "./src/components/rotation.ts");
const velocity_1 = __webpack_require__(/*! ../components/velocity */ "./src/components/velocity.ts");
const game_store_1 = __webpack_require__(/*! ../models/game-store */ "./src/models/game-store.ts");
const physics_bridge_1 = __webpack_require__(/*! ../components/physics-bridge */ "./src/components/physics-bridge.ts");
class PhysicsSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            entity: sim_ecs_1.ReadEntity(),
            pos: sim_ecs_1.Write(position_1.Position),
            rot: sim_ecs_1.Write(rotation_1.Rotation),
            vel: sim_ecs_1.Read(velocity_1.Velocity),
        });
    }
    setup(actions) {
        const { physicsNamespace: { b2World } } = actions.getResource(game_store_1.GameStore);
        this.physWorld = actions.getResource(b2World);
    }
    run(actions) {
        const dt = 0.016;
        const { physicsNamespace: { getPointer, NULL } } = actions.getResource(game_store_1.GameStore);
        this.query.execute(({ entity, pos, rot, vel }) => {
            const phys = entity.getComponent(physics_bridge_1.PhysicsBridge);
            if (phys) {
                const body = phys.bodyPtr;
                if (!body)
                    return;
                const { x, y } = body.GetPosition();
                console.log(x, y);
                pos.x = x;
                pos.y = y;
            }
            else {
                pos.x += vel.x * dt;
                pos.y += vel.y * dt;
                rot.value += vel.angular * dt;
            }
        });
        this.physWorld.Step(dt, 1, 1);
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
const camera_1 = __webpack_require__(/*! ../models/camera */ "./src/models/camera.ts");
const rotation_1 = __webpack_require__(/*! ../components/rotation */ "./src/components/rotation.ts");
const util_1 = __webpack_require__(/*! ../app/util */ "./src/app/util.ts");
class RenderGameSystem extends sim_ecs_1.System {
    constructor() {
        super(...arguments);
        this.query = new sim_ecs_1.Query({
            pos: sim_ecs_1.Read(position_1.Position),
            rot: sim_ecs_1.Write(rotation_1.Rotation),
            shape: sim_ecs_1.Read(shape_1.Shape),
            material: sim_ecs_1.Read(material_1.Material),
        });
        this.runs = 0;
    }
    setup(actions) {
        this.ctx = actions.getResource(CanvasRenderingContext2D);
        this.gameStore = actions.getResource(game_store_1.GameStore);
        this.camera = actions.getResource(camera_1.Camera);
        this.controls = document.querySelector('#controls');
    }
    run(actions) {
        const viewport = {
            x: this.camera.x + this.camera.offset.x,
            y: this.camera.y + this.camera.offset.y,
            w: this.ctx.canvas.width / (this.camera.zoom * util_1.PIXELS_PER_METER),
            h: this.ctx.canvas.height / (this.camera.zoom * util_1.PIXELS_PER_METER),
        };
        this.camera.viewport = viewport;
        this.ctx.save();
        this.ctx.scale(util_1.PIXELS_PER_METER * this.camera.zoom, util_1.PIXELS_PER_METER * this.camera.zoom);
        this.ctx.translate(-viewport.x, -viewport.y);
        this.ctx.translate(this.camera.x, this.camera.y);
        this.ctx.rotate(this.camera.rotation);
        this.ctx.translate(-this.camera.x, -this.camera.y);
        this.gameStore.worldToScreen = this.ctx.getTransform();
        this.gameStore.screenToWorld = this.ctx.getTransform().inverse();
        const { x: mx, y: my } = this.gameStore.input.cursorPos;
        const { a, b, c, d, e, f } = this.gameStore.screenToWorld;
        this.gameStore.input.cursorPosWorld.x = a * mx + c * my + e;
        this.gameStore.input.cursorPosWorld.y = b * mx + d * my + f;
        const rows = 10;
        const cols = 18;
        const perCol = this.ctx.canvas.width / (cols * util_1.PIXELS_PER_METER);
        const perRow = this.ctx.canvas.height / (rows * util_1.PIXELS_PER_METER);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * perCol;
                const y = i * perRow;
                this.ctx.lineWidth = 2 / 32;
                this.ctx.strokeStyle = '#dadada';
                this.ctx.strokeRect(x, y, perCol, perRow);
            }
        }
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
            const { pos, shape, rot, material } = drawables[i];
            this.drawShape(pos, shape, material, rot);
        }
        this.ctx.restore();
    }
    drawShape(pos, shape, material, rot) {
        const { x: w, y: h } = shape.dimensions;
        const { x: bx, y: by, w: bw, h: bh, } = shape.getBBox();
        const { x, y } = pos;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rot.value);
        this.ctx.fillStyle = material.color;
        if (shape.primitive === shape_1.ShapePrimitive.Rect) {
            this.ctx.fillRect(bx, by, w, h);
        }
        else if (shape.primitive === shape_1.ShapePrimitive.Circle) {
            this.ctx.beginPath();
            this.ctx.arc(bx + w / 2, bx + w / 2, w / 2, 0, util_1.TWOPI);
            this.ctx.fill();
        }
        else if (shape.primitive === shape_1.ShapePrimitive.Mesh
            && shape.mesh) {
            this.ctx.beginPath();
            const { offsetX, offsetY } = shape;
            for (let i = 0; i < shape.mesh.verticies.length; ++i) {
                const { x: dx, y: dy } = shape.mesh.verticies[i];
                this.ctx.lineTo(dx + offsetX, dy + offsetY);
            }
            this.ctx.closePath();
            this.ctx.fill();
        }
        if (this.gameStore.debugShapes) {
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '0.1rem Arial';
            this.ctx.fillText(`Z=${shape.zIndex},x=${Math.floor(x)},y=${Math.floor(y)}`, 0, -by - 2);
            this.ctx.fillText(`Pivot=${shape_1.ShapePivotNames[shape.pivot]}`, 0, -by - 3);
            this.ctx.strokeStyle = '#f0f';
            const padding = 0;
            this.ctx.lineWidth = 0.1;
            this.ctx.strokeRect(bx - padding, by - padding, bw + padding * 2, bh + padding * 2);
            this.ctx.restore();
            util_1.drawPoint(this.ctx, 0, 0);
        }
        this.ctx.restore();
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
        this.gameStore = actions.getResource(game_store_1.GameStore);
    }
    run(actions) {
        this.ctx.textBaseline = 'top';
        this.ctx.save();
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
        this.ctx.restore();
        this.ctx.font = '32px serif';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(`${Math.floor(10 * this.gameStore.timeSinceLevelLoaded) / 10.0} s.`, this.ctx.canvas.width - 200, 20);
        this.ctx.fillText(`${Math.floor(this.gameStore.medianFps + 0.5)} FPS`, this.ctx.canvas.width - 200, 60);
        this.ctx.fillText(`${this.gameStore.rendered} / ${this.gameStore.drawables}`, this.ctx.canvas.width - 200, 100);
        {
            let str = this.gameStore.input.actions.characterMovement.toString(2);
            str = '0'.repeat(4 - str.length) + str;
            this.ctx.fillText(`${str}`, this.ctx.canvas.width - 200, 140);
        }
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "citylights:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_sim-ecs_dist_index_js-node_modules_box2d-wasm_dist_es_entry_js-node_modu-0d9457"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJ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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxtRUFBbUUsaUNBQWlDO1dBQ3BHO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDekNBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNO1dBQ047V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFbkZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3Njc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9hcHAvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2FwcC9mcmFtZS10cmFuc2l0aW9uLWhhbmRsZXJzLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvYXBwL3BlcnNpc3RlbmNlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvYXBwL3V0aWwudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvY29sbGlzaW9uLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9tYXRlcmlhbC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvbWVzaC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvcGh5c2ljcy1icmlkZ2UudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3Bvc2l0aW9uLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9yb3RhdGlvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvc2hhcGUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3VpLWl0ZW0udHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3ZlbG9jaXR5LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9sZXZlbHMvbGV2ZWwuaC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2xldmVscy90b3Bkb3duLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbW9kZWxzL2NhbWVyYS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL21vZGVscy9nYW1lLXN0b3JlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbW9kZWxzL3JlY3QudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9tb2RlbHMvdGFncy50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL21vZGVscy92ZWN0b3IyZC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3ByZWZhYnMvZ2FtZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3ByZWZhYnMvbWVudS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3ByZWZhYnMvcGF1c2UudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9wcmVmYWJzL3NhdmFibGUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zdGF0ZXMvZ2FtZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N0YXRlcy9tZW51LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3RhdGVzL3BhdXNlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9jYW1lcmEudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL2NoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvY29sbGlzaW9uLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9pbnB1dC50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvbWVudS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvcGF1c2UudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL3BoeXNpY3MudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL3JlbmRlci1nYW1lLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9yZW5kZXItdWkudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBlbnVtIEVBY3Rpb25zIHtcbiAgICBDb250aW51ZSxcbiAgICBFeGl0LFxuICAgIFBsYXksXG59XG4iLCJpbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9uc30gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IFBhdXNlU3RhdGUgfSBmcm9tIFwiLi4vc3RhdGVzL3BhdXNlXCI7XG5cbi8vIGdlbmVyYXRlIHRpbWVzdGFtcCBvciBkZWx0YVxuLy8gc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19wcm9jZXNzX2hydGltZVxuZnVuY3Rpb24gaHJ0aW1lKHByZXZpb3VzVGltZXN0YW1wPzogbnVtYmVyW10pe1xuICAgIGNvbnN0IGNsb2NrdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICogMWUtM1xuICAgIGxldCBzZWNvbmRzID0gTWF0aC5mbG9vcihjbG9ja3RpbWUpXG4gICAgbGV0IG5hbm9zZWNvbmRzID0gTWF0aC5mbG9vcigoY2xvY2t0aW1lJTEpKjFlOSlcbiAgICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMF1cbiAgICAgIG5hbm9zZWNvbmRzID0gbmFub3NlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFsxXVxuICAgICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgICAgc2Vjb25kcy0tXG4gICAgICAgIG5hbm9zZWNvbmRzICs9IDFlOVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIFtzZWNvbmRzLCBuYW5vc2Vjb25kc107XG59XG5cbmNvbnN0IGhydGltZVRvU2Vjb25kcyA9IChzX25zOiBudW1iZXJbXSkgPT4gKFxuICBzX25zWzBdICsgc19uc1sxXSAqIDFlLTlcbik7XG5cbmxldCBsYXN0VHJhbnNpdGlvbiA9IGhydGltZSgpO1xuXG5sZXQgZGVsdGFTdW0gPSAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmVmb3JlRnJhbWVIYW5kbGVyKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgIGNvbnN0IGdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgIGNvbnN0IGlzUGF1c2VTdGF0ZSA9IGdhbWVTdG9yZS5jdXJyZW50U3RhdGU/LmNvbnN0cnVjdG9yID09IFBhdXNlU3RhdGU7XG5cbiAgICBpZiAoIWlzUGF1c2VTdGF0ZSkge1xuICAgICAgZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZSA9IGhydGltZVRvU2Vjb25kcyhcbiAgICAgICAgaHJ0aW1lKGxhc3RUcmFuc2l0aW9uKVxuICAgICAgKTtcbiAgXG4gICAgICBpZiAoZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZSA+IDAuMSkge1xuICAgICAgICBnYW1lU3RvcmUubGFzdEZyYW1lRGVsdGFUaW1lID0gMC4xO1xuICAgICAgfVxuICBcbiAgICAgIGdhbWVTdG9yZS50aW1lU2luY2VMZXZlbExvYWRlZCArPSBcbiAgICAgICAgZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZTsgXG4gIFxuICAgICAgZGVsdGFTdW0gKz0gZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZTtcbiAgICAgIGdhbWVTdG9yZS5tZWRpYW5GcHMgPSArK2dhbWVTdG9yZS50aWNrcyAvIGRlbHRhU3VtO1xuICBcbiAgICAgIGxhc3RUcmFuc2l0aW9uID0gaHJ0aW1lKCk7ICBcbiAgICB9XG5cbiAgICAvLyBDbGVhciBjYW52YXNcbiAgICBjb25zdCBjdHggPSBhY3Rpb25zLmdldFJlc291cmNlKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbn1cbiIsImltcG9ydCB7SVRyYW5zaXRpb25BY3Rpb25zLCBRdWVyeSwgU2VyaWFsRm9ybWF0LCBUR3JvdXBIYW5kbGUsIFdpdGhUYWd9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0VUYWdzfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcblxuXG5jb25zdCBzYXZlS2V5ID0gJ3NhdmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZChhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpOiBUR3JvdXBIYW5kbGUge1xuICAgIGNvbnN0IHNhdmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzYXZlS2V5KTtcblxuICAgIGlmICghc2F2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNhdmUgYXZhaWxhYmxlLiBDYW5ub3QgbG9hZCEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGUgPSBhY3Rpb25zLmNvbW1hbmRzLmxvYWQoU2VyaWFsRm9ybWF0LmZyb21KU09OKHNhdmUpKTtcblxuICAgIHJldHVybiBoYW5kbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNhdmVLZXksIGFjdGlvbnMuc2F2ZShuZXcgUXVlcnkoW1dpdGhUYWcoRVRhZ3Muc2F2ZSldKSkudG9KU09OKCkpO1xufVxuIiwiZXhwb3J0IGNvbnN0IFRXT1BJID0gTWF0aC5QSSAqIDI7XG5leHBvcnQgY29uc3QgZHJhd1BvaW50ID0gKFxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIHg6bnVtYmVyLFxuICAgIHk6bnVtYmVyLFxuICAgIHNpemU6bnVtYmVyID0gMC4xXG4pID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknO1xuICAgIGN0eC5hcmMoeCwgeSwgc2l6ZSwgMCwgVFdPUEkpO1xuICAgIGN0eC5maWxsKCk7XG59XG5cbmV4cG9ydCBjb25zdCBQSVhFTFNfUEVSX01FVEVSID0gMzI7XG5cbmV4cG9ydCBjb25zdCBsZXJwID0gKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlciwgYW1vdW50OiBudW1iZXIpID0+IHtcbiAgICBhbW91bnQgPSBhbW91bnQgPCAwID8gMCA6IGFtb3VudDtcbiAgICBhbW91bnQgPSBhbW91bnQgPiAxID8gMSA6IGFtb3VudDtcbiAgICByZXR1cm4gdmFsdWUxICsgKHZhbHVlMiAtIHZhbHVlMSkgKiBhbW91bnQ7XG59IiwiZXhwb3J0IGNsYXNzIENoYXJhY3RlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSAnJyxcbiAgICApIHt9XG59IiwiaW1wb3J0IHsgSUVudGl0eSB9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gXCIuL3NoYXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaXNpb24ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2hhcGVGcm9tVmlzdWFsczogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgIHB1YmxpYyBzaGFwZTogU2hhcGUgfCBudWxsID0gbnVsbFxuICAgICkge1xuICAgICAgICBpZiAoIXNoYXBlRnJvbVZpc3VhbHMgJiYgIXNoYXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBjb3B5IHRoZSBjb2xsaXNpb24gc2hhcGVcXFxuICAgICAgICAgICAgICAgIGZyb20gdmlzdWFscyBvciBwcm92aWRlIGEgbmV3IG9uZScpXG4gICAgICAgIH0gXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBjb2xsaXNpb25PYmplY3RzOiBTZXQ8SUVudGl0eT4gPSBuZXcgU2V0PElFbnRpdHk+KCk7XG4gICAgcHVibGljIG9jY3VycmVkID0gZmFsc2U7XG59XG4iLCJleHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIGNvbG9yOiBzdHJpbmdcbiAgICApIHt9XG59IiwiaW1wb3J0IHsgSVZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuXG5leHBvcnQgY2xhc3MgTWVzaCB7XG4gICAgcHVibGljIGlzQ29udmV4OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyB2ZXJ0aWNpZXM6IElWZWN0b3IyRFtdKSB7XG4gICAgICAgIC8vIFRPRE86IHRlc3QgZm9yIGNvbnZleG5lc3NcbiAgICAgICAgdGhpcy5pc0NvbnZleCA9IHRydWU7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBQaHlzaWNzQnJpZGdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGJvZHlQdHI6IEJveDJELmIyQm9keSB8IG51bGwgPSBudWxsLFxuICAgICkge1xuXG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuXG5leHBvcnQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBWZWN0b3IyRCB7fVxuIiwiZXhwb3J0IGNsYXNzIFJvdGF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge31cbn0iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4uL21vZGVscy9yZWN0XCI7XG5pbXBvcnQgeyBWZWN0b3IyRCwgdmVjWmVybyB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiLi9tZXNoXCI7XG5cbmV4cG9ydCBlbnVtIFNoYXBlUHJpbWl0aXZlIHtcbiAgICBDaXJjbGUgPSAnY2lyY2xlJyxcbiAgICBSZWN0ID0gJ3JlY3QnLFxuICAgIE1lc2ggPSAnbWVzaCcsXG59XG5cbmV4cG9ydCBlbnVtIFNoYXBlUGl2b3Qge1xuICAgIFRvcExlZnQgPSAwLFxuICAgIFRvcE1pZGRsZSA9IDEsXG4gICAgVG9wUmlnaHQgPSAyLFxuICAgIExlZnQgPSAzLFxuICAgIE1pZGRsZSA9IDQsXG4gICAgUmlnaHQgPSA1LFxuICAgIEJvdHRvbUxlZnQgPSA2LFxuICAgIEJvdHRvbU1pZGRsZSA9IDcsXG4gICAgQm90dG9tUmlnaHQgPSA4XG59XG5cbmV4cG9ydCBjb25zdCBTaGFwZVBpdm90TmFtZXM6e1xuICAgIFtrZXkgaW4gU2hhcGVQaXZvdF06IHN0cmluZztcbn0gPSB7XG4gICAgW1NoYXBlUGl2b3QuVG9wTGVmdF06ICdUb3BMZWZ0JyxcbiAgICBbU2hhcGVQaXZvdC5Ub3BNaWRkbGVdOiAnVG9wTWlkZGxlJyxcbiAgICBbU2hhcGVQaXZvdC5Ub3BSaWdodF06ICdUb3BSaWdodCcsXG4gICAgW1NoYXBlUGl2b3QuTGVmdF06ICdMZWZ0JyxcbiAgICBbU2hhcGVQaXZvdC5NaWRkbGVdOiAnTWlkZGxlJyxcbiAgICBbU2hhcGVQaXZvdC5SaWdodF06ICdSaWdodCcsXG4gICAgW1NoYXBlUGl2b3QuQm90dG9tTGVmdF06ICdCb3R0b21MZWZ0JyxcbiAgICBbU2hhcGVQaXZvdC5Cb3R0b21NaWRkbGVdOiAnQm90dG9tTWlkZGxlJyxcbiAgICBbU2hhcGVQaXZvdC5Cb3R0b21SaWdodF06ICdCb3R0b21SaWdodCcsXG59XG5cbi8vIHRvZG8gdHJpYW5nbGUsIGNhcHN1bGVcblxuZXhwb3J0IGNsYXNzIFNoYXBlIHtcbiAgICBwdWJsaWMgYkJveDogUmVjdCA9IG5ldyBSZWN0KDAsIDAsIDAsIDApO1xuXG4gICAgcHVibGljIGlzQnVpbHQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkaW1lbnNpb25zICh3aWR0aCxoZWlnaHQpIGlmIHJlY3QsIChkaWFtZXRlcixhbnkpIGlmIGNpcmNsZVxuICAgICAqIEBwYXJhbSBwcmltaXRpdmUgRW51bSBvciBzdHJpbmcgdmFsdWVcbiAgICAgKiBAcGFyYW0gbWVzaCB2ZXJ0aWNpZXMgZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgekluZGV4ID0gMCxcbiAgICAgICAgLy8gVE9ETzogbWFrZSBpdCByZWFsXG4gICAgICAgIHB1YmxpYyBwaXZvdCA9IFNoYXBlUGl2b3QuTWlkZGxlLFxuICAgICAgICBwdWJsaWMgb2Zmc2V0WCA9IDAsXG4gICAgICAgIHB1YmxpYyBvZmZzZXRZID0gMCxcbiAgICAgICAgcHVibGljIGRpbWVuc2lvbnM6IFZlY3RvcjJEID0gdmVjWmVybyxcbiAgICAgICAgcHVibGljIHByaW1pdGl2ZTogU2hhcGVQcmltaXRpdmUgPSBTaGFwZVByaW1pdGl2ZS5SZWN0LFxuICAgICAgICBwdWJsaWMgbWVzaDogTWVzaCB8IG51bGwgPSBudWxsLFxuICAgICkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBidWlsZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNCdWlsdCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuTWVzaCAmJiAhdGhpcy5tZXNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYXBlcyB3aXRoIG1lc2ggcHJpbWl0aXZlXFxcbiAgICAgICAgICAgICAgICBtdXN0IHByb3ZpZGUgYSBtZXNoIGRhdGEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgIT09IFNoYXBlUHJpbWl0aXZlLk1lc2ggJiYgIXRoaXMuZGltZW5zaW9ucykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGltZW5zaW9uczonLCB0aGlzLmRpbWVuc2lvbnMsXG4gICAgICAgICAgICAgICAgJ3ByaW1pdGl2ZTonLCB0aGlzLnByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAnbWVzaDonLCB0aGlzLm1lc2gpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFwZXMgd2l0aCBub24tbWVzaCBwcmltaXRpdmVcXFxuICAgICAgICAgICAgICAgIG11c3QgcHJvdmlkZSBkaW1lbnNpb25zJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsbCB0aGUgc2hhcGVzIGFyZSBjZW5ldGVyZWQgYnkgZGVmYXVsdFxuXG4gICAgICAgIGxldCBtaW5YID0gMCwgbWluWSA9IDAsIG1heFggPSAwLCBtYXhZID0gMDtcblxuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSkge1xuICAgICAgICAgICAgLy8gQSBjZW50ZXItcG9zaXRpb25lZCBjaXJjbGVcbiAgICAgICAgICAgIC8vIHdpbGwgZml0IGludG8gYSBtaWQtc2hpZnRlZFxuICAgICAgICAgICAgLy8gc3F1YXJlIHdpdGggc2lkZSA9IGRpYW1ldGVyXG4gICAgICAgICAgICBjb25zdCBkID0gdGhpcy5kaW1lbnNpb25zLnhcbiAgICAgICAgICAgIGNvbnN0IHJhZCA9IGQvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gLXJhZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ID0gLXJhZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC53ID0gZDtcbiAgICAgICAgICAgIHRoaXMuYkJveC5oID0gZDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuUmVjdCkge1xuICAgICAgICAgICAgLy8gYSB0b3AtbGVmdCBwb3NpdGlvbmVkIHJlY3RhbmdsZVxuICAgICAgICAgICAgLy8gaXMgdGhlIGJvdW5kaW5nIGJveCBpdHNlbGZcbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gLXRoaXMuZGltZW5zaW9ucy54LzI7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSA9IC10aGlzLmRpbWVuc2lvbnMueS8yO1xuICAgICAgICAgICAgdGhpcy5iQm94LncgPSB0aGlzLmRpbWVuc2lvbnMueDtcbiAgICAgICAgICAgIHRoaXMuYkJveC5oID0gdGhpcy5kaW1lbnNpb25zLnk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLk1lc2ggJiYgdGhpcy5tZXNoKSB7XG4gICAgICAgICAgICBtaW5YID0gdGhpcy5tZXNoLnZlcnRpY2llc1swXS54O1xuICAgICAgICAgICAgbWluWSA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbMF0ueTtcblxuICAgICAgICAgICAgbWF4WCA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbMF0ueDtcbiAgICAgICAgICAgIG1heFkgPSB0aGlzLm1lc2gudmVydGljaWVzWzBdLnk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MTtpPHRoaXMubWVzaC52ZXJ0aWNpZXMubGVuZ3RoOysraSl7XG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gdGhpcy5tZXNoLnZlcnRpY2llc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmJCb3gudyA9IG1heFggLSBtaW5YO1xuICAgICAgICAgICAgdGhpcy5iQm94LmggPSBtYXhZIC0gbWluWTtcbiAgICAgICAgICAgIHRoaXMuYkJveC54ID0gLXRoaXMuYkJveC53LzI7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSA9IC10aGlzLmJCb3guaC8yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuVG9wTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnggKz0gdGhpcy5iQm94LncvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ICs9IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5Ub3BNaWRkbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ICs9IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5Ub3BSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnggLT0gdGhpcy5iQm94LncvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC55ICs9IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5MZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCArPSB0aGlzLmJCb3gudy8yO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC54IC09IHRoaXMuYkJveC53LzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5Cb3R0b21MZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCArPSB0aGlzLmJCb3gudy8yO1xuICAgICAgICAgICAgdGhpcy5iQm94LnkgLT0gdGhpcy5iQm94LmgvMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpdm90ID09PSBTaGFwZVBpdm90LkJvdHRvbU1pZGRsZSkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnkgLT0gdGhpcy5iQm94LmgvMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpdm90ID09PSBTaGFwZVBpdm90LkJvdHRvbVJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCAtPSB0aGlzLmJCb3gudy8yO1xuICAgICAgICAgICAgdGhpcy5iQm94LnkgLT0gdGhpcy5iQm94LmgvMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuTWVzaCAmJiB0aGlzLm1lc2gpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMubWVzaC52ZXJ0aWNpZXMubGVuZ3RoOysraSl7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNoLnZlcnRpY2llc1tpXS54ICs9ICh0aGlzLmJCb3gueCAtIG1pblgpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzaC52ZXJ0aWNpZXNbaV0ueSArPSAodGhpcy5iQm94LnkgLSBtaW5ZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNCdWlsdCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0QkJveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYkJveDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0VBY3Rpb25zfSBmcm9tIFwiLi4vYXBwL2FjdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIFVJSXRlbSB7XG4gICAgcHVibGljIGNhcHRpb25Nb2QgPSAoc3RySW46IHN0cmluZykgPT4gc3RySW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhcHRpb246IHN0cmluZyxcbiAgICAgICAgcHVibGljIGNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBmb250U2l6ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgYWN0aW9uPzogRUFjdGlvbnMsXG4gICAgICAgIHB1YmxpYyBhY3RpdmU/OiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgYWN0aXZlQ29sb3I/OiBzdHJpbmcsXG4gICAgKSB7fVxuXG4gICAgZ2V0IGZpbmFsQ2FwdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXB0aW9uTW9kKHRoaXMuY2FwdGlvbik7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuXG5leHBvcnQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBWZWN0b3IyRCB7XG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6IG51bWJlciwgcHVibGljIGFuZ3VsYXI6IG51bWJlcikge1xuICAgICAgICBzdXBlcih4LCB5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgJy4vc2VydmVyJztcbmltcG9ydCB7IExldmVsIH0gZnJvbSAnLi9sZXZlbHMvbGV2ZWwuaCc7XG5pbXBvcnQgeyBUb3Bkb3duIH0gZnJvbSAnLi9sZXZlbHMvdG9wZG93bic7XG5pbXBvcnQgJy4vc2Nzcy9hcHAuc2Nzcyc7XG5pbXBvcnQgeyBsb2FkUGh5c2ljcywgX0JveDJEIH0gZnJvbSAnLi9zZXJ2ZXInO1xuXG5jb25zdCBfZmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG5cbndpbmRvdy5mZXRjaCA9IChcbiAgICBpbnB1dDogUmVxdWVzdEluZm8sXG4gICAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkKTogUHJvbWlzZTxSZXNwb25zZT4gPT4ge1xuICAgIGlmIChpbml0Py5jcmVkZW50aWFscyA9PT0gJ3NhbWUtb3JpZ2luJykge1xuICAgICAgICBkZWxldGUgaW5pdC5jcmVkZW50aWFscztcbiAgICB9XG4gICAgY29uc29sZS5sb2coaW5wdXQsIGluaXQpO1xuICAgIHJldHVybiBfZmV0Y2goaW5wdXQsIGluaXQpO1xufVxuXG5leHBvcnQgY29uc3QgcHJlcGFyZVJlbmRlckNvbnRleHQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gICAgaWYgKCFjYW52YXNFbGUpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgY2FudmFzIGVsZW1lbnQhJyk7XG5cbiAgICBjb25zdCByZW5kZXJDb250ZXh0ID0gY2FudmFzRWxlLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKCFyZW5kZXJDb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBpbml0aWFsaXplIDJEIGNvbnRleHQnKTtcblxuICAgIGNvbnN0IGNhbnZhc0JvdW5kaW5nUmVjdCA9IGNhbnZhc0VsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNhbnZhc0VsZS53aWR0aCA9IGNhbnZhc0JvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjYW52YXNFbGUuaGVpZ2h0ID0gY2FudmFzQm91bmRpbmdSZWN0LmhlaWdodDtcblxuICAgIHJlbmRlckNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gcmVuZGVyQ29udGV4dDtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHByZXBhcmVSZW5kZXJDb250ZXh0KTtcblxuY29uc3QgbGV2ZWxzOntcbiAgICBbbmFtZTogc3RyaW5nXTogbmV3ICguLi5hcmdzOltfQm94MkRdKSA9PiBMZXZlbCxcbn0gPSB7XG4gICAgJ3RvcGRvd24nOiBUb3Bkb3duLFxufTtcblxudHlwZSBsZXZlbFR5cGUgPSBrZXlvZiB0eXBlb2YgbGV2ZWxzO1xuXG4vLyBtYWluIGZ1bmN0aW9uXG4oYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGJveDJEID0gYXdhaXQgbG9hZFBoeXNpY3MoKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3Qua2V5cyhsZXZlbHMpXG4gICAgICAgIC5tYXAoKGUsaSkgPT4gKGAke2krMX0pICR7ZX1gKSk7XG4gICAgb3B0aW9ucy5wdXNoKCdleGl0IChvciBlbXB0eSknKTtcblxuICAgIGxldCByZXF1ZXN0ZWRMZXZlbCA9ICd0b3Bkb3duJztcblxuICAgIHdoaWxlIChyZXF1ZXN0ZWRMZXZlbCAhPT0gJ2V4aXQnKSB7XG4gICAgICAgIGNvbnN0IGxldmVsID0gcmVxdWVzdGVkTGV2ZWwgYXMgbGV2ZWxUeXBlO1xuICAgICAgICBsZXQgd29ybGQgPSBuZXcgbGV2ZWxzW2xldmVsXShib3gyRCk7XG5cbiAgICAgICAgYXdhaXQgd29ybGQucnVuKCk7XG5cbiAgICAgICAgcmVxdWVzdGVkTGV2ZWwgPSBwcm9tcHQoJ1doYXQgbGV2ZWwgd291bGQgeW91IGxpa2UgdG8gY2hlY2sgbmV4dD9cXG4nICtcbiAgICAgICAgICAgIG9wdGlvbnMuam9pbignXFxuJylcbiAgICAgICAgKSB8fCAnZXhpdCc7XG4gICAgfVxufSkoKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiIsImltcG9ydCB7IElXb3JsZCB9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBwcmVwYXJlUmVuZGVyQ29udGV4dCB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgYmVmb3JlRnJhbWVIYW5kbGVyIH0gZnJvbSBcIi4uL2FwcC9mcmFtZS10cmFuc2l0aW9uLWhhbmRsZXJzXCI7XG5pbXBvcnQgeyBfQm94MkQgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQgeyBNZW51U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGVzL21lbnVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTGV2ZWwge1xuICAgIG5hbWU6IHN0cmluZztcblxuICAgIC8vIFRPRE86IGxvYWQgZnJvbSBmaWxlc3lzdGVtLCBmcm9tIFVSTFxuICAgIC8vIHBhdGg6IHN0cmluZzsgXG5cbiAgICB3b3JsZDogSVdvcmxkO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHJpZ2h0IGFmdGVyIHRoZSBpbml0aWFsaXphdGlvbiwgbWFpbiBsb29wIGdvZXMgaGVyZVxuICAgICAqL1xuICAgIHJ1bigpOiBQcm9taXNlPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIHRoZSByZXNvdXJjZXMgdG8gcnVuIGFub3RoZXIgbGV2ZWxcbiAgICAgKi9cbiAgICBkZXN0cm95KCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMZXZlbCBpbXBsZW1lbnRzIElMZXZlbCB7XG5cbiAgICBwdWJsaWMgd29ybGQ6IElXb3JsZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcGh5c2ljczogX0JveDJELFxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZygnTGV2ZWwgbG9hZGVkJywgbmFtZSk7XG4gICAgICAgIGNvbnN0IHdvcmxkID0gdGhpcy5jcmVhdGVXb3JsZCgpO1xuXG4gICAgICAgIGlmICghd29ybGQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBsZXZlbCBtdXN0IGhhdmUgYSBub24tbnVsbCBcXFxuICAgICAgICAgICAgcmVzdWxpbmcgY3JlYXRlV29ybGQgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcblxuICAgICAgICBjb25zdCByZW5kZXJDb250ZXh0ID0gcHJlcGFyZVJlbmRlckNvbnRleHQoKTtcblxuICAgICAgICB0aGlzLndvcmxkLmFkZFJlc291cmNlKHJlbmRlckNvbnRleHQpO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGNyZWF0ZVdvcmxkKCk6IElXb3JsZDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB5b3UgaGF2ZSB0byByZWxlYXNlIG1vcmUgcmVzb3VyY2VzXG4gICAgICogKGF1ZGlvLCB2aWRlbywgV2ViUlRDLCB0ZXh0dXJlcywgZmlsZXMsIGV0Yy4pXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53b3JsZC5jb21tYW5kcy5zdG9wUnVuKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcnVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53b3JsZC5ydW4oe1xuICAgICAgICAgICAgYmVmb3JlU3RlcEhhbmRsZXI6IGJlZm9yZUZyYW1lSGFuZGxlcixcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZTogTWVudVN0YXRlLFxuICAgICAgICB9KS50aGVuKCgpPT50aGlzLmRlc3Ryb3koKSk7XG4gICAgfVxufSIsImltcG9ydCB7IEVDUywgSVdvcmxkIH0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IENoYXJhY3RlciB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NoYXJhY3RlclwiO1xuaW1wb3J0IHsgQ29sbGlzaW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWVzaFwiO1xuaW1wb3J0IHsgUGh5c2ljc0JyaWRnZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BoeXNpY3MtYnJpZGdlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBSb3RhdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdGF0aW9uXCI7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQgeyBVSUl0ZW0gfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi4vbW9kZWxzL2NhbWVyYVwiO1xuaW1wb3J0IHsgR2FtZVN0b3JlIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQgeyBfQm94MkQgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQgeyBDYW1lcmFTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9jYW1lcmFcIjtcbmltcG9ydCB7IENoYXJhY3RlclN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2NoYXJhY3RlclwiO1xuaW1wb3J0IHsgQ29sbGlzaW9uU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBJbnB1dFN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2lucHV0XCI7XG5pbXBvcnQgeyBNZW51U3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvbWVudVwiO1xuaW1wb3J0IHsgUGF1c2VTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9wYXVzZVwiO1xuaW1wb3J0IHsgUGh5c2ljc1N5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL3BoeXNpY3NcIjtcbmltcG9ydCB7IFJlbmRlckdhbWVTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItZ2FtZVwiO1xuaW1wb3J0IHsgUmVuZGVyVUlTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWwuaFwiO1xuXG5leHBvcnQgY2xhc3MgVG9wZG93biBleHRlbmRzIExldmVsIHtcbiAgICBjb25zdHJ1Y3RvcihwaHlzaWNzOiBfQm94MkQpIHtcbiAgICAgICAgc3VwZXIocGh5c2ljcywgJ3RvcGRvd24nKTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBiMlZlYzIsXG4gICAgICAgICAgICBiMldvcmxkXG4gICAgICAgIH0gPSBwaHlzaWNzO1xuXG4gICAgICAgIGNvbnN0IGdyYXZpdHkgPSBuZXcgYjJWZWMyKDAsIDkuODEpO1xuICAgICAgICBjb25zdCBwaHlzV29ybGQgPSBuZXcgYjJXb3JsZChncmF2aXR5KTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRSZXNvdXJjZShwaHlzV29ybGQpO1xuXG4gICAgICAgIGNvbnN0IHplcm8gPSBuZXcgYjJWZWMyKDAsIDApO1xuXG4gICAgICAgIGNvbnN0IGdhbWVTdG9yZSA9IG5ldyBHYW1lU3RvcmUoKTtcbiAgICAgICAgZ2FtZVN0b3JlLnBoeXNpY3NOYW1lc3BhY2UgPSBwaHlzaWNzO1xuICAgICAgICBnYW1lU3RvcmUucGh5c2ljc1plcm8gPSB6ZXJvO1xuXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcblxuICAgICAgICB0aGlzLndvcmxkLmFkZFJlc291cmNlKGdhbWVTdG9yZSk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkUmVzb3VyY2UoY2FtZXJhKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcGh5c2ljc05hbWVzcGFjZSxcbiAgICAgICAgICAgIHBoeXNpY3NaZXJvXG4gICAgICAgIH0gPSB0aGlzLndvcmxkLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgICAgIGNvbnN0IHBoeXNpY3NXb3JsZCA9IHRoaXMud29ybGQuZ2V0UmVzb3VyY2UocGh5c2ljc05hbWVzcGFjZS5iMldvcmxkKTtcblxuICAgICAgICBwaHlzaWNzTmFtZXNwYWNlLmRlc3Ryb3kocGh5c2ljc1dvcmxkKTtcbiAgICAgICAgcGh5c2ljc05hbWVzcGFjZS5kZXN0cm95KHBoeXNpY3NaZXJvKTtcblxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLndvcmxkLmdldFJlc291cmNlKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2VjZWNlYyc7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGNyZWF0ZVdvcmxkKCk6IElXb3JsZCB7XG4gICAgICAgIHJldHVybiBuZXcgRUNTKClcbiAgICAgICAgICAgIC5idWlsZFdvcmxkKClcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKENhbWVyYVN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIENoYXJhY3RlclN5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKFBoeXNpY3NTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBDaGFyYWN0ZXJTeXN0ZW1cbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrU3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oQ2hhcmFjdGVyU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgQ29sbGlzaW9uU3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oQ29sbGlzaW9uU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgLy8gTmV0d29ya1N5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKElucHV0U3lzdGVtKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oTWVudVN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIElucHV0U3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhTeXN0ZW0oUGF1c2VTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBJbnB1dFN5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKFJlbmRlckdhbWVTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBQaHlzaWNzU3lzdGVtLFxuICAgICAgICAgICAgICAgIENoYXJhY3RlclN5c3RlbSxcbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrU3lzdGVtLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKFJlbmRlclVJU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgUGh5c2ljc1N5c3RlbSxcbiAgICAgICAgICAgICAgICBNZW51U3lzdGVtLFxuICAgICAgICAgICAgICAgIFBhdXNlU3lzdGVtXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLndpdGhDb21wb25lbnRzKFxuICAgICAgICAgICAgICAgIENvbGxpc2lvbixcbiAgICAgICAgICAgICAgICBNYXRlcmlhbCxcbiAgICAgICAgICAgICAgICBNZXNoLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIFJvdGF0aW9uLFxuICAgICAgICAgICAgICAgIFNoYXBlLFxuICAgICAgICAgICAgICAgIFVJSXRlbSxcbiAgICAgICAgICAgICAgICBWZWxvY2l0eSxcbiAgICAgICAgICAgICAgICBDaGFyYWN0ZXIsXG4gICAgICAgICAgICAgICAgUGh5c2ljc0JyaWRnZSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBJUmVjdCB9IGZyb20gXCIuL3JlY3RcIjtcbmltcG9ydCB7IElWZWN0b3IyRCB9IGZyb20gXCIuL3ZlY3RvcjJkXCI7XG5cbmV4cG9ydCBlbnVtIENhbWVyYUZvbGxvd01ldGhvZCB7XG4gICAgSW1tZWRpYXRlLFxuICAgIFNtb290aCxcbiAgICBFbGFzdGljXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FtZXJhRm9sbG93IHtcbiAgICB0YXJnZXQ6IElWZWN0b3IyRFxuICAgIG1ldGhvZDogQ2FtZXJhRm9sbG93TWV0aG9kXG4gICAgcHJldlg6IG51bWJlclxuICAgIHByZXZZOiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XG4gICAgcHVibGljIHZpZXdwb3J0ITogSVJlY3Q7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHg6IG51bWJlciA9IDAsXG4gICAgICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwLFxuICAgICAgICBwdWJsaWMgb2Zmc2V0OiBJVmVjdG9yMkQgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgcHVibGljIHZlbDogVmVsb2NpdHkgPSA8VmVsb2NpdHk+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfSxcbiAgICAgICAgcHVibGljIHpvb206IG51bWJlciA9IDEsXG4gICAgICAgIHB1YmxpYyByb3RhdGlvbjogbnVtYmVyID0gMCxcbiAgICAgICAgcHVibGljIGZvbGxvdz86IENhbWVyYUZvbGxvdyxcbiAgICAgICAgcHVibGljIGVsYXN0aWNpdHk6IG51bWJlciA9IDAuMDEsXG4gICAgICAgIHB1YmxpYyBmcmljdGlvbjogbnVtYmVyID0gMC4xNSxcbiAgICApIHt9XG59IiwiaW1wb3J0IHsgRUtleVN0YXRlLCBFTW91c2VTdGF0ZSB9IGZyb20gJy4uL3N5c3RlbXMvaW5wdXQnXG5pbXBvcnQge0lTdGF0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IF9Cb3gyRCB9IGZyb20gJy4uL3NlcnZlcic7XG5pbXBvcnQgeyBJVmVjdG9yMkQgfSBmcm9tICcuL3ZlY3RvcjJkJztcblxuZXhwb3J0IGVudW0gRU1vdmVtZW50IHtcbiAgICBpZGxlICA9IDAsIC8vIDAwMDBcbiAgICB1cCAgICA9IDEsIC8vIDAwMDFcbiAgICBkb3duICA9IDIsIC8vIDAwMTBcbiAgICBsZWZ0ICA9IDQsIC8vIDAxMDBcbiAgICByaWdodCA9IDgsIC8vIDEwMDBcbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVTdG9yZSB7XG4gICAgZHJhd2FibGVzID0gMFxuICAgIHJlbmRlcmVkID0gMFxuXG4gICAgZGVidWdTaGFwZXMgPSB0cnVlXG4gICAgd2FzQmx1cnJlZCA9IGZhbHNlXG4gICAgd2FzSW50ZW50aW9uYWxseVBhdXNlZCA9IGZhbHNlXG4gICAgY29udGludWUgPSBmYWxzZVxuICAgIGN1cnJlbnRTdGF0ZT86IElTdGF0ZVxuICAgIGxhc3RGcmFtZURlbHRhVGltZSA9IDBcbiAgICB0aWNrcyA9IDBcbiAgICBtZWRpYW5GcHMgPSAzMFxuICAgIHRpbWVTaW5jZUxldmVsTG9hZGVkID0gMFxuICAgIGlucHV0OiB7XG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIGNoYXJhY3Rlck1vdmVtZW50OiBFTW92ZW1lbnRcbiAgICAgICAgICAgIG1lbnVDb25maXJtOiBib29sZWFuXG4gICAgICAgICAgICB0b2dnbGVQYXVzZTogYm9vbGVhblxuICAgICAgICAgICAgbWVudU1vdmVtZW50OiBFTW92ZW1lbnRcbiAgICAgICAgfVxuICAgICAgICB3aGVlbDogbnVtYmVyXG4gICAgICAgIGN1cnNvclBvczogSVZlY3RvcjJEXG4gICAgICAgIGN1cnNvclBvc1dvcmxkOiBJVmVjdG9yMkRcbiAgICAgICAga2V5U3RhdGVzOiBNYXA8c3RyaW5nLCBFS2V5U3RhdGU+XG4gICAgICAgIG1vdXNlU3RhdGVzOiBNYXA8bnVtYmVyLCBFTW91c2VTdGF0ZT5cbiAgICB9ID0ge1xuICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBjaGFyYWN0ZXJNb3ZlbWVudDogRU1vdmVtZW50LmlkbGUsXG4gICAgICAgICAgICBtZW51Q29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICBtZW51TW92ZW1lbnQ6IEVNb3ZlbWVudC5pZGxlLFxuICAgICAgICAgICAgdG9nZ2xlUGF1c2U6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB3aGVlbDogMCxcbiAgICAgICAgY3Vyc29yUG9zOiB7eDotMSwgeTotMX0sXG4gICAgICAgIGN1cnNvclBvc1dvcmxkOiB7eDotMSwgeTotMX0sXG4gICAgICAgIGtleVN0YXRlczogbmV3IE1hcDxzdHJpbmcsIEVLZXlTdGF0ZT4oKSxcbiAgICAgICAgbW91c2VTdGF0ZXM6IG5ldyBNYXA8bnVtYmVyLCBFTW91c2VTdGF0ZT4oKSxcbiAgICB9XG4gICAgcGh5c2ljc05hbWVzcGFjZSE6IF9Cb3gyRDtcbiAgICBwaHlzaWNzWmVybyE6IEJveDJELmIyVmVjMjtcbiAgICBzY3JlZW5Ub1dvcmxkPzogRE9NTWF0cml4O1xuICAgIHdvcmxkVG9TY3JlZW4/OiBET01NYXRyaXg7XG59XG4iLCJpbXBvcnQgeyBJVmVjdG9yMkQgfSBmcm9tIFwiLi92ZWN0b3IyZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWN0IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHc6IG51bWJlcixcbiAgICBoOiBudW1iZXIsXG59XG5cbmV4cG9ydCBjbGFzcyBSZWN0IGltcGxlbWVudHMgSVJlY3Qge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgeDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgeTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgdzogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaDogbnVtYmVyLFxuICAgICkge31cblxuICAgIHN0YXRpYyBjaGVja1BvaW50SW5zaWRlKHI6IElSZWN0LCB7eCwgeX06IElWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gIShcbiAgICAgICAgICAgIHggPCByLnggfHwgXG4gICAgICAgICAgICB4ID4gci54ICsgci53IHx8XG4gICAgICAgICAgICB5IDwgci55IHx8XG4gICAgICAgICAgICB5ID4gci55ICsgci5oXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoZWNrSW50ZXJzZWN0cyhyMTogSVJlY3QsIHIyOiBJUmVjdCkge1xuICAgICAgICByZXR1cm4gIShyMi54ID4gcjEueCtyMS53IHx8IFxuICAgICAgICAgICAgcjIueCtyMi53IDwgcjEueCB8fCBcbiAgICAgICAgICAgIHIyLnkgPiByMS55K3IxLmggfHxcbiAgICAgICAgICAgIHIyLnkrcjIuaCA8IHIxLnkpO1xuICAgIH1cbn0iLCJleHBvcnQgZW51bSBFVGFncyB7XG4gICAgdWksXG4gICAgdGVycmFpbixcbiAgICBjaGFyYWN0ZXIsXG4gICAgbmV0d29ya09iamVjdCxcbiAgICBzYXZlLFxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJVmVjdG9yMkQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IyRCBpbXBsZW1lbnRzIElWZWN0b3IyRCB7XG4gICAgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xuICAgIGYzMiA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5idWYpO1xuICAgIHUzMiA9IG5ldyBVaW50MzJBcnJheSh0aGlzLmJ1Zik7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHggPSAwLFxuICAgICAgICBwdWJsaWMgeSA9IDAsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGFkZFNlbGYodmVjOiBWZWN0b3IyRCkge1xuICAgICAgICB0aGlzLnggKz0gdmVjLng7XG4gICAgICAgIHRoaXMueSArPSB2ZWMueTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3ViU2VsZih2ZWM6IFZlY3RvcjJEKSB7XG4gICAgICAgIHRoaXMueCAtPSB2ZWMueDtcbiAgICAgICAgdGhpcy55IC09IHZlYy55O1xuICAgIH1cblxuICAgIHB1YmxpYyBzY2FsZShmYWN0b3I6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gZmFjdG9yO1xuICAgICAgICB0aGlzLnkgKj0gZmFjdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3JtYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IGludiA9IHRoaXMuaW52U3FydCgpO1xuXG4gICAgICAgIHRoaXMueCAqPSBpbnY7XG4gICAgICAgIHRoaXMueSAqPSBpbnY7XG4gICAgfVxuXG4gICAgcHVibGljIGludlNxcnQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICAgICAgY29uc3QgeDIgPSAwLjUgKiAodGhpcy5mMzJbMF0gPSB4KTtcbiAgICAgICAgdGhpcy51MzJbMF0gPSAoMHg1ZjM3NTlkZiAtICh0aGlzLnUzMlswXSA+PiAxKSk7XG4gICAgICAgIGxldCB5ID0gdGhpcy5mMzJbMF07XG4gICAgICAgIHkgID0geSAqICggMS41IC0gKCB4MiAqIHkgKiB5ICkgKTsgICAvLyAxc3QgaXRlcmF0aW9uXG5cbiAgICAgICAgcmV0dXJuIHk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3RhbmNlKHRvOiBWZWN0b3IyRCkge1xuICAgICAgICBjb25zdCBkeCA9IHRvLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gdG8ueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3FyRGlzdGFuY2UodG86IFZlY3RvcjJEKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gdG8ueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSB0by55IC0gdGhpcy55O1xuICAgICAgICByZXR1cm4gZHgqZHggKyBkeSpkeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3FyTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICAgIH1cblxuICAgIHB1YmxpYyBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB2ZWNaZXJvID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuZXhwb3J0IGNvbnN0IHZlY09uZSA9IG5ldyBWZWN0b3IyRCgxLCAxKTtcbmV4cG9ydCBjb25zdCB2ZWNVcCA9IG5ldyBWZWN0b3IyRCgwLCAxKTtcbmV4cG9ydCBjb25zdCB2ZWNEb3duID0gbmV3IFZlY3RvcjJEKDAsIC0xKTtcbmV4cG9ydCBjb25zdCB2ZWNMZWZ0ID0gbmV3IFZlY3RvcjJEKC0xLCAwKTtcbmV4cG9ydCBjb25zdCB2ZWNSaWdodCA9IG5ldyBWZWN0b3IyRCgxLCAwKTsiLCJpbXBvcnQge1NoYXBlLCBTaGFwZVBpdm90LCBTaGFwZVByaW1pdGl2ZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2hhcGVcIjtcbmltcG9ydCB7Q29sbGlzaW9ufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaXNpb25cIjtcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IFZlbG9jaXR5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdmVsb2NpdHlcIjtcbmltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21lc2hcIjtcbmltcG9ydCB7IFJvdGF0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm90YXRpb25cIjtcbmltcG9ydCB7IENUYWdNYXJrZXIgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcblxuLy8gVGhpcyBjb3VsZCBhbHNvIGJlIHB1cmUgSlNPTiwgYnV0IGluIG9yZGVyIHRvIHVzZSBUUyB0eXBlcyBhbmQgaGF2ZSBzdGF0aWMgY2hlY2tzIGl0IGlzIHJlY29tbWVuZGVkIHRvIHdyaXRlIGl0IGFzIFRTIGFycmF5LlxuZXhwb3J0IGNvbnN0IGdhbWVQcmVmYWIgPSBbXG4gICAge1xuICAgICAgICBDb2xsaXNpb246IDxDb2xsaXNpb24+e30sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFJvdGF0aW9uOiA8Um90YXRpb24+e1xuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgVmVsb2NpdHk6IDxWZWxvY2l0eT57XG4gICAgICAgICAgICB4OiAxLjUsXG4gICAgICAgICAgICB5OiAwLCBcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNmZGZmMDMnXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgZGltZW5zaW9uczogPFZlY3RvcjJEPntcbiAgICAgICAgICAgICAgICB4OiAyLFxuICAgICAgICAgICAgICAgIHk6IDAuNyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwaXZvdDogU2hhcGVQaXZvdC5Ub3BMZWZ0LFxuICAgICAgICAgICAgcHJpbWl0aXZlOiBTaGFwZVByaW1pdGl2ZS5SZWN0LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBDb2xsaXNpb246IDxDb2xsaXNpb24+e30sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMSxcbiAgICAgICAgICAgIHk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIFJvdGF0aW9uOiA8Um90YXRpb24+e1xuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgVmVsb2NpdHk6IDxWZWxvY2l0eT57XG4gICAgICAgICAgICB4OiAyLFxuICAgICAgICAgICAgeTogMCwgXG4gICAgICAgIH0sXG4gICAgICAgIE1hdGVyaWFsOiA8TWF0ZXJpYWw+e1xuICAgICAgICAgICAgY29sb3I6ICcjZmRmZjAzJ1xuICAgICAgICB9LFxuICAgICAgICBTaGFwZTogPFNoYXBlPntcbiAgICAgICAgICAgIHpJbmRleDogMTAsXG4gICAgICAgICAgICBwaXZvdDogU2hhcGVQaXZvdC5Ub3BMZWZ0LFxuICAgICAgICAgICAgZGltZW5zaW9uczogPFZlY3RvcjJEPntcbiAgICAgICAgICAgICAgICB4OiAwLjcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpbWl0aXZlOiBTaGFwZVByaW1pdGl2ZS5DaXJjbGUsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIENvbGxpc2lvbjogPENvbGxpc2lvbj57fSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAxOCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFJvdGF0aW9uOiA8Um90YXRpb24+e1xuICAgICAgICAgICAgdmFsdWU6IDcgKiBNYXRoLlBJIC8gNFxuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eTogPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLCBcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyMwYmInXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgcGl2b3Q6IFNoYXBlUGl2b3QuTWlkZGxlLFxuICAgICAgICAgICAgbWVzaDogPE1lc2g+e1xuICAgICAgICAgICAgICAgIHZlcnRpY2llczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAtMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IC0xLjI1XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAuMzEsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAtMC4zMSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAuMzFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogLTEuNixcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlLk1lc2gsXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG4iLCJpbXBvcnQgeyBDVGFnTWFya2VyIH0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7RUFjdGlvbnN9IGZyb20gXCIuLi9hcHAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHtVSUl0ZW19IGZyb20gXCIuLi9jb21wb25lbnRzL3VpLWl0ZW1cIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5cbi8vIFRoaXMgY291bGQgYWxzbyBiZSBwdXJlIEpTT04sIGJ1dCBpbiBvcmRlciB0byB1c2UgVFMgdHlwZXMgYW5kIGhhdmUgc3RhdGljIGNoZWNrcyBpdCBpcyByZWNvbW1lbmRlZCB0byB3cml0ZSBpdCBhcyBUUyBhcnJheS5cbmV4cG9ydCBjb25zdCBtZW51UHJlZmFiID0gW1xuICAgIHsgLy8gVGl0bGVcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMDUqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGNhcHRpb246ICdQT05HJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogNjQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHsgLy8gU3ViIHRpdGxlXG4gICAgICAgIFtDVGFnTWFya2VyXTogW1xuICAgICAgICAgICAgRVRhZ3MudWlcbiAgICAgICAgXSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAwLjA1KjEwMjQsXG4gICAgICAgICAgICB5OiAwLjEyKjEwMjQsXG4gICAgICAgIH0sXG4gICAgICAgIFVJSXRlbToge1xuICAgICAgICAgICAgY2FwdGlvbjogJ0Egc2ltLWVjcyB1c2FnZSBkZW1vJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMjQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMioxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgY2FwdGlvbjogJ0hvdyB0byBwbGF5OiBMZWZ0IHBhZGRsZTogVy9TIDsgUmlnaHQgcGFkZGxlOiBVcC9Eb3duIDsgUGF1c2U6IEVzY2FwZScsXG4gICAgICAgICAgICBjb2xvcjogJyNkZGQnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI0LFxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFtDVGFnTWFya2VyXTogW1xuICAgICAgICAgICAgRVRhZ3MudWlcbiAgICAgICAgXSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAwLjA1KjEwMjQsXG4gICAgICAgICAgICB5OiAwLjI0KjEwMjQsXG4gICAgICAgIH0sXG4gICAgICAgIFVJSXRlbTogPFVJSXRlbT57XG4gICAgICAgICAgICBjYXB0aW9uOiAnVGhlIGdhbWUgd2lsbCBiZSBzYXZlZCB1cG9uIHBhdXNpbmchJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMjQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMTUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMzUqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGFjdGlvbjogRUFjdGlvbnMuUGxheSxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBjYXB0aW9uOiAnUGxheScsXG4gICAgICAgICAgICBmb250U2l6ZTogMzIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFtDVGFnTWFya2VyXTogW1xuICAgICAgICAgICAgRVRhZ3MudWlcbiAgICAgICAgXSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAwLjE1KjEwMjQsXG4gICAgICAgICAgICB5OiAwLjQqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGFjdGlvbjogRUFjdGlvbnMuQ29udGludWUsXG4gICAgICAgICAgICBjb2xvcjogJyNkZGQnLFxuICAgICAgICAgICAgY2FwdGlvbjogJ0NvbnRpbnVlJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMTUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuNDUqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGFjdGlvbjogRUFjdGlvbnMuRXhpdCxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBjYXB0aW9uOiAnRXhpdCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMzIsXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG4iLCJpbXBvcnQgeyBDVGFnTWFya2VyIH0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQgeyBFVGFncyB9IGZyb20gXCIuLi9tb2RlbHMvdGFnc1wiO1xuXG4vLyBUaGlzIGNvdWxkIGFsc28gYmUgcHVyZSBKU09OLCBidXQgaW4gb3JkZXIgdG8gdXNlIFRTIHR5cGVzIGFuZCBoYXZlIHN0YXRpYyBjaGVja3MgaXQgaXMgcmVjb21tZW5kZWQgdG8gd3JpdGUgaXQgYXMgVFMgYXJyYXkuXG5leHBvcnQgY29uc3QgcGF1c2VQcmVmYWIgPSBbXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogNTAsXG4gICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGNhcHRpb246ICfinZrinZogUEFVU0UnLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiA2NCxcbiAgICAgICAgfVxuICAgIH0sXG5dO1xuIiwiaW1wb3J0IHtFVGFnc30gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQge0NvbGxpc2lvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQge1NoYXBlLCBTaGFwZVBpdm90LCBTaGFwZVByaW1pdGl2ZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2hhcGVcIjtcbmltcG9ydCB7VmVsb2NpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQge0NUYWdNYXJrZXJ9IGZyb20gJ3NpbS1lY3MnO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyXCI7XG5pbXBvcnQgeyBSb3RhdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdGF0aW9uXCI7XG5pbXBvcnQgeyBQaHlzaWNzQnJpZGdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGh5c2ljcy1icmlkZ2VcIjtcblxuZXhwb3J0IGNvbnN0IHNhdmFibGVQcmVmYWIgPSBbXG4gICAgeyAvLyBDaGFyYWN0ZXJcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy5jaGFyYWN0ZXIsXG4gICAgICAgICAgICAvLyBFVGFncy5zYXZlXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFBoeXNpY3NCcmlkZ2U6IDxQaHlzaWNzQnJpZGdlPnt9LFxuICAgICAgICBDaGFyYWN0ZXI6IDxDaGFyYWN0ZXI+e1xuICAgICAgICAgICAgbmFtZTogJ1h1UG9IJ1xuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eTogPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgYW5ndWxhcjogMCxcbiAgICAgICAgfSxcbiAgICAgICAgQ29sbGlzaW9uOiA8Q29sbGlzaW9uPnt9LFxuICAgICAgICBSb3RhdGlvbjogPFJvdGF0aW9uPntcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgekluZGV4OiAxMSxcbiAgICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpdm90OiBTaGFwZVBpdm90Lk1pZGRsZSxcbiAgICAgICAgICAgIHByaW1pdGl2ZTogU2hhcGVQcmltaXRpdmUuQ2lyY2xlXG4gICAgICAgIH0sXG4gICAgICAgIE1hdGVyaWFsOiA8TWF0ZXJpYWw+e1xuICAgICAgICAgICAgY29sb3I6ICcjY2NhJyxcbiAgICAgICAgfSxcbiAgICB9LFxuXTsiLCJpbXBvcnQgQm94MkRGYWN0b3J5IGZyb20gJ2JveDJkLXdhc20nO1xuXG5leHBvcnQgdHlwZSBfQm94MkQgPSB0eXBlb2YgQm94MkQgJiBFbXNjcmlwdGVuTW9kdWxlO1xuXG5leHBvcnQgY29uc3QgbG9hZFBoeXNpY3MgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIEJveDJERmFjdG9yeSgpLnRoZW4oKGJveDJEOiBfQm94MkQpID0+IHtcbiAgICAgICAgcmV0dXJuIGJveDJEO1xuICAgIH0pO1xufSIsImltcG9ydCB7SVRyYW5zaXRpb25BY3Rpb25zLCBRdWVyeSwgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlLCBXaXRoLCBXaXRoVGFnfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtJbnB1dFN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvaW5wdXRcIjtcbmltcG9ydCB7UGF1c2VTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BhdXNlXCI7XG5pbXBvcnQge2dhbWVQcmVmYWJ9IGZyb20gXCIuLi9wcmVmYWJzL2dhbWVcIjtcbmltcG9ydCB7UG9zaXRpb259IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge1ZlbG9jaXR5fSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHtsb2FkfSBmcm9tIFwiLi4vYXBwL3BlcnNpc3RlbmNlXCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7UmVuZGVyR2FtZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLWdhbWVcIjtcbmltcG9ydCB7U2hhcGUsIFNoYXBlUHJpbWl0aXZlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHtQaHlzaWNzU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9waHlzaWNzXCI7XG5pbXBvcnQge1VJSXRlbX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHtDb2xsaXNpb25TeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL2NvbGxpc2lvblwiO1xuaW1wb3J0IHsgQ2hhcmFjdGVyU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvY2hhcmFjdGVyXCI7XG5pbXBvcnQge3NhdmFibGVQcmVmYWJ9IGZyb20gXCIuLi9wcmVmYWJzL3NhdmFibGVcIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQgeyBQaHlzaWNzQnJpZGdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGh5c2ljcy1icmlkZ2VcIjtcbmltcG9ydCB7IENhbWVyYVN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2NhbWVyYVwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZVN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIF9zeXN0ZW1zID0gW1xuICAgICAgICBQaHlzaWNzU3lzdGVtLFxuICAgICAgICBDaGFyYWN0ZXJTeXN0ZW0sXG4gICAgICAgIENvbGxpc2lvblN5c3RlbSxcbiAgICAgICAgSW5wdXRTeXN0ZW0sXG4gICAgICAgIENhbWVyYVN5c3RlbSxcbiAgICAgICAgUGF1c2VTeXN0ZW0sXG4gICAgICAgIFJlbmRlckdhbWVTeXN0ZW0sXG4gICAgICAgIFJlbmRlclVJU3lzdGVtLFxuICAgIF07XG4gICAgc2F2ZURhdGFQcmVmYWJIYW5kbGU/OiBUR3JvdXBIYW5kbGU7XG4gICAgc3RhdGljRGF0YVByZWZhYkhhbmRsZT86IFRHcm91cEhhbmRsZTtcblxuICAgIGFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSkuY3VycmVudFN0YXRlID0gdGhpcztcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IGdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICB0aGlzLnN0YXRpY0RhdGFQcmVmYWJIYW5kbGUgPSBjcmVhdGVOZXdHYW1lKGFjdGlvbnMpO1xuXG4gICAgICAgIGlmIChnYW1lU3RvcmUuY29udGludWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZURhdGFQcmVmYWJIYW5kbGUgPSBsb2FkKGFjdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zYXZlRGF0YVByZWZhYkhhbmRsZSA9IGNyZWF0ZUdhbWVGcm9tU2F2ZURhdGEoYWN0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBhY3Rpb25zLmZsdXNoQ29tbWFuZHMoKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBhY3Rpb25zLmdldEVudGl0aWVzKG5ldyBRdWVyeShbXG4gICAgICAgICAgICBXaXRoKFNoYXBlKVxuICAgICAgICBdKSkpIHtcbiAgICAgICAgICAgIGVudGl0eS5nZXRDb21wb25lbnQoU2hhcGUpPy5idWlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdCBQaHlzaWNzQnJpZGdlIHRvIHJlYWwgcGh5c2ljc1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBiMldvcmxkLFxuICAgICAgICAgICAgYjJDaXJjbGVTaGFwZSxcbiAgICAgICAgICAgIGIyU2hhcGUsXG4gICAgICAgICAgICBiMlBvbHlnb25TaGFwZSxcbiAgICAgICAgICAgIGIyQm9keURlZixcbiAgICAgICAgICAgIGIyX2R5bmFtaWNCb2R5LFxuICAgICAgICAgICAgYjJWZWMyLFxuICAgICAgICAgICAgZGVzdHJveSxcbiAgICAgICAgfSA9IGdhbWVTdG9yZS5waHlzaWNzTmFtZXNwYWNlO1xuXG4gICAgICAgIGNvbnN0IHBoeXNXb3JsZCA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoYjJXb3JsZCk7XG5cbiAgICAgICAgY29uc3QgemVybyA9IGdhbWVTdG9yZS5waHlzaWNzWmVybztcblxuICAgICAgICBsZXQgcGh5c1NoYXBlOiBCb3gyRC5iMlNoYXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgICAgZm9yIChjb25zdCBlbnRpdHkgb2YgYWN0aW9ucy5nZXRFbnRpdGllcyhuZXcgUXVlcnkoW1xuICAgICAgICAgICAgV2l0aChTaGFwZSksXG4gICAgICAgICAgICBXaXRoKFBvc2l0aW9uKSxcbiAgICAgICAgICAgIFdpdGgoUGh5c2ljc0JyaWRnZSlcbiAgICAgICAgXSkpKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBlbnRpdHkuZ2V0Q29tcG9uZW50KFBvc2l0aW9uKSE7XG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IGVudGl0eS5nZXRDb21wb25lbnQoU2hhcGUpITtcbiAgICAgICAgICAgIGNvbnN0IHBoeXNpY3NCcmlkZ2UgPSBlbnRpdHkuZ2V0Q29tcG9uZW50KFBoeXNpY3NCcmlkZ2UpITtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyB0byBwaHlzaWNzIHdvcmxkOicsIHBvcywgc2hhcGUpO1xuXG4gICAgICAgICAgICBjb25zdCB2ZWMgPSBuZXcgYjJWZWMyKHBvcy54LCBwb3MueSk7XG4gICAgICAgICAgICBjb25zdCBiZCA9IG5ldyBiMkJvZHlEZWYoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qge3csIGh9ID0gc2hhcGUuZ2V0QkJveCgpO1xuXG4gICAgICAgICAgICBpZiAoc2hhcGUucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5SZWN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3NoYXBlID0gbmV3IGIyUG9seWdvblNoYXBlKCk7XG4gICAgICAgICAgICAgICAgX3NoYXBlLlNldEFzQm94KHcsIGgpO1xuICAgICAgICAgICAgICAgIHBoeXNTaGFwZSA9IF9zaGFwZTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmIChzaGFwZS5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zaGFwZSA9IG5ldyBiMkNpcmNsZVNoYXBlKCk7XG4gICAgICAgICAgICAgICAgX3NoYXBlLnNldF9tX3JhZGl1cyhzaGFwZS5kaW1lbnNpb25zLnggLyAyKTtcbiAgICAgICAgICAgICAgICBwaHlzU2hhcGUgPSBfc2hhcGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc2hhcGUucHJpbWl0aXZlLCAnaXMgbm90IHN1cHBvcnRlZCBieSBwaHlzaWNzIG5vdycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGh5c1NoYXBlKSB7XG4gICAgICAgICAgICAgICAgYmQuc2V0X3R5cGUoYjJfZHluYW1pY0JvZHkpO1xuICAgICAgICAgICAgICAgIGJkLnNldF9wb3NpdGlvbih2ZWMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IHBoeXNXb3JsZC5DcmVhdGVCb2R5KGJkKTtcbiAgICAgICAgICAgICAgICB2ZWMuU2V0KDAsIDApO1xuICAgICAgICAgICAgICAgIGJvZHkuU2V0VHJhbnNmb3JtKHZlYywgMCk7XG4gICAgICAgICAgICAgICAgYm9keS5DcmVhdGVGaXh0dXJlKHBoeXNTaGFwZSwgMSk7XG5cbiAgICAgICAgICAgICAgICBkZXN0cm95KHZlYyk7XG4gICAgICAgICAgICAgICAgZGVzdHJveShwaHlzU2hhcGUpO1xuXG4gICAgICAgICAgICAgICAgYm9keS5TZXRMaW5lYXJWZWxvY2l0eSh6ZXJvKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjb250cm9sIHZpYSBwaHlzaWNzIHN5c3RlbT9cbiAgICAgICAgICAgICAgICBib2R5LlNldEF3YWtlKHRydWUpO1xuICAgICAgICAgICAgICAgIGJvZHkuU2V0RW5hYmxlZCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIHBoeXNpY3NCcmlkZ2UuYm9keVB0ciA9IGJvZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY3Rpb25zLmNvbW1hbmRzLnF1ZXVlQ29tbWFuZCgoKSA9PiBzZXRTY29yZUNhcHRpb25Nb2QoYWN0aW9ucykpO1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLm1haW50YWluKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljRGF0YVByZWZhYkhhbmRsZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5jb21tYW5kcy51bmxvYWRQcmVmYWIodGhpcy5zdGF0aWNEYXRhUHJlZmFiSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlKSB7XG4gICAgICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHBoeXNpY3NOYW1lc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBiMldvcmxkLFxuICAgICAgICAgICAgICAgIGRlc3Ryb3lcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICBkZXN0cm95KGFjdGlvbnMuZ2V0UmVzb3VyY2UoYjJXb3JsZCkpO1xuXG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG5cbmNvbnN0IGNyZWF0ZU5ld0dhbWUgPSBmdW5jdGlvbiAoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgcmV0dXJuIGFjdGlvbnMuY29tbWFuZHMubG9hZChcbiAgICAgICAgU2VyaWFsRm9ybWF0LmZyb21BcnJheShnYW1lUHJlZmFiKSk7XG59O1xuXG5jb25zdCBjcmVhdGVHYW1lRnJvbVNhdmVEYXRhID0gZnVuY3Rpb24gKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgIHJldHVybiBhY3Rpb25zLmNvbW1hbmRzLmxvYWQoXG4gICAgICAgIFNlcmlhbEZvcm1hdC5mcm9tQXJyYXkoc2F2YWJsZVByZWZhYikpO1xufTtcblxuLy8gY29uc3Qgc2V0U2NvcmVDYXB0aW9uTW9kID0gZnVuY3Rpb24gKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuLy8gICAgIGNvbnN0IHNjb3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShTY29yZUJvYXJkKTtcblxuLy8gICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGFjdGlvbnMuZ2V0RW50aXRpZXMobmV3IFF1ZXJ5KFtXaXRoKFBhZGRsZSksIFdpdGgoVUlJdGVtKV0pKSkge1xuLy8gICAgICAgICBjb25zdCB1aSA9IGVudGl0eS5nZXRDb21wb25lbnQoVUlJdGVtKSE7XG4vLyAgICAgICAgIGNvbnN0IHBhZGRsZSA9IGVudGl0eS5nZXRDb21wb25lbnQoUGFkZGxlKSE7XG5cbi8vICAgICAgICAgaWYgKHBhZGRsZS5zaWRlID09IEVQYWRkbGVTaWRlLkxlZnQpIHtcbi8vICAgICAgICAgICAgIHVpLmNhcHRpb25Nb2QgPSBzdHJJbiA9PiBzdHJJbi5yZXBsYWNlKCd7fScsIHNjb3JlLmxlZnQudG9TdHJpbmcoKSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICB1aS5jYXB0aW9uTW9kID0gc3RySW4gPT4gc3RySW4ucmVwbGFjZSgne30nLCBzY29yZS5yaWdodC50b1N0cmluZygpKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH07XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHttZW51UHJlZmFifSBmcm9tIFwiLi4vcHJlZmFicy9tZW51XCI7XG5pbXBvcnQge0lucHV0U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9pbnB1dFwiO1xuaW1wb3J0IHtNZW51U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9tZW51XCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7R2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcblxuZXhwb3J0IGNsYXNzIE1lbnVTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBfc3lzdGVtcyA9IFtJbnB1dFN5c3RlbSwgTWVudVN5c3RlbSwgUmVuZGVyVUlTeXN0ZW1dO1xuICAgIHByZWZhYkhhbmRsZSE6IFRHcm91cEhhbmRsZTtcblxuICAgIGFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSkuY3VycmVudFN0YXRlID0gdGhpcztcbiAgICAgICAgdGhpcy5wcmVmYWJIYW5kbGUgPSBhY3Rpb25zLmNvbW1hbmRzLmxvYWQoU2VyaWFsRm9ybWF0LmZyb21BcnJheShtZW51UHJlZmFiKSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnByZWZhYkhhbmRsZSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgU2VyaWFsRm9ybWF0LCBTdGF0ZSwgVEdyb3VwSGFuZGxlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtJbnB1dFN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvaW5wdXRcIjtcbmltcG9ydCB7UGF1c2VTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BhdXNlXCI7XG5pbXBvcnQge3BhdXNlUHJlZmFifSBmcm9tIFwiLi4vcHJlZmFicy9wYXVzZVwiO1xuaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHtzYXZlfSBmcm9tIFwiLi4vYXBwL3BlcnNpc3RlbmNlXCI7XG5pbXBvcnQge1JlbmRlclVJU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItdWlcIjtcbmltcG9ydCB7UmVuZGVyR2FtZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLWdhbWVcIjtcblxuZXhwb3J0IGNsYXNzIFBhdXNlU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgX3N5c3RlbXMgPSBbSW5wdXRTeXN0ZW0sIFBhdXNlU3lzdGVtLCBSZW5kZXJHYW1lU3lzdGVtLCBSZW5kZXJVSVN5c3RlbV07XG4gICAgcHJlZmFiSGFuZGxlITogVEdyb3VwSGFuZGxlO1xuXG5cbiAgICBhY3RpdmF0ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgICAgICBzYXZlKGFjdGlvbnMpO1xuXG4gICAgICAgIGdhbWVTdG9yZS5jdXJyZW50U3RhdGUgPSB0aGlzO1xuICAgICAgICB0aGlzLnByZWZhYkhhbmRsZSA9IGFjdGlvbnMuY29tbWFuZHMubG9hZChTZXJpYWxGb3JtYXQuZnJvbUFycmF5KHBhdXNlUHJlZmFiKSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnByZWZhYkhhbmRsZSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfQm94MkQgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBSZWFkRW50aXR5LCBRdWVyeSwgUmVhZCwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IFJvdGF0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm90YXRpb25cIjtcbmltcG9ydCB7VmVsb2NpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7IFBoeXNpY3NCcmlkZ2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9waHlzaWNzLWJyaWRnZVwiO1xuaW1wb3J0IHsgQ2FtZXJhLCBDYW1lcmFGb2xsb3dNZXRob2QgfSBmcm9tIFwiLi4vbW9kZWxzL2NhbWVyYVwiO1xuaW1wb3J0IHsgbGVycCwgUElYRUxTX1BFUl9NRVRFUiB9IGZyb20gXCIuLi9hcHAvdXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgQ2FtZXJhU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBjYW1lcmEhOiBDYW1lcmE7XG4gICAgY3R4ITogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jdHggPSBhY3Rpb25zLmdldFJlc291cmNlKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW1lcmEpO1xuICAgIH1cblxuICAgIHJ1bihfOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5jYW1lcmEucm90YXRpb24gPiAyKk1hdGguUEkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnJvdGF0aW9uIC09IDIqTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYW1lcmEucm90YXRpb24gPCAtMipNYXRoLlBJKSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5yb3RhdGlvbiArPSAyKk1hdGguUEk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYW1lcmEuem9vbSA8IDAuMSkge1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuem9vbSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbWVyYS56b29tID4gMS41KSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS56b29tID0gMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZm9sbG93LFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICB9ID0gdGhpcy5jYW1lcmE7XG5cbiAgICAgICAgaWYgKCFmb2xsb3cpIHJldHVybjtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgIH0gPSBmb2xsb3c7XG5cbiAgICAgICAgbGV0IHR4ID0gdGFyZ2V0Lng7XG4gICAgICAgIGxldCB0eSA9IHRhcmdldC55O1xuXG4gICAgICAgIG9mZnNldC54ID0gLXRoaXMuY3R4LmNhbnZhcy53aWR0aCAvICgyKnRoaXMuY2FtZXJhLnpvb20qUElYRUxTX1BFUl9NRVRFUik7O1xuICAgICAgICBvZmZzZXQueSA9IC10aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC8gKDIqdGhpcy5jYW1lcmEuem9vbSpQSVhFTFNfUEVSX01FVEVSKTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSBDYW1lcmFGb2xsb3dNZXRob2QuSW1tZWRpYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS54ID0gdHg7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS55ID0gdHk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBDYW1lcmFGb2xsb3dNZXRob2QuU21vb3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS54ID0gbGVycCh0aGlzLmNhbWVyYS54LCB0eCwgMC4wMSk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS55ID0gbGVycCh0aGlzLmNhbWVyYS55LCB0eSwgMC4wMSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBDYW1lcmFGb2xsb3dNZXRob2QuRWxhc3RpYykge1xuICAgICAgICAgICAgY29uc3QgZHggPSAodHggLSB0aGlzLmNhbWVyYS54KSAqIHRoaXMuY2FtZXJhLmVsYXN0aWNpdHk7XG4gICAgICAgICAgICBjb25zdCBkeSA9ICh0eSAtIHRoaXMuY2FtZXJhLnkpICogdGhpcy5jYW1lcmEuZWxhc3RpY2l0eTtcblxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudmVsLnggKz0gZHg7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS52ZWwueSArPSBkeTtcblxuICAgICAgICAgICAgY29uc3QgZnggPSAtdGhpcy5jYW1lcmEuZnJpY3Rpb24gKiB0aGlzLmNhbWVyYS52ZWwueDtcbiAgICAgICAgICAgIGNvbnN0IGZ5ID0gLXRoaXMuY2FtZXJhLmZyaWN0aW9uICogdGhpcy5jYW1lcmEudmVsLnk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnZlbC54ICs9IGZ4O1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEudmVsLnkgKz0gZnk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnggKz0gdGhpcy5jYW1lcmEudmVsLnggLyB0aGlzLmNhbWVyYS56b29tO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEueSArPSB0aGlzLmNhbWVyYS52ZWwueSAvIHRoaXMuY2FtZXJhLnpvb207XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0NUYWdNYXJrZXIsIElTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgUmVhZEVudGl0eSwgU3lzdGVtLCBXaXRoLCBXaXRoVGFnLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7U2hhcGV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge0NvbGxpc2lvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBFTW92ZW1lbnQsIEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY2hhcmFjdGVyXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBDYW1lcmEsIENhbWVyYUZvbGxvd01ldGhvZCB9IGZyb20gXCIuLi9tb2RlbHMvY2FtZXJhXCI7XG5pbXBvcnQgeyBsZXJwLCBQSVhFTFNfUEVSX01FVEVSIH0gZnJvbSBcIi4uL2FwcC91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgX2NoYXJhY3RlcjogV2l0aFRhZyhFVGFncy5jaGFyYWN0ZXIpLFxuICAgICAgICBwb3M6IFJlYWQoUG9zaXRpb24pLFxuICAgICAgICB2ZWxvY2l0eTogV3JpdGUoVmVsb2NpdHkpLFxuICAgIH0pO1xuXG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuICAgIGNhbWVyYSE6IENhbWVyYTtcbiAgICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmN0eCA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgICAgICAgdGhpcy5nYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW1lcmEpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLmVsYXN0aWNpdHkgPSAwLjAwODtcblxuICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3cgPSB7XG4gICAgICAgICAgICBtZXRob2Q6IENhbWVyYUZvbGxvd01ldGhvZC5FbGFzdGljLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy5jYW1lcmEueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNhbWVyYS55LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZYOiB0aGlzLmNhbWVyYS54LFxuICAgICAgICAgICAgcHJldlk6IHRoaXMuY2FtZXJhLnksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW5zID0gMFxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhLnpvb20gKz0gdGhpcy5nYW1lU3RvcmUuaW5wdXQud2hlZWwgLyAxMDtcblxuICAgICAgICB0aGlzLnF1ZXJ5LmV4ZWN1dGUoKHtwb3MsIHZlbG9jaXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93IS50YXJnZXQgPSBwb3M7XG5cbiAgICAgICAgICAgIGNvbnN0IGR0ID0gdGhpcy5nYW1lU3RvcmUubGFzdEZyYW1lRGVsdGFUaW1lO1xuXG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTW92ZW1lbnQ6IG1vdmVcbiAgICAgICAgICAgIH0gPSB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zO1xuXG4gICAgICAgICAgICBjb25zdCBpc0xlZnQgPSAobW92ZSAmIEVNb3ZlbWVudC5sZWZ0KSA9PT0gRU1vdmVtZW50LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCBpc1JpZ2h0ID0gKG1vdmUgJiBFTW92ZW1lbnQucmlnaHQpID09PSBFTW92ZW1lbnQucmlnaHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZlbG9jaXR5LnggPSAwO1xuXG4gICAgICAgICAgICBpZiAoaXNMZWZ0ICYmICFpc1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkueCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUmlnaHQgJiYgIWlzTGVmdCkge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5LnggPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG1vdmUgJiBFTW92ZW1lbnQudXApID09PSBFTW92ZW1lbnQudXApIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS55ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobW92ZSAmIEVNb3ZlbWVudC5kb3duKSA9PT0gRU1vdmVtZW50LmRvd24pIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS55ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkueSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZlbG9jaXR5Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgdmVsb2NpdHkuc2NhbGUoZHQgKiAxMDAwICogMTAvUElYRUxTX1BFUl9NRVRFUik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZlbG9jaXR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJU3lzdGVtQWN0aW9ucywgUXVlcnksIFJlYWQsIFJlYWRFbnRpdHksIFN5c3RlbSwgV3JpdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge1NoYXBlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHtDb2xsaXNpb259IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbGxpc2lvblwiO1xuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi4vbW9kZWxzL3ZlY3RvcjJkXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaXNpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgY29sbGlzaW9uOiBXcml0ZShDb2xsaXNpb24pLFxuICAgICAgICBlbnRpdHk6IFJlYWRFbnRpdHkoKSxcbiAgICAgICAgcG9zaXRpb246IFJlYWQoVmVjdG9yMkQpLFxuICAgICAgICBzaGFwZTogUmVhZChTaGFwZSlcbiAgICB9KTtcblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCByZWN0cyA9IEFycmF5LmZyb20odGhpcy5xdWVyeS5pdGVyKCkpXG4gICAgICAgIC5tYXAoKHtjb2xsaXNpb24sIGVudGl0eSwgcG9zaXRpb24sIHNoYXBlfSkgPT4ge1xuICAgICAgICAgICAgLy8gaWRlYWxseSwgdGhpcyBzaG91bGQgYmUgdHdvIHNlcGFyYXRlIHN0ZXBzLFxuICAgICAgICAgICAgLy8gYnV0IEpTIHdvdWxkIGxvb3AgdHdpY2UuXG4gICAgICAgICAgICAvLyBBcyBhbiBvcHRpbWl6YXRpb24sIEkgd2lsbCBpbmNsdWRlXG4gICAgICAgICAgICAvLyB0aGlzIGRhdGEgY2hhbmdlIGludG8gdGhlIG1hcCgpIGZ1bmN0aW9uXG4gICAgICAgICAgICBjb2xsaXNpb24uY29sbGlzaW9uT2JqZWN0cy5jbGVhcigpO1xuICAgICAgICAgICAgY29sbGlzaW9uLm9jY3VycmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICB4LHksdyxoXG4gICAgICAgICAgICB9ID0gc2hhcGUuZ2V0QkJveCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkRhdGE6IGNvbGxpc2lvbixcbiAgICAgICAgICAgICAgICBlbnRpdHksXG4gICAgICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoLFxuICAgICAgICAgICAgICAgIHg6IHBvc2l0aW9uLnggKyB4LFxuICAgICAgICAgICAgICAgIHk6IHBvc2l0aW9uLnkgKyB5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvbiBiZXR3ZWVuIGFsbCBjb2xsaXNpb24tZW5hYmxlZCBzaGFwZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpID09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdDEgPSByZWN0c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0MiA9IHJlY3RzW2pdO1xuXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlY3QxLnggPCByZWN0Mi54ICsgcmVjdDIud2lkdGggJiZcbiAgICAgICAgICAgICAgICAgICAgcmVjdDEueCArIHJlY3QxLndpZHRoID4gcmVjdDIueCAmJlxuICAgICAgICAgICAgICAgICAgICByZWN0MS55IDwgcmVjdDIueSArIHJlY3QyLmhlaWdodCAmJlxuICAgICAgICAgICAgICAgICAgICByZWN0MS55ICsgcmVjdDEuaGVpZ2h0ID4gcmVjdDIueVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlY3QxLmNvbGxpc2lvbkRhdGEub2NjdXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QxLmNvbGxpc2lvbkRhdGEub2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdDEuY29sbGlzaW9uRGF0YS5jb2xsaXNpb25PYmplY3RzLmFkZChyZWN0Mi5lbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWN0Mi5jb2xsaXNpb25EYXRhLm9jY3VycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN0Mi5jb2xsaXNpb25EYXRhLm9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QyLmNvbGxpc2lvbkRhdGEuY29sbGlzaW9uT2JqZWN0cy5hZGQocmVjdDEuZW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIEtleUNvZGUgZnJvbSAna2V5Y29kZS1qcyc7XG5pbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBTeXN0ZW19IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0VNb3ZlbWVudCwgR2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcblxuZXhwb3J0IGVudW0gRUtleVN0YXRlIHtcbiAgICBEb3duLFxuICAgIFVwLFxufVxuXG5leHBvcnQgZW51bSBFTW91c2VTdGF0ZSB7XG4gICAgRG93bixcbiAgICBVcCxcbiAgICBNb3ZlXG59XG5cbmludGVyZmFjZSBJS2V5RXZlbnQge1xuICAgIGNvZGU6IHN0cmluZ1xuICAgIHR5cGU6IEVLZXlTdGF0ZVxufVxuXG5pbnRlcmZhY2UgSU1vdXNlRXZlbnQge1xuICAgIHR5cGU6IEVNb3VzZVN0YXRlXG4gICAgYnV0dG9uOiBudW1iZXJcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIElucHV0U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG4gICAgaW5wdXRFdmVudHM6IElLZXlFdmVudFtdID0gW107XG4gICAgbW91c2VFdmVudHM6IElNb3VzZUV2ZW50W10gPSBbXTtcbiAgICB3aGVlbEV2ZW50czogbnVtYmVyW10gPSBbXTtcblxuICAgIHJlYWRvbmx5IGxpc3RlbmVycyA9IHtcbiAgICAgICAgd2hlZWw6IChlOiBXaGVlbEV2ZW50KSA9PiAoXG4gICAgICAgICAgICB0aGlzLndoZWVsRXZlbnRzLnB1c2goLWUuZGVsdGFZIC8gMTI1XG4gICAgICAgICkpLFxuICAgICAgICBrZXlkb3duOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5pbnB1dEV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGNvZGU6IGUuY29kZSxcbiAgICAgICAgICAgIHR5cGU6IEVLZXlTdGF0ZS5Eb3duXG4gICAgICAgIH0pLFxuICAgICAgICBrZXl1cDogKGU6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuaW5wdXRFdmVudHMucHVzaCh7XG4gICAgICAgICAgICBjb2RlOiBlLmNvZGUsXG4gICAgICAgICAgICB0eXBlOiBFS2V5U3RhdGUuVXBcbiAgICAgICAgfSksXG4gICAgICAgIG1vdXNlZG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VFdmVudHMucHVzaCh7XG4gICAgICAgICAgICBidXR0b246IGUuYnV0dG9uLFxuICAgICAgICAgICAgdHlwZTogRU1vdXNlU3RhdGUuRG93bixcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgfSksXG4gICAgICAgIG1vdXNldXA6IChlOk1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VFdmVudHMucHVzaCh7XG4gICAgICAgICAgICBidXR0b246IGUuYnV0dG9uLFxuICAgICAgICAgICAgdHlwZTogRU1vdXNlU3RhdGUuVXAsXG4gICAgICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgIH0pLFxuICAgICAgICBtb3VzZW1vdmU6IChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlRXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgYnV0dG9uOiBlLmJ1dHRvbixcbiAgICAgICAgICAgIHR5cGU6IEVNb3VzZVN0YXRlLk1vdmUsXG4gICAgICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgIH0pLFxuICAgICAgICBibHVyOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ID0gRU1vdmVtZW50LmlkbGU7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVNb3ZlbWVudCA9IEVNb3ZlbWVudC5pZGxlO1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy50b2dnbGVQYXVzZSA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1czogKCkgPT4gdGhpcy5saXN0ZW5lcnMuYmx1cigpLFxuICAgICAgICBjb250ZXh0bWVudTogKGU6IE1vdXNlRXZlbnQpID0+IGUucHJldmVudERlZmF1bHQoKSxcbiAgICB9XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtldmVudCwgaGFuZGxlcl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KF86IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koXyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBbZXZlbnQsIGhhbmRsZXJdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMubGlzdGVuZXJzKSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgaGFuZGxlciBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHsgLy8gUmVzZXQgaW5wdXQgYWN0aW9uc1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51Q29uZmlybSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuaWRsZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMudG9nZ2xlUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBldmVudDogSUtleUV2ZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmtleVN0YXRlcy5jbGVhcigpO1xuXG4gICAgICAgIHdoaWxlICgoZXZlbnQgPSB0aGlzLmlucHV0RXZlbnRzLnBvcCgpKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQua2V5U3RhdGVzLnNldChldmVudC5jb2RlLCBldmVudC50eXBlKTtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfRU5URVI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBFS2V5U3RhdGUuRG93bilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudUNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9FU0NBUEU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBFS2V5U3RhdGUuRG93bilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMudG9nZ2xlUGF1c2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX1c6XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfVVA6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBFS2V5U3RhdGUuRG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCB8PSBFTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQuZG93bjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudU1vdmVtZW50ID0gRU1vdmVtZW50LnVwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LnVwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX0E6XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfTEVGVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50IHw9IEVNb3ZlbWVudC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9TOlxuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX0RPV046XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBFS2V5U3RhdGUuRG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCB8PSBFTW92ZW1lbnQuZG93bjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC51cDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudU1vdmVtZW50ID0gRU1vdmVtZW50LmRvd247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQuZG93bjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVNb3ZlbWVudCA9IHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX0Q6XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfUklHSFQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBFS2V5U3RhdGUuRG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCB8PSBFTW92ZW1lbnQucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vdXNlRXZlbnQ6IElNb3VzZUV2ZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5tb3VzZVN0YXRlcy5jbGVhcigpO1xuXG4gICAgICAgIHdoaWxlICgobW91c2VFdmVudCA9IHRoaXMubW91c2VFdmVudHMucG9wKCkpKSB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB4LCB5LFxuICAgICAgICAgICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgfSA9IG1vdXNlRXZlbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0Lm1vdXNlU3RhdGVzLnNldChidXR0b24sIHR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3MueCA9IHg7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3MueSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2hlZWxEZWx0YTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LndoZWVsID0gMDtcblxuICAgICAgICB3aGlsZSAoKHdoZWVsRGVsdGEgPSB0aGlzLndoZWVsRXZlbnRzLnBvcCgpKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQud2hlZWwgPSB3aGVlbERlbHRhO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJU3lzdGVtQWN0aW9ucywgUXVlcnksIFN5c3RlbSwgV3JpdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge1VJSXRlbX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHtFTW92ZW1lbnQsIEdhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge0VBY3Rpb25zfSBmcm9tIFwiLi4vYXBwL2FjdGlvbnNcIjtcbmltcG9ydCB7R2FtZVN0YXRlfSBmcm9tIFwiLi4vc3RhdGVzL2dhbWVcIjtcbmltcG9ydCB7IE1lbnVTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZXMvbWVudVwiO1xuXG5leHBvcnQgY2xhc3MgTWVudVN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgX3N0YXRlcyA9IFtcbiAgICAgICAgR2FtZVN0YXRlLFxuICAgICAgICBNZW51U3RhdGVcbiAgICBdXG5cbiAgICByZWFkb25seSBxdWVyeSA9IG5ldyBRdWVyeSh7XG4gICAgICAgIHVpSXRlbTogV3JpdGUoVUlJdGVtKVxuICAgIH0pO1xuXG4gICAgYWN0aW9ucyE6IElTeXN0ZW1BY3Rpb25zXG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuICAgIG1lbnVBY3Rpb24gPSBFQWN0aW9ucy5QbGF5O1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICAgICAgdGhpcy5nYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXR1cCBNZW51Jyk7XG4gICAgfVxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIC8vIHRvZG86IHVzZSBpbmRleFxuICAgICAgICBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPT0gRU1vdmVtZW50LmRvd24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tZW51QWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5QbGF5OiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5Db250aW51ZTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5Db250aW51ZTogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuRXhpdDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5FeGl0OiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5QbGF5OyBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQWN0aW9uICR7dGhpcy5tZW51QWN0aW9ufSBub3QgaW1wbGVtZW50ZWQhYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudU1vdmVtZW50ID09IEVNb3ZlbWVudC51cCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm1lbnVBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLlBsYXk6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLkV4aXQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRUFjdGlvbnMuQ29udGludWU6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLlBsYXk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRUFjdGlvbnMuRXhpdDogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuQ29udGludWU7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBY3Rpb24gJHt0aGlzLm1lbnVBY3Rpb259IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51Q29uZmlybSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVudUFjdGlvbiA9PSBFQWN0aW9ucy5QbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnB1c2hTdGF0ZShHYW1lU3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tZW51QWN0aW9uID09IEVBY3Rpb25zLkNvbnRpbnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlJykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnU29ycnkgeW91IHdlcmVudCBzYXZlZCBsb2wnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucHVzaFN0YXRlKEdhbWVTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMuc3RvcFJ1bigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHt1aUl0ZW19IG9mIHRoaXMucXVlcnkuaXRlcigpKSB7XG4gICAgICAgICAgICB1aUl0ZW0uYWN0aXZlID0gdWlJdGVtLmFjdGlvbiA9PSB0aGlzLm1lbnVBY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgU3lzdGVtfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHtHYW1lU3RhdGV9IGZyb20gXCIuLi9zdGF0ZXMvZ2FtZVwiO1xuaW1wb3J0IHtQYXVzZVN0YXRlfSBmcm9tIFwiLi4vc3RhdGVzL3BhdXNlXCI7XG5cblxuZXhwb3J0IGNsYXNzIFBhdXNlU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBhY3Rpb25zITogSVN5c3RlbUFjdGlvbnNcbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICAvLyBpZiBvbmx5IHdlIGNvdWxkIGNyZWF0ZSBhbiBpbmxpbmUgZnVuY3Rpb24uLi5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0dhbWVTdGF0ZSA9IHRoaXMuZ2FtZVN0b3JlLmN1cnJlbnRTdGF0ZT8uY29uc3RydWN0b3IgPT0gR2FtZVN0YXRlO1xuICAgICAgICAgICAgY29uc3QgaXNQYXVzZVN0YXRlID0gdGhpcy5nYW1lU3RvcmUuY3VycmVudFN0YXRlPy5jb25zdHJ1Y3RvciA9PSBQYXVzZVN0YXRlO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNHYW1lU3RhdGUgJiYgIWlzUGF1c2VTdGF0ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICghaXNQYXVzZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnB1c2hTdGF0ZShQYXVzZVN0YXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS53YXNCbHVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLndhc0JsdXJyZWQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5nYW1lU3RvcmUud2FzSW50ZW50aW9uYWxseVBhdXNlZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnBvcFN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCBpc0dhbWVTdGF0ZSA9IHRoaXMuZ2FtZVN0b3JlLmN1cnJlbnRTdGF0ZT8uY29uc3RydWN0b3IgPT0gR2FtZVN0YXRlO1xuICAgICAgICBjb25zdCBpc1BhdXNlU3RhdGUgPSB0aGlzLmdhbWVTdG9yZS5jdXJyZW50U3RhdGU/LmNvbnN0cnVjdG9yID09IFBhdXNlU3RhdGU7XG5cbiAgICAgICAgaWYgKCFpc0dhbWVTdGF0ZSAmJiAhaXNQYXVzZVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy50b2dnbGVQYXVzZSkge1xuICAgICAgICAgICAgaWYgKGlzR2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUud2FzSW50ZW50aW9uYWxseVBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnB1c2hTdGF0ZShQYXVzZVN0YXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUud2FzSW50ZW50aW9uYWxseVBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jb21tYW5kcy5wb3BTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgX0JveDJEIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuaW1wb3J0IHtJU3lzdGVtQWN0aW9ucywgUmVhZEVudGl0eSwgUXVlcnksIFJlYWQsIFN5c3RlbSwgV3JpdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBSb3RhdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdGF0aW9uXCI7XG5pbXBvcnQge1ZlbG9jaXR5fSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHsgR2FtZVN0b3JlIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQgeyBQaHlzaWNzQnJpZGdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGh5c2ljcy1icmlkZ2VcIjtcblxuXG5leHBvcnQgY2xhc3MgUGh5c2ljc1N5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBlbnRpdHk6IFJlYWRFbnRpdHkoKSxcbiAgICAgICAgcG9zOiBXcml0ZShQb3NpdGlvbiksXG4gICAgICAgIHJvdDogV3JpdGUoUm90YXRpb24pLFxuICAgICAgICB2ZWw6IFJlYWQoVmVsb2NpdHkpLFxuICAgIH0pO1xuXG4gICAgcGh5c1dvcmxkITogQm94MkQuYjJXb3JsZDtcblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHBoeXNpY3NOYW1lc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBiMldvcmxkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgICAgIHRoaXMucGh5c1dvcmxkID0gYWN0aW9ucy5nZXRSZXNvdXJjZShiMldvcmxkKTtcbiAgICB9XG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZHQgPSAwLjAxNjtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwaHlzaWNzTmFtZXNwYWNlOiB7XG4gICAgICAgICAgICAgICAgZ2V0UG9pbnRlcixcbiAgICAgICAgICAgICAgICBOVUxMXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG5cbiAgICAgICAgLy8gY29uc3QgaGFzaEJvZGllczpSZWNvcmQ8bnVtYmVyLCBCb3gyRC5iMkJvZHk+ID0ge307XG4gICAgICAgIC8vIGxldCBwdHI6IG51bWJlcjtcblxuICAgICAgICAvLyBmb3IgKFxuICAgICAgICAvLyAgICAgbGV0IGJvZHkgPSB0aGlzLnBoeXNXb3JsZC5HZXRCb2R5TGlzdCgpO1xuICAgICAgICAvLyAgICAgKHB0ciA9IGdldFBvaW50ZXIoYm9keSkpICE9PSBnZXRQb2ludGVyKE5VTEwpO1xuICAgICAgICAvLyAgICAgYm9keSA9IGJvZHkuR2V0TmV4dCgpXG4gICAgICAgIC8vICkge1xuICAgICAgICAvLyAgICAgaGFzaEJvZGllc1twdHJdID0gYm9keTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMucXVlcnkuZXhlY3V0ZSgoe2VudGl0eSwgcG9zLCByb3QsIHZlbH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBoeXMgPSBlbnRpdHkuZ2V0Q29tcG9uZW50KFBoeXNpY3NCcmlkZ2UpO1xuICAgICAgICAgICAgaWYgKHBoeXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gcGh5cy5ib2R5UHRyO1xuICAgICAgICAgICAgICAgIGlmICghYm9keSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IGJvZHkuR2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4LCB5KTtcblxuICAgICAgICAgICAgICAgIHBvcy54ID0geDtcbiAgICAgICAgICAgICAgICBwb3MueSA9IHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcy54ICs9IHZlbC54ICogZHQ7XG4gICAgICAgICAgICAgICAgcG9zLnkgKz0gdmVsLnkgKiBkdDtcbiAgICAgICAgICAgICAgICByb3QudmFsdWUgKz0gdmVsLmFuZ3VsYXIgKiBkdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5waHlzV29ybGQuU3RlcChkdCwgMSwgMSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJU3lzdGVtQWN0aW9ucywgUXVlcnksIFJlYWQsIFN5c3RlbSwgV3JpdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge1NoYXBlLCBTaGFwZVBpdm90TmFtZXMsIFNoYXBlUHJpbWl0aXZlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgR2FtZVN0b3JlIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQgeyBJUmVjdCwgUmVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcmVjdFwiO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4uL21vZGVscy9jYW1lcmFcIjtcbmltcG9ydCB7IFJvdGF0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm90YXRpb25cIjtcbmltcG9ydCB7IGRyYXdQb2ludCwgUElYRUxTX1BFUl9NRVRFUiwgVFdPUEkgfSBmcm9tIFwiLi4vYXBwL3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlckdhbWVTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgcG9zOiBSZWFkKFBvc2l0aW9uKSxcbiAgICAgICAgcm90OiBXcml0ZShSb3RhdGlvbiksXG4gICAgICAgIHNoYXBlOiBSZWFkKFNoYXBlKSxcbiAgICAgICAgbWF0ZXJpYWw6IFJlYWQoTWF0ZXJpYWwpLFxuICAgIH0pO1xuXG4gICAgY3R4ITogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGdhbWVTdG9yZSE6IEdhbWVTdG9yZTtcbiAgICBjYW1lcmEhOiBDYW1lcmE7XG5cbiAgICAvLyBUT0RPOiByZW1vdmVcbiAgICBjb250cm9scyE6IEhUTUxFbGVtZW50O1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBhY3Rpb25zLmdldFJlc291cmNlKENhbWVyYSk7XG5cbiAgICAgICAgdGhpcy5jb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250cm9scycpITtcbiAgICB9XG5cbiAgICBydW5zID0gMDtcblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCB2aWV3cG9ydDogSVJlY3QgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbWVyYS54ICsgdGhpcy5jYW1lcmEub2Zmc2V0LngsXG4gICAgICAgICAgICB5OiB0aGlzLmNhbWVyYS55ICsgdGhpcy5jYW1lcmEub2Zmc2V0LnksXG4gICAgICAgICAgICB3OiB0aGlzLmN0eC5jYW52YXMud2lkdGggLyAodGhpcy5jYW1lcmEuem9vbSpQSVhFTFNfUEVSX01FVEVSKSxcbiAgICAgICAgICAgIGg6IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgLyAodGhpcy5jYW1lcmEuem9vbSpQSVhFTFNfUEVSX01FVEVSKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNhbWVyYS52aWV3cG9ydCA9IHZpZXdwb3J0O1xuXG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguc2NhbGUoXG4gICAgICAgICAgICBQSVhFTFNfUEVSX01FVEVSKnRoaXMuY2FtZXJhLnpvb20sXG4gICAgICAgICAgICBQSVhFTFNfUEVSX01FVEVSKnRoaXMuY2FtZXJhLnpvb21cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoXG4gICAgICAgICAgICAtdmlld3BvcnQueCxcbiAgICAgICAgICAgIC12aWV3cG9ydC55XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKFxuICAgICAgICAgICAgdGhpcy5jYW1lcmEueCxcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKHRoaXMuY2FtZXJhLnJvdGF0aW9uKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKFxuICAgICAgICAgICAgLXRoaXMuY2FtZXJhLngsXG4gICAgICAgICAgICAtdGhpcy5jYW1lcmEueVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLndvcmxkVG9TY3JlZW4gPSB0aGlzLmN0eC5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgdGhpcy5nYW1lU3RvcmUuc2NyZWVuVG9Xb3JsZCA9IHRoaXMuY3R4LmdldFRyYW5zZm9ybSgpLmludmVyc2UoKTtcblxuICAgICAgICAvL214LG15IC0gY3Vyc29yIGNvb3JkcyBpbiBTY3JlZW4gc3BhY2VcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgeDpteCwgeTpteVxuICAgICAgICB9ID0gdGhpcy5nYW1lU3RvcmUuaW5wdXQuY3Vyc29yUG9zO1xuXG4gICAgICAgIC8vIHRyYW5zZm9ybSBtYXRyaXggc2lnbmlmaWNhdCB2YWx1ZXNcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYSxiLGMsZCxlLGZcbiAgICAgICAgfSA9IHRoaXMuZ2FtZVN0b3JlLnNjcmVlblRvV29ybGQ7XG5cbiAgICAgICAgLy8gYSBjIGUgIHggIGEqeCArIGMqeSArIGUqelxuICAgICAgICAvLyBiIGQgZiAgeSAgYip4ICsgZCp5ICsgZip6XG4gICAgICAgIC8vIDAgMCAxICB6ICA/XG5cbiAgICAgICAgLy8gY3Vyc29yIGNvb3JkcyBpbiB3b3JsZCBzcGFjZVxuICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3NXb3JsZC54ID0gYSpteCArIGMqbXkgKyBlO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3NXb3JsZC55ID0gYipteCArIGQqbXkgKyBmO1xuXG4gICAgICAgIC8vIGNvbnN0IHtcbiAgICAgICAgLy8gICAgIHg6bmV3WCxcbiAgICAgICAgLy8gICAgIHk6bmV3WVxuICAgICAgICAvLyB9ID0gdGhpcy5nYW1lU3RvcmUuaW5wdXQuY3Vyc29yUG9zV29ybGQ7XG5cbiAgICAgICAgLy8gLy8gRHJhd3MgYSBjdXJzb3IgcG9pbnQgaW4gd29ybGQgc3BhY2UgXG4gICAgICAgIC8vIGRyYXdQb2ludCh0aGlzLmN0eCwgXG4gICAgICAgIC8vICAgICBuZXdYLFxuICAgICAgICAvLyAgICAgbmV3WSwgXG4gICAgICAgIC8vICAgICAxKTtcblxuICAgICAgICAvLyB0aGlzLmN0eC5mb250ID0gJzAuNXB4IEFyaWFsJztcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoYCR7TWF0aC5mbG9vcihuZXdYKjFlMykqMWUtM30sIFxuICAgICAgICAvLyAke01hdGguZmxvb3IobmV3WSoxZTMpKjFlLTN9YCwgbmV3WCwgbmV3WSAtIDAuOCk7XG5cbiAgICAgICAgY29uc3Qgcm93cyA9IDEwO1xuICAgICAgICBjb25zdCBjb2xzID0gMTg7XG5cbiAgICAgICAgY29uc3QgcGVyQ29sID0gdGhpcy5jdHguY2FudmFzLndpZHRoLyhjb2xzKlBJWEVMU19QRVJfTUVURVIpO1xuICAgICAgICBjb25zdCBwZXJSb3cgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0Lyhyb3dzKlBJWEVMU19QRVJfTUVURVIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBqICogcGVyQ29sO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBpICogcGVyUm93O1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDIvMzI7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnI2RhZGFkYSc7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdChcbiAgICAgICAgICAgICAgICAgICAgeCx5LCBwZXJDb2wsIHBlclJvd1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpdGVyID0gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5Lml0ZXIoKSk7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RvcmUuZHJhd2FibGVzID0gaXRlci5sZW5ndGg7XG5cbiAgICAgICAgY29uc3QgZHJhd2FibGVzID0gaXRlci5maWx0ZXIoXG4gICAgICAgICAgICAoe3Bvcywgc2hhcGV9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBiYm94ID0gc2hhcGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgY29uc3QgcjogSVJlY3QgPSB7XG4gICAgICAgICAgICAgICAgeDogcG9zLnggKyBiYm94LngsXG4gICAgICAgICAgICAgICAgeTogcG9zLnkgKyBiYm94LnksXG4gICAgICAgICAgICAgICAgdzogYmJveC53LFxuICAgICAgICAgICAgICAgIGg6IGJib3guaCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGluVmlldyA9IFJlY3QuY2hlY2tJbnRlcnNlY3RzKHIsIHZpZXdwb3J0KTtcblxuICAgICAgICAgICAgcmV0dXJuIGluVmlldztcbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoKHtzaGFwZTogYX0sIHtzaGFwZTogYn0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhLnpJbmRleCAtIGIuekluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdhbWVTdG9yZS5yZW5kZXJlZCA9IGRyYXdhYmxlcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcmF3YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHtwb3MsIHNoYXBlLCByb3QsIG1hdGVyaWFsfSA9IGRyYXdhYmxlc1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5kcmF3U2hhcGUocG9zLCBzaGFwZSwgbWF0ZXJpYWwsIHJvdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgZHJhd1NoYXBlKHBvczogUG9zaXRpb24sIHNoYXBlOiBTaGFwZSwgbWF0ZXJpYWw6IE1hdGVyaWFsLCByb3Q6IFJvdGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHg6IHcsIHk6IGhcbiAgICAgICAgfSA9IHNoYXBlLmRpbWVuc2lvbnM7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgeDogYngsIHk6IGJ5LFxuICAgICAgICAgICAgdzogYncsIGg6IGJoLFxuICAgICAgICB9ID0gc2hhcGUuZ2V0QkJveCgpO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHgsIHlcbiAgICAgICAgfSA9IHBvcztcblxuICAgICAgICAvLyBUT0RPOiBvbmUgc3lzdGVtIHRoYXQgY2hlY2tzIGFsbCByYXljYXN0c1xuICAgICAgICAvLyBSZWN0LmNoZWNrUG9pbnRJbnNpZGUociwgbW91c2UpO1xuXG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUocm90LnZhbHVlKTtcblxuICAgICAgICAvLyBUT0RPOiBtYXRlcmlhbCBvcHRpb25zXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IG1hdGVyaWFsLmNvbG9yO1xuXG4gICAgICAgIGlmIChzaGFwZS5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLlJlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGJ4LCBieSwgdywgaCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5DaXJjbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguYXJjKGJ4K3cvMiwgYngrdy8yLCB3LzIsIDAsIFRXT1BJKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZS5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLk1lc2hcbiAgICAgICAgICAgICYmIHNoYXBlLm1lc2gpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICBjb25zdCB7b2Zmc2V0WCwgb2Zmc2V0WX0gPSBzaGFwZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgaSA8IHNoYXBlLm1lc2gudmVydGljaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICArK2lcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHt4OmR4LCB5OmR5fSA9IHNoYXBlLm1lc2gudmVydGljaWVzW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhkeCtvZmZzZXRYLCBkeStvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nYW1lU3RvcmUuZGVidWdTaGFwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSAnMC4xcmVtIEFyaWFsJztcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGBaPSR7XG4gICAgICAgICAgICAgICAgc2hhcGUuekluZGV4XG4gICAgICAgICAgICB9LHg9JHtNYXRoLmZsb29yKHgpfSx5PSR7TWF0aC5mbG9vcih5KX1gLCAwLCAtYnktMik7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgUGl2b3Q9JHtTaGFwZVBpdm90TmFtZXNbc2hhcGUucGl2b3RdfWAsIDAsIC1ieS0zKTtcblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnI2YwZic7XG4gICAgICAgICAgICBjb25zdCBwYWRkaW5nID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDAuMTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QoXG4gICAgICAgICAgICAgICAgYnggLSBwYWRkaW5nLFxuICAgICAgICAgICAgICAgIGJ5IC0gcGFkZGluZyxcbiAgICAgICAgICAgICAgICBidyArIHBhZGRpbmcqMixcbiAgICAgICAgICAgICAgICBiaCArIHBhZGRpbmcqMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICAgICAgZHJhd1BvaW50KHRoaXMuY3R4LCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHtJU3lzdGVtQWN0aW9ucywgUXVlcnksIFJlYWQsIFN5c3RlbSwgV2l0aCwgV2l0aFRhZ30gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQgeyBkcmF3UG9pbnQgfSBmcm9tIFwiLi4vYXBwL3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlclVJU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICByZWFkb25seSBxdWVyeSA9IG5ldyBRdWVyeSh7XG4gICAgICAgIF90YWc6IFdpdGhUYWcoRVRhZ3MudWkpLFxuICAgICAgICBwb3M6IFJlYWQoUG9zaXRpb24pLFxuICAgICAgICB1aTogUmVhZChVSUl0ZW0pXG4gICAgfSk7XG5cbiAgICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuICAgIHRvU2NyZWVuQ29vcmRzITogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICB9XG5cbiAgICBydW5zID0gMDtcblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5xdWVyeS5leGVjdXRlKCh7cG9zLCB1aX0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHVpLmFjdGl2ZVxuICAgICAgICAgICAgICAgID8gdWkuYWN0aXZlQ29sb3IgPz8gJ3JlZCdcbiAgICAgICAgICAgICAgICA6IHVpLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHVpLmFjdGl2ZVxuICAgICAgICAgICAgICAgID8gYCR7dWkuZm9udFNpemUgKiAxLjJ9cHggc2VyaWZgXG4gICAgICAgICAgICAgICAgOiBgJHt1aS5mb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh1aS5maW5hbENhcHRpb24sIHBvcy54LCBwb3MueSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICB0aGlzLmN0eC5mb250ID0gJzMycHggc2VyaWYnO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKDEwKnRoaXMuZ2FtZVN0b3JlLnRpbWVTaW5jZUxldmVsTG9hZGVkKS8xMC4wXG4gICAgICAgICAgICB9IHMuYCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgMjBcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5nYW1lU3RvcmUubWVkaWFuRnBzKzAuNSlcbiAgICAgICAgICAgIH0gRlBTYCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgNjBcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICAgIGAke3RoaXMuZ2FtZVN0b3JlLnJlbmRlcmVkfSAvICR7dGhpcy5nYW1lU3RvcmUuZHJhd2FibGVzfWAsXG4gICAgICAgICAgICB0aGlzLmN0eC5jYW52YXMud2lkdGggLSAyMDAsIDEwMFxuICAgICAgICApO1xuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgc3RyID10aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50LnRvU3RyaW5nKDIpO1xuICAgICAgICAgICAgc3RyID0gJzAnLnJlcGVhdCg0IC0gc3RyLmxlbmd0aCkgKyBzdHI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICAgICAgICBgJHtzdHJ9YCxcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5jYW52YXMud2lkdGggLSAyMDAsIDE0MFxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJjaXR5bGlnaHRzOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaXR5bGlnaHRzXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NpdHlsaWdodHNcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3NpbS1lY3NfZGlzdF9pbmRleF9qcy1ub2RlX21vZHVsZXNfYm94MmQtd2FzbV9kaXN0X2VzX2VudHJ5X2pzLW5vZGVfbW9kdS0wZDk0NTdcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==