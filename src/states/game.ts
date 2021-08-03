import {ITransitionActions, Query, SerialFormat, State, TGroupHandle, With, WithTag} from "sim-ecs";
import { load } from "../app/persistence";
import { PhysicsSystem, CollisionSystem, InputSystem, CameraSystem, GcSystem, CommonStore, Shape, Position, PhysicsBridge, ShapePrimitive } from "../engine";
import { GameStore } from "../models/game-store";
import { gamePrefab } from "../prefabs/game";
import { savablePrefab } from "../prefabs/savable";
import { ActionsSystem } from "../systems/actions";
import { CharacterSystem } from "../systems/character";
import { PauseSystem } from "../systems/pause";
import { RenderGameSystem } from "../systems/render-game";
import { RenderUISystem } from "../systems/render-ui";

export class GameState extends State {
    _systems = [
        PhysicsSystem,
        CharacterSystem,
        CollisionSystem,
        InputSystem,
        CameraSystem,
        PauseSystem,
        RenderGameSystem,
        RenderUISystem,
        GcSystem,
        ActionsSystem,
    ];
    saveDataPrefabHandle?: TGroupHandle;
    staticDataPrefabHandle?: TGroupHandle;

    gameStore!: GameStore;
    commonStore!: CommonStore;

    activate(actions: ITransitionActions) {
        actions.getResource(GameStore).currentState = this;
    }

    async create(actions: ITransitionActions) {
        this.commonStore = actions.getResource(CommonStore);
        this.gameStore = actions.getResource(GameStore)

        this.staticDataPrefabHandle = createNewGame(actions);

        if (this.gameStore.continue) {
            this.saveDataPrefabHandle = load(actions);
        } else {
            this.saveDataPrefabHandle = createGameFromSaveData(actions);
        }

        await actions.flushCommands();

        for (const entity of actions.getEntities(new Query([
            With(Shape)
        ]))) {
            entity.getComponent(Shape)?.build();
        }

        // init PhysicsBridge to real physics
        const {
            b2World,
            b2CircleShape,
            b2Shape,
            b2PolygonShape,
            b2BodyDef,
            b2_dynamicBody,
            b2Vec2,
            destroy,
        } = this.commonStore.physicsNamespace;

        const physWorld = actions.getResource(b2World);

        const zero = this.commonStore.physicsZero;

        let physShape: Box2D.b2Shape | null = null;

        for (const entity of actions.getEntities(new Query([
            With(Shape),
            With(Position),
            With(PhysicsBridge)
        ]))) {
            const pos = entity.getComponent(Position)!;
            const shape = entity.getComponent(Shape)!;
            const physicsBridge = entity.getComponent(PhysicsBridge)!;

            console.log('Adding to physics world:', pos, shape);

            const vec = new b2Vec2(pos.x, pos.y);
            const bd = new b2BodyDef();
            
            const {w, h} = shape.getBBox();

            if (shape.primitive === ShapePrimitive.Rect) {
                const _shape = new b2PolygonShape();
                _shape.SetAsBox(w, h);
                physShape = _shape;
            } 
            else if (shape.primitive === ShapePrimitive.Circle) {
                const _shape = new b2CircleShape();
                _shape.set_m_radius(shape.dimensions.x / 2);
                physShape = _shape;
            } else {
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
                // TODO: control via physics system?
                body.SetAwake(true);
                body.SetEnabled(true);

                physicsBridge.bodyPtr = body;
            }
        }

        // actions.commands.queueCommand(() => setScoreCaptionMod(actions));
        actions.commands.maintain();
    }

    destroy(actions: ITransitionActions) {
        if (this.staticDataPrefabHandle) {
            actions.commands.unloadPrefab(this.staticDataPrefabHandle);
        }

        if (this.saveDataPrefabHandle) {
            actions.commands.unloadPrefab(this.saveDataPrefabHandle);
        }

        const {
            physicsNamespace: {
                b2World,
                destroy
            }
        } = this.commonStore;

        destroy(actions.getResource(b2World));

        actions.commands.maintain();
    }
}

const createNewGame = function (actions: ITransitionActions) {
    return actions.commands.load(
        SerialFormat.fromArray(gamePrefab));
};

const createGameFromSaveData = function (actions: ITransitionActions) {
    return actions.commands.load(
        SerialFormat.fromArray(savablePrefab));
};