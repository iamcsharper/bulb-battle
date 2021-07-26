import { CollisionGroupManager, Color, Engine, Scene } from 'excalibur';
import { Baddie } from './baddie';
import { Bot } from './bot';
import { Brick } from './city/Brick';
import { Floor } from './floor';
import { NPC } from './npc';

export class Level extends Scene {
  constructor(engine: Engine) {
    super(engine);
  }

  onInitialize(engine: Engine) {

    engine.backgroundColor = Color.Gray;

    // Create collision groups for the game
    CollisionGroupManager.create("player");
    CollisionGroupManager.create("enemy");
    CollisionGroupManager.create("floor");

    // Compose actors in scene
    const actor = new Bot( + 100, 120);

    const baddie = new Baddie( + 200, 300 - 30, 1);
    const baddie2 = new Baddie( + 100, 300 - 30, -1);

    const npc = new NPC(400, 170);

    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < 10; i++) {
        const grass = new Brick((i - 4) * 320, (j - 4) * 320, 10, 10);
        
        engine.add(grass);
      }
    }
    
    const otherFloor = new Floor( + 50, 200, 1, 10);

    engine.add(actor);
    engine.add(npc);
    engine.add(baddie);
    engine.add(baddie2);
    engine.add(otherFloor);

    // Create camera strategy
    this.camera.clearAllStrategies();
    this.camera.strategy.elasticToActor(actor, 0.05, 0.05);
    this.camera.zoom(1.5);
  }
}