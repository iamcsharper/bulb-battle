import {ISystemActions, Query, Read, ReadEntity, System, Write} from "sim-ecs";
import {Shape} from "../components/shape";
import {Collision} from "../components/collision";
import { Vector2D } from "../models/vector2d";

export class CollisionSystem extends System {
    readonly query = new Query({
        collision: Write(Collision),
        entity: ReadEntity(),
        position: Read(Vector2D),
        shape: Read(Shape)
    });

    run(actions: ISystemActions) {
        const rects = Array.from(this.query.iter())
        .map(({collision, entity, position, shape}) => {
            // ideally, this should be two separate steps,
            // but JS would loop twice.
            // As an optimization, I will include
            // this data change into the map() function
            collision.collisionObjects.clear();
            collision.occurred = false;

            const {
                x,y,w,h
            } = shape.getBBox();

            return {
                collisionData: collision,
                entity,
                width: w,
                height: h,
                x: position.x + x,
                y: position.y + y,
            };
        });

        // check for collision between all collision-enabled shapes
        for (let i = 0; i < rects.length; i++) {
            for (let j = 0; j < rects.length; j++) {
                if (i == j) {
                    continue;
                }

                const rect1 = rects[i];
                const rect2 = rects[j];

                // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
                if (
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y
                ) {
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
