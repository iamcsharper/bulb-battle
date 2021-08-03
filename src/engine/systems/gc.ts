import {ISystemActions, ReadEntity, Query, System, WithTag} from "sim-ecs";
import { PhysicsBridge } from "../components/physics-bridge";
import { ECommonTags } from "../models/common-tags";
import { CommonStore } from "../models/common-store";

export class GcSystem extends System {
    readonly query = new Query({
        entity: ReadEntity(),
        _del: WithTag(ECommonTags.destroyEntity),
    });

    physWorld!: Box2D.b2World;

    setup(actions: ISystemActions) {
        const {
            physicsNamespace: {
                b2World
            }
        } = actions.getResource(CommonStore);
        this.physWorld = actions.getResource(b2World);
    }

    run(actions: ISystemActions) {
        this.query.execute(({entity}) => {
            const phys = entity.getComponent(PhysicsBridge);

            if (phys && phys.bodyPtr) {
                this.physWorld.DestroyBody(phys.bodyPtr);
            }

            actions.commands.removeEntity(entity);
        });

        actions.commands.maintain();
    }
}
