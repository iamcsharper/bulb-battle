import {
  Actor, Vector, CollisionType,
  Collider,
  Body,
  Shape,
  CollisionGroupManager,
  Engine,
  Physics,
  PostCollisionEvent,
  Side
} from 'excalibur';
import { baddieSpriteSheet, Resources } from "./resources";
import { Bot } from './bot';

export class Baddie extends Actor {
  constructor(x: number, y: number, public dir: number) {
    super({
      pos: new Vector(x, y),
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Box(32, 50),
          offset: new Vector(0, -1),
          group: CollisionGroupManager.groupByName("enemy")
        })
      })
    });
  }
  
  // OnInitialize is called before the 1st actor update
  onInitialize(engine: Engine) {
    // Initialize actor
    
    // Setup visuals
    const left = baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
    left.scale = new Vector(2, 2);
    const right = baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
    right.scale = new Vector(2, 2);
    right.flipHorizontal = true;
    
    // Register animation
    this.addDrawing("left", left)
    this.addDrawing("right", right);
    
    
    // Setup patroling behavior
    this.actions.moveBy(400 * this.dir, 0, 100)
    .moveBy(-400 * this.dir, 0, 100)
    .repeatForever();
    
    // Handle being stomped by the player
    this.on('postcollision', this.onPostCollision);
  }
  
  onPostCollision(evt: PostCollisionEvent) {
    if (evt.other instanceof Bot && evt.side === Side.Bottom) {
      Resources.gotEm.play(.5);
      // Clear patrolling
      this.actions.clearActions();
      // Remove ability to collide
      this.body.collider.type = CollisionType.PreventCollision;
      
      // Launch into air with rotation
      this.vel = new Vector(0, -300);
      this.acc = Physics.acc;
      this.rx = 2;
    }
  }
  
  // Change animation based on velocity 
  onPostUpdate() {
    if (this.vel.x < 0) {
      this.setDrawing("left");
    } else if (this.vel.x > 0) {
      this.setDrawing("right");
    }
  }  
}