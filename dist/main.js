/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./res/TX Tileset Grass.png":
/*!**********************************!*\
  !*** ./res/TX Tileset Grass.png ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0237cbdaf14a8ac95dd35a9934987b23.png");

/***/ }),

/***/ "./res/baddie.png":
/*!************************!*\
  !*** ./res/baddie.png ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "cf46998813a16deda5b1df84e8ba4a58.png");

/***/ }),

/***/ "./res/block.png":
/*!***********************!*\
  !*** ./res/block.png ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5f7dc58022982b36f3e7f336df2e1fe3.png");

/***/ }),

/***/ "./res/excalibot-red.png":
/*!*******************************!*\
  !*** ./res/excalibot-red.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "bd99eb41ea5cc3d44e26b5d2809fce41.png");

/***/ }),

/***/ "./res/excalibot.png":
/*!***************************!*\
  !*** ./res/excalibot.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9b8606ea9f0f4b78b4cd7ce817564074.png");

/***/ }),

/***/ "./res/gottem.wav":
/*!************************!*\
  !*** ./res/gottem.wav ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "81bc95ba9d9e1dca2626111d8282fc01.wav");

/***/ }),

/***/ "./res/hurt.wav":
/*!**********************!*\
  !*** ./res/hurt.wav ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d292f5f80075fd4216d6da8d459f64c5.wav");

/***/ }),

/***/ "./res/jump.wav":
/*!**********************!*\
  !*** ./res/jump.wav ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "8934b41ac754a9dbdf0fdfffa1807d52.wav");

/***/ }),

/***/ "./res/npc.png":
/*!*********************!*\
  !*** ./res/npc.png ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "61977b58651acbc9a3245a94f185238b.png");

/***/ }),

/***/ "./src/baddie.ts":
/*!***********************!*\
  !*** ./src/baddie.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Baddie": () => (/* binding */ Baddie)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot */ "./src/bot.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Baddie = /** @class */ (function (_super) {
    __extends(Baddie, _super);
    function Baddie(x, y, dir) {
        var _this = _super.call(this, {
            pos: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(x, y),
            body: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Body({
                collider: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Collider({
                    type: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Active,
                    shape: excalibur__WEBPACK_IMPORTED_MODULE_0__.Shape.Box(32, 50),
                    offset: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(0, -1),
                    group: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.groupByName("enemy")
                })
            })
        }) || this;
        _this.dir = dir;
        return _this;
    }
    // OnInitialize is called before the 1st actor update
    Baddie.prototype.onInitialize = function (engine) {
        // Initialize actor
        // Setup visuals
        var left = _resources__WEBPACK_IMPORTED_MODULE_1__.baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
        left.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        var right = _resources__WEBPACK_IMPORTED_MODULE_1__.baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
        right.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        right.flipHorizontal = true;
        // Register animation
        this.addDrawing("left", left);
        this.addDrawing("right", right);
        // Setup patroling behavior
        this.actions.moveBy(400 * this.dir, 0, 100)
            .moveBy(-400 * this.dir, 0, 100)
            .repeatForever();
        // Handle being stomped by the player
        this.on('postcollision', this.onPostCollision);
    };
    Baddie.prototype.onPostCollision = function (evt) {
        if (evt.other instanceof _bot__WEBPACK_IMPORTED_MODULE_2__.Bot && evt.side === excalibur__WEBPACK_IMPORTED_MODULE_0__.Side.Bottom) {
            _resources__WEBPACK_IMPORTED_MODULE_1__.Resources.gotEm.play(.5);
            // Clear patrolling
            this.actions.clearActions();
            // Remove ability to collide
            this.body.collider.type = excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.PreventCollision;
            // Launch into air with rotation
            this.vel = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(0, -300);
            this.acc = excalibur__WEBPACK_IMPORTED_MODULE_0__.Physics.acc;
            this.rx = 2;
        }
    };
    // Change animation based on velocity 
    Baddie.prototype.onPostUpdate = function () {
        if (this.vel.x < 0) {
            this.setDrawing("left");
        }
        else if (this.vel.x > 0) {
            this.setDrawing("right");
        }
    };
    return Baddie;
}(excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor));



/***/ }),

/***/ "./src/bot.ts":
/*!********************!*\
  !*** ./src/bot.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bot": () => (/* binding */ Bot)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _baddie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baddie */ "./src/baddie.ts");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Bot = /** @class */ (function (_super) {
    __extends(Bot, _super);
    function Bot(x, y) {
        var _this = _super.call(this, {
            pos: new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(x, y),
            body: new excalibur__WEBPACK_IMPORTED_MODULE_2__.Body({
                collider: new excalibur__WEBPACK_IMPORTED_MODULE_2__.Collider({
                    type: excalibur__WEBPACK_IMPORTED_MODULE_2__.CollisionType.Active,
                    shape: excalibur__WEBPACK_IMPORTED_MODULE_2__.Shape.Box(32, 50),
                    offset: new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 3),
                    group: excalibur__WEBPACK_IMPORTED_MODULE_2__.CollisionGroupManager.groupByName("player"),
                }),
            }),
        }) || this;
        _this.isJumping = false;
        _this.isJumpFirstCross = true;
        _this.jumpY = 0;
        _this.hurt = false;
        _this.hurtTime = 0;
        _this.isLeft = false;
        return _this;
    }
    // OnInitialize is called before the 1st actor update
    Bot.prototype.onInitialize = function (engine) {
        // Initialize actor
        // Setup visuals, retrieve animations from sprite sheets
        var hurtleft = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        var hurtright = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        hurtright.flipHorizontal = true;
        var idleLeft = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idleLeft.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        var idleRight = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idleRight.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        idleRight.flipHorizontal = true;
        var left = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        left.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        var right = _resources__WEBPACK_IMPORTED_MODULE_0__.botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        right.scale = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(2, 2);
        right.flipHorizontal = true;
        // Register animations with actor
        this.addDrawing("hurtleft", hurtleft);
        this.addDrawing("hurtright", hurtright);
        this.addDrawing("idleLeft", idleLeft);
        this.addDrawing("idleRight", idleRight);
        this.addDrawing("left", left);
        this.addDrawing("right", right);
        // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
        this.on("postcollision", this.onPostCollision);
    };
    Bot.prototype.onPostCollision = function (evt) {
        // Bot has collided with the top of another collider
        if (evt.side === excalibur__WEBPACK_IMPORTED_MODULE_2__.Side.Top) {
            // this.onGround = true;
        }
        // Bot has collided on the side, display hurt animation
        if ((evt.side === excalibur__WEBPACK_IMPORTED_MODULE_2__.Side.Left || evt.side === excalibur__WEBPACK_IMPORTED_MODULE_2__.Side.Right) &&
            evt.other instanceof _baddie__WEBPACK_IMPORTED_MODULE_1__.Baddie) {
            if (this.vel.x < 0 && !this.hurt) {
                this.setDrawing("hurtleft");
            }
            if (this.vel.x >= 0 && !this.hurt) {
                this.setDrawing("hurtright");
            }
            this.hurt = true;
            this.hurtTime = 1000;
            _resources__WEBPACK_IMPORTED_MODULE_0__.Resources.hit.play(0.1);
        }
    };
    Bot.prototype.getMoveDir = function (engine) {
        var vec = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 0);
        if (engine.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_2__.Input.Keys.Left)) {
            vec.x = -1;
        }
        if (engine.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_2__.Input.Keys.Right)) {
            vec.x = 1;
        }
        if (engine.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_2__.Input.Keys.Up)) {
            vec.y = -1;
        }
        if (engine.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_2__.Input.Keys.Down)) {
            vec.y = 1;
        }
        vec.normalize();
        return vec;
    };
    // After main update, once per frame execute this code
    Bot.prototype.onPreUpdate = function (engine, delta) {
        // If hurt, count down
        if (this.hurtTime >= 0 && this.hurt) {
            this.hurtTime -= delta;
            if (this.hurtTime < 0) {
                this.hurt = false;
            }
        }
        if (this.pos.y - this.jumpY >= 0.00000000001 && this.isJumping) {
            this.isJumping = false;
            this.pos.y = this.jumpY;
            this.acc = excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector.Zero;
        }
        var moveDir = this.getMoveDir(engine);
        moveDir.scaleEqual(150);
        if (this.isJumping) {
            moveDir.scaleEqual(0.5);
            moveDir.y = this.vel.y;
        }
        this.vel = moveDir;
        if (engine.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_2__.Input.Keys.Space) && !this.isJumping) {
            this.vel.y = -300;
            this.acc = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 980);
            this.isJumping = true;
            this.jumpY = this.pos.y;
            this.isJumpFirstCross = true;
            _resources__WEBPACK_IMPORTED_MODULE_0__.Resources.jump.play(1.0);
        }
        if (this.vel.x < 0) {
            this.isLeft = true;
        }
        else if (this.vel.x > 0) {
            this.isLeft = false;
        }
        if (!this.hurt) {
            if (this.isLeft) {
                this.setDrawing("left");
            }
            else {
                this.setDrawing("right");
            }
            if (this.vel.x === 0) {
                if (this.isLeft) {
                    this.setDrawing("idleLeft");
                }
                else {
                    this.setDrawing("idleRight");
                }
            }
        }
    };
    return Bot;
}(excalibur__WEBPACK_IMPORTED_MODULE_2__.Actor));



/***/ }),

/***/ "./src/city/Brick.ts":
/*!***************************!*\
  !*** ./src/city/Brick.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Brick": () => (/* binding */ Brick)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/helpers */ "./src/common/helpers.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources */ "./src/resources.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var idx = (0,_common_helpers__WEBPACK_IMPORTED_MODULE_1__.indexByColRow)(_resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.columns);
var Brick = /** @class */ (function (_super) {
    __extends(Brick, _super);
    function Brick(x, y, cols, rows) {
        var _this = _super.call(this, {
            pos: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(x, y),
            scale: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2),
            anchor: excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector.Zero,
            body: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Body({
                collider: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Collider({
                    type: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.PreventCollision,
                    shape: excalibur__WEBPACK_IMPORTED_MODULE_0__.Shape.Box(_resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.spWidth * cols, _resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.spHeight * rows, excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector.Zero),
                    group: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.groupByName("floor"),
                }),
            }),
        }) || this;
        _this.cols = cols;
        _this.rows = rows;
        _this.indicies = [];
        for (var i = 0; i < _this.cols; i++) {
            for (var j = 0; j < _this.rows; j++) {
                var index = (0,_common_helpers__WEBPACK_IMPORTED_MODULE_1__.getRandomSprite)(0, 7, 0, 7);
                _this.indicies.push(index);
            }
        }
        return _this;
    }
    // Custom draw in current actor transform
    Brick.prototype.onPostDraw = function (ctx) {
        // for (let i = 0; i < grassSpriteSheet.columns; ++i) {
        //   for (let j = 0; j < grassSpriteSheet.rows; ++j) {
        //     const index = idx(i, j);
        //     grassSpriteSheet.getSprite(index).draw(
        //       ctx,
        //       i * grassSpriteSheet.spWidth,
        //       j * grassSpriteSheet.spHeight
        //     );
        //     ctx.save();
        //     ctx.font = '5px Arial';
        //     ctx.fillStyle = 'rgba(255,255,0,0.9)';
        //     ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        //     ctx.fillText(
        //       `${i}, ${j}`,
        //       (i+0.3) * grassSpriteSheet.spWidth,
        //       (j+0.5) * grassSpriteSheet.spHeight,
        //     );
        //     ctx.strokeRect(
        //       i * grassSpriteSheet.spWidth,
        //       j * grassSpriteSheet.spHeight,
        //       grassSpriteSheet.spWidth,
        //       grassSpriteSheet.spHeight
        //     );
        //     ctx.restore();
        //   }
        // } 
        // return;
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                var index = this.indicies[idx(i, j)];
                _resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.getSprite(index).draw(ctx, i * _resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.spWidth, j * _resources__WEBPACK_IMPORTED_MODULE_2__.grassSpriteSheet.spHeight);
            }
        }
    };
    return Brick;
}(excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor));



/***/ }),

/***/ "./src/common/helpers.ts":
/*!*******************************!*\
  !*** ./src/common/helpers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "indexByColRow": () => (/* binding */ indexByColRow),
/* harmony export */   "getRandomIndex": () => (/* binding */ getRandomIndex),
/* harmony export */   "getRandomSprite": () => (/* binding */ getRandomSprite)
/* harmony export */ });
var indexByColRow = function (cols) { return (function (col, row) { return (cols * row + col); }); };
var getRandomIndex = function (length) { return Math.floor(Math.random() * length); };
var getRandomSprite = function (minCol, maxCol, minRow, maxRow) {
    var randomCol = Math.floor(Math.random() * (maxCol - minCol)) + minCol;
    var randomRow = Math.floor(Math.random() * (maxRow - minRow)) + minRow;
    return randomRow * (maxCol - minCol) + randomCol;
};


/***/ }),

/***/ "./src/floor.ts":
/*!**********************!*\
  !*** ./src/floor.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Floor": () => (/* binding */ Floor)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor(x, y, cols, rows) {
        var _this = _super.call(this, {
            pos: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(x, y),
            scale: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2),
            anchor: excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector.Zero,
            body: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Body({
                collider: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Collider({
                    type: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Fixed,
                    shape: excalibur__WEBPACK_IMPORTED_MODULE_0__.Shape.Box(20 * cols, 15 * rows, excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector.Zero),
                    group: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.groupByName("floor")
                })
            })
        }) || this;
        _this.cols = cols;
        _this.rows = rows;
        return _this;
    }
    // Custom draw in current actor transform
    Floor.prototype.onPostDraw = function (ctx) {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                _resources__WEBPACK_IMPORTED_MODULE_1__.blockSprite.draw(ctx, i * _resources__WEBPACK_IMPORTED_MODULE_1__.blockSprite.drawWidth, j * _resources__WEBPACK_IMPORTED_MODULE_1__.blockSprite.drawHeight);
            }
        }
    };
    return Floor;
}(excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor));



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ "./src/level.ts");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_2__);



var engine = new excalibur__WEBPACK_IMPORTED_MODULE_2__.Engine({
    backgroundColor: excalibur__WEBPACK_IMPORTED_MODULE_2__.Color.fromHex('#000000'),
    displayMode: excalibur__WEBPACK_IMPORTED_MODULE_2__.DisplayMode.FullScreen,
});
// Turn off anti-aliasing for pixel art graphics
engine.setAntialiasing(false);
// Set global gravity, 800 pixels/sec^2
// Physics.acc = new Vector(0, 981);
// Setup first level as a custom scene
engine.add('level', new _level__WEBPACK_IMPORTED_MODULE_1__.Level(engine));
engine.goToScene('level');
// Game events to handle
// engine.on('hidden', () => {
//   console.log('pause');
//   engine.stop();
// });
engine.on('visible', function () {
    console.log('start');
    engine.start();
});
// Start the engine
engine.start(_resources__WEBPACK_IMPORTED_MODULE_0__.loader).then(function () {
    console.log('game start');
});


/***/ }),

/***/ "./src/level.ts":
/*!**********************!*\
  !*** ./src/level.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level": () => (/* binding */ Level)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _baddie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baddie */ "./src/baddie.ts");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot */ "./src/bot.ts");
/* harmony import */ var _city_Brick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./city/Brick */ "./src/city/Brick.ts");
/* harmony import */ var _floor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./floor */ "./src/floor.ts");
/* harmony import */ var _npc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./npc */ "./src/npc.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level(engine) {
        return _super.call(this, engine) || this;
    }
    Level.prototype.onInitialize = function (engine) {
        engine.backgroundColor = excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Gray;
        // Create collision groups for the game
        excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.create("player");
        excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.create("enemy");
        excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.create("floor");
        // Compose actors in scene
        var actor = new _bot__WEBPACK_IMPORTED_MODULE_2__.Bot(+100, 120);
        var baddie = new _baddie__WEBPACK_IMPORTED_MODULE_1__.Baddie(+200, 300 - 30, 1);
        var baddie2 = new _baddie__WEBPACK_IMPORTED_MODULE_1__.Baddie(+100, 300 - 30, -1);
        var npc = new _npc__WEBPACK_IMPORTED_MODULE_5__.NPC(400, 170);
        for (var j = 0; j < 10; j++) {
            for (var i = 0; i < 10; i++) {
                var grass = new _city_Brick__WEBPACK_IMPORTED_MODULE_3__.Brick((i - 4) * 320, (j - 4) * 320, 10, 10);
                engine.add(grass);
            }
        }
        var otherFloor = new _floor__WEBPACK_IMPORTED_MODULE_4__.Floor(+50, 200, 1, 10);
        engine.add(actor);
        engine.add(npc);
        engine.add(baddie);
        engine.add(baddie2);
        engine.add(otherFloor);
        // Create camera strategy
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(actor, 0.05, 0.05);
        this.camera.zoom(1.5);
    };
    return Level;
}(excalibur__WEBPACK_IMPORTED_MODULE_0__.Scene));



/***/ }),

/***/ "./src/npc.ts":
/*!********************!*\
  !*** ./src/npc.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NPC": () => (/* binding */ NPC)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NPC = /** @class */ (function (_super) {
    __extends(NPC, _super);
    function NPC(x, y) {
        var _this = _super.call(this, {
            pos: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(x, y),
            body: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Body({
                collider: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Collider({
                    type: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Active,
                    shape: excalibur__WEBPACK_IMPORTED_MODULE_0__.Shape.Box(32, 50),
                    offset: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 3),
                    group: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionGroupManager.groupByName("player")
                })
            })
        }) || this;
        _this.onGround = true;
        _this.hurt = false;
        _this.hurtTime = 0;
        return _this;
    }
    // OnInitialize is called before the 1st actor update
    NPC.prototype.onInitialize = function (engine) {
        // Initialize actor
        // Set the z-index to be behind everything
        this.z = -1;
        // Setup visuals
        var hurtleft = _resources__WEBPACK_IMPORTED_MODULE_1__.botRedSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        var hurtright = _resources__WEBPACK_IMPORTED_MODULE_1__.botRedSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        hurtright.flipHorizontal = true;
        var idle = _resources__WEBPACK_IMPORTED_MODULE_1__.botRedSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idle.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        var left = _resources__WEBPACK_IMPORTED_MODULE_1__.botRedSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        left.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        var right = _resources__WEBPACK_IMPORTED_MODULE_1__.botRedSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        right.scale = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Vector(2, 2);
        right.flipHorizontal = true;
        // Register drawings
        this.addDrawing("hurtleft", hurtleft);
        this.addDrawing("hurtright", hurtright);
        this.addDrawing("idle", idle);
        this.addDrawing("left", left);
        this.addDrawing("right", right);
        // Setup patroling behavior
        this.actions.moveBy(100, 0, 20)
            .moveBy(-100, 0, 20)
            .repeatForever();
    };
    NPC.prototype.onPostUpdate = function (engine, delta) {
        if (this.vel.x < 0) {
            this.setDrawing("left");
        }
        if (this.vel.x > 0) {
            this.setDrawing("right");
        }
        if (this.vel.x === 0) {
            this.setDrawing("idle");
        }
    };
    // Custom draw after local tranform, draws word bubble
    NPC.prototype.onPostDraw = function (ctx) {
        _resources__WEBPACK_IMPORTED_MODULE_1__.npcSprite.draw(ctx, -10, -100);
    };
    return NPC;
}(excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor));



/***/ }),

/***/ "./src/resources.ts":
/*!**************************!*\
  !*** ./src/resources.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resources": () => (/* binding */ Resources),
/* harmony export */   "loader": () => (/* binding */ loader),
/* harmony export */   "botSpriteSheet": () => (/* binding */ botSpriteSheet),
/* harmony export */   "botRedSpriteSheet": () => (/* binding */ botRedSpriteSheet),
/* harmony export */   "baddieSpriteSheet": () => (/* binding */ baddieSpriteSheet),
/* harmony export */   "blockSprite": () => (/* binding */ blockSprite),
/* harmony export */   "npcSprite": () => (/* binding */ npcSprite),
/* harmony export */   "grassSpriteSheet": () => (/* binding */ grassSpriteSheet)
/* harmony export */ });
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/dist/excalibur.min.js");
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excalibur__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _res_excalibot_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../res/excalibot.png */ "./res/excalibot.png");
/* harmony import */ var _res_excalibot_red_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../res/excalibot-red.png */ "./res/excalibot-red.png");
/* harmony import */ var _res_baddie_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../res/baddie.png */ "./res/baddie.png");
/* harmony import */ var _res_block_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../res/block.png */ "./res/block.png");
/* harmony import */ var _res_npc_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../res/npc.png */ "./res/npc.png");
/* harmony import */ var _res_jump_wav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../res/jump.wav */ "./res/jump.wav");
/* harmony import */ var _res_hurt_wav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../res/hurt.wav */ "./res/hurt.wav");
/* harmony import */ var _res_gottem_wav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../res/gottem.wav */ "./res/gottem.wav");
/* harmony import */ var _res_TX_Tileset_Grass_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../res/TX Tileset Grass.png */ "./res/TX Tileset Grass.png");










var Resources = {
    bot: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_excalibot_png__WEBPACK_IMPORTED_MODULE_1__.default),
    botRed: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_excalibot_red_png__WEBPACK_IMPORTED_MODULE_2__.default),
    baddie: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_baddie_png__WEBPACK_IMPORTED_MODULE_3__.default),
    block: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_block_png__WEBPACK_IMPORTED_MODULE_4__.default),
    npc: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_npc_png__WEBPACK_IMPORTED_MODULE_5__.default),
    jump: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Sound(_res_jump_wav__WEBPACK_IMPORTED_MODULE_6__.default),
    hit: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Sound(_res_hurt_wav__WEBPACK_IMPORTED_MODULE_7__.default),
    gotEm: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Sound(_res_gottem_wav__WEBPACK_IMPORTED_MODULE_8__.default),
    grass: new excalibur__WEBPACK_IMPORTED_MODULE_0__.Texture(_res_TX_Tileset_Grass_png__WEBPACK_IMPORTED_MODULE_9__.default),
};
var loader = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Loader();
var botSpriteSheet = new excalibur__WEBPACK_IMPORTED_MODULE_0__.SpriteSheet(Resources.bot, 8, 1, 32, 32);
var botRedSpriteSheet = new excalibur__WEBPACK_IMPORTED_MODULE_0__.SpriteSheet(Resources.botRed, 8, 1, 32, 32);
var baddieSpriteSheet = new excalibur__WEBPACK_IMPORTED_MODULE_0__.SpriteSheet(Resources.baddie, 6, 1, 32, 32);
var blockSprite = Resources.block.asSprite();
var npcSprite = Resources.npc.asSprite();
var grassSpriteSheet = new excalibur__WEBPACK_IMPORTED_MODULE_0__.SpriteSheet(Resources.grass, 8, 8, 32, 32);
// const font = new Font(Resources.font);
for (var res in Resources) {
    loader.addResource(Resources[res]);
}



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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkexcalibur_webpack"] = self["webpackChunkexcalibur_webpack"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_excalibur_dist_excalibur_min_js"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay8uL3Jlcy9UWCBUaWxlc2V0IEdyYXNzLnBuZyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay8uL3Jlcy9iYWRkaWUucG5nIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrLy4vcmVzL2Jsb2NrLnBuZyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay8uL3Jlcy9leGNhbGlib3QtcmVkLnBuZyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay8uL3Jlcy9leGNhbGlib3QucG5nIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrLy4vcmVzL2dvdHRlbS53YXYiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9yZXMvaHVydC53YXYiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9yZXMvanVtcC53YXYiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9yZXMvbnBjLnBuZyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay8uL3NyYy9iYWRkaWUudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvYm90LnRzIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrLy4vc3JjL2NpdHkvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvY29tbW9uL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvZmxvb3IudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvbGV2ZWwudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvbnBjLnRzIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrLy4vc3JjL3Jlc291cmNlcy50cyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZSxxQkFBdUIseUNBQXlDLEU7Ozs7Ozs7Ozs7Ozs7O0FDQS9FLGlFQUFlLHFCQUF1Qix5Q0FBeUMsRTs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5QyxFOzs7Ozs7Ozs7Ozs7OztBQ0EvRSxpRUFBZSxxQkFBdUIseUNBQXlDLEU7Ozs7Ozs7Ozs7Ozs7O0FDQS9FLGlFQUFlLHFCQUF1Qix5Q0FBeUMsRTs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5QyxFOzs7Ozs7Ozs7Ozs7OztBQ0EvRSxpRUFBZSxxQkFBdUIseUNBQXlDLEU7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V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0sb0JBQW9CO1dBQzFCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVQzlDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMDIzN2NiZGFmMTRhOGFjOTVkZDM1YTk5MzQ5ODdiMjMucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImNmNDY5OTg4MTNhMTZkZWRhNWIxZGY4NGU4YmE0YTU4LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI1ZjdkYzU4MDIyOTgyYjM2ZjNlN2YzMzZkZjJlMWZlMy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYmQ5OWViNDFlYTVjYzNkNDRlMjZiNWQyODA5ZmNlNDEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjliODYwNmVhOWYwZjRiNzhiNGNkN2NlODE3NTY0MDc0LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI4MWJjOTViYTlkOWUxZGNhMjYyNjExMWQ4MjgyZmMwMS53YXZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZDI5MmY1ZjgwMDc1ZmQ0MjE2ZDZkYThkNDU5ZjY0YzUud2F2XCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjg5MzRiNDFhYzc1NGE5ZGJkZjBmZGZmZmExODA3ZDUyLndhdlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2MTk3N2I1ODY1MWFjYmM5YTMyNDVhOTRmMTg1MjM4Yi5wbmdcIjsiLCJpbXBvcnQge1xuICBBY3RvciwgVmVjdG9yLCBDb2xsaXNpb25UeXBlLFxuICBDb2xsaWRlcixcbiAgQm9keSxcbiAgU2hhcGUsXG4gIENvbGxpc2lvbkdyb3VwTWFuYWdlcixcbiAgRW5naW5lLFxuICBQaHlzaWNzLFxuICBQb3N0Q29sbGlzaW9uRXZlbnQsXG4gIFNpZGVcbn0gZnJvbSAnZXhjYWxpYnVyJztcbmltcG9ydCB7IGJhZGRpZVNwcml0ZVNoZWV0LCBSZXNvdXJjZXMgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcbmltcG9ydCB7IEJvdCB9IGZyb20gJy4vYm90JztcblxuZXhwb3J0IGNsYXNzIEJhZGRpZSBleHRlbmRzIEFjdG9yIHtcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHB1YmxpYyBkaXI6IG51bWJlcikge1xuICAgIHN1cGVyKHtcbiAgICAgIHBvczogbmV3IFZlY3Rvcih4LCB5KSxcbiAgICAgIGJvZHk6IG5ldyBCb2R5KHtcbiAgICAgICAgY29sbGlkZXI6IG5ldyBDb2xsaWRlcih7XG4gICAgICAgICAgdHlwZTogQ29sbGlzaW9uVHlwZS5BY3RpdmUsXG4gICAgICAgICAgc2hhcGU6IFNoYXBlLkJveCgzMiwgNTApLFxuICAgICAgICAgIG9mZnNldDogbmV3IFZlY3RvcigwLCAtMSksXG4gICAgICAgICAgZ3JvdXA6IENvbGxpc2lvbkdyb3VwTWFuYWdlci5ncm91cEJ5TmFtZShcImVuZW15XCIpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG4gIFxuICAvLyBPbkluaXRpYWxpemUgaXMgY2FsbGVkIGJlZm9yZSB0aGUgMXN0IGFjdG9yIHVwZGF0ZVxuICBvbkluaXRpYWxpemUoZW5naW5lOiBFbmdpbmUpIHtcbiAgICAvLyBJbml0aWFsaXplIGFjdG9yXG4gICAgXG4gICAgLy8gU2V0dXAgdmlzdWFsc1xuICAgIGNvbnN0IGxlZnQgPSBiYWRkaWVTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMiwgMywgNCwgNV0sIDEwMCk7XG4gICAgbGVmdC5zY2FsZSA9IG5ldyBWZWN0b3IoMiwgMik7XG4gICAgY29uc3QgcmlnaHQgPSBiYWRkaWVTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMiwgMywgNCwgNV0sIDEwMCk7XG4gICAgcmlnaHQuc2NhbGUgPSBuZXcgVmVjdG9yKDIsIDIpO1xuICAgIHJpZ2h0LmZsaXBIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICBcbiAgICAvLyBSZWdpc3RlciBhbmltYXRpb25cbiAgICB0aGlzLmFkZERyYXdpbmcoXCJsZWZ0XCIsIGxlZnQpXG4gICAgdGhpcy5hZGREcmF3aW5nKFwicmlnaHRcIiwgcmlnaHQpO1xuICAgIFxuICAgIFxuICAgIC8vIFNldHVwIHBhdHJvbGluZyBiZWhhdmlvclxuICAgIHRoaXMuYWN0aW9ucy5tb3ZlQnkoNDAwICogdGhpcy5kaXIsIDAsIDEwMClcbiAgICAubW92ZUJ5KC00MDAgKiB0aGlzLmRpciwgMCwgMTAwKVxuICAgIC5yZXBlYXRGb3JldmVyKCk7XG4gICAgXG4gICAgLy8gSGFuZGxlIGJlaW5nIHN0b21wZWQgYnkgdGhlIHBsYXllclxuICAgIHRoaXMub24oJ3Bvc3Rjb2xsaXNpb24nLCB0aGlzLm9uUG9zdENvbGxpc2lvbik7XG4gIH1cbiAgXG4gIG9uUG9zdENvbGxpc2lvbihldnQ6IFBvc3RDb2xsaXNpb25FdmVudCkge1xuICAgIGlmIChldnQub3RoZXIgaW5zdGFuY2VvZiBCb3QgJiYgZXZ0LnNpZGUgPT09IFNpZGUuQm90dG9tKSB7XG4gICAgICBSZXNvdXJjZXMuZ290RW0ucGxheSguNSk7XG4gICAgICAvLyBDbGVhciBwYXRyb2xsaW5nXG4gICAgICB0aGlzLmFjdGlvbnMuY2xlYXJBY3Rpb25zKCk7XG4gICAgICAvLyBSZW1vdmUgYWJpbGl0eSB0byBjb2xsaWRlXG4gICAgICB0aGlzLmJvZHkuY29sbGlkZXIudHlwZSA9IENvbGxpc2lvblR5cGUuUHJldmVudENvbGxpc2lvbjtcbiAgICAgIFxuICAgICAgLy8gTGF1bmNoIGludG8gYWlyIHdpdGggcm90YXRpb25cbiAgICAgIHRoaXMudmVsID0gbmV3IFZlY3RvcigwLCAtMzAwKTtcbiAgICAgIHRoaXMuYWNjID0gUGh5c2ljcy5hY2M7XG4gICAgICB0aGlzLnJ4ID0gMjtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIENoYW5nZSBhbmltYXRpb24gYmFzZWQgb24gdmVsb2NpdHkgXG4gIG9uUG9zdFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy52ZWwueCA8IDApIHtcbiAgICAgIHRoaXMuc2V0RHJhd2luZyhcImxlZnRcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZlbC54ID4gMCkge1xuICAgICAgdGhpcy5zZXREcmF3aW5nKFwicmlnaHRcIik7XG4gICAgfVxuICB9ICBcbn0iLCJpbXBvcnQgeyBib3RTcHJpdGVTaGVldCwgUmVzb3VyY2VzIH0gZnJvbSBcIi4vcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBCYWRkaWUgfSBmcm9tIFwiLi9iYWRkaWVcIjtcbmltcG9ydCB7XG4gIEFjdG9yLFxuICBCb2R5LFxuICBDb2xsaWRlcixcbiAgQ29sbGlzaW9uR3JvdXBNYW5hZ2VyLFxuICBDb2xsaXNpb25UeXBlLFxuICBFbmdpbmUsXG4gIElucHV0LFxuICBQb3N0Q29sbGlzaW9uRXZlbnQsXG4gIFNoYXBlLFxuICBTaWRlLFxuICBWZWN0b3IsXG59IGZyb20gXCJleGNhbGlidXJcIjtcblxuZXhwb3J0IGNsYXNzIEJvdCBleHRlbmRzIEFjdG9yIHtcbiAgXG4gIHB1YmxpYyBpc0p1bXBpbmcgPSBmYWxzZTtcbiAgcHVibGljIGlzSnVtcEZpcnN0Q3Jvc3MgPSB0cnVlO1xuICBwdWJsaWMganVtcFkgPSAwO1xuXG4gIHB1YmxpYyBodXJ0ID0gZmFsc2U7XG4gIHB1YmxpYyBodXJ0VGltZTogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgaXNMZWZ0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBzdXBlcih7XG4gICAgICBwb3M6IG5ldyBWZWN0b3IoeCwgeSksXG4gICAgICBib2R5OiBuZXcgQm9keSh7XG4gICAgICAgIGNvbGxpZGVyOiBuZXcgQ29sbGlkZXIoe1xuICAgICAgICAgIHR5cGU6IENvbGxpc2lvblR5cGUuQWN0aXZlLFxuICAgICAgICAgIHNoYXBlOiBTaGFwZS5Cb3goMzIsIDUwKSxcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBWZWN0b3IoMCwgMyksXG4gICAgICAgICAgZ3JvdXA6IENvbGxpc2lvbkdyb3VwTWFuYWdlci5ncm91cEJ5TmFtZShcInBsYXllclwiKSxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIE9uSW5pdGlhbGl6ZSBpcyBjYWxsZWQgYmVmb3JlIHRoZSAxc3QgYWN0b3IgdXBkYXRlXG4gIG9uSW5pdGlhbGl6ZShlbmdpbmU6IEVuZ2luZSkge1xuICAgIC8vIEluaXRpYWxpemUgYWN0b3JcblxuICAgIC8vIFNldHVwIHZpc3VhbHMsIHJldHJpZXZlIGFuaW1hdGlvbnMgZnJvbSBzcHJpdGUgc2hlZXRzXG4gICAgY29uc3QgaHVydGxlZnQgPSBib3RTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoXG4gICAgICBlbmdpbmUsXG4gICAgICBbMCwgMSwgMCwgMSwgMCwgMV0sXG4gICAgICAxNTBcbiAgICApO1xuICAgIGh1cnRsZWZ0LnNjYWxlID0gbmV3IFZlY3RvcigyLCAyKTtcblxuICAgIGNvbnN0IGh1cnRyaWdodCA9IGJvdFNwcml0ZVNoZWV0LmdldEFuaW1hdGlvbkJ5SW5kaWNlcyhcbiAgICAgIGVuZ2luZSxcbiAgICAgIFswLCAxLCAwLCAxLCAwLCAxXSxcbiAgICAgIDE1MFxuICAgICk7XG4gICAgaHVydHJpZ2h0LnNjYWxlID0gbmV3IFZlY3RvcigyLCAyKTtcbiAgICBodXJ0cmlnaHQuZmxpcEhvcml6b250YWwgPSB0cnVlO1xuXG4gICAgY29uc3QgaWRsZUxlZnQgPSBib3RTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMiwgM10sIDgwMCk7XG4gICAgaWRsZUxlZnQuc2NhbGUgPSBuZXcgVmVjdG9yKDIsIDIpO1xuXG4gICAgY29uc3QgaWRsZVJpZ2h0ID0gYm90U3ByaXRlU2hlZXQuZ2V0QW5pbWF0aW9uQnlJbmRpY2VzKGVuZ2luZSwgWzIsIDNdLCA4MDApO1xuICAgIGlkbGVSaWdodC5zY2FsZSA9IG5ldyBWZWN0b3IoMiwgMik7XG4gICAgaWRsZVJpZ2h0LmZsaXBIb3Jpem9udGFsID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxlZnQgPSBib3RTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoXG4gICAgICBlbmdpbmUsXG4gICAgICBbMywgNCwgNSwgNiwgN10sXG4gICAgICAxMDBcbiAgICApO1xuICAgIGxlZnQuc2NhbGUgPSBuZXcgVmVjdG9yKDIsIDIpO1xuXG4gICAgY29uc3QgcmlnaHQgPSBib3RTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoXG4gICAgICBlbmdpbmUsXG4gICAgICBbMywgNCwgNSwgNiwgN10sXG4gICAgICAxMDBcbiAgICApO1xuICAgIHJpZ2h0LnNjYWxlID0gbmV3IFZlY3RvcigyLCAyKTtcbiAgICByaWdodC5mbGlwSG9yaXpvbnRhbCA9IHRydWU7XG5cbiAgICAvLyBSZWdpc3RlciBhbmltYXRpb25zIHdpdGggYWN0b3JcbiAgICB0aGlzLmFkZERyYXdpbmcoXCJodXJ0bGVmdFwiLCBodXJ0bGVmdCk7XG4gICAgdGhpcy5hZGREcmF3aW5nKFwiaHVydHJpZ2h0XCIsIGh1cnRyaWdodCk7XG4gICAgdGhpcy5hZGREcmF3aW5nKFwiaWRsZUxlZnRcIiwgaWRsZUxlZnQpO1xuICAgIHRoaXMuYWRkRHJhd2luZyhcImlkbGVSaWdodFwiLCBpZGxlUmlnaHQpO1xuICAgIHRoaXMuYWRkRHJhd2luZyhcImxlZnRcIiwgbGVmdCk7XG4gICAgdGhpcy5hZGREcmF3aW5nKFwicmlnaHRcIiwgcmlnaHQpO1xuXG4gICAgLy8gb25Qb3N0Q29sbGlzaW9uIGlzIGFuIGV2ZW50LCBub3QgYSBsaWZlY3ljbGUgbWVhbmluZyBpdCBjYW4gYmUgc3Vic2NyaWJlZCB0byBieSBvdGhlciB0aGluZ3NcbiAgICB0aGlzLm9uKFwicG9zdGNvbGxpc2lvblwiLCB0aGlzLm9uUG9zdENvbGxpc2lvbik7XG4gIH1cblxuICBvblBvc3RDb2xsaXNpb24oZXZ0OiBQb3N0Q29sbGlzaW9uRXZlbnQpIHtcbiAgICAvLyBCb3QgaGFzIGNvbGxpZGVkIHdpdGggdGhlIHRvcCBvZiBhbm90aGVyIGNvbGxpZGVyXG4gICAgaWYgKGV2dC5zaWRlID09PSBTaWRlLlRvcCkge1xuICAgICAgLy8gdGhpcy5vbkdyb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQm90IGhhcyBjb2xsaWRlZCBvbiB0aGUgc2lkZSwgZGlzcGxheSBodXJ0IGFuaW1hdGlvblxuICAgIGlmIChcbiAgICAgIChldnQuc2lkZSA9PT0gU2lkZS5MZWZ0IHx8IGV2dC5zaWRlID09PSBTaWRlLlJpZ2h0KSAmJlxuICAgICAgZXZ0Lm90aGVyIGluc3RhbmNlb2YgQmFkZGllXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy52ZWwueCA8IDAgJiYgIXRoaXMuaHVydCkge1xuICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJodXJ0bGVmdFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZlbC54ID49IDAgJiYgIXRoaXMuaHVydCkge1xuICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJodXJ0cmlnaHRcIik7XG4gICAgICB9XG4gICAgICB0aGlzLmh1cnQgPSB0cnVlO1xuICAgICAgdGhpcy5odXJ0VGltZSA9IDEwMDA7XG4gICAgICBSZXNvdXJjZXMuaGl0LnBsYXkoMC4xKTtcbiAgICB9XG4gIH1cblxuICBnZXRNb3ZlRGlyKGVuZ2luZTogRW5naW5lKSB7XG4gICAgY29uc3QgdmVjID0gbmV3IFZlY3RvcigwLCAwKTtcblxuICAgIGlmIChlbmdpbmUuaW5wdXQua2V5Ym9hcmQuaXNIZWxkKElucHV0LktleXMuTGVmdCkpIHtcbiAgICAgIHZlYy54ID0gLTE7XG4gICAgfVxuXG4gICAgaWYgKGVuZ2luZS5pbnB1dC5rZXlib2FyZC5pc0hlbGQoSW5wdXQuS2V5cy5SaWdodCkpIHtcbiAgICAgIHZlYy54ID0gMTtcbiAgICB9XG5cbiAgICBpZiAoZW5naW5lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLlVwKSkge1xuICAgICAgdmVjLnkgPSAtMTtcbiAgICB9XG5cbiAgICBpZiAoZW5naW5lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLkRvd24pKSB7XG4gICAgICB2ZWMueSA9IDE7XG4gICAgfVxuXG4gICAgdmVjLm5vcm1hbGl6ZSgpO1xuXG4gICAgcmV0dXJuIHZlYztcbiAgfVxuXG4gIC8vIEFmdGVyIG1haW4gdXBkYXRlLCBvbmNlIHBlciBmcmFtZSBleGVjdXRlIHRoaXMgY29kZVxuICBvblByZVVwZGF0ZShlbmdpbmU6IEVuZ2luZSwgZGVsdGE6IG51bWJlcikge1xuICAgIC8vIElmIGh1cnQsIGNvdW50IGRvd25cbiAgICBpZiAodGhpcy5odXJ0VGltZSA+PSAwICYmIHRoaXMuaHVydCkge1xuICAgICAgdGhpcy5odXJ0VGltZSAtPSBkZWx0YTtcbiAgICAgIGlmICh0aGlzLmh1cnRUaW1lIDwgMCkge1xuICAgICAgICB0aGlzLmh1cnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3MueSAtIHRoaXMuanVtcFkgPj0gMC4wMDAwMDAwMDAwMSAmJiB0aGlzLmlzSnVtcGluZykge1xuICAgICAgdGhpcy5pc0p1bXBpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLmp1bXBZO1xuICAgICAgdGhpcy5hY2MgPSBWZWN0b3IuWmVybztcbiAgICB9XG5cbiAgICBjb25zdCBtb3ZlRGlyID0gdGhpcy5nZXRNb3ZlRGlyKGVuZ2luZSk7XG4gICAgbW92ZURpci5zY2FsZUVxdWFsKDE1MCk7XG5cbiAgICBpZiAodGhpcy5pc0p1bXBpbmcpIHtcbiAgICAgIG1vdmVEaXIuc2NhbGVFcXVhbCgwLjUpO1xuICAgICAgbW92ZURpci55ID0gdGhpcy52ZWwueTtcbiAgICB9XG5cbiAgICB0aGlzLnZlbCA9IG1vdmVEaXI7XG5cbiAgICBpZiAoZW5naW5lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLlNwYWNlKSAmJiAhdGhpcy5pc0p1bXBpbmcpIHtcbiAgICAgIHRoaXMudmVsLnkgPSAtMzAwO1xuICAgICAgdGhpcy5hY2MgPSBuZXcgVmVjdG9yKDAsIDk4MCk7XG4gICAgICB0aGlzLmlzSnVtcGluZyA9IHRydWU7XG4gICAgICB0aGlzLmp1bXBZID0gdGhpcy5wb3MueTtcbiAgICAgIHRoaXMuaXNKdW1wRmlyc3RDcm9zcyA9IHRydWU7XG4gICAgICBSZXNvdXJjZXMuanVtcC5wbGF5KDEuMCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmVsLnggPCAwKSB7XG4gICAgICB0aGlzLmlzTGVmdCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMudmVsLnggPiAwKSB7XG4gICAgICB0aGlzLmlzTGVmdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5odXJ0KSB7XG4gICAgICBpZiAodGhpcy5pc0xlZnQpIHtcbiAgICAgICAgdGhpcy5zZXREcmF3aW5nKFwibGVmdFwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJyaWdodFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZlbC54ID09PSAwICkge1xuICAgICAgICBpZiAodGhpcy5pc0xlZnQpIHtcbiAgICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJpZGxlTGVmdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJpZGxlUmlnaHRcIik7XG4gICAgICAgIH0gXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBY3RvcixcbiAgVmVjdG9yLFxuICBCb2R5LFxuICBDb2xsaWRlcixcbiAgQ29sbGlzaW9uVHlwZSxcbiAgU2hhcGUsXG4gIENvbGxpc2lvbkdyb3VwTWFuYWdlcixcbiAgU3ByaXRlLFxufSBmcm9tIFwiZXhjYWxpYnVyXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21JbmRleCwgZ2V0UmFuZG9tU3ByaXRlLCBpbmRleEJ5Q29sUm93IH0gZnJvbSBcIi4uL2NvbW1vbi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBncmFzc1Nwcml0ZVNoZWV0IH0gZnJvbSBcIi4uL3Jlc291cmNlc1wiO1xuXG5jb25zdCBpZHggPSBpbmRleEJ5Q29sUm93KGdyYXNzU3ByaXRlU2hlZXQuY29sdW1ucyk7XG5cbmV4cG9ydCBjbGFzcyBCcmljayBleHRlbmRzIEFjdG9yIHtcbiAgaW5kaWNpZXM6bnVtYmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgcHVibGljIGNvbHM6IG51bWJlciwgcHVibGljIHJvd3M6IG51bWJlcikge1xuICAgIHN1cGVyKHtcbiAgICAgIHBvczogbmV3IFZlY3Rvcih4LCB5KSxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yKDIsIDIpLFxuICAgICAgYW5jaG9yOiBWZWN0b3IuWmVybyxcbiAgICAgIGJvZHk6IG5ldyBCb2R5KHtcbiAgICAgICAgY29sbGlkZXI6IG5ldyBDb2xsaWRlcih7XG4gICAgICAgICAgdHlwZTogQ29sbGlzaW9uVHlwZS5QcmV2ZW50Q29sbGlzaW9uLFxuICAgICAgICAgIHNoYXBlOiBTaGFwZS5Cb3goXG4gICAgICAgICAgICBncmFzc1Nwcml0ZVNoZWV0LnNwV2lkdGggKiBjb2xzLFxuICAgICAgICAgICAgZ3Jhc3NTcHJpdGVTaGVldC5zcEhlaWdodCAqIHJvd3MsXG4gICAgICAgICAgICBWZWN0b3IuWmVyb1xuICAgICAgICAgICksXG4gICAgICAgICAgZ3JvdXA6IENvbGxpc2lvbkdyb3VwTWFuYWdlci5ncm91cEJ5TmFtZShcImZsb29yXCIpLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHM7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnJvd3M7IGorKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGdldFJhbmRvbVNwcml0ZSgwLCA3LCAwLCA3KTtcbiAgICAgICAgdGhpcy5pbmRpY2llcy5wdXNoKGluZGV4KTtcbiAgICAgIH0gIFxuICAgIH1cbiAgfVxuICBcbiAgLy8gQ3VzdG9tIGRyYXcgaW4gY3VycmVudCBhY3RvciB0cmFuc2Zvcm1cbiAgb25Qb3N0RHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgZ3Jhc3NTcHJpdGVTaGVldC5jb2x1bW5zOyArK2kpIHtcbiAgICAvLyAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3Jhc3NTcHJpdGVTaGVldC5yb3dzOyArK2opIHtcbiAgICAvLyAgICAgY29uc3QgaW5kZXggPSBpZHgoaSwgaik7XG4gICAgLy8gICAgIGdyYXNzU3ByaXRlU2hlZXQuZ2V0U3ByaXRlKGluZGV4KS5kcmF3KFxuICAgIC8vICAgICAgIGN0eCxcbiAgICAvLyAgICAgICBpICogZ3Jhc3NTcHJpdGVTaGVldC5zcFdpZHRoLFxuICAgIC8vICAgICAgIGogKiBncmFzc1Nwcml0ZVNoZWV0LnNwSGVpZ2h0XG4gICAgLy8gICAgICk7XG5cbiAgICAvLyAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgXG4gICAgLy8gICAgIGN0eC5mb250ID0gJzVweCBBcmlhbCc7XG4gICAgLy8gICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDAsMC45KSc7XG4gICAgLy8gICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuMyknO1xuXG4gICAgLy8gICAgIGN0eC5maWxsVGV4dChcbiAgICAvLyAgICAgICBgJHtpfSwgJHtqfWAsXG4gICAgLy8gICAgICAgKGkrMC4zKSAqIGdyYXNzU3ByaXRlU2hlZXQuc3BXaWR0aCxcbiAgICAvLyAgICAgICAoaiswLjUpICogZ3Jhc3NTcHJpdGVTaGVldC5zcEhlaWdodCxcbiAgICAvLyAgICAgKTtcblxuICAgIC8vICAgICBjdHguc3Ryb2tlUmVjdChcbiAgICAvLyAgICAgICBpICogZ3Jhc3NTcHJpdGVTaGVldC5zcFdpZHRoLFxuICAgIC8vICAgICAgIGogKiBncmFzc1Nwcml0ZVNoZWV0LnNwSGVpZ2h0LFxuICAgIC8vICAgICAgIGdyYXNzU3ByaXRlU2hlZXQuc3BXaWR0aCxcbiAgICAvLyAgICAgICBncmFzc1Nwcml0ZVNoZWV0LnNwSGVpZ2h0XG4gICAgLy8gICAgICk7XG5cbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9IFxuXG4gICAgLy8gcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHM7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnJvd3M7IGorKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kaWNpZXNbaWR4KGksIGopXTtcbiAgICAgICAgZ3Jhc3NTcHJpdGVTaGVldC5nZXRTcHJpdGUoaW5kZXgpLmRyYXcoXG4gICAgICAgICAgY3R4LFxuICAgICAgICAgIGkgKiBncmFzc1Nwcml0ZVNoZWV0LnNwV2lkdGgsXG4gICAgICAgICAgaiAqIGdyYXNzU3ByaXRlU2hlZXQuc3BIZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0gIFxuICAgIH1cbiAgfVxufSAgIiwiZXhwb3J0IGNvbnN0IGluZGV4QnlDb2xSb3cgPSAoY29sczpudW1iZXIpID0+IChcbiAgICAoY29sOm51bWJlciwgcm93Om51bWJlcik6IG51bWJlciA9PiAoY29scyAqIHJvdyArIGNvbClcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbmRleCA9IChsZW5ndGg6IG51bWJlcikgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmxlbmd0aCk7XG5cbmV4cG9ydCBjb25zdCBnZXRSYW5kb21TcHJpdGUgPSAobWluQ29sOiBudW1iZXIsIG1heENvbDogbnVtYmVyLCBtaW5Sb3c6IG51bWJlciwgbWF4Um93OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4Q29sIC0gbWluQ29sKSkgKyBtaW5Db2w7XG4gICAgY29uc3QgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFJvdyAtIG1pblJvdykpICsgbWluUm93O1xuXG4gICAgcmV0dXJuIHJhbmRvbVJvdyAqIChtYXhDb2wgLSBtaW5Db2wpICsgcmFuZG9tQ29sO1xufTsiLCJpbXBvcnQgKiBhcyBleCBmcm9tICdleGNhbGlidXInO1xuaW1wb3J0IHsgYmxvY2tTcHJpdGUgfSBmcm9tICcuL3Jlc291cmNlcyc7XG5cbmV4cG9ydCBjbGFzcyBGbG9vciBleHRlbmRzIGV4LkFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgcHVibGljIGNvbHM6IG51bWJlciwgcHVibGljIHJvd3M6IG51bWJlcikge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBwb3M6IG5ldyBleC5WZWN0b3IoeCwgeSksXG4gICAgICAgICAgICBzY2FsZTogbmV3IGV4LlZlY3RvcigyLCAyKSxcbiAgICAgICAgICAgIGFuY2hvcjogZXguVmVjdG9yLlplcm8sXG4gICAgICAgICAgICBib2R5OiBuZXcgZXguQm9keSh7XG4gICAgICAgICAgICAgICAgY29sbGlkZXI6IG5ldyBleC5Db2xsaWRlcih7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV4LkNvbGxpc2lvblR5cGUuRml4ZWQsXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiBleC5TaGFwZS5Cb3goMjAgKiBjb2xzLCAxNSAqIHJvd3MsIGV4LlZlY3Rvci5aZXJvKSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGV4LkNvbGxpc2lvbkdyb3VwTWFuYWdlci5ncm91cEJ5TmFtZShcImZsb29yXCIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEN1c3RvbSBkcmF3IGluIGN1cnJlbnQgYWN0b3IgdHJhbnNmb3JtXG4gICAgb25Qb3N0RHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sczsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93czsgaisrKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tTcHJpdGUuZHJhdyhjdHgsIGkgKiBibG9ja1Nwcml0ZS5kcmF3V2lkdGgsIGogKiBibG9ja1Nwcml0ZS5kcmF3SGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBsb2FkZXIgfSBmcm9tICcuL3Jlc291cmNlcyc7XG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gJy4vbGV2ZWwnO1xuaW1wb3J0IHsgQ29sb3IsIERpc3BsYXlNb2RlLCBFbmdpbmUsIFBoeXNpY3MsIFZlY3RvciB9IGZyb20gJ2V4Y2FsaWJ1cic7XG5cbmNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoe1xuICBiYWNrZ3JvdW5kQ29sb3I6IENvbG9yLmZyb21IZXgoJyMwMDAwMDAnKSxcbiAgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlLkZ1bGxTY3JlZW4sXG59KTtcblxuLy8gVHVybiBvZmYgYW50aS1hbGlhc2luZyBmb3IgcGl4ZWwgYXJ0IGdyYXBoaWNzXG5lbmdpbmUuc2V0QW50aWFsaWFzaW5nKGZhbHNlKTtcblxuLy8gU2V0IGdsb2JhbCBncmF2aXR5LCA4MDAgcGl4ZWxzL3NlY14yXG4vLyBQaHlzaWNzLmFjYyA9IG5ldyBWZWN0b3IoMCwgOTgxKTtcblxuLy8gU2V0dXAgZmlyc3QgbGV2ZWwgYXMgYSBjdXN0b20gc2NlbmVcbmVuZ2luZS5hZGQoJ2xldmVsJywgbmV3IExldmVsKGVuZ2luZSkpO1xuZW5naW5lLmdvVG9TY2VuZSgnbGV2ZWwnKTtcblxuLy8gR2FtZSBldmVudHMgdG8gaGFuZGxlXG4vLyBlbmdpbmUub24oJ2hpZGRlbicsICgpID0+IHtcbi8vICAgY29uc29sZS5sb2coJ3BhdXNlJyk7XG4vLyAgIGVuZ2luZS5zdG9wKCk7XG4vLyB9KTtcbmVuZ2luZS5vbigndmlzaWJsZScsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XG4gIGVuZ2luZS5zdGFydCgpO1xufSk7XG5cbi8vIFN0YXJ0IHRoZSBlbmdpbmVcbmVuZ2luZS5zdGFydChsb2FkZXIpLnRoZW4oKCkgPT4ge1xuICBjb25zb2xlLmxvZygnZ2FtZSBzdGFydCcpO1xufSk7IiwiaW1wb3J0IHsgQ29sbGlzaW9uR3JvdXBNYW5hZ2VyLCBDb2xvciwgRW5naW5lLCBTY2VuZSB9IGZyb20gJ2V4Y2FsaWJ1cic7XG5pbXBvcnQgeyBCYWRkaWUgfSBmcm9tICcuL2JhZGRpZSc7XG5pbXBvcnQgeyBCb3QgfSBmcm9tICcuL2JvdCc7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gJy4vY2l0eS9Ccmljayc7XG5pbXBvcnQgeyBGbG9vciB9IGZyb20gJy4vZmxvb3InO1xuaW1wb3J0IHsgTlBDIH0gZnJvbSAnLi9ucGMnO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwgZXh0ZW5kcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lKSB7XG4gICAgc3VwZXIoZW5naW5lKTtcbiAgfVxuXG4gIG9uSW5pdGlhbGl6ZShlbmdpbmU6IEVuZ2luZSkge1xuXG4gICAgZW5naW5lLmJhY2tncm91bmRDb2xvciA9IENvbG9yLkdyYXk7XG5cbiAgICAvLyBDcmVhdGUgY29sbGlzaW9uIGdyb3VwcyBmb3IgdGhlIGdhbWVcbiAgICBDb2xsaXNpb25Hcm91cE1hbmFnZXIuY3JlYXRlKFwicGxheWVyXCIpO1xuICAgIENvbGxpc2lvbkdyb3VwTWFuYWdlci5jcmVhdGUoXCJlbmVteVwiKTtcbiAgICBDb2xsaXNpb25Hcm91cE1hbmFnZXIuY3JlYXRlKFwiZmxvb3JcIik7XG5cbiAgICAvLyBDb21wb3NlIGFjdG9ycyBpbiBzY2VuZVxuICAgIGNvbnN0IGFjdG9yID0gbmV3IEJvdCggKyAxMDAsIDEyMCk7XG5cbiAgICBjb25zdCBiYWRkaWUgPSBuZXcgQmFkZGllKCArIDIwMCwgMzAwIC0gMzAsIDEpO1xuICAgIGNvbnN0IGJhZGRpZTIgPSBuZXcgQmFkZGllKCArIDEwMCwgMzAwIC0gMzAsIC0xKTtcblxuICAgIGNvbnN0IG5wYyA9IG5ldyBOUEMoNDAwLCAxNzApO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ3Jhc3MgPSBuZXcgQnJpY2soKGkgLSA0KSAqIDMyMCwgKGogLSA0KSAqIDMyMCwgMTAsIDEwKTtcbiAgICAgICAgXG4gICAgICAgIGVuZ2luZS5hZGQoZ3Jhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBvdGhlckZsb29yID0gbmV3IEZsb29yKCArIDUwLCAyMDAsIDEsIDEwKTtcblxuICAgIGVuZ2luZS5hZGQoYWN0b3IpO1xuICAgIGVuZ2luZS5hZGQobnBjKTtcbiAgICBlbmdpbmUuYWRkKGJhZGRpZSk7XG4gICAgZW5naW5lLmFkZChiYWRkaWUyKTtcbiAgICBlbmdpbmUuYWRkKG90aGVyRmxvb3IpO1xuXG4gICAgLy8gQ3JlYXRlIGNhbWVyYSBzdHJhdGVneVxuICAgIHRoaXMuY2FtZXJhLmNsZWFyQWxsU3RyYXRlZ2llcygpO1xuICAgIHRoaXMuY2FtZXJhLnN0cmF0ZWd5LmVsYXN0aWNUb0FjdG9yKGFjdG9yLCAwLjA1LCAwLjA1KTtcbiAgICB0aGlzLmNhbWVyYS56b29tKDEuNSk7XG4gIH1cbn0iLCJpbXBvcnQgKiBhcyBleCBmcm9tICdleGNhbGlidXInO1xuaW1wb3J0IHsgYm90UmVkU3ByaXRlU2hlZXQsIFJlc291cmNlcywgbnBjU3ByaXRlIH0gZnJvbSAnLi9yZXNvdXJjZXMnO1xuXG5leHBvcnQgY2xhc3MgTlBDIGV4dGVuZHMgZXguQWN0b3Ige1xuICAgIHB1YmxpYyBvbkdyb3VuZCA9IHRydWU7XG4gICAgcHVibGljIGh1cnQgPSBmYWxzZTtcbiAgICBwdWJsaWMgaHVydFRpbWU6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgcG9zOiBuZXcgZXguVmVjdG9yKHgsIHkpLFxuICAgICAgICAgICAgYm9keTogbmV3IGV4LkJvZHkoe1xuICAgICAgICAgICAgICAgIGNvbGxpZGVyOiBuZXcgZXguQ29sbGlkZXIoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBleC5Db2xsaXNpb25UeXBlLkFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IGV4LlNoYXBlLkJveCgzMiwgNTApLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBleC5WZWN0b3IoMCwgMyksXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBleC5Db2xsaXNpb25Hcm91cE1hbmFnZXIuZ3JvdXBCeU5hbWUoXCJwbGF5ZXJcIilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT25Jbml0aWFsaXplIGlzIGNhbGxlZCBiZWZvcmUgdGhlIDFzdCBhY3RvciB1cGRhdGVcbiAgICBvbkluaXRpYWxpemUoZW5naW5lOiBleC5FbmdpbmUpIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhY3RvclxuXG4gICAgICAgIC8vIFNldCB0aGUgei1pbmRleCB0byBiZSBiZWhpbmQgZXZlcnl0aGluZ1xuICAgICAgICB0aGlzLnogPSAtMTtcblxuICAgICAgICAvLyBTZXR1cCB2aXN1YWxzXG4gICAgICAgIGNvbnN0IGh1cnRsZWZ0ID0gYm90UmVkU3ByaXRlU2hlZXQuZ2V0QW5pbWF0aW9uQnlJbmRpY2VzKGVuZ2luZSwgWzAsIDEsIDAsIDEsIDAsIDFdLCAxNTApO1xuICAgICAgICBodXJ0bGVmdC5zY2FsZSA9IG5ldyBleC5WZWN0b3IoMiwgMik7XG5cbiAgICAgICAgY29uc3QgaHVydHJpZ2h0ID0gYm90UmVkU3ByaXRlU2hlZXQuZ2V0QW5pbWF0aW9uQnlJbmRpY2VzKGVuZ2luZSwgWzAsIDEsIDAsIDEsIDAsIDFdLCAxNTApO1xuICAgICAgICBodXJ0cmlnaHQuc2NhbGUgPSBuZXcgZXguVmVjdG9yKDIsIDIpO1xuICAgICAgICBodXJ0cmlnaHQuZmxpcEhvcml6b250YWwgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGlkbGUgPSBib3RSZWRTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMiwgM10sIDgwMCk7XG4gICAgICAgIGlkbGUuc2NhbGUgPSBuZXcgZXguVmVjdG9yKDIsIDIpO1xuXG4gICAgICAgIGNvbnN0IGxlZnQgPSBib3RSZWRTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMywgNCwgNSwgNiwgN10sIDEwMCk7XG4gICAgICAgIGxlZnQuc2NhbGUgPSBuZXcgZXguVmVjdG9yKDIsIDIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcmlnaHQgPSBib3RSZWRTcHJpdGVTaGVldC5nZXRBbmltYXRpb25CeUluZGljZXMoZW5naW5lLCBbMywgNCwgNSwgNiwgN10sIDEwMCk7XG4gICAgICAgIHJpZ2h0LnNjYWxlID0gbmV3IGV4LlZlY3RvcigyLCAyKTtcbiAgICAgICAgcmlnaHQuZmxpcEhvcml6b250YWwgPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIGRyYXdpbmdzXG4gICAgICAgIHRoaXMuYWRkRHJhd2luZyhcImh1cnRsZWZ0XCIsIGh1cnRsZWZ0KTtcbiAgICAgICAgdGhpcy5hZGREcmF3aW5nKFwiaHVydHJpZ2h0XCIsIGh1cnRyaWdodCk7XG4gICAgICAgIHRoaXMuYWRkRHJhd2luZyhcImlkbGVcIiwgaWRsZSk7XG4gICAgICAgIHRoaXMuYWRkRHJhd2luZyhcImxlZnRcIiwgbGVmdCk7XG4gICAgICAgIHRoaXMuYWRkRHJhd2luZyhcInJpZ2h0XCIsIHJpZ2h0KTtcblxuICAgICAgIC8vIFNldHVwIHBhdHJvbGluZyBiZWhhdmlvclxuICAgICAgIHRoaXMuYWN0aW9ucy5tb3ZlQnkoMTAwLCAwLCAyMClcbiAgICAgICAgICAgICAgICAgICAubW92ZUJ5KC0xMDAsIDAsIDIwKVxuICAgICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKCk7XG5cbiAgICB9XG5cbiAgICBvblBvc3RVcGRhdGUoZW5naW5lOiBleC5FbmdpbmUsIGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudmVsLnggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldERyYXdpbmcoXCJsZWZ0XCIpO1xuICAgICAgICB9IFxuICAgICAgICBpZiAodGhpcy52ZWwueCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RHJhd2luZyhcInJpZ2h0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZlbC54ID09PSAwKXtcbiAgICAgICAgICAgIHRoaXMuc2V0RHJhd2luZyhcImlkbGVcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEN1c3RvbSBkcmF3IGFmdGVyIGxvY2FsIHRyYW5mb3JtLCBkcmF3cyB3b3JkIGJ1YmJsZVxuICAgIG9uUG9zdERyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgbnBjU3ByaXRlLmRyYXcoY3R4LCAtMTAsIC0xMDApO1xuICAgIH1cbn0iLCJpbXBvcnQge0xvYWRlciwgU291bmQsIFNwcml0ZVNoZWV0LCBUZXh0dXJlfSBmcm9tICdleGNhbGlidXInO1xuXG5pbXBvcnQgYm90RmlsZSBmcm9tICcuLi9yZXMvZXhjYWxpYm90LnBuZyc7XG5pbXBvcnQgYm90UmVkRmlsZSBmcm9tICcuLi9yZXMvZXhjYWxpYm90LXJlZC5wbmcnO1xuaW1wb3J0IGJhZGRpZUZpbGUgZnJvbSAnLi4vcmVzL2JhZGRpZS5wbmcnO1xuaW1wb3J0IGJsb2NrRmlsZSBmcm9tICcuLi9yZXMvYmxvY2sucG5nJztcbmltcG9ydCBucGNGaWxlIGZyb20gJy4uL3Jlcy9ucGMucG5nJztcbmltcG9ydCBqdW1wU291bmQgZnJvbSAnLi4vcmVzL2p1bXAud2F2JztcbmltcG9ydCBoaXRTb3VuZCBmcm9tICcuLi9yZXMvaHVydC53YXYnO1xuaW1wb3J0IGdvdEVtU291bmQgZnJvbSAnLi4vcmVzL2dvdHRlbS53YXYnO1xuXG5pbXBvcnQgZ3Jhc3NGaWxlIGZyb20gJy4uL3Jlcy9UWCBUaWxlc2V0IEdyYXNzLnBuZyc7XG5cbmNvbnN0IFJlc291cmNlcyA9IHtcbiAgICBib3Q6IG5ldyBUZXh0dXJlKGJvdEZpbGUpLFxuICAgIGJvdFJlZDogbmV3IFRleHR1cmUoYm90UmVkRmlsZSksXG4gICAgYmFkZGllOiBuZXcgVGV4dHVyZShiYWRkaWVGaWxlKSxcbiAgICBibG9jazogbmV3IFRleHR1cmUoYmxvY2tGaWxlKSxcbiAgICBucGM6IG5ldyBUZXh0dXJlKG5wY0ZpbGUpLFxuICAgIGp1bXA6IG5ldyBTb3VuZChqdW1wU291bmQpLFxuICAgIGhpdDogbmV3IFNvdW5kKGhpdFNvdW5kKSxcbiAgICBnb3RFbTogbmV3IFNvdW5kKGdvdEVtU291bmQpLFxuICAgIFxuICAgIGdyYXNzOiBuZXcgVGV4dHVyZShncmFzc0ZpbGUpLFxufVxuXG5jb25zdCBsb2FkZXIgPSBuZXcgTG9hZGVyKCk7XG5cbmNvbnN0IGJvdFNwcml0ZVNoZWV0ID0gbmV3IFNwcml0ZVNoZWV0KFJlc291cmNlcy5ib3QsIDgsIDEsIDMyLCAzMik7XG5jb25zdCBib3RSZWRTcHJpdGVTaGVldCA9IG5ldyBTcHJpdGVTaGVldChSZXNvdXJjZXMuYm90UmVkLCA4LCAxLCAzMiwgMzIpO1xuY29uc3QgYmFkZGllU3ByaXRlU2hlZXQgPSBuZXcgU3ByaXRlU2hlZXQoUmVzb3VyY2VzLmJhZGRpZSwgNiwgMSwgMzIsIDMyKTtcbmNvbnN0IGJsb2NrU3ByaXRlID0gUmVzb3VyY2VzLmJsb2NrLmFzU3ByaXRlKCk7XG5jb25zdCBucGNTcHJpdGUgPSBSZXNvdXJjZXMubnBjLmFzU3ByaXRlKCk7XG5cbmNvbnN0IGdyYXNzU3ByaXRlU2hlZXQgPSBuZXcgU3ByaXRlU2hlZXQoUmVzb3VyY2VzLmdyYXNzLCA4LCA4LCAzMiwgMzIpO1xuLy8gY29uc3QgZm9udCA9IG5ldyBGb250KFJlc291cmNlcy5mb250KTtcblxuZm9yIChjb25zdCByZXMgaW4gUmVzb3VyY2VzKSB7XG4gICAgbG9hZGVyLmFkZFJlc291cmNlKChSZXNvdXJjZXMgYXMgYW55KVtyZXNdKTtcbn1cblxuZXhwb3J0IHtcbiAgICBSZXNvdXJjZXMsXG4gICAgbG9hZGVyLFxuICAgIGJvdFNwcml0ZVNoZWV0LFxuICAgIGJvdFJlZFNwcml0ZVNoZWV0LFxuICAgIGJhZGRpZVNwcml0ZVNoZWV0LFxuICAgIGJsb2NrU3ByaXRlLFxuICAgIG5wY1Nwcml0ZSxcbiAgICBncmFzc1Nwcml0ZVNoZWV0LFxuICAgIC8vIGZvbnQsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleGNhbGlidXJfd2VicGFja1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleGNhbGlidXJfd2VicGFja1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfZXhjYWxpYnVyX2Rpc3RfZXhjYWxpYnVyX21pbl9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==