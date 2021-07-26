import {
  Actor,
  Vector,
  Body,
  Collider,
  CollisionType,
  Shape,
  CollisionGroupManager,
  Sprite,
} from "excalibur";
import { getRandomIndex, getRandomSprite, indexByColRow } from "../common/helpers";
import { grassSpriteSheet } from "../resources";

const idx = indexByColRow(grassSpriteSheet.columns);

export class Brick extends Actor {
  indicies:number[] = [];

  constructor(x: number, y: number, public cols: number, public rows: number) {
    super({
      pos: new Vector(x, y),
      scale: new Vector(2, 2),
      anchor: Vector.Zero,
      body: new Body({
        collider: new Collider({
          type: CollisionType.PreventCollision,
          shape: Shape.Box(
            grassSpriteSheet.spWidth * cols,
            grassSpriteSheet.spHeight * rows,
            Vector.Zero
          ),
          group: CollisionGroupManager.groupByName("floor"),
        }),
      }),
    });

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const index = getRandomSprite(0, 7, 0, 7);
        this.indicies.push(index);
      }  
    }
  }
  
  // Custom draw in current actor transform
  onPostDraw(ctx: CanvasRenderingContext2D) {
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

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const index = this.indicies[idx(i, j)];
        grassSpriteSheet.getSprite(index).draw(
          ctx,
          i * grassSpriteSheet.spWidth,
          j * grassSpriteSheet.spHeight
        );
      }  
    }
  }
}  