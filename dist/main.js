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
        PhysicsBridge: {},
        Collision: {},
        Position: {
            x: 0,
            y: 0,
        },
        Rotation: {
            value: 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJ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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUVBQW1FLGlDQUFpQztXQUNwRztXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQ3pDQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQzs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDOztXQUVqQztXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0wsZUFBZTtXQUNmO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRW5GQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvYXBwL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9hcHAvZnJhbWUtdHJhbnNpdGlvbi1oYW5kbGVycy50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2FwcC9wZXJzaXN0ZW5jZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2FwcC91dGlsLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9jaGFyYWN0ZXIudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL21lc2gudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3BoeXNpY3MtYnJpZGdlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy9wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2NvbXBvbmVudHMvcm90YXRpb24udHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9jb21wb25lbnRzL3NoYXBlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy91aS1pdGVtLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvY29tcG9uZW50cy92ZWxvY2l0eS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbGV2ZWxzL2xldmVsLmgudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9sZXZlbHMvdG9wZG93bi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL21vZGVscy9jYW1lcmEudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9tb2RlbHMvZ2FtZS1zdG9yZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL21vZGVscy9yZWN0LnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvbW9kZWxzL3RhZ3MudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9tb2RlbHMvdmVjdG9yMmQudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9wcmVmYWJzL2dhbWUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9wcmVmYWJzL21lbnUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9wcmVmYWJzL3BhdXNlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvcHJlZmFicy9zYXZhYmxlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc2VydmVyLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3RhdGVzL2dhbWUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zdGF0ZXMvbWVudS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N0YXRlcy9wYXVzZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvY2FtZXJhLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9jaGFyYWN0ZXIudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL21lbnUudHMiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy8uL3NyYy9zeXN0ZW1zL3BhdXNlLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9waHlzaWNzLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvLi9zcmMvc3lzdGVtcy9yZW5kZXItZ2FtZS50cyIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzLy4vc3JjL3N5c3RlbXMvcmVuZGVyLXVpLnRzIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2l0eWxpZ2h0cy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NpdHlsaWdodHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaXR5bGlnaHRzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZW51bSBFQWN0aW9ucyB7XG4gICAgQ29udGludWUsXG4gICAgRXhpdCxcbiAgICBQbGF5LFxufVxuIiwiaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHtJVHJhbnNpdGlvbkFjdGlvbnN9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBQYXVzZVN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlcy9wYXVzZVwiO1xuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmZ1bmN0aW9uIGhydGltZShwcmV2aW91c1RpbWVzdGFtcD86IG51bWJlcltdKXtcbiAgICBjb25zdCBjbG9ja3RpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSAqIDFlLTNcbiAgICBsZXQgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICAgIGxldCBuYW5vc2Vjb25kcyA9IE1hdGguZmxvb3IoKGNsb2NrdGltZSUxKSoxZTkpXG4gICAgaWYgKHByZXZpb3VzVGltZXN0YW1wKSB7XG4gICAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgICBuYW5vc2Vjb25kcyA9IG5hbm9zZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMV1cbiAgICAgIGlmIChuYW5vc2Vjb25kczwwKSB7XG4gICAgICAgIHNlY29uZHMtLVxuICAgICAgICBuYW5vc2Vjb25kcyArPSAxZTlcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJldHVybiBbc2Vjb25kcywgbmFub3NlY29uZHNdO1xufVxuXG5jb25zdCBocnRpbWVUb1NlY29uZHMgPSAoc19uczogbnVtYmVyW10pID0+IChcbiAgc19uc1swXSArIHNfbnNbMV0gKiAxZS05XG4pO1xuXG5sZXQgbGFzdFRyYW5zaXRpb24gPSBocnRpbWUoKTtcblxubGV0IGRlbHRhU3VtID0gMDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJlZm9yZUZyYW1lSGFuZGxlcihhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICBjb25zdCBnYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG5cbiAgICBjb25zdCBpc1BhdXNlU3RhdGUgPSBnYW1lU3RvcmUuY3VycmVudFN0YXRlPy5jb25zdHJ1Y3RvciA9PSBQYXVzZVN0YXRlO1xuXG4gICAgaWYgKCFpc1BhdXNlU3RhdGUpIHtcbiAgICAgIGdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWUgPSBocnRpbWVUb1NlY29uZHMoXG4gICAgICAgIGhydGltZShsYXN0VHJhbnNpdGlvbilcbiAgICAgICk7XG4gIFxuICAgICAgaWYgKGdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWUgPiAwLjEpIHtcbiAgICAgICAgZ2FtZVN0b3JlLmxhc3RGcmFtZURlbHRhVGltZSA9IDAuMTtcbiAgICAgIH1cbiAgXG4gICAgICBnYW1lU3RvcmUudGltZVNpbmNlTGV2ZWxMb2FkZWQgKz0gXG4gICAgICAgIGdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWU7IFxuICBcbiAgICAgIGRlbHRhU3VtICs9IGdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWU7XG4gICAgICBnYW1lU3RvcmUubWVkaWFuRnBzID0gKytnYW1lU3RvcmUudGlja3MgLyBkZWx0YVN1bTtcbiAgXG4gICAgICBsYXN0VHJhbnNpdGlvbiA9IGhydGltZSgpOyAgXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgY2FudmFzXG4gICAgY29uc3QgY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG59XG4iLCJpbXBvcnQge0lUcmFuc2l0aW9uQWN0aW9ucywgUXVlcnksIFNlcmlhbEZvcm1hdCwgVEdyb3VwSGFuZGxlLCBXaXRoVGFnfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtFVGFnc30gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5cblxuY29uc3Qgc2F2ZUtleSA9ICdzYXZlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWQoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKTogVEdyb3VwSGFuZGxlIHtcbiAgICBjb25zdCBzYXZlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc2F2ZUtleSk7XG5cbiAgICBpZiAoIXNhdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzYXZlIGF2YWlsYWJsZS4gQ2Fubm90IGxvYWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlID0gYWN0aW9ucy5jb21tYW5kcy5sb2FkKFNlcmlhbEZvcm1hdC5mcm9tSlNPTihzYXZlKSk7XG5cbiAgICByZXR1cm4gaGFuZGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzYXZlS2V5LCBhY3Rpb25zLnNhdmUobmV3IFF1ZXJ5KFtXaXRoVGFnKEVUYWdzLnNhdmUpXSkpLnRvSlNPTigpKTtcbn1cbiIsImV4cG9ydCBjb25zdCBUV09QSSA9IE1hdGguUEkgKiAyO1xuZXhwb3J0IGNvbnN0IGRyYXdQb2ludCA9IChcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICB4Om51bWJlcixcbiAgICB5Om51bWJlcixcbiAgICBzaXplOm51bWJlciA9IDAuMVxuKSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjcpJztcbiAgICBjdHguYXJjKHgsIHksIHNpemUsIDAsIFRXT1BJKTtcbiAgICBjdHguZmlsbCgpO1xufVxuXG5leHBvcnQgY29uc3QgUElYRUxTX1BFUl9NRVRFUiA9IDMyO1xuXG5leHBvcnQgY29uc3QgbGVycCA9ICh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIsIGFtb3VudDogbnVtYmVyKSA9PiB7XG4gICAgYW1vdW50ID0gYW1vdW50IDwgMCA/IDAgOiBhbW91bnQ7XG4gICAgYW1vdW50ID0gYW1vdW50ID4gMSA/IDEgOiBhbW91bnQ7XG4gICAgcmV0dXJuIHZhbHVlMSArICh2YWx1ZTIgLSB2YWx1ZTEpICogYW1vdW50O1xufSIsImV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gJycsXG4gICAgKSB7fVxufSIsImltcG9ydCB7IElFbnRpdHkgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi9zaGFwZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNoYXBlRnJvbVZpc3VhbHM6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBwdWJsaWMgc2hhcGU6IFNoYXBlIHwgbnVsbCA9IG51bGxcbiAgICApIHtcbiAgICAgICAgaWYgKCFzaGFwZUZyb21WaXN1YWxzICYmICFzaGFwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgY29weSB0aGUgY29sbGlzaW9uIHNoYXBlXFxcbiAgICAgICAgICAgICAgICBmcm9tIHZpc3VhbHMgb3IgcHJvdmlkZSBhIG5ldyBvbmUnKVxuICAgICAgICB9IFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgY29sbGlzaW9uT2JqZWN0czogU2V0PElFbnRpdHk+ID0gbmV3IFNldDxJRW50aXR5PigpO1xuICAgIHB1YmxpYyBvY2N1cnJlZCA9IGZhbHNlO1xufVxuIiwiZXhwb3J0IGNsYXNzIE1hdGVyaWFsIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nXG4gICAgKSB7fVxufSIsImltcG9ydCB7IElWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIE1lc2gge1xuICAgIHB1YmxpYyBpc0NvbnZleDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgdmVydGljaWVzOiBJVmVjdG9yMkRbXSkge1xuICAgICAgICAvLyBUT0RPOiB0ZXN0IGZvciBjb252ZXhuZXNzXG4gICAgICAgIHRoaXMuaXNDb252ZXggPSB0cnVlO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUGh5c2ljc0JyaWRnZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBib2R5UHRyOiBCb3gyRC5iMkJvZHkgfCBudWxsID0gbnVsbCxcbiAgICApIHtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgVmVjdG9yMkQge31cbiIsImV4cG9ydCBjbGFzcyBSb3RhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHt9XG59IiwiaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcmVjdFwiO1xuaW1wb3J0IHsgVmVjdG9yMkQsIHZlY1plcm8gfSBmcm9tIFwiLi4vbW9kZWxzL3ZlY3RvcjJkXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcIi4vbWVzaFwiO1xuXG5leHBvcnQgZW51bSBTaGFwZVByaW1pdGl2ZSB7XG4gICAgQ2lyY2xlID0gJ2NpcmNsZScsXG4gICAgUmVjdCA9ICdyZWN0JyxcbiAgICBNZXNoID0gJ21lc2gnLFxufVxuXG5leHBvcnQgZW51bSBTaGFwZVBpdm90IHtcbiAgICBUb3BMZWZ0ID0gMCxcbiAgICBUb3BNaWRkbGUgPSAxLFxuICAgIFRvcFJpZ2h0ID0gMixcbiAgICBMZWZ0ID0gMyxcbiAgICBNaWRkbGUgPSA0LFxuICAgIFJpZ2h0ID0gNSxcbiAgICBCb3R0b21MZWZ0ID0gNixcbiAgICBCb3R0b21NaWRkbGUgPSA3LFxuICAgIEJvdHRvbVJpZ2h0ID0gOFxufVxuXG5leHBvcnQgY29uc3QgU2hhcGVQaXZvdE5hbWVzOntcbiAgICBba2V5IGluIFNoYXBlUGl2b3RdOiBzdHJpbmc7XG59ID0ge1xuICAgIFtTaGFwZVBpdm90LlRvcExlZnRdOiAnVG9wTGVmdCcsXG4gICAgW1NoYXBlUGl2b3QuVG9wTWlkZGxlXTogJ1RvcE1pZGRsZScsXG4gICAgW1NoYXBlUGl2b3QuVG9wUmlnaHRdOiAnVG9wUmlnaHQnLFxuICAgIFtTaGFwZVBpdm90LkxlZnRdOiAnTGVmdCcsXG4gICAgW1NoYXBlUGl2b3QuTWlkZGxlXTogJ01pZGRsZScsXG4gICAgW1NoYXBlUGl2b3QuUmlnaHRdOiAnUmlnaHQnLFxuICAgIFtTaGFwZVBpdm90LkJvdHRvbUxlZnRdOiAnQm90dG9tTGVmdCcsXG4gICAgW1NoYXBlUGl2b3QuQm90dG9tTWlkZGxlXTogJ0JvdHRvbU1pZGRsZScsXG4gICAgW1NoYXBlUGl2b3QuQm90dG9tUmlnaHRdOiAnQm90dG9tUmlnaHQnLFxufVxuXG4vLyB0b2RvIHRyaWFuZ2xlLCBjYXBzdWxlXG5cbmV4cG9ydCBjbGFzcyBTaGFwZSB7XG4gICAgcHVibGljIGJCb3g6IFJlY3QgPSBuZXcgUmVjdCgwLCAwLCAwLCAwKTtcblxuICAgIHB1YmxpYyBpc0J1aWx0ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGltZW5zaW9ucyAod2lkdGgsaGVpZ2h0KSBpZiByZWN0LCAoZGlhbWV0ZXIsYW55KSBpZiBjaXJjbGVcbiAgICAgKiBAcGFyYW0gcHJpbWl0aXZlIEVudW0gb3Igc3RyaW5nIHZhbHVlXG4gICAgICogQHBhcmFtIG1lc2ggdmVydGljaWVzIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHpJbmRleCA9IDAsXG4gICAgICAgIC8vIFRPRE86IG1ha2UgaXQgcmVhbFxuICAgICAgICBwdWJsaWMgcGl2b3QgPSBTaGFwZVBpdm90Lk1pZGRsZSxcbiAgICAgICAgcHVibGljIG9mZnNldFggPSAwLFxuICAgICAgICBwdWJsaWMgb2Zmc2V0WSA9IDAsXG4gICAgICAgIHB1YmxpYyBkaW1lbnNpb25zOiBWZWN0b3IyRCA9IHZlY1plcm8sXG4gICAgICAgIHB1YmxpYyBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlID0gU2hhcGVQcmltaXRpdmUuUmVjdCxcbiAgICAgICAgcHVibGljIG1lc2g6IE1lc2ggfCBudWxsID0gbnVsbCxcbiAgICApIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQnVpbHQpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLk1lc2ggJiYgIXRoaXMubWVzaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFwZXMgd2l0aCBtZXNoIHByaW1pdGl2ZVxcXG4gICAgICAgICAgICAgICAgbXVzdCBwcm92aWRlIGEgbWVzaCBkYXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJpbWl0aXZlICE9PSBTaGFwZVByaW1pdGl2ZS5NZXNoICYmICF0aGlzLmRpbWVuc2lvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpbWVuc2lvbnM6JywgdGhpcy5kaW1lbnNpb25zLFxuICAgICAgICAgICAgICAgICdwcmltaXRpdmU6JywgdGhpcy5wcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgJ21lc2g6JywgdGhpcy5tZXNoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2hhcGVzIHdpdGggbm9uLW1lc2ggcHJpbWl0aXZlXFxcbiAgICAgICAgICAgICAgICBtdXN0IHByb3ZpZGUgZGltZW5zaW9ucycpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbGwgdGhlIHNoYXBlcyBhcmUgY2VuZXRlcmVkIGJ5IGRlZmF1bHRcblxuICAgICAgICBsZXQgbWluWCA9IDAsIG1pblkgPSAwLCBtYXhYID0gMCwgbWF4WSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5DaXJjbGUpIHtcbiAgICAgICAgICAgIC8vIEEgY2VudGVyLXBvc2l0aW9uZWQgY2lyY2xlXG4gICAgICAgICAgICAvLyB3aWxsIGZpdCBpbnRvIGEgbWlkLXNoaWZ0ZWRcbiAgICAgICAgICAgIC8vIHNxdWFyZSB3aXRoIHNpZGUgPSBkaWFtZXRlclxuICAgICAgICAgICAgY29uc3QgZCA9IHRoaXMuZGltZW5zaW9ucy54XG4gICAgICAgICAgICBjb25zdCByYWQgPSBkLzI7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCA9IC1yYWQ7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSA9IC1yYWQ7XG4gICAgICAgICAgICB0aGlzLmJCb3gudyA9IGQ7XG4gICAgICAgICAgICB0aGlzLmJCb3guaCA9IGQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLlJlY3QpIHtcbiAgICAgICAgICAgIC8vIGEgdG9wLWxlZnQgcG9zaXRpb25lZCByZWN0YW5nbGVcbiAgICAgICAgICAgIC8vIGlzIHRoZSBib3VuZGluZyBib3ggaXRzZWxmXG4gICAgICAgICAgICB0aGlzLmJCb3gueCA9IC10aGlzLmRpbWVuc2lvbnMueC8yO1xuICAgICAgICAgICAgdGhpcy5iQm94LnkgPSAtdGhpcy5kaW1lbnNpb25zLnkvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC53ID0gdGhpcy5kaW1lbnNpb25zLng7XG4gICAgICAgICAgICB0aGlzLmJCb3guaCA9IHRoaXMuZGltZW5zaW9ucy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJpbWl0aXZlID09PSBTaGFwZVByaW1pdGl2ZS5NZXNoICYmIHRoaXMubWVzaCkge1xuICAgICAgICAgICAgbWluWCA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbMF0ueDtcbiAgICAgICAgICAgIG1pblkgPSB0aGlzLm1lc2gudmVydGljaWVzWzBdLnk7XG5cbiAgICAgICAgICAgIG1heFggPSB0aGlzLm1lc2gudmVydGljaWVzWzBdLng7XG4gICAgICAgICAgICBtYXhZID0gdGhpcy5tZXNoLnZlcnRpY2llc1swXS55O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTE7aTx0aGlzLm1lc2gudmVydGljaWVzLmxlbmd0aDsrK2kpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMubWVzaC52ZXJ0aWNpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5iQm94LncgPSBtYXhYIC0gbWluWDtcbiAgICAgICAgICAgIHRoaXMuYkJveC5oID0gbWF4WSAtIG1pblk7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCA9IC10aGlzLmJCb3gudy8yO1xuICAgICAgICAgICAgdGhpcy5iQm94LnkgPSAtdGhpcy5iQm94LmgvMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBpdm90ID09PSBTaGFwZVBpdm90LlRvcExlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC54ICs9IHRoaXMuYkJveC53LzI7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSArPSB0aGlzLmJCb3guaC8yO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuVG9wTWlkZGxlKSB7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSArPSB0aGlzLmJCb3guaC8yO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuVG9wUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC54IC09IHRoaXMuYkJveC53LzI7XG4gICAgICAgICAgICB0aGlzLmJCb3gueSArPSB0aGlzLmJCb3guaC8yO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnggKz0gdGhpcy5iQm94LncvMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpdm90ID09PSBTaGFwZVBpdm90LlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJCb3gueCAtPSB0aGlzLmJCb3gudy8yO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGl2b3QgPT09IFNoYXBlUGl2b3QuQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnggKz0gdGhpcy5iQm94LncvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC55IC09IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5Cb3R0b21NaWRkbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC55IC09IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waXZvdCA9PT0gU2hhcGVQaXZvdC5Cb3R0b21SaWdodCkge1xuICAgICAgICAgICAgdGhpcy5iQm94LnggLT0gdGhpcy5iQm94LncvMjtcbiAgICAgICAgICAgIHRoaXMuYkJveC55IC09IHRoaXMuYkJveC5oLzI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLk1lc2ggJiYgdGhpcy5tZXNoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLm1lc2gudmVydGljaWVzLmxlbmd0aDsrK2kpe1xuICAgICAgICAgICAgICAgIHRoaXMubWVzaC52ZXJ0aWNpZXNbaV0ueCArPSAodGhpcy5iQm94LnggLSBtaW5YKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc2gudmVydGljaWVzW2ldLnkgKz0gKHRoaXMuYkJveC55IC0gbWluWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQnVpbHQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldEJCb3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJCb3g7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFQWN0aW9uc30gZnJvbSBcIi4uL2FwcC9hY3Rpb25zXCI7XG5cbmV4cG9ydCBjbGFzcyBVSUl0ZW0ge1xuICAgIHB1YmxpYyBjYXB0aW9uTW9kID0gKHN0ckluOiBzdHJpbmcpID0+IHN0ckluO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZm9udFNpemU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGFjdGlvbj86IEVBY3Rpb25zLFxuICAgICAgICBwdWJsaWMgYWN0aXZlPzogYm9vbGVhbixcbiAgICAgICAgcHVibGljIGFjdGl2ZUNvbG9yPzogc3RyaW5nLFxuICAgICkge31cblxuICAgIGdldCBmaW5hbENhcHRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FwdGlvbk1vZCh0aGlzLmNhcHRpb24pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIFZlbG9jaXR5IGV4dGVuZHMgVmVjdG9yMkQge1xuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5OiBudW1iZXIsIHB1YmxpYyBhbmd1bGFyOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICcuL3NlcnZlcic7XG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gJy4vbGV2ZWxzL2xldmVsLmgnO1xuaW1wb3J0IHsgVG9wZG93biB9IGZyb20gJy4vbGV2ZWxzL3RvcGRvd24nO1xuaW1wb3J0ICcuL3Njc3MvYXBwLnNjc3MnO1xuaW1wb3J0IHsgbG9hZFBoeXNpY3MsIF9Cb3gyRCB9IGZyb20gJy4vc2VydmVyJztcblxuY29uc3QgX2ZldGNoID0gd2luZG93LmZldGNoO1xuXG53aW5kb3cuZmV0Y2ggPSAoXG4gICAgaW5wdXQ6IFJlcXVlc3RJbmZvLFxuICAgIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCk6IFByb21pc2U8UmVzcG9uc2U+ID0+IHtcbiAgICBpZiAoaW5pdD8uY3JlZGVudGlhbHMgPT09ICdzYW1lLW9yaWdpbicpIHtcbiAgICAgICAgZGVsZXRlIGluaXQuY3JlZGVudGlhbHM7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGlucHV0LCBpbml0KTtcbiAgICByZXR1cm4gX2ZldGNoKGlucHV0LCBpbml0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHByZXBhcmVSZW5kZXJDb250ZXh0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICAgIGlmICghY2FudmFzRWxlKSB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGNhbnZhcyBlbGVtZW50IScpO1xuXG4gICAgY29uc3QgcmVuZGVyQ29udGV4dCA9IGNhbnZhc0VsZS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmICghcmVuZGVyQ29udGV4dCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgaW5pdGlhbGl6ZSAyRCBjb250ZXh0Jyk7XG5cbiAgICBjb25zdCBjYW52YXNCb3VuZGluZ1JlY3QgPSBjYW52YXNFbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjYW52YXNFbGUud2lkdGggPSBjYW52YXNCb3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY2FudmFzRWxlLmhlaWdodCA9IGNhbnZhc0JvdW5kaW5nUmVjdC5oZWlnaHQ7XG5cbiAgICByZW5kZXJDb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHJlbmRlckNvbnRleHQ7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBwcmVwYXJlUmVuZGVyQ29udGV4dCk7XG5cbmNvbnN0IGxldmVsczp7XG4gICAgW25hbWU6IHN0cmluZ106IG5ldyAoLi4uYXJnczpbX0JveDJEXSkgPT4gTGV2ZWwsXG59ID0ge1xuICAgICd0b3Bkb3duJzogVG9wZG93bixcbn07XG5cbnR5cGUgbGV2ZWxUeXBlID0ga2V5b2YgdHlwZW9mIGxldmVscztcblxuLy8gbWFpbiBmdW5jdGlvblxuKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBib3gyRCA9IGF3YWl0IGxvYWRQaHlzaWNzKCk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmtleXMobGV2ZWxzKVxuICAgICAgICAubWFwKChlLGkpID0+IChgJHtpKzF9KSAke2V9YCkpO1xuICAgIG9wdGlvbnMucHVzaCgnZXhpdCAob3IgZW1wdHkpJyk7XG5cbiAgICBsZXQgcmVxdWVzdGVkTGV2ZWwgPSAndG9wZG93bic7XG5cbiAgICB3aGlsZSAocmVxdWVzdGVkTGV2ZWwgIT09ICdleGl0Jykge1xuICAgICAgICBjb25zdCBsZXZlbCA9IHJlcXVlc3RlZExldmVsIGFzIGxldmVsVHlwZTtcbiAgICAgICAgbGV0IHdvcmxkID0gbmV3IGxldmVsc1tsZXZlbF0oYm94MkQpO1xuXG4gICAgICAgIGF3YWl0IHdvcmxkLnJ1bigpO1xuXG4gICAgICAgIHJlcXVlc3RlZExldmVsID0gcHJvbXB0KCdXaGF0IGxldmVsIHdvdWxkIHlvdSBsaWtlIHRvIGNoZWNrIG5leHQ/XFxuJyArXG4gICAgICAgICAgICBvcHRpb25zLmpvaW4oJ1xcbicpXG4gICAgICAgICkgfHwgJ2V4aXQnO1xuICAgIH1cbn0pKCkuY2F0Y2goY29uc29sZS5lcnJvcik7XG4iLCJpbXBvcnQgeyBJV29ybGQgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgcHJlcGFyZVJlbmRlckNvbnRleHQgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IGJlZm9yZUZyYW1lSGFuZGxlciB9IGZyb20gXCIuLi9hcHAvZnJhbWUtdHJhbnNpdGlvbi1oYW5kbGVyc1wiO1xuaW1wb3J0IHsgX0JveDJEIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlcy9tZW51XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxldmVsIHtcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvLyBUT0RPOiBsb2FkIGZyb20gZmlsZXN5c3RlbSwgZnJvbSBVUkxcbiAgICAvLyBwYXRoOiBzdHJpbmc7IFxuXG4gICAgd29ybGQ6IElXb3JsZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCByaWdodCBhZnRlciB0aGUgaW5pdGlhbGl6YXRpb24sIG1haW4gbG9vcCBnb2VzIGhlcmVcbiAgICAgKi9cbiAgICBydW4oKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSB0aGUgcmVzb3VyY2VzIHRvIHJ1biBhbm90aGVyIGxldmVsXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGV2ZWwgaW1wbGVtZW50cyBJTGV2ZWwge1xuXG4gICAgcHVibGljIHdvcmxkOiBJV29ybGQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBoeXNpY3M6IF9Cb3gyRCxcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0xldmVsIGxvYWRlZCcsIG5hbWUpO1xuICAgICAgICBjb25zdCB3b3JsZCA9IHRoaXMuY3JlYXRlV29ybGQoKTtcblxuICAgICAgICBpZiAoIXdvcmxkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgbGV2ZWwgbXVzdCBoYXZlIGEgbm9uLW51bGwgXFxcbiAgICAgICAgICAgIHJlc3VsaW5nIGNyZWF0ZVdvcmxkIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyQ29udGV4dCA9IHByZXBhcmVSZW5kZXJDb250ZXh0KCk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5hZGRSZXNvdXJjZShyZW5kZXJDb250ZXh0KTtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBjcmVhdGVXb3JsZCgpOiBJV29ybGQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgeW91IGhhdmUgdG8gcmVsZWFzZSBtb3JlIHJlc291cmNlc1xuICAgICAqIChhdWRpbywgdmlkZW8sIFdlYlJUQywgdGV4dHVyZXMsIGZpbGVzLCBldGMuKVxuICAgICAqL1xuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMud29ybGQuY29tbWFuZHMuc3RvcFJ1bigpO1xuICAgIH1cblxuICAgIGFzeW5jIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud29ybGQucnVuKHtcbiAgICAgICAgICAgIGJlZm9yZVN0ZXBIYW5kbGVyOiBiZWZvcmVGcmFtZUhhbmRsZXIsXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6IE1lbnVTdGF0ZSxcbiAgICAgICAgfSkudGhlbigoKT0+dGhpcy5kZXN0cm95KCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFQ1MsIElXb3JsZCB9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7IENvbGxpc2lvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbGxpc2lvblwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21lc2hcIjtcbmltcG9ydCB7IFBoeXNpY3NCcmlkZ2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9waHlzaWNzLWJyaWRnZVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgUm90YXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3RhdGlvblwiO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHsgVUlJdGVtIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHsgVmVsb2NpdHkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4uL21vZGVscy9jYW1lcmFcIjtcbmltcG9ydCB7IEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgX0JveDJEIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuaW1wb3J0IHsgQ2FtZXJhU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvY2FtZXJhXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXJTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7IENvbGxpc2lvblN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL2NvbGxpc2lvblwiO1xuaW1wb3J0IHsgSW5wdXRTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9pbnB1dFwiO1xuaW1wb3J0IHsgTWVudVN5c3RlbSB9IGZyb20gXCIuLi9zeXN0ZW1zL21lbnVcIjtcbmltcG9ydCB7IFBhdXNlU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvcGF1c2VcIjtcbmltcG9ydCB7IFBoeXNpY3NTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9waHlzaWNzXCI7XG5pbXBvcnQgeyBSZW5kZXJHYW1lU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLWdhbWVcIjtcbmltcG9ydCB7IFJlbmRlclVJU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvcmVuZGVyLXVpXCI7XG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gXCIuL2xldmVsLmhcIjtcblxuZXhwb3J0IGNsYXNzIFRvcGRvd24gZXh0ZW5kcyBMZXZlbCB7XG4gICAgY29uc3RydWN0b3IocGh5c2ljczogX0JveDJEKSB7XG4gICAgICAgIHN1cGVyKHBoeXNpY3MsICd0b3Bkb3duJyk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYjJWZWMyLFxuICAgICAgICAgICAgYjJXb3JsZFxuICAgICAgICB9ID0gcGh5c2ljcztcblxuICAgICAgICBjb25zdCBncmF2aXR5ID0gbmV3IGIyVmVjMigwLCA5LjgxKTtcbiAgICAgICAgY29uc3QgcGh5c1dvcmxkID0gbmV3IGIyV29ybGQoZ3Jhdml0eSk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkUmVzb3VyY2UocGh5c1dvcmxkKTtcblxuICAgICAgICBjb25zdCB6ZXJvID0gbmV3IGIyVmVjMigwLCAwKTtcblxuICAgICAgICBjb25zdCBnYW1lU3RvcmUgPSBuZXcgR2FtZVN0b3JlKCk7XG4gICAgICAgIGdhbWVTdG9yZS5waHlzaWNzTmFtZXNwYWNlID0gcGh5c2ljcztcbiAgICAgICAgZ2FtZVN0b3JlLnBoeXNpY3NaZXJvID0gemVybztcblxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5hZGRSZXNvdXJjZShnYW1lU3RvcmUpO1xuICAgICAgICB0aGlzLndvcmxkLmFkZFJlc291cmNlKGNhbWVyYSk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHBoeXNpY3NOYW1lc3BhY2UsXG4gICAgICAgICAgICBwaHlzaWNzWmVyb1xuICAgICAgICB9ID0gdGhpcy53b3JsZC5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgICAgICBjb25zdCBwaHlzaWNzV29ybGQgPSB0aGlzLndvcmxkLmdldFJlc291cmNlKHBoeXNpY3NOYW1lc3BhY2UuYjJXb3JsZCk7XG5cbiAgICAgICAgcGh5c2ljc05hbWVzcGFjZS5kZXN0cm95KHBoeXNpY3NXb3JsZCk7XG4gICAgICAgIHBoeXNpY3NOYW1lc3BhY2UuZGVzdHJveShwaHlzaWNzWmVybyk7XG5cbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy53b3JsZC5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNlY2VjZWMnO1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjcmVhdGVXb3JsZCgpOiBJV29ybGQge1xuICAgICAgICByZXR1cm4gbmV3IEVDUygpXG4gICAgICAgICAgICAuYnVpbGRXb3JsZCgpXG4gICAgICAgICAgICAud2l0aFN5c3RlbShDYW1lcmFTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBDaGFyYWN0ZXJTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShQaHlzaWNzU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgQ2hhcmFjdGVyU3lzdGVtXG4gICAgICAgICAgICAgICAgLy8gTmV0d29ya1N5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKENoYXJhY3RlclN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIENvbGxpc2lvblN5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKENvbGxpc2lvblN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmtTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShJbnB1dFN5c3RlbSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKE1lbnVTeXN0ZW0sIFtcbiAgICAgICAgICAgICAgICBJbnB1dFN5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoU3lzdGVtKFBhdXNlU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgSW5wdXRTeXN0ZW1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShSZW5kZXJHYW1lU3lzdGVtLCBbXG4gICAgICAgICAgICAgICAgUGh5c2ljc1N5c3RlbSxcbiAgICAgICAgICAgICAgICBDaGFyYWN0ZXJTeXN0ZW0sXG4gICAgICAgICAgICAgICAgLy8gTmV0d29ya1N5c3RlbSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAud2l0aFN5c3RlbShSZW5kZXJVSVN5c3RlbSwgW1xuICAgICAgICAgICAgICAgIFBoeXNpY3NTeXN0ZW0sXG4gICAgICAgICAgICAgICAgTWVudVN5c3RlbSxcbiAgICAgICAgICAgICAgICBQYXVzZVN5c3RlbVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC53aXRoQ29tcG9uZW50cyhcbiAgICAgICAgICAgICAgICBDb2xsaXNpb24sXG4gICAgICAgICAgICAgICAgTWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgTWVzaCxcbiAgICAgICAgICAgICAgICBQb3NpdGlvbixcbiAgICAgICAgICAgICAgICBSb3RhdGlvbixcbiAgICAgICAgICAgICAgICBTaGFwZSxcbiAgICAgICAgICAgICAgICBVSUl0ZW0sXG4gICAgICAgICAgICAgICAgVmVsb2NpdHksXG4gICAgICAgICAgICAgICAgQ2hhcmFjdGVyLFxuICAgICAgICAgICAgICAgIFBoeXNpY3NCcmlkZ2UsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVsb2NpdHkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy92ZWxvY2l0eVwiO1xuaW1wb3J0IHsgSVJlY3QgfSBmcm9tIFwiLi9yZWN0XCI7XG5pbXBvcnQgeyBJVmVjdG9yMkQgfSBmcm9tIFwiLi92ZWN0b3IyZFwiO1xuXG5leHBvcnQgZW51bSBDYW1lcmFGb2xsb3dNZXRob2Qge1xuICAgIEltbWVkaWF0ZSxcbiAgICBTbW9vdGgsXG4gICAgRWxhc3RpY1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhbWVyYUZvbGxvdyB7XG4gICAgdGFyZ2V0OiBJVmVjdG9yMkRcbiAgICBtZXRob2Q6IENhbWVyYUZvbGxvd01ldGhvZFxuICAgIHByZXZYOiBudW1iZXJcbiAgICBwcmV2WTogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xuICAgIHB1YmxpYyB2aWV3cG9ydCE6IElSZWN0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB4OiBudW1iZXIgPSAwLFxuICAgICAgICBwdWJsaWMgeTogbnVtYmVyID0gMCxcbiAgICAgICAgcHVibGljIG9mZnNldDogSVZlY3RvcjJEID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHB1YmxpYyB2ZWw6IFZlbG9jaXR5ID0gPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHB1YmxpYyB6b29tOiBudW1iZXIgPSAxLFxuICAgICAgICBwdWJsaWMgcm90YXRpb246IG51bWJlciA9IDAsXG4gICAgICAgIHB1YmxpYyBmb2xsb3c/OiBDYW1lcmFGb2xsb3csXG4gICAgICAgIHB1YmxpYyBlbGFzdGljaXR5OiBudW1iZXIgPSAwLjAxLFxuICAgICAgICBwdWJsaWMgZnJpY3Rpb246IG51bWJlciA9IDAuMTUsXG4gICAgKSB7fVxufSIsImltcG9ydCB7IEVLZXlTdGF0ZSwgRU1vdXNlU3RhdGUgfSBmcm9tICcuLi9zeXN0ZW1zL2lucHV0J1xuaW1wb3J0IHtJU3RhdGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQgeyBfQm94MkQgfSBmcm9tICcuLi9zZXJ2ZXInO1xuaW1wb3J0IHsgSVZlY3RvcjJEIH0gZnJvbSAnLi92ZWN0b3IyZCc7XG5cbmV4cG9ydCBlbnVtIEVNb3ZlbWVudCB7XG4gICAgaWRsZSAgPSAwLCAvLyAwMDAwXG4gICAgdXAgICAgPSAxLCAvLyAwMDAxXG4gICAgZG93biAgPSAyLCAvLyAwMDEwXG4gICAgbGVmdCAgPSA0LCAvLyAwMTAwXG4gICAgcmlnaHQgPSA4LCAvLyAxMDAwXG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lU3RvcmUge1xuICAgIGRyYXdhYmxlcyA9IDBcbiAgICByZW5kZXJlZCA9IDBcblxuICAgIGRlYnVnU2hhcGVzID0gdHJ1ZVxuICAgIHdhc0JsdXJyZWQgPSBmYWxzZVxuICAgIHdhc0ludGVudGlvbmFsbHlQYXVzZWQgPSBmYWxzZVxuICAgIGNvbnRpbnVlID0gZmFsc2VcbiAgICBjdXJyZW50U3RhdGU/OiBJU3RhdGVcbiAgICBsYXN0RnJhbWVEZWx0YVRpbWUgPSAwXG4gICAgdGlja3MgPSAwXG4gICAgbWVkaWFuRnBzID0gMzBcbiAgICB0aW1lU2luY2VMZXZlbExvYWRlZCA9IDBcbiAgICBpbnB1dDoge1xuICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBjaGFyYWN0ZXJNb3ZlbWVudDogRU1vdmVtZW50XG4gICAgICAgICAgICBtZW51Q29uZmlybTogYm9vbGVhblxuICAgICAgICAgICAgdG9nZ2xlUGF1c2U6IGJvb2xlYW5cbiAgICAgICAgICAgIG1lbnVNb3ZlbWVudDogRU1vdmVtZW50XG4gICAgICAgIH1cbiAgICAgICAgd2hlZWw6IG51bWJlclxuICAgICAgICBjdXJzb3JQb3M6IElWZWN0b3IyRFxuICAgICAgICBjdXJzb3JQb3NXb3JsZDogSVZlY3RvcjJEXG4gICAgICAgIGtleVN0YXRlczogTWFwPHN0cmluZywgRUtleVN0YXRlPlxuICAgICAgICBtb3VzZVN0YXRlczogTWFwPG51bWJlciwgRU1vdXNlU3RhdGU+XG4gICAgfSA9IHtcbiAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgICAgY2hhcmFjdGVyTW92ZW1lbnQ6IEVNb3ZlbWVudC5pZGxlLFxuICAgICAgICAgICAgbWVudUNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgbWVudU1vdmVtZW50OiBFTW92ZW1lbnQuaWRsZSxcbiAgICAgICAgICAgIHRvZ2dsZVBhdXNlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlZWw6IDAsXG4gICAgICAgIGN1cnNvclBvczoge3g6LTEsIHk6LTF9LFxuICAgICAgICBjdXJzb3JQb3NXb3JsZDoge3g6LTEsIHk6LTF9LFxuICAgICAgICBrZXlTdGF0ZXM6IG5ldyBNYXA8c3RyaW5nLCBFS2V5U3RhdGU+KCksXG4gICAgICAgIG1vdXNlU3RhdGVzOiBuZXcgTWFwPG51bWJlciwgRU1vdXNlU3RhdGU+KCksXG4gICAgfVxuICAgIHBoeXNpY3NOYW1lc3BhY2UhOiBfQm94MkQ7XG4gICAgcGh5c2ljc1plcm8hOiBCb3gyRC5iMlZlYzI7XG4gICAgc2NyZWVuVG9Xb3JsZD86IERPTU1hdHJpeDtcbiAgICB3b3JsZFRvU2NyZWVuPzogRE9NTWF0cml4O1xufVxuIiwiaW1wb3J0IHsgSVZlY3RvcjJEIH0gZnJvbSBcIi4vdmVjdG9yMmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVjdCB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3OiBudW1iZXIsXG4gICAgaDogbnVtYmVyLFxufVxuXG5leHBvcnQgY2xhc3MgUmVjdCBpbXBsZW1lbnRzIElSZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHk6IG51bWJlcixcbiAgICAgICAgcHVibGljIHc6IG51bWJlcixcbiAgICAgICAgcHVibGljIGg6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBzdGF0aWMgY2hlY2tQb2ludEluc2lkZShyOiBJUmVjdCwge3gsIHl9OiBJVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuICEoXG4gICAgICAgICAgICB4IDwgci54IHx8IFxuICAgICAgICAgICAgeCA+IHIueCArIHIudyB8fFxuICAgICAgICAgICAgeSA8IHIueSB8fFxuICAgICAgICAgICAgeSA+IHIueSArIHIuaFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGVja0ludGVyc2VjdHMocjE6IElSZWN0LCByMjogSVJlY3QpIHtcbiAgICAgICAgcmV0dXJuICEocjIueCA+IHIxLngrcjEudyB8fCBcbiAgICAgICAgICAgIHIyLngrcjIudyA8IHIxLnggfHwgXG4gICAgICAgICAgICByMi55ID4gcjEueStyMS5oIHx8XG4gICAgICAgICAgICByMi55K3IyLmggPCByMS55KTtcbiAgICB9XG59IiwiZXhwb3J0IGVudW0gRVRhZ3Mge1xuICAgIHVpLFxuICAgIHRlcnJhaW4sXG4gICAgY2hhcmFjdGVyLFxuICAgIG5ldHdvcmtPYmplY3QsXG4gICAgc2F2ZSxcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSVZlY3RvcjJEIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVmVjdG9yMkQgaW1wbGVtZW50cyBJVmVjdG9yMkQge1xuICAgIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcig0KTtcbiAgICBmMzIgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuYnVmKTtcbiAgICB1MzIgPSBuZXcgVWludDMyQXJyYXkodGhpcy5idWYpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB4ID0gMCxcbiAgICAgICAgcHVibGljIHkgPSAwLFxuICAgICkge31cblxuICAgIHB1YmxpYyBhZGRTZWxmKHZlYzogVmVjdG9yMkQpIHtcbiAgICAgICAgdGhpcy54ICs9IHZlYy54O1xuICAgICAgICB0aGlzLnkgKz0gdmVjLnk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1YlNlbGYodmVjOiBWZWN0b3IyRCkge1xuICAgICAgICB0aGlzLnggLT0gdmVjLng7XG4gICAgICAgIHRoaXMueSAtPSB2ZWMueTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2NhbGUoZmFjdG9yOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICo9IGZhY3RvcjtcbiAgICAgICAgdGhpcy55ICo9IGZhY3RvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm9ybWFsaXplKCkge1xuICAgICAgICBjb25zdCBpbnYgPSB0aGlzLmludlNxcnQoKTtcblxuICAgICAgICB0aGlzLnggKj0gaW52O1xuICAgICAgICB0aGlzLnkgKj0gaW52O1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnZTcXJ0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHgyID0gMC41ICogKHRoaXMuZjMyWzBdID0geCk7XG4gICAgICAgIHRoaXMudTMyWzBdID0gKDB4NWYzNzU5ZGYgLSAodGhpcy51MzJbMF0gPj4gMSkpO1xuICAgICAgICBsZXQgeSA9IHRoaXMuZjMyWzBdO1xuICAgICAgICB5ICA9IHkgKiAoIDEuNSAtICggeDIgKiB5ICogeSApICk7ICAgLy8gMXN0IGl0ZXJhdGlvblxuXG4gICAgICAgIHJldHVybiB5O1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXN0YW5jZSh0bzogVmVjdG9yMkQpIHtcbiAgICAgICAgY29uc3QgZHggPSB0by54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHRvLnkgLSB0aGlzLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNxckRpc3RhbmNlKHRvOiBWZWN0b3IyRCkge1xuICAgICAgICBjb25zdCBkeCA9IHRvLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gdG8ueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIGR4KmR4ICsgZHkqZHk7XG4gICAgfVxuXG4gICAgcHVibGljIHNxckxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdmVjWmVybyA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbmV4cG9ydCBjb25zdCB2ZWNPbmUgPSBuZXcgVmVjdG9yMkQoMSwgMSk7XG5leHBvcnQgY29uc3QgdmVjVXAgPSBuZXcgVmVjdG9yMkQoMCwgMSk7XG5leHBvcnQgY29uc3QgdmVjRG93biA9IG5ldyBWZWN0b3IyRCgwLCAtMSk7XG5leHBvcnQgY29uc3QgdmVjTGVmdCA9IG5ldyBWZWN0b3IyRCgtMSwgMCk7XG5leHBvcnQgY29uc3QgdmVjUmlnaHQgPSBuZXcgVmVjdG9yMkQoMSwgMCk7IiwiaW1wb3J0IHtTaGFwZSwgU2hhcGVQaXZvdCwgU2hhcGVQcmltaXRpdmV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge0NvbGxpc2lvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBWZWxvY2l0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tZXNoXCI7XG5pbXBvcnQgeyBSb3RhdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdGF0aW9uXCI7XG5pbXBvcnQgeyBDVGFnTWFya2VyIH0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5pbXBvcnQgeyBQaHlzaWNzQnJpZGdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGh5c2ljcy1icmlkZ2VcIjtcblxuLy8gVGhpcyBjb3VsZCBhbHNvIGJlIHB1cmUgSlNPTiwgYnV0IGluIG9yZGVyIHRvIHVzZSBUUyB0eXBlcyBhbmQgaGF2ZSBzdGF0aWMgY2hlY2tzIGl0IGlzIHJlY29tbWVuZGVkIHRvIHdyaXRlIGl0IGFzIFRTIGFycmF5LlxuZXhwb3J0IGNvbnN0IGdhbWVQcmVmYWIgPSBbXG4gICAge1xuICAgICAgICBQaHlzaWNzQnJpZGdlOiA8UGh5c2ljc0JyaWRnZT57fSxcbiAgICAgICAgQ29sbGlzaW9uOiA8Q29sbGlzaW9uPnt9LFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LFxuICAgICAgICBSb3RhdGlvbjogPFJvdGF0aW9uPntcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFZlbG9jaXR5OiA8VmVsb2NpdHk+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsIFxuICAgICAgICB9LFxuICAgICAgICBNYXRlcmlhbDogPE1hdGVyaWFsPntcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZkZmYwMydcbiAgICAgICAgfSxcbiAgICAgICAgU2hhcGU6IDxTaGFwZT57XG4gICAgICAgICAgICBkaW1lbnNpb25zOiA8VmVjdG9yMkQ+e1xuICAgICAgICAgICAgICAgIHg6IDIsXG4gICAgICAgICAgICAgICAgeTogMC43LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpdm90OiBTaGFwZVBpdm90LlRvcExlZnQsXG4gICAgICAgICAgICBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlLlJlY3QsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIENvbGxpc2lvbjogPENvbGxpc2lvbj57fSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgeTogMyxcbiAgICAgICAgfSxcbiAgICAgICAgUm90YXRpb246IDxSb3RhdGlvbj57XG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eTogPFZlbG9jaXR5PntcbiAgICAgICAgICAgIHg6IDIsXG4gICAgICAgICAgICB5OiAwLCBcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNmZGZmMDMnXG4gICAgICAgIH0sXG4gICAgICAgIFNoYXBlOiA8U2hhcGU+e1xuICAgICAgICAgICAgekluZGV4OiAxMCxcbiAgICAgICAgICAgIHBpdm90OiBTaGFwZVBpdm90LlRvcExlZnQsXG4gICAgICAgICAgICBkaW1lbnNpb25zOiA8VmVjdG9yMkQ+e1xuICAgICAgICAgICAgICAgIHg6IDAuNyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmltaXRpdmU6IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgQ29sbGlzaW9uOiA8Q29sbGlzaW9uPnt9LFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDE4LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgUm90YXRpb246IDxSb3RhdGlvbj57XG4gICAgICAgICAgICB2YWx1ZTogNyAqIE1hdGguUEkgLyA0XG4gICAgICAgIH0sXG4gICAgICAgIFZlbG9jaXR5OiA8VmVsb2NpdHk+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsIFxuICAgICAgICB9LFxuICAgICAgICBNYXRlcmlhbDogPE1hdGVyaWFsPntcbiAgICAgICAgICAgIGNvbG9yOiAnIzBiYidcbiAgICAgICAgfSxcbiAgICAgICAgU2hhcGU6IDxTaGFwZT57XG4gICAgICAgICAgICBwaXZvdDogU2hhcGVQaXZvdC5NaWRkbGUsXG4gICAgICAgICAgICBtZXNoOiA8TWVzaD57XG4gICAgICAgICAgICAgICAgdmVydGljaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IC0zLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogLTEuMjVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMC4zMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IC0wLjMxLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogMC4zMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAtMS42LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW1pdGl2ZTogU2hhcGVQcmltaXRpdmUuTWVzaCxcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IENUYWdNYXJrZXIgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtFQWN0aW9uc30gZnJvbSBcIi4uL2FwcC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQge1VJSXRlbX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWktaXRlbVwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcblxuLy8gVGhpcyBjb3VsZCBhbHNvIGJlIHB1cmUgSlNPTiwgYnV0IGluIG9yZGVyIHRvIHVzZSBUUyB0eXBlcyBhbmQgaGF2ZSBzdGF0aWMgY2hlY2tzIGl0IGlzIHJlY29tbWVuZGVkIHRvIHdyaXRlIGl0IGFzIFRTIGFycmF5LlxuZXhwb3J0IGNvbnN0IG1lbnVQcmVmYWIgPSBbXG4gICAgeyAvLyBUaXRsZVxuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4wNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4wNSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgY2FwdGlvbjogJ1BPTkcnLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiA2NCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgeyAvLyBTdWIgdGl0bGVcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMTIqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiB7XG4gICAgICAgICAgICBjYXB0aW9uOiAnQSBzaW0tZWNzIHVzYWdlIGRlbW8nLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4wNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4yKjEwMjQsXG4gICAgICAgIH0sXG4gICAgICAgIFVJSXRlbTogPFVJSXRlbT57XG4gICAgICAgICAgICBjYXB0aW9uOiAnSG93IHRvIHBsYXk6IExlZnQgcGFkZGxlOiBXL1MgOyBSaWdodCBwYWRkbGU6IFVwL0Rvd24gOyBQYXVzZTogRXNjYXBlJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMjQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMDUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuMjQqMTAyNCxcbiAgICAgICAgfSxcbiAgICAgICAgVUlJdGVtOiA8VUlJdGVtPntcbiAgICAgICAgICAgIGNhcHRpb246ICdUaGUgZ2FtZSB3aWxsIGJlIHNhdmVkIHVwb24gcGF1c2luZyEnLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4xNSoxMDI0LFxuICAgICAgICAgICAgeTogMC4zNSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5QbGF5LFxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGNhcHRpb246ICdQbGF5JyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgW0NUYWdNYXJrZXJdOiBbXG4gICAgICAgICAgICBFVGFncy51aVxuICAgICAgICBdLFxuICAgICAgICBQb3NpdGlvbjogPFBvc2l0aW9uPntcbiAgICAgICAgICAgIHg6IDAuMTUqMTAyNCxcbiAgICAgICAgICAgIHk6IDAuNCoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5Db250aW51ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2RkZCcsXG4gICAgICAgICAgICBjYXB0aW9uOiAnQ29udGludWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDMyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLnVpXG4gICAgICAgIF0sXG4gICAgICAgIFBvc2l0aW9uOiA8UG9zaXRpb24+e1xuICAgICAgICAgICAgeDogMC4xNSoxMDI0LFxuICAgICAgICAgICAgeTogMC40NSoxMDI0LFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgYWN0aW9uOiBFQWN0aW9ucy5FeGl0LFxuICAgICAgICAgICAgY29sb3I6ICcjZGRkJyxcbiAgICAgICAgICAgIGNhcHRpb246ICdFeGl0JyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IENUYWdNYXJrZXIgfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHtVSUl0ZW19IGZyb20gXCIuLi9jb21wb25lbnRzL3VpLWl0ZW1cIjtcbmltcG9ydCB7IEVUYWdzIH0gZnJvbSBcIi4uL21vZGVscy90YWdzXCI7XG5cbi8vIFRoaXMgY291bGQgYWxzbyBiZSBwdXJlIEpTT04sIGJ1dCBpbiBvcmRlciB0byB1c2UgVFMgdHlwZXMgYW5kIGhhdmUgc3RhdGljIGNoZWNrcyBpdCBpcyByZWNvbW1lbmRlZCB0byB3cml0ZSBpdCBhcyBUUyBhcnJheS5cbmV4cG9ydCBjb25zdCBwYXVzZVByZWZhYiA9IFtcbiAgICB7XG4gICAgICAgIFtDVGFnTWFya2VyXTogW1xuICAgICAgICAgICAgRVRhZ3MudWlcbiAgICAgICAgXSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiA1MCxcbiAgICAgICAgICAgIHk6IDMwLFxuICAgICAgICB9LFxuICAgICAgICBVSUl0ZW06IDxVSUl0ZW0+e1xuICAgICAgICAgICAgY2FwdGlvbjogJ+KdmuKdmiBQQVVTRScsXG4gICAgICAgICAgICBjb2xvcjogJyNkZGQnLFxuICAgICAgICAgICAgZm9udFNpemU6IDY0LFxuICAgICAgICB9XG4gICAgfSxcbl07XG4iLCJpbXBvcnQge0VUYWdzfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcbmltcG9ydCB7Q29sbGlzaW9ufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaXNpb25cIjtcbmltcG9ydCB7U2hhcGUsIFNoYXBlUGl2b3QsIFNoYXBlUHJpbWl0aXZlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zaGFwZVwiO1xuaW1wb3J0IHtWZWxvY2l0eX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdmVsb2NpdHlcIjtcbmltcG9ydCB7Q1RhZ01hcmtlcn0gZnJvbSAnc2ltLWVjcyc7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7IFJvdGF0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm90YXRpb25cIjtcbmltcG9ydCB7IFBoeXNpY3NCcmlkZ2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9waHlzaWNzLWJyaWRnZVwiO1xuXG5leHBvcnQgY29uc3Qgc2F2YWJsZVByZWZhYiA9IFtcbiAgICB7IC8vIENoYXJhY3RlclxuICAgICAgICBbQ1RhZ01hcmtlcl06IFtcbiAgICAgICAgICAgIEVUYWdzLmNoYXJhY3RlcixcbiAgICAgICAgICAgIC8vIEVUYWdzLnNhdmVcbiAgICAgICAgXSxcbiAgICAgICAgLy8gUGh5c2ljc0JyaWRnZTogPFBoeXNpY3NCcmlkZ2U+e30sXG4gICAgICAgIENoYXJhY3RlcjogPENoYXJhY3Rlcj57XG4gICAgICAgICAgICBuYW1lOiAnWHVQb0gnXG4gICAgICAgIH0sXG4gICAgICAgIFZlbG9jaXR5OiA8VmVsb2NpdHk+e1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICBhbmd1bGFyOiAwLFxuICAgICAgICB9LFxuICAgICAgICBDb2xsaXNpb246IDxDb2xsaXNpb24+e30sXG4gICAgICAgIFJvdGF0aW9uOiA8Um90YXRpb24+e1xuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgUG9zaXRpb246IDxQb3NpdGlvbj57XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgU2hhcGU6IDxTaGFwZT57XG4gICAgICAgICAgICB6SW5kZXg6IDExLFxuICAgICAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgICAgICAgIHg6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGl2b3Q6IFNoYXBlUGl2b3QuTWlkZGxlLFxuICAgICAgICAgICAgcHJpbWl0aXZlOiBTaGFwZVByaW1pdGl2ZS5DaXJjbGVcbiAgICAgICAgfSxcbiAgICAgICAgTWF0ZXJpYWw6IDxNYXRlcmlhbD57XG4gICAgICAgICAgICBjb2xvcjogJyNjY2EnLFxuICAgICAgICB9LFxuICAgIH0sXG5dOyIsImltcG9ydCBCb3gyREZhY3RvcnkgZnJvbSAnYm94MmQtd2FzbSc7XG5cbmV4cG9ydCB0eXBlIF9Cb3gyRCA9IHR5cGVvZiBCb3gyRCAmIEVtc2NyaXB0ZW5Nb2R1bGU7XG5cbmV4cG9ydCBjb25zdCBsb2FkUGh5c2ljcyA9IGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gQm94MkRGYWN0b3J5KCkudGhlbigoYm94MkQ6IF9Cb3gyRCkgPT4ge1xuICAgICAgICByZXR1cm4gYm94MkQ7XG4gICAgfSk7XG59IiwiaW1wb3J0IHtJVHJhbnNpdGlvbkFjdGlvbnMsIFF1ZXJ5LCBTZXJpYWxGb3JtYXQsIFN0YXRlLCBUR3JvdXBIYW5kbGUsIFdpdGgsIFdpdGhUYWd9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0lucHV0U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9pbnB1dFwiO1xuaW1wb3J0IHtQYXVzZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcGF1c2VcIjtcbmltcG9ydCB7Z2FtZVByZWZhYn0gZnJvbSBcIi4uL3ByZWZhYnMvZ2FtZVwiO1xuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7R2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7VmVsb2NpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQge2xvYWR9IGZyb20gXCIuLi9hcHAvcGVyc2lzdGVuY2VcIjtcbmltcG9ydCB7UmVuZGVyVUlTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3JlbmRlci11aVwiO1xuaW1wb3J0IHtSZW5kZXJHYW1lU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItZ2FtZVwiO1xuaW1wb3J0IHtTaGFwZSwgU2hhcGVQcmltaXRpdmV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge1BoeXNpY3NTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3BoeXNpY3NcIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQge0NvbGxpc2lvblN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXJTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtcy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7c2F2YWJsZVByZWZhYn0gZnJvbSBcIi4uL3ByZWZhYnMvc2F2YWJsZVwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcbmltcG9ydCB7IFBoeXNpY3NCcmlkZ2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9waHlzaWNzLWJyaWRnZVwiO1xuaW1wb3J0IHsgQ2FtZXJhU3lzdGVtIH0gZnJvbSBcIi4uL3N5c3RlbXMvY2FtZXJhXCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgX3N5c3RlbXMgPSBbXG4gICAgICAgIFBoeXNpY3NTeXN0ZW0sXG4gICAgICAgIENoYXJhY3RlclN5c3RlbSxcbiAgICAgICAgQ29sbGlzaW9uU3lzdGVtLFxuICAgICAgICBJbnB1dFN5c3RlbSxcbiAgICAgICAgQ2FtZXJhU3lzdGVtLFxuICAgICAgICBQYXVzZVN5c3RlbSxcbiAgICAgICAgUmVuZGVyR2FtZVN5c3RlbSxcbiAgICAgICAgUmVuZGVyVUlTeXN0ZW0sXG4gICAgXTtcbiAgICBzYXZlRGF0YVByZWZhYkhhbmRsZT86IFRHcm91cEhhbmRsZTtcbiAgICBzdGF0aWNEYXRhUHJlZmFiSGFuZGxlPzogVEdyb3VwSGFuZGxlO1xuXG4gICAgYWN0aXZhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKS5jdXJyZW50U3RhdGUgPSB0aGlzO1xuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZShhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGljRGF0YVByZWZhYkhhbmRsZSA9IGNyZWF0ZU5ld0dhbWUoYWN0aW9ucyk7XG5cbiAgICAgICAgaWYgKGdhbWVTdG9yZS5jb250aW51ZSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlRGF0YVByZWZhYkhhbmRsZSA9IGxvYWQoYWN0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVEYXRhUHJlZmFiSGFuZGxlID0gY3JlYXRlR2FtZUZyb21TYXZlRGF0YShhY3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGFjdGlvbnMuZmx1c2hDb21tYW5kcygpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGFjdGlvbnMuZ2V0RW50aXRpZXMobmV3IFF1ZXJ5KFtcbiAgICAgICAgICAgIFdpdGgoU2hhcGUpXG4gICAgICAgIF0pKSkge1xuICAgICAgICAgICAgZW50aXR5LmdldENvbXBvbmVudChTaGFwZSk/LmJ1aWxkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0IFBoeXNpY3NCcmlkZ2UgdG8gcmVhbCBwaHlzaWNzXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGIyV29ybGQsXG4gICAgICAgICAgICBiMkNpcmNsZVNoYXBlLFxuICAgICAgICAgICAgYjJTaGFwZSxcbiAgICAgICAgICAgIGIyUG9seWdvblNoYXBlLFxuICAgICAgICAgICAgYjJCb2R5RGVmLFxuICAgICAgICAgICAgYjJfZHluYW1pY0JvZHksXG4gICAgICAgICAgICBiMlZlYzIsXG4gICAgICAgICAgICBkZXN0cm95LFxuICAgICAgICB9ID0gZ2FtZVN0b3JlLnBoeXNpY3NOYW1lc3BhY2U7XG5cbiAgICAgICAgY29uc3QgcGh5c1dvcmxkID0gYWN0aW9ucy5nZXRSZXNvdXJjZShiMldvcmxkKTtcblxuICAgICAgICBjb25zdCB6ZXJvID0gZ2FtZVN0b3JlLnBoeXNpY3NaZXJvO1xuXG4gICAgICAgIGxldCBwaHlzU2hhcGU6IEJveDJELmIyU2hhcGUgfCBudWxsID0gbnVsbDtcblxuICAgICAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBhY3Rpb25zLmdldEVudGl0aWVzKG5ldyBRdWVyeShbXG4gICAgICAgICAgICBXaXRoKFNoYXBlKSxcbiAgICAgICAgICAgIFdpdGgoUG9zaXRpb24pLFxuICAgICAgICAgICAgV2l0aChQaHlzaWNzQnJpZGdlKVxuICAgICAgICBdKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGVudGl0eS5nZXRDb21wb25lbnQoUG9zaXRpb24pITtcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gZW50aXR5LmdldENvbXBvbmVudChTaGFwZSkhO1xuICAgICAgICAgICAgY29uc3QgcGh5c2ljc0JyaWRnZSA9IGVudGl0eS5nZXRDb21wb25lbnQoUGh5c2ljc0JyaWRnZSkhO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIHRvIHBoeXNpY3Mgd29ybGQ6JywgcG9zLCBzaGFwZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHZlYyA9IG5ldyBiMlZlYzIocG9zLngsIHBvcy55KTtcbiAgICAgICAgICAgIGNvbnN0IGJkID0gbmV3IGIyQm9keURlZigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB7dywgaH0gPSBzaGFwZS5nZXRCQm94KCk7XG5cbiAgICAgICAgICAgIGlmIChzaGFwZS5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLlJlY3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfc2hhcGUgPSBuZXcgYjJQb2x5Z29uU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBfc2hhcGUuU2V0QXNCb3godywgaCk7XG4gICAgICAgICAgICAgICAgcGh5c1NoYXBlID0gX3NoYXBlO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYgKHNoYXBlLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuQ2lyY2xlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3NoYXBlID0gbmV3IGIyQ2lyY2xlU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBfc2hhcGUuc2V0X21fcmFkaXVzKHNoYXBlLmRpbWVuc2lvbnMueCAvIDIpO1xuICAgICAgICAgICAgICAgIHBoeXNTaGFwZSA9IF9zaGFwZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzaGFwZS5wcmltaXRpdmUsICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHBoeXNpY3Mgbm93Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwaHlzU2hhcGUpIHtcbiAgICAgICAgICAgICAgICBiZC5zZXRfdHlwZShiMl9keW5hbWljQm9keSk7XG4gICAgICAgICAgICAgICAgYmQuc2V0X3Bvc2l0aW9uKHZlYyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gcGh5c1dvcmxkLkNyZWF0ZUJvZHkoYmQpO1xuICAgICAgICAgICAgICAgIHZlYy5TZXQoMCwgMCk7XG4gICAgICAgICAgICAgICAgYm9keS5TZXRUcmFuc2Zvcm0odmVjLCAwKTtcbiAgICAgICAgICAgICAgICBib2R5LkNyZWF0ZUZpeHR1cmUocGh5c1NoYXBlLCAxKTtcblxuICAgICAgICAgICAgICAgIGRlc3Ryb3kodmVjKTtcbiAgICAgICAgICAgICAgICBkZXN0cm95KHBoeXNTaGFwZSk7XG5cbiAgICAgICAgICAgICAgICBib2R5LlNldExpbmVhclZlbG9jaXR5KHplcm8pO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNvbnRyb2wgdmlhIHBoeXNpY3Mgc3lzdGVtP1xuICAgICAgICAgICAgICAgIGJvZHkuU2V0QXdha2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYm9keS5TZXRFbmFibGVkKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgcGh5c2ljc0JyaWRnZS5ib2R5UHRyID0gYm9keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGlvbnMuY29tbWFuZHMucXVldWVDb21tYW5kKCgpID0+IHNldFNjb3JlQ2FwdGlvbk1vZChhY3Rpb25zKSk7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMubWFpbnRhaW4oKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5zdGF0aWNEYXRhUHJlZmFiSGFuZGxlKSB7XG4gICAgICAgICAgICBhY3Rpb25zLmNvbW1hbmRzLnVubG9hZFByZWZhYih0aGlzLnN0YXRpY0RhdGFQcmVmYWJIYW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2F2ZURhdGFQcmVmYWJIYW5kbGUpIHtcbiAgICAgICAgICAgIGFjdGlvbnMuY29tbWFuZHMudW5sb2FkUHJlZmFiKHRoaXMuc2F2ZURhdGFQcmVmYWJIYW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcGh5c2ljc05hbWVzcGFjZToge1xuICAgICAgICAgICAgICAgIGIyV29ybGQsXG4gICAgICAgICAgICAgICAgZGVzdHJveVxuICAgICAgICAgICAgfVxuICAgICAgICB9ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuXG4gICAgICAgIGRlc3Ryb3koYWN0aW9ucy5nZXRSZXNvdXJjZShiMldvcmxkKSk7XG5cbiAgICAgICAgYWN0aW9ucy5jb21tYW5kcy5tYWludGFpbigpO1xuICAgIH1cbn1cblxuY29uc3QgY3JlYXRlTmV3R2FtZSA9IGZ1bmN0aW9uIChhY3Rpb25zOiBJVHJhbnNpdGlvbkFjdGlvbnMpIHtcbiAgICByZXR1cm4gYWN0aW9ucy5jb21tYW5kcy5sb2FkKFxuICAgICAgICBTZXJpYWxGb3JtYXQuZnJvbUFycmF5KGdhbWVQcmVmYWIpKTtcbn07XG5cbmNvbnN0IGNyZWF0ZUdhbWVGcm9tU2F2ZURhdGEgPSBmdW5jdGlvbiAoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgcmV0dXJuIGFjdGlvbnMuY29tbWFuZHMubG9hZChcbiAgICAgICAgU2VyaWFsRm9ybWF0LmZyb21BcnJheShzYXZhYmxlUHJlZmFiKSk7XG59O1xuXG4vLyBjb25zdCBzZXRTY29yZUNhcHRpb25Nb2QgPSBmdW5jdGlvbiAoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4vLyAgICAgY29uc3Qgc2NvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKFNjb3JlQm9hcmQpO1xuXG4vLyAgICAgZm9yIChjb25zdCBlbnRpdHkgb2YgYWN0aW9ucy5nZXRFbnRpdGllcyhuZXcgUXVlcnkoW1dpdGgoUGFkZGxlKSwgV2l0aChVSUl0ZW0pXSkpKSB7XG4vLyAgICAgICAgIGNvbnN0IHVpID0gZW50aXR5LmdldENvbXBvbmVudChVSUl0ZW0pITtcbi8vICAgICAgICAgY29uc3QgcGFkZGxlID0gZW50aXR5LmdldENvbXBvbmVudChQYWRkbGUpITtcblxuLy8gICAgICAgICBpZiAocGFkZGxlLnNpZGUgPT0gRVBhZGRsZVNpZGUuTGVmdCkge1xuLy8gICAgICAgICAgICAgdWkuY2FwdGlvbk1vZCA9IHN0ckluID0+IHN0ckluLnJlcGxhY2UoJ3t9Jywgc2NvcmUubGVmdC50b1N0cmluZygpKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIHVpLmNhcHRpb25Nb2QgPSBzdHJJbiA9PiBzdHJJbi5yZXBsYWNlKCd7fScsIHNjb3JlLnJpZ2h0LnRvU3RyaW5nKCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfTtcbiIsImltcG9ydCB7SVRyYW5zaXRpb25BY3Rpb25zLCBTZXJpYWxGb3JtYXQsIFN0YXRlLCBUR3JvdXBIYW5kbGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge21lbnVQcmVmYWJ9IGZyb20gXCIuLi9wcmVmYWJzL21lbnVcIjtcbmltcG9ydCB7SW5wdXRTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL2lucHV0XCI7XG5pbXBvcnQge01lbnVTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL21lbnVcIjtcbmltcG9ydCB7UmVuZGVyVUlTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3JlbmRlci11aVwiO1xuaW1wb3J0IHtHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuXG5leHBvcnQgY2xhc3MgTWVudVN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIF9zeXN0ZW1zID0gW0lucHV0U3lzdGVtLCBNZW51U3lzdGVtLCBSZW5kZXJVSVN5c3RlbV07XG4gICAgcHJlZmFiSGFuZGxlITogVEdyb3VwSGFuZGxlO1xuXG4gICAgYWN0aXZhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKS5jdXJyZW50U3RhdGUgPSB0aGlzO1xuICAgICAgICB0aGlzLnByZWZhYkhhbmRsZSA9IGFjdGlvbnMuY29tbWFuZHMubG9hZChTZXJpYWxGb3JtYXQuZnJvbUFycmF5KG1lbnVQcmVmYWIpKTtcbiAgICAgICAgYWN0aW9ucy5jb21tYW5kcy5tYWludGFpbigpO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMudW5sb2FkUHJlZmFiKHRoaXMucHJlZmFiSGFuZGxlKTtcbiAgICAgICAgYWN0aW9ucy5jb21tYW5kcy5tYWludGFpbigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7SVRyYW5zaXRpb25BY3Rpb25zLCBTZXJpYWxGb3JtYXQsIFN0YXRlLCBUR3JvdXBIYW5kbGV9IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0lucHV0U3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9pbnB1dFwiO1xuaW1wb3J0IHtQYXVzZVN5c3RlbX0gZnJvbSBcIi4uL3N5c3RlbXMvcGF1c2VcIjtcbmltcG9ydCB7cGF1c2VQcmVmYWJ9IGZyb20gXCIuLi9wcmVmYWJzL3BhdXNlXCI7XG5pbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge3NhdmV9IGZyb20gXCIuLi9hcHAvcGVyc2lzdGVuY2VcIjtcbmltcG9ydCB7UmVuZGVyVUlTeXN0ZW19IGZyb20gXCIuLi9zeXN0ZW1zL3JlbmRlci11aVwiO1xuaW1wb3J0IHtSZW5kZXJHYW1lU3lzdGVtfSBmcm9tIFwiLi4vc3lzdGVtcy9yZW5kZXItZ2FtZVwiO1xuXG5leHBvcnQgY2xhc3MgUGF1c2VTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBfc3lzdGVtcyA9IFtJbnB1dFN5c3RlbSwgUGF1c2VTeXN0ZW0sIFJlbmRlckdhbWVTeXN0ZW0sIFJlbmRlclVJU3lzdGVtXTtcbiAgICBwcmVmYWJIYW5kbGUhOiBUR3JvdXBIYW5kbGU7XG5cblxuICAgIGFjdGl2YXRlKGFjdGlvbnM6IElUcmFuc2l0aW9uQWN0aW9ucykge1xuICAgICAgICBjb25zdCBnYW1lU3RvcmUgPSBhY3Rpb25zLmdldFJlc291cmNlKEdhbWVTdG9yZSk7XG4gICAgICAgIHNhdmUoYWN0aW9ucyk7XG5cbiAgICAgICAgZ2FtZVN0b3JlLmN1cnJlbnRTdGF0ZSA9IHRoaXM7XG4gICAgICAgIHRoaXMucHJlZmFiSGFuZGxlID0gYWN0aW9ucy5jb21tYW5kcy5sb2FkKFNlcmlhbEZvcm1hdC5mcm9tQXJyYXkocGF1c2VQcmVmYWIpKTtcbiAgICAgICAgYWN0aW9ucy5jb21tYW5kcy5tYWludGFpbigpO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGUoYWN0aW9uczogSVRyYW5zaXRpb25BY3Rpb25zKSB7XG4gICAgICAgIGFjdGlvbnMuY29tbWFuZHMudW5sb2FkUHJlZmFiKHRoaXMucHJlZmFiSGFuZGxlKTtcbiAgICAgICAgYWN0aW9ucy5jb21tYW5kcy5tYWludGFpbigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF9Cb3gyRCB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFJlYWRFbnRpdHksIFF1ZXJ5LCBSZWFkLCBTeXN0ZW0sIFdyaXRlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wb3NpdGlvblwiO1xuaW1wb3J0IHsgUm90YXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3RhdGlvblwiO1xuaW1wb3J0IHtWZWxvY2l0eX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdmVsb2NpdHlcIjtcbmltcG9ydCB7IEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgUGh5c2ljc0JyaWRnZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BoeXNpY3MtYnJpZGdlXCI7XG5pbXBvcnQgeyBDYW1lcmEsIENhbWVyYUZvbGxvd01ldGhvZCB9IGZyb20gXCIuLi9tb2RlbHMvY2FtZXJhXCI7XG5pbXBvcnQgeyBsZXJwLCBQSVhFTFNfUEVSX01FVEVSIH0gZnJvbSBcIi4uL2FwcC91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGNhbWVyYSE6IENhbWVyYTtcbiAgICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmN0eCA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBhY3Rpb25zLmdldFJlc291cmNlKENhbWVyYSk7XG4gICAgfVxuXG4gICAgcnVuKF86IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbWVyYS5yb3RhdGlvbiA+IDIqTWF0aC5QSSkge1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEucm90YXRpb24gLT0gMipNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhbWVyYS5yb3RhdGlvbiA8IC0yKk1hdGguUEkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnJvdGF0aW9uICs9IDIqTWF0aC5QSTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbWVyYS56b29tIDwgMC4xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS56b29tID0gMC4xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FtZXJhLnpvb20gPiAxLjUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnpvb20gPSAxLjU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmb2xsb3csXG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgIH0gPSB0aGlzLmNhbWVyYTtcblxuICAgICAgICBpZiAoIWZvbGxvdykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgfSA9IGZvbGxvdztcblxuICAgICAgICBsZXQgdHggPSB0YXJnZXQueDtcbiAgICAgICAgbGV0IHR5ID0gdGFyZ2V0Lnk7XG5cbiAgICAgICAgb2Zmc2V0LnggPSAtdGhpcy5jdHguY2FudmFzLndpZHRoIC8gKDIqdGhpcy5jYW1lcmEuem9vbSpQSVhFTFNfUEVSX01FVEVSKTs7XG4gICAgICAgIG9mZnNldC55ID0gLXRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgLyAoMip0aGlzLmNhbWVyYS56b29tKlBJWEVMU19QRVJfTUVURVIpO1xuXG4gICAgICAgIGlmIChtZXRob2QgPT09IENhbWVyYUZvbGxvd01ldGhvZC5JbW1lZGlhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnggPSB0eDtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnkgPSB0eTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IENhbWVyYUZvbGxvd01ldGhvZC5TbW9vdGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnggPSBsZXJwKHRoaXMuY2FtZXJhLngsIHR4LCAwLjAxKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnkgPSBsZXJwKHRoaXMuY2FtZXJhLnksIHR5LCAwLjAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IENhbWVyYUZvbGxvd01ldGhvZC5FbGFzdGljKSB7XG4gICAgICAgICAgICBjb25zdCBkeCA9ICh0eCAtIHRoaXMuY2FtZXJhLngpICogdGhpcy5jYW1lcmEuZWxhc3RpY2l0eTtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gKHR5IC0gdGhpcy5jYW1lcmEueSkgKiB0aGlzLmNhbWVyYS5lbGFzdGljaXR5O1xuXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS52ZWwueCArPSBkeDtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnZlbC55ICs9IGR5O1xuXG4gICAgICAgICAgICBjb25zdCBmeCA9IC10aGlzLmNhbWVyYS5mcmljdGlvbiAqIHRoaXMuY2FtZXJhLnZlbC54O1xuICAgICAgICAgICAgY29uc3QgZnkgPSAtdGhpcy5jYW1lcmEuZnJpY3Rpb24gKiB0aGlzLmNhbWVyYS52ZWwueTtcblxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudmVsLnggKz0gZng7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS52ZWwueSArPSBmeTtcblxuICAgICAgICAgICAgdGhpcy5jYW1lcmEueCArPSB0aGlzLmNhbWVyYS52ZWwueCAvIHRoaXMuY2FtZXJhLnpvb207XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS55ICs9IHRoaXMuY2FtZXJhLnZlbC55IC8gdGhpcy5jYW1lcmEuem9vbTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7Q1RhZ01hcmtlciwgSVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBSZWFkRW50aXR5LCBTeXN0ZW0sIFdpdGgsIFdpdGhUYWcsIFdyaXRlfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtTaGFwZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2hhcGVcIjtcbmltcG9ydCB7Q29sbGlzaW9ufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaXNpb25cIjtcbmltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL21vZGVscy92ZWN0b3IyZFwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcbmltcG9ydCB7IFZlbG9jaXR5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdmVsb2NpdHlcIjtcbmltcG9ydCB7IEVNb3ZlbWVudCwgR2FtZVN0b3JlIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jaGFyYWN0ZXJcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IENhbWVyYSwgQ2FtZXJhRm9sbG93TWV0aG9kIH0gZnJvbSBcIi4uL21vZGVscy9jYW1lcmFcIjtcbmltcG9ydCB7IGxlcnAsIFBJWEVMU19QRVJfTUVURVIgfSBmcm9tIFwiLi4vYXBwL3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIENoYXJhY3RlclN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBfY2hhcmFjdGVyOiBXaXRoVGFnKEVUYWdzLmNoYXJhY3RlciksXG4gICAgICAgIHBvczogUmVhZChQb3NpdGlvbiksXG4gICAgICAgIHZlbG9jaXR5OiBXcml0ZShWZWxvY2l0eSksXG4gICAgfSk7XG5cbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG4gICAgY2FtZXJhITogQ2FtZXJhO1xuICAgIGN0eCE6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gYWN0aW9ucy5nZXRSZXNvdXJjZShDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBhY3Rpb25zLmdldFJlc291cmNlKENhbWVyYSk7XG5cbiAgICAgICAgdGhpcy5jYW1lcmEuZWxhc3RpY2l0eSA9IDAuMDA4O1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogQ2FtZXJhRm9sbG93TWV0aG9kLkVsYXN0aWMsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLmNhbWVyYS54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2FtZXJhLnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJldlg6IHRoaXMuY2FtZXJhLngsXG4gICAgICAgICAgICBwcmV2WTogdGhpcy5jYW1lcmEueSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJ1bnMgPSAwXG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEuem9vbSArPSB0aGlzLmdhbWVTdG9yZS5pbnB1dC53aGVlbCAvIDEwO1xuXG4gICAgICAgIHRoaXMucXVlcnkuZXhlY3V0ZSgoe3BvcywgdmVsb2NpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3chLnRhcmdldCA9IHBvcztcblxuICAgICAgICAgICAgY29uc3QgZHQgPSB0aGlzLmdhbWVTdG9yZS5sYXN0RnJhbWVEZWx0YVRpbWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJNb3ZlbWVudDogbW92ZVxuICAgICAgICAgICAgfSA9IHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnM7XG5cbiAgICAgICAgICAgIGNvbnN0IGlzTGVmdCA9IChtb3ZlICYgRU1vdmVtZW50LmxlZnQpID09PSBFTW92ZW1lbnQubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IGlzUmlnaHQgPSAobW92ZSAmIEVNb3ZlbWVudC5yaWdodCkgPT09IEVNb3ZlbWVudC5yaWdodDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmVsb2NpdHkueCA9IDA7XG5cbiAgICAgICAgICAgIGlmIChpc0xlZnQgJiYgIWlzUmlnaHQpIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS54ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNSaWdodCAmJiAhaXNMZWZ0KSB7XG4gICAgICAgICAgICAgICAgdmVsb2NpdHkueCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobW92ZSAmIEVNb3ZlbWVudC51cCkgPT09IEVNb3ZlbWVudC51cCkge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5LnkgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChtb3ZlICYgRU1vdmVtZW50LmRvd24pID09PSBFTW92ZW1lbnQuZG93bikge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5LnkgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS55ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmVsb2NpdHkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICB2ZWxvY2l0eS5zY2FsZShkdCAqIDEwMDAgKiAxMC9QSVhFTFNfUEVSX01FVEVSKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmVsb2NpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgUmVhZEVudGl0eSwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7U2hhcGV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQge0NvbGxpc2lvbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29sbGlzaW9uXCI7XG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9tb2RlbHMvdmVjdG9yMmRcIjtcblxuZXhwb3J0IGNsYXNzIENvbGxpc2lvblN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBjb2xsaXNpb246IFdyaXRlKENvbGxpc2lvbiksXG4gICAgICAgIGVudGl0eTogUmVhZEVudGl0eSgpLFxuICAgICAgICBwb3NpdGlvbjogUmVhZChWZWN0b3IyRCksXG4gICAgICAgIHNoYXBlOiBSZWFkKFNoYXBlKVxuICAgIH0pO1xuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlY3RzID0gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5Lml0ZXIoKSlcbiAgICAgICAgLm1hcCgoe2NvbGxpc2lvbiwgZW50aXR5LCBwb3NpdGlvbiwgc2hhcGV9KSA9PiB7XG4gICAgICAgICAgICAvLyBpZGVhbGx5LCB0aGlzIHNob3VsZCBiZSB0d28gc2VwYXJhdGUgc3RlcHMsXG4gICAgICAgICAgICAvLyBidXQgSlMgd291bGQgbG9vcCB0d2ljZS5cbiAgICAgICAgICAgIC8vIEFzIGFuIG9wdGltaXphdGlvbiwgSSB3aWxsIGluY2x1ZGVcbiAgICAgICAgICAgIC8vIHRoaXMgZGF0YSBjaGFuZ2UgaW50byB0aGUgbWFwKCkgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbGxpc2lvbi5jb2xsaXNpb25PYmplY3RzLmNsZWFyKCk7XG4gICAgICAgICAgICBjb2xsaXNpb24ub2NjdXJyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHgseSx3LGhcbiAgICAgICAgICAgIH0gPSBzaGFwZS5nZXRCQm94KCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRGF0YTogY29sbGlzaW9uLFxuICAgICAgICAgICAgICAgIGVudGl0eSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGgsXG4gICAgICAgICAgICAgICAgeDogcG9zaXRpb24ueCArIHgsXG4gICAgICAgICAgICAgICAgeTogcG9zaXRpb24ueSArIHksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgY29sbGlzaW9uIGJldHdlZW4gYWxsIGNvbGxpc2lvbi1lbmFibGVkIHNoYXBlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlY3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWN0MSA9IHJlY3RzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QyID0gcmVjdHNbal07XG5cbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVjdDEueCA8IHJlY3QyLnggKyByZWN0Mi53aWR0aCAmJlxuICAgICAgICAgICAgICAgICAgICByZWN0MS54ICsgcmVjdDEud2lkdGggPiByZWN0Mi54ICYmXG4gICAgICAgICAgICAgICAgICAgIHJlY3QxLnkgPCByZWN0Mi55ICsgcmVjdDIuaGVpZ2h0ICYmXG4gICAgICAgICAgICAgICAgICAgIHJlY3QxLnkgKyByZWN0MS5oZWlnaHQgPiByZWN0Mi55XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVjdDEuY29sbGlzaW9uRGF0YS5vY2N1cnJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdDEuY29sbGlzaW9uRGF0YS5vY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN0MS5jb2xsaXNpb25EYXRhLmNvbGxpc2lvbk9iamVjdHMuYWRkKHJlY3QyLmVudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlY3QyLmNvbGxpc2lvbkRhdGEub2NjdXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QyLmNvbGxpc2lvbkRhdGEub2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdDIuY29sbGlzaW9uRGF0YS5jb2xsaXNpb25PYmplY3RzLmFkZChyZWN0MS5lbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgS2V5Q29kZSBmcm9tICdrZXljb2RlLWpzJztcbmltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFN5c3RlbX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7RU1vdmVtZW50LCBHYW1lU3RvcmV9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuXG5leHBvcnQgZW51bSBFS2V5U3RhdGUge1xuICAgIERvd24sXG4gICAgVXAsXG59XG5cbmV4cG9ydCBlbnVtIEVNb3VzZVN0YXRlIHtcbiAgICBEb3duLFxuICAgIFVwLFxuICAgIE1vdmVcbn1cblxuaW50ZXJmYWNlIElLZXlFdmVudCB7XG4gICAgY29kZTogc3RyaW5nXG4gICAgdHlwZTogRUtleVN0YXRlXG59XG5cbmludGVyZmFjZSBJTW91c2VFdmVudCB7XG4gICAgdHlwZTogRU1vdXNlU3RhdGVcbiAgICBidXR0b246IG51bWJlclxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGdhbWVTdG9yZSE6IEdhbWVTdG9yZTtcbiAgICBpbnB1dEV2ZW50czogSUtleUV2ZW50W10gPSBbXTtcbiAgICBtb3VzZUV2ZW50czogSU1vdXNlRXZlbnRbXSA9IFtdO1xuICAgIHdoZWVsRXZlbnRzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgcmVhZG9ubHkgbGlzdGVuZXJzID0ge1xuICAgICAgICB3aGVlbDogKGU6IFdoZWVsRXZlbnQpID0+IChcbiAgICAgICAgICAgIHRoaXMud2hlZWxFdmVudHMucHVzaCgtZS5kZWx0YVkgLyAxMjVcbiAgICAgICAgKSksXG4gICAgICAgIGtleWRvd246IChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmlucHV0RXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgY29kZTogZS5jb2RlLFxuICAgICAgICAgICAgdHlwZTogRUtleVN0YXRlLkRvd25cbiAgICAgICAgfSksXG4gICAgICAgIGtleXVwOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5pbnB1dEV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGNvZGU6IGUuY29kZSxcbiAgICAgICAgICAgIHR5cGU6IEVLZXlTdGF0ZS5VcFxuICAgICAgICB9KSxcbiAgICAgICAgbW91c2Vkb3duOiAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZUV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGJ1dHRvbjogZS5idXR0b24sXG4gICAgICAgICAgICB0eXBlOiBFTW91c2VTdGF0ZS5Eb3duLFxuICAgICAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICAgICAgeTogZS5jbGllbnRZLFxuICAgICAgICB9KSxcbiAgICAgICAgbW91c2V1cDogKGU6TW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZUV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGJ1dHRvbjogZS5idXR0b24sXG4gICAgICAgICAgICB0eXBlOiBFTW91c2VTdGF0ZS5VcCxcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgfSksXG4gICAgICAgIG1vdXNlbW92ZTogKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VFdmVudHMucHVzaCh7XG4gICAgICAgICAgICBidXR0b246IGUuYnV0dG9uLFxuICAgICAgICAgICAgdHlwZTogRU1vdXNlU3RhdGUuTW92ZSxcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgfSksXG4gICAgICAgIGJsdXI6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgPSBFTW92ZW1lbnQuaWRsZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudU1vdmVtZW50ID0gRU1vdmVtZW50LmlkbGU7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLnRvZ2dsZVBhdXNlID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzOiAoKSA9PiB0aGlzLmxpc3RlbmVycy5ibHVyKCksXG4gICAgICAgIGNvbnRleHRtZW51OiAoZTogTW91c2VFdmVudCkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgIH1cblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgW2V2ZW50LCBoYW5kbGVyXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmxpc3RlbmVycykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgIGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koXzogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveShfKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtldmVudCwgaGFuZGxlcl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgeyAvLyBSZXNldCBpbnB1dCBhY3Rpb25zXG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVDb25maXJtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVNb3ZlbWVudCA9IEVNb3ZlbWVudC5pZGxlO1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy50b2dnbGVQYXVzZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGV2ZW50OiBJS2V5RXZlbnQgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQua2V5U3RhdGVzLmNsZWFyKCk7XG5cbiAgICAgICAgd2hpbGUgKChldmVudCA9IHRoaXMuaW5wdXRFdmVudHMucG9wKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5rZXlTdGF0ZXMuc2V0KGV2ZW50LmNvZGUsIGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9FTlRFUjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51Q29uZmlybSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX0VTQ0FQRTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy50b2dnbGVQYXVzZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfVzpcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9VUDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50IHw9IEVNb3ZlbWVudC51cDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC5kb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQudXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfQTpcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9MRUZUOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gRUtleVN0YXRlLkRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgfD0gRU1vdmVtZW50LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50ICY9IH5FTW92ZW1lbnQucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5DT0RFX1M6XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfRE9XTjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50IHw9IEVNb3ZlbWVudC5kb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudCAmPSB+RU1vdmVtZW50LnVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPSBFTW92ZW1lbnQuZG93bjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC5kb3duO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMubWVudU1vdmVtZW50ID0gdGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5jaGFyYWN0ZXJNb3ZlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkNPREVfRDpcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQ09ERV9SSUdIVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVLZXlTdGF0ZS5Eb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLmNoYXJhY3Rlck1vdmVtZW50IHw9IEVNb3ZlbWVudC5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQgJj0gfkVNb3ZlbWVudC5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW91c2VFdmVudDogSU1vdXNlRXZlbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0Lm1vdXNlU3RhdGVzLmNsZWFyKCk7XG5cbiAgICAgICAgd2hpbGUgKChtb3VzZUV2ZW50ID0gdGhpcy5tb3VzZUV2ZW50cy5wb3AoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHgsIHksXG4gICAgICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICB9ID0gbW91c2VFdmVudDtcblxuICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQubW91c2VTdGF0ZXMuc2V0KGJ1dHRvbiwgdHlwZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmN1cnNvclBvcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmN1cnNvclBvcy55ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aGVlbERlbHRhOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RvcmUuaW5wdXQud2hlZWwgPSAwO1xuXG4gICAgICAgIHdoaWxlICgod2hlZWxEZWx0YSA9IHRoaXMud2hlZWxFdmVudHMucG9wKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS5pbnB1dC53aGVlbCA9IHdoZWVsRGVsdGE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7VUlJdGVtfSBmcm9tIFwiLi4vY29tcG9uZW50cy91aS1pdGVtXCI7XG5pbXBvcnQge0VNb3ZlbWVudCwgR2FtZVN0b3JlfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7RUFjdGlvbnN9IGZyb20gXCIuLi9hcHAvYWN0aW9uc1wiO1xuaW1wb3J0IHtHYW1lU3RhdGV9IGZyb20gXCIuLi9zdGF0ZXMvZ2FtZVwiO1xuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlcy9tZW51XCI7XG5cbmV4cG9ydCBjbGFzcyBNZW51U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICByZWFkb25seSBfc3RhdGVzID0gW1xuICAgICAgICBHYW1lU3RhdGUsXG4gICAgICAgIE1lbnVTdGF0ZVxuICAgIF1cblxuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgdWlJdGVtOiBXcml0ZShVSUl0ZW0pXG4gICAgfSk7XG5cbiAgICBhY3Rpb25zITogSVN5c3RlbUFjdGlvbnNcbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG4gICAgbWVudUFjdGlvbiA9IEVBY3Rpb25zLlBsYXk7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldHVwIE1lbnUnKTtcbiAgICB9XG5cbiAgICBydW4oYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgLy8gdG9kbzogdXNlIGluZGV4XG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVNb3ZlbWVudCA9PSBFTW92ZW1lbnQuZG93bikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm1lbnVBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLlBsYXk6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLkNvbnRpbnVlOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLkNvbnRpbnVlOiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5FeGl0OyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25zLkV4aXQ6IHRoaXMubWVudUFjdGlvbiA9IEVBY3Rpb25zLlBsYXk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBY3Rpb24gJHt0aGlzLm1lbnVBY3Rpb259IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lU3RvcmUuaW5wdXQuYWN0aW9ucy5tZW51TW92ZW1lbnQgPT0gRU1vdmVtZW50LnVwKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubWVudUFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgRUFjdGlvbnMuUGxheTogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuRXhpdDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5Db250aW51ZTogdGhpcy5tZW51QWN0aW9uID0gRUFjdGlvbnMuUGxheTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9ucy5FeGl0OiB0aGlzLm1lbnVBY3Rpb24gPSBFQWN0aW9ucy5Db250aW51ZTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFjdGlvbiAke3RoaXMubWVudUFjdGlvbn0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLm1lbnVDb25maXJtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZW51QWN0aW9uID09IEVBY3Rpb25zLlBsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucHVzaFN0YXRlKEdhbWVTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1lbnVBY3Rpb24gPT0gRUFjdGlvbnMuQ29udGludWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmUnKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdTb3JyeSB5b3Ugd2VyZW50IHNhdmVkIGxvbCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUuY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jb21tYW5kcy5wdXNoU3RhdGUoR2FtZVN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jb21tYW5kcy5zdG9wUnVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3Qge3VpSXRlbX0gb2YgdGhpcy5xdWVyeS5pdGVyKCkpIHtcbiAgICAgICAgICAgIHVpSXRlbS5hY3RpdmUgPSB1aUl0ZW0uYWN0aW9uID09IHRoaXMubWVudUFjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7SVN5c3RlbUFjdGlvbnMsIFF1ZXJ5LCBSZWFkLCBTeXN0ZW19IGZyb20gXCJzaW0tZWNzXCI7XG5pbXBvcnQge0dhbWVTdG9yZX0gZnJvbSBcIi4uL21vZGVscy9nYW1lLXN0b3JlXCI7XG5pbXBvcnQge0dhbWVTdGF0ZX0gZnJvbSBcIi4uL3N0YXRlcy9nYW1lXCI7XG5pbXBvcnQge1BhdXNlU3RhdGV9IGZyb20gXCIuLi9zdGF0ZXMvcGF1c2VcIjtcblxuXG5leHBvcnQgY2xhc3MgUGF1c2VTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGFjdGlvbnMhOiBJU3lzdGVtQWN0aW9uc1xuICAgIGdhbWVTdG9yZSE6IEdhbWVTdG9yZTtcblxuICAgIHNldHVwKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuXG4gICAgICAgIC8vIGlmIG9ubHkgd2UgY291bGQgY3JlYXRlIGFuIGlubGluZSBmdW5jdGlvbi4uLlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzR2FtZVN0YXRlID0gdGhpcy5nYW1lU3RvcmUuY3VycmVudFN0YXRlPy5jb25zdHJ1Y3RvciA9PSBHYW1lU3RhdGU7XG4gICAgICAgICAgICBjb25zdCBpc1BhdXNlU3RhdGUgPSB0aGlzLmdhbWVTdG9yZS5jdXJyZW50U3RhdGU/LmNvbnN0cnVjdG9yID09IFBhdXNlU3RhdGU7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc0dhbWVTdGF0ZSAmJiAhaXNQYXVzZVN0YXRlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKCFpc1BhdXNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucHVzaFN0YXRlKFBhdXNlU3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0b3JlLndhc0JsdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RvcmUud2FzQmx1cnJlZCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmdhbWVTdG9yZS53YXNJbnRlbnRpb25hbGx5UGF1c2VkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucG9wU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IGlzR2FtZVN0YXRlID0gdGhpcy5nYW1lU3RvcmUuY3VycmVudFN0YXRlPy5jb25zdHJ1Y3RvciA9PSBHYW1lU3RhdGU7XG4gICAgICAgIGNvbnN0IGlzUGF1c2VTdGF0ZSA9IHRoaXMuZ2FtZVN0b3JlLmN1cnJlbnRTdGF0ZT8uY29uc3RydWN0b3IgPT0gUGF1c2VTdGF0ZTtcblxuICAgICAgICBpZiAoIWlzR2FtZVN0YXRlICYmICFpc1BhdXNlU3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5pbnB1dC5hY3Rpb25zLnRvZ2dsZVBhdXNlKSB7XG4gICAgICAgICAgICBpZiAoaXNHYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS53YXNJbnRlbnRpb25hbGx5UGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY29tbWFuZHMucHVzaFN0YXRlKFBhdXNlU3RhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdG9yZS53YXNJbnRlbnRpb25hbGx5UGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNvbW1hbmRzLnBvcFN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfQm94MkQgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBSZWFkRW50aXR5LCBRdWVyeSwgUmVhZCwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IFJvdGF0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm90YXRpb25cIjtcbmltcG9ydCB7VmVsb2NpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3ZlbG9jaXR5XCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7IFBoeXNpY3NCcmlkZ2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9waHlzaWNzLWJyaWRnZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBQaHlzaWNzU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICByZWFkb25seSBxdWVyeSA9IG5ldyBRdWVyeSh7XG4gICAgICAgIGVudGl0eTogUmVhZEVudGl0eSgpLFxuICAgICAgICBwb3M6IFdyaXRlKFBvc2l0aW9uKSxcbiAgICAgICAgcm90OiBXcml0ZShSb3RhdGlvbiksXG4gICAgICAgIHZlbDogUmVhZChWZWxvY2l0eSksXG4gICAgfSk7XG5cbiAgICBwaHlzV29ybGQhOiBCb3gyRC5iMldvcmxkO1xuXG4gICAgc2V0dXAoYWN0aW9uczogSVN5c3RlbUFjdGlvbnMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcGh5c2ljc05hbWVzcGFjZToge1xuICAgICAgICAgICAgICAgIGIyV29ybGRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcbiAgICAgICAgdGhpcy5waHlzV29ybGQgPSBhY3Rpb25zLmdldFJlc291cmNlKGIyV29ybGQpO1xuICAgIH1cblxuICAgIHJ1bihhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucykge1xuICAgICAgICBjb25zdCBkdCA9IDAuMDE2O1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHBoeXNpY3NOYW1lc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBnZXRQb2ludGVyLFxuICAgICAgICAgICAgICAgIE5VTExcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoR2FtZVN0b3JlKTtcblxuICAgICAgICAvLyBjb25zdCBoYXNoQm9kaWVzOlJlY29yZDxudW1iZXIsIEJveDJELmIyQm9keT4gPSB7fTtcbiAgICAgICAgLy8gbGV0IHB0cjogbnVtYmVyO1xuXG4gICAgICAgIC8vIGZvciAoXG4gICAgICAgIC8vICAgICBsZXQgYm9keSA9IHRoaXMucGh5c1dvcmxkLkdldEJvZHlMaXN0KCk7XG4gICAgICAgIC8vICAgICAocHRyID0gZ2V0UG9pbnRlcihib2R5KSkgIT09IGdldFBvaW50ZXIoTlVMTCk7XG4gICAgICAgIC8vICAgICBib2R5ID0gYm9keS5HZXROZXh0KClcbiAgICAgICAgLy8gKSB7XG4gICAgICAgIC8vICAgICBoYXNoQm9kaWVzW3B0cl0gPSBib2R5O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5xdWVyeS5leGVjdXRlKCh7ZW50aXR5LCBwb3MsIHJvdCwgdmVsfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGh5cyA9IGVudGl0eS5nZXRDb21wb25lbnQoUGh5c2ljc0JyaWRnZSk7XG4gICAgICAgICAgICBpZiAocGh5cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBwaHlzLmJvZHlQdHI7XG4gICAgICAgICAgICAgICAgaWYgKCFib2R5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gYm9keS5HZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgcG9zLnggPSB4O1xuICAgICAgICAgICAgICAgIHBvcy55ID0geTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggKz0gdmVsLnggKiBkdDtcbiAgICAgICAgICAgICAgICBwb3MueSArPSB2ZWwueSAqIGR0O1xuICAgICAgICAgICAgICAgIHJvdC52YWx1ZSArPSB2ZWwuYW5ndWxhciAqIGR0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBoeXNXb3JsZC5TdGVwKGR0LCAxLCAxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgU3lzdGVtLCBXcml0ZX0gZnJvbSBcInNpbS1lY3NcIjtcbmltcG9ydCB7U2hhcGUsIFNoYXBlUGl2b3ROYW1lcywgU2hhcGVQcmltaXRpdmV9IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXBlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBHYW1lU3RvcmUgfSBmcm9tIFwiLi4vbW9kZWxzL2dhbWUtc3RvcmVcIjtcbmltcG9ydCB7IElSZWN0LCBSZWN0IH0gZnJvbSBcIi4uL21vZGVscy9yZWN0XCI7XG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi4vbW9kZWxzL2NhbWVyYVwiO1xuaW1wb3J0IHsgUm90YXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3RhdGlvblwiO1xuaW1wb3J0IHsgZHJhd1BvaW50LCBQSVhFTFNfUEVSX01FVEVSLCBUV09QSSB9IGZyb20gXCIuLi9hcHAvdXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyR2FtZVN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcmVhZG9ubHkgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBwb3M6IFJlYWQoUG9zaXRpb24pLFxuICAgICAgICByb3Q6IFdyaXRlKFJvdGF0aW9uKSxcbiAgICAgICAgc2hhcGU6IFJlYWQoU2hhcGUpLFxuICAgICAgICBtYXRlcmlhbDogUmVhZChNYXRlcmlhbCksXG4gICAgfSk7XG5cbiAgICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ2FtZVN0b3JlITogR2FtZVN0b3JlO1xuICAgIGNhbWVyYSE6IENhbWVyYTtcblxuICAgIC8vIFRPRE86IHJlbW92ZVxuICAgIGNvbnRyb2xzITogSFRNTEVsZW1lbnQ7XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucyk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5jdHggPSBhY3Rpb25zLmdldFJlc291cmNlKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGFjdGlvbnMuZ2V0UmVzb3VyY2UoQ2FtZXJhKTtcblxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRyb2xzJykhO1xuICAgIH1cblxuICAgIHJ1bnMgPSAwO1xuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0OiBJUmVjdCA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FtZXJhLnggKyB0aGlzLmNhbWVyYS5vZmZzZXQueCxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FtZXJhLnkgKyB0aGlzLmNhbWVyYS5vZmZzZXQueSxcbiAgICAgICAgICAgIHc6IHRoaXMuY3R4LmNhbnZhcy53aWR0aCAvICh0aGlzLmNhbWVyYS56b29tKlBJWEVMU19QRVJfTUVURVIpLFxuICAgICAgICAgICAgaDogdGhpcy5jdHguY2FudmFzLmhlaWdodCAvICh0aGlzLmNhbWVyYS56b29tKlBJWEVMU19QRVJfTUVURVIpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLnZpZXdwb3J0ID0gdmlld3BvcnQ7XG5cbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLmN0eC5zY2FsZShcbiAgICAgICAgICAgIFBJWEVMU19QRVJfTUVURVIqdGhpcy5jYW1lcmEuem9vbSxcbiAgICAgICAgICAgIFBJWEVMU19QRVJfTUVURVIqdGhpcy5jYW1lcmEuem9vbVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZShcbiAgICAgICAgICAgIC12aWV3cG9ydC54LFxuICAgICAgICAgICAgLXZpZXdwb3J0LnlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS54LFxuICAgICAgICAgICAgdGhpcy5jYW1lcmEueVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUodGhpcy5jYW1lcmEucm90YXRpb24pO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoXG4gICAgICAgICAgICAtdGhpcy5jYW1lcmEueCxcbiAgICAgICAgICAgIC10aGlzLmNhbWVyYS55XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RvcmUud29ybGRUb1NjcmVlbiA9IHRoaXMuY3R4LmdldFRyYW5zZm9ybSgpO1xuICAgICAgICB0aGlzLmdhbWVTdG9yZS5zY3JlZW5Ub1dvcmxkID0gdGhpcy5jdHguZ2V0VHJhbnNmb3JtKCkuaW52ZXJzZSgpO1xuXG4gICAgICAgIC8vbXgsbXkgLSBjdXJzb3IgY29vcmRzIGluIFNjcmVlbiBzcGFjZVxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB4Om14LCB5Om15XG4gICAgICAgIH0gPSB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3M7XG5cbiAgICAgICAgLy8gdHJhbnNmb3JtIG1hdHJpeCBzaWduaWZpY2F0IHZhbHVlc1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBhLGIsYyxkLGUsZlxuICAgICAgICB9ID0gdGhpcy5nYW1lU3RvcmUuc2NyZWVuVG9Xb3JsZDtcblxuICAgICAgICAvLyBhIGMgZSAgeCAgYSp4ICsgYyp5ICsgZSp6XG4gICAgICAgIC8vIGIgZCBmICB5ICBiKnggKyBkKnkgKyBmKnpcbiAgICAgICAgLy8gMCAwIDEgIHogID9cblxuICAgICAgICAvLyBjdXJzb3IgY29vcmRzIGluIHdvcmxkIHNwYWNlXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmN1cnNvclBvc1dvcmxkLnggPSBhKm14ICsgYypteSArIGU7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLmlucHV0LmN1cnNvclBvc1dvcmxkLnkgPSBiKm14ICsgZCpteSArIGY7XG5cbiAgICAgICAgLy8gY29uc3Qge1xuICAgICAgICAvLyAgICAgeDpuZXdYLFxuICAgICAgICAvLyAgICAgeTpuZXdZXG4gICAgICAgIC8vIH0gPSB0aGlzLmdhbWVTdG9yZS5pbnB1dC5jdXJzb3JQb3NXb3JsZDtcblxuICAgICAgICAvLyAvLyBEcmF3cyBhIGN1cnNvciBwb2ludCBpbiB3b3JsZCBzcGFjZSBcbiAgICAgICAgLy8gZHJhd1BvaW50KHRoaXMuY3R4LCBcbiAgICAgICAgLy8gICAgIG5ld1gsXG4gICAgICAgIC8vICAgICBuZXdZLCBcbiAgICAgICAgLy8gICAgIDEpO1xuXG4gICAgICAgIC8vIHRoaXMuY3R4LmZvbnQgPSAnMC41cHggQXJpYWwnO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChgJHtNYXRoLmZsb29yKG5ld1gqMWUzKSoxZS0zfSwgXG4gICAgICAgIC8vICR7TWF0aC5mbG9vcihuZXdZKjFlMykqMWUtM31gLCBuZXdYLCBuZXdZIC0gMC44KTtcblxuICAgICAgICBjb25zdCByb3dzID0gMTA7XG4gICAgICAgIGNvbnN0IGNvbHMgPSAxODtcblxuICAgICAgICBjb25zdCBwZXJDb2wgPSB0aGlzLmN0eC5jYW52YXMud2lkdGgvKGNvbHMqUElYRUxTX1BFUl9NRVRFUik7XG4gICAgICAgIGNvbnN0IHBlclJvdyA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQvKHJvd3MqUElYRUxTX1BFUl9NRVRFUik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGogKiBwZXJDb2w7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGkgKiBwZXJSb3c7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMi8zMjtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjZGFkYWRhJztcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KFxuICAgICAgICAgICAgICAgICAgICB4LHksIHBlckNvbCwgcGVyUm93XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZXIgPSBBcnJheS5mcm9tKHRoaXMucXVlcnkuaXRlcigpKTtcblxuICAgICAgICB0aGlzLmdhbWVTdG9yZS5kcmF3YWJsZXMgPSBpdGVyLmxlbmd0aDtcblxuICAgICAgICBjb25zdCBkcmF3YWJsZXMgPSBpdGVyLmZpbHRlcihcbiAgICAgICAgICAgICh7cG9zLCBzaGFwZX0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJib3ggPSBzaGFwZS5nZXRCQm94KCk7XG4gICAgICAgICAgICBjb25zdCByOiBJUmVjdCA9IHtcbiAgICAgICAgICAgICAgICB4OiBwb3MueCArIGJib3gueCxcbiAgICAgICAgICAgICAgICB5OiBwb3MueSArIGJib3gueSxcbiAgICAgICAgICAgICAgICB3OiBiYm94LncsXG4gICAgICAgICAgICAgICAgaDogYmJveC5oLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgaW5WaWV3ID0gUmVjdC5jaGVja0ludGVyc2VjdHMociwgdmlld3BvcnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gaW5WaWV3O1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoe3NoYXBlOiBhfSwge3NoYXBlOiBifSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEuekluZGV4IC0gYi56SW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlLnJlbmRlcmVkID0gZHJhd2FibGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYXdhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qge3Bvcywgc2hhcGUsIHJvdCwgbWF0ZXJpYWx9ID0gZHJhd2FibGVzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRyYXdTaGFwZShwb3MsIHNoYXBlLCBtYXRlcmlhbCwgcm90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBkcmF3U2hhcGUocG9zOiBQb3NpdGlvbiwgc2hhcGU6IFNoYXBlLCBtYXRlcmlhbDogTWF0ZXJpYWwsIHJvdDogUm90YXRpb24pIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgeDogdywgeTogaFxuICAgICAgICB9ID0gc2hhcGUuZGltZW5zaW9ucztcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB4OiBieCwgeTogYnksXG4gICAgICAgICAgICB3OiBidywgaDogYmgsXG4gICAgICAgIH0gPSBzaGFwZS5nZXRCQm94KCk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgeCwgeVxuICAgICAgICB9ID0gcG9zO1xuXG4gICAgICAgIC8vIFRPRE86IG9uZSBzeXN0ZW0gdGhhdCBjaGVja3MgYWxsIHJheWNhc3RzXG4gICAgICAgIC8vIFJlY3QuY2hlY2tQb2ludEluc2lkZShyLCBtb3VzZSk7XG5cbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZShyb3QudmFsdWUpO1xuXG4gICAgICAgIC8vIFRPRE86IG1hdGVyaWFsIG9wdGlvbnNcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gbWF0ZXJpYWwuY29sb3I7XG5cbiAgICAgICAgaWYgKHNoYXBlLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuUmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYngsIGJ5LCB3LCBoKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZS5wcmltaXRpdmUgPT09IFNoYXBlUHJpbWl0aXZlLkNpcmNsZSkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5hcmMoYngrdy8yLCBieCt3LzIsIHcvMiwgMCwgVFdPUEkpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlLnByaW1pdGl2ZSA9PT0gU2hhcGVQcmltaXRpdmUuTWVzaFxuICAgICAgICAgICAgJiYgc2hhcGUubWVzaCkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHtvZmZzZXRYLCBvZmZzZXRZfSA9IHNoYXBlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICBpIDwgc2hhcGUubWVzaC52ZXJ0aWNpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICsraVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge3g6ZHgsIHk6ZHl9ID0gc2hhcGUubWVzaC52ZXJ0aWNpZXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGR4K29mZnNldFgsIGR5K29mZnNldFkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdG9yZS5kZWJ1Z1NoYXBlcykge1xuICAgICAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9ICcwLjFyZW0gQXJpYWwnO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYFo9JHtcbiAgICAgICAgICAgICAgICBzaGFwZS56SW5kZXhcbiAgICAgICAgICAgIH0seD0ke01hdGguZmxvb3IoeCl9LHk9JHtNYXRoLmZsb29yKHkpfWAsIDAsIC1ieS0yKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGBQaXZvdD0ke1NoYXBlUGl2b3ROYW1lc1tzaGFwZS5waXZvdF19YCwgMCwgLWJ5LTMpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjZjBmJztcbiAgICAgICAgICAgIGNvbnN0IHBhZGRpbmcgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMC4xO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdChcbiAgICAgICAgICAgICAgICBieCAtIHBhZGRpbmcsXG4gICAgICAgICAgICAgICAgYnkgLSBwYWRkaW5nLFxuICAgICAgICAgICAgICAgIGJ3ICsgcGFkZGluZyoyLFxuICAgICAgICAgICAgICAgIGJoICsgcGFkZGluZyoyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuXG4gICAgICAgICAgICBkcmF3UG9pbnQodGhpcy5jdHgsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxufVxuIiwiXG5pbXBvcnQge0lTeXN0ZW1BY3Rpb25zLCBRdWVyeSwgUmVhZCwgU3lzdGVtLCBXaXRoLCBXaXRoVGFnfSBmcm9tIFwic2ltLWVjc1wiO1xuaW1wb3J0IHtVSUl0ZW19IGZyb20gXCIuLi9jb21wb25lbnRzL3VpLWl0ZW1cIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcG9zaXRpb25cIjtcbmltcG9ydCB7IEdhbWVTdG9yZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1zdG9yZVwiO1xuaW1wb3J0IHsgRVRhZ3MgfSBmcm9tIFwiLi4vbW9kZWxzL3RhZ3NcIjtcbmltcG9ydCB7IGRyYXdQb2ludCB9IGZyb20gXCIuLi9hcHAvdXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyVUlTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHJlYWRvbmx5IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgX3RhZzogV2l0aFRhZyhFVGFncy51aSksXG4gICAgICAgIHBvczogUmVhZChQb3NpdGlvbiksXG4gICAgICAgIHVpOiBSZWFkKFVJSXRlbSlcbiAgICB9KTtcblxuICAgIGN0eCE6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBnYW1lU3RvcmUhOiBHYW1lU3RvcmU7XG4gICAgdG9TY3JlZW5Db29yZHMhOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IFtudW1iZXIsIG51bWJlcl07XG5cbiAgICBzZXR1cChhY3Rpb25zOiBJU3lzdGVtQWN0aW9ucyk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5jdHggPSBhY3Rpb25zLmdldFJlc291cmNlKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgICAgIHRoaXMuZ2FtZVN0b3JlID0gYWN0aW9ucy5nZXRSZXNvdXJjZShHYW1lU3RvcmUpO1xuICAgIH1cblxuICAgIHJ1bnMgPSAwO1xuXG4gICAgcnVuKGFjdGlvbnM6IElTeXN0ZW1BY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICB0aGlzLnF1ZXJ5LmV4ZWN1dGUoKHtwb3MsIHVpfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdWkuYWN0aXZlXG4gICAgICAgICAgICAgICAgPyB1aS5hY3RpdmVDb2xvciA/PyAncmVkJ1xuICAgICAgICAgICAgICAgIDogdWkuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdWkuYWN0aXZlXG4gICAgICAgICAgICAgICAgPyBgJHt1aS5mb250U2l6ZSAqIDEuMn1weCBzZXJpZmBcbiAgICAgICAgICAgICAgICA6IGAke3VpLmZvbnRTaXplfXB4IHNlcmlmYDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHVpLmZpbmFsQ2FwdGlvbiwgcG9zLngsIHBvcy55KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSAnMzJweCBzZXJpZic7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoMTAqdGhpcy5nYW1lU3RvcmUudGltZVNpbmNlTGV2ZWxMb2FkZWQpLzEwLjBcbiAgICAgICAgICAgIH0gcy5gLFxuICAgICAgICAgICAgdGhpcy5jdHguY2FudmFzLndpZHRoIC0gMjAwLCAyMFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmdhbWVTdG9yZS5tZWRpYW5GcHMrMC41KVxuICAgICAgICAgICAgfSBGUFNgLFxuICAgICAgICAgICAgdGhpcy5jdHguY2FudmFzLndpZHRoIC0gMjAwLCA2MFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICAgICAgYCR7dGhpcy5nYW1lU3RvcmUucmVuZGVyZWR9IC8gJHt0aGlzLmdhbWVTdG9yZS5kcmF3YWJsZXN9YCxcbiAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgMTAwXG4gICAgICAgICk7XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBzdHIgPXRoaXMuZ2FtZVN0b3JlLmlucHV0LmFjdGlvbnMuY2hhcmFjdGVyTW92ZW1lbnQudG9TdHJpbmcoMik7XG4gICAgICAgICAgICBzdHIgPSAnMCcucmVwZWF0KDQgLSBzdHIubGVuZ3RoKSArIHN0cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICAgICAgICAgIGAke3N0cn1gLFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCAtIDIwMCwgMTQwXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcImNpdHlsaWdodHM6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9IGVsc2UgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NpdHlsaWdodHNcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2l0eWxpZ2h0c1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfc2ltLWVjc19kaXN0X2luZGV4X2pzLW5vZGVfbW9kdWxlc19ib3gyZC13YXNtX2Rpc3RfZXNfZW50cnlfanMtbm9kZV9tb2R1LTBkOTQ1N1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9