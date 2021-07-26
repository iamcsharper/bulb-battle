import { botSpriteSheet, Resources } from "./resources";
import { Baddie } from "./baddie";
import {
  Actor,
  Body,
  Collider,
  CollisionGroupManager,
  CollisionType,
  Engine,
  Input,
  PostCollisionEvent,
  Shape,
  Side,
  Vector,
} from "excalibur";

export class Bot extends Actor {
  
  public isJumping = false;
  public isJumpFirstCross = true;
  public jumpY = 0;

  public hurt = false;
  public hurtTime: number = 0;

  public isLeft = false;

  constructor(x: number, y: number) {
    super({
      pos: new Vector(x, y),
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Box(32, 50),
          offset: new Vector(0, 3),
          group: CollisionGroupManager.groupByName("player"),
        }),
      }),
    });
  }

  // OnInitialize is called before the 1st actor update
  onInitialize(engine: Engine) {
    // Initialize actor

    // Setup visuals, retrieve animations from sprite sheets
    const hurtleft = botSpriteSheet.getAnimationByIndices(
      engine,
      [0, 1, 0, 1, 0, 1],
      150
    );
    hurtleft.scale = new Vector(2, 2);

    const hurtright = botSpriteSheet.getAnimationByIndices(
      engine,
      [0, 1, 0, 1, 0, 1],
      150
    );
    hurtright.scale = new Vector(2, 2);
    hurtright.flipHorizontal = true;

    const idleLeft = botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
    idleLeft.scale = new Vector(2, 2);

    const idleRight = botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
    idleRight.scale = new Vector(2, 2);
    idleRight.flipHorizontal = true;

    const left = botSpriteSheet.getAnimationByIndices(
      engine,
      [3, 4, 5, 6, 7],
      100
    );
    left.scale = new Vector(2, 2);

    const right = botSpriteSheet.getAnimationByIndices(
      engine,
      [3, 4, 5, 6, 7],
      100
    );
    right.scale = new Vector(2, 2);
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
  }

  onPostCollision(evt: PostCollisionEvent) {
    // Bot has collided with the top of another collider
    if (evt.side === Side.Top) {
      // this.onGround = true;
    }

    // Bot has collided on the side, display hurt animation
    if (
      (evt.side === Side.Left || evt.side === Side.Right) &&
      evt.other instanceof Baddie
    ) {
      if (this.vel.x < 0 && !this.hurt) {
        this.setDrawing("hurtleft");
      }
      if (this.vel.x >= 0 && !this.hurt) {
        this.setDrawing("hurtright");
      }
      this.hurt = true;
      this.hurtTime = 1000;
      Resources.hit.play(0.1);
    }
  }

  getMoveDir(engine: Engine) {
    const vec = new Vector(0, 0);

    if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
      vec.x = -1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
      vec.x = 1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
      vec.y = -1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
      vec.y = 1;
    }

    vec.normalize();

    return vec;
  }

  // After main update, once per frame execute this code
  onPreUpdate(engine: Engine, delta: number) {
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
      this.acc = Vector.Zero;
    }

    const moveDir = this.getMoveDir(engine);
    moveDir.scaleEqual(150);

    if (this.isJumping) {
      moveDir.scaleEqual(0.5);
      moveDir.y = this.vel.y;
    }

    this.vel = moveDir;

    if (engine.input.keyboard.isHeld(Input.Keys.Space) && !this.isJumping) {
      this.vel.y = -300;
      this.acc = new Vector(0, 980);
      this.isJumping = true;
      this.jumpY = this.pos.y;
      this.isJumpFirstCross = true;
      Resources.jump.play(1.0);
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
      if (this.vel.x === 0 ) {
        if (this.isLeft) {
          this.setDrawing("idleLeft");
        }
        else {
          this.setDrawing("idleRight");
        } 
      }
    }
  }
}
