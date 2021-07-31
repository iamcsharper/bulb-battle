(()=>{"use strict";var e,t={5425:(e,t,i)=>{i.r(t)},7708:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.EActions=void 0,(i=t.EActions||(t.EActions={}))[i.Continue=0]="Continue",i[i.Exit=1]="Exit",i[i.Play=2]="Play"},5848:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.beforeFrameHandler=void 0;const s=i(370);function o(e){const t=.001*performance.now();let i=Math.floor(t),s=Math.floor(t%1*1e9);return e&&(i-=e[0],s-=e[1],s<0&&(i--,s+=1e9)),[i,s]}let n=o(),a=0;t.beforeFrameHandler=async function(e){const t=e.getResource(s.GameStore);var i;t.lastFrameDeltaTime=(i=o(n))[0]+1e-9*i[1],t.lastFrameDeltaTime>.1&&(t.lastFrameDeltaTime=.1),t.timeSinceLevelLoaded+=t.lastFrameDeltaTime,a+=t.lastFrameDeltaTime,t.medianFps=++t.ticks/a,n=o();const r=e.getResource(CanvasRenderingContext2D);r.beginPath(),r.fillStyle="#000",r.fillRect(0,0,r.canvas.width,r.canvas.height)}},1758:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.save=t.load=void 0;const s=i(895),o=i(3214),n="save";t.load=function(e){const t=localStorage.getItem(n);if(!t)throw new Error("No save available. Cannot load!");return e.commands.load(s.SerialFormat.fromJSON(t))},t.save=function(e){localStorage.setItem(n,e.save(new s.Query([s.WithTag(o.ETags.save)])).toJSON())}},8961:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Character=void 0,t.Character=class{constructor(e=""){this.name=e}}},7947:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Collision=void 0,t.Collision=class{constructor(e=!0,t=null){if(this.shapeFromVisuals=e,this.shape=t,this.collisionObjects=new Set,this.occurred=!1,!e&&!t)throw new Error("Either copy the collision shape                from visuals or provide a new one")}}},7981:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Material=void 0,t.Material=class{constructor(e){this.color=e}}},2019:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mesh=void 0,t.Mesh=class{constructor(e){this.verticies=e,this.isConvex=!0}}},7676:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Position=void 0;const s=i(7531);class o extends s.Vector2D{}t.Position=o},2591:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Rotation=void 0,t.Rotation=class{constructor(e){this.value=e}}},2958:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Shape=t.ShapePivot=t.ShapePrimitive=void 0;const s=i(2189),o=i(7531);var n,a;!function(e){e.Circle="circle",e.Rect="rect",e.Mesh="mesh"}(n=t.ShapePrimitive||(t.ShapePrimitive={})),function(e){e[e.TopLeft=0]="TopLeft",e[e.TopMiddle=1]="TopMiddle",e[e.TopRight=2]="TopRight",e[e.Left=3]="Left",e[e.Middle=4]="Middle",e[e.Right=5]="Right",e[e.BottomLeft=6]="BottomLeft",e[e.BottomMiddle=7]="BottomMiddle",e[e.BottomRight=8]="BottomRight"}(a=t.ShapePivot||(t.ShapePivot={})),t.Shape=class{constructor(e=0,t=a.Middle,i=o.vecZero,r=n.Rect,c=null){this.zIndex=e,this.pivot=t,this.dimensions=i,this.primitive=r,this.mesh=c,this.bBox=new s.Rect(0,0,0,0),this.isBuilt=!1}build(){if(!this.isBuilt){if(console.log("Building shape",this),this.primitive===n.Mesh&&!this.mesh)throw new Error("Shapes with mesh primitive                must provide a mesh data");if(this.primitive!==n.Mesh&&!this.dimensions)throw console.error("dimensions:",this.dimensions,"primitive:",this.primitive,"mesh:",this.mesh),new Error("Shapes with non-mesh primitive                must provide dimensions");if(this.primitive===n.Circle){const e=this.dimensions.x,t=e/2;this.bBox.x=-t,this.bBox.y=-t,this.bBox.w=e,this.bBox.h=e}else if(this.primitive===n.Rect)this.bBox.x=0,this.bBox.y=0,this.bBox.w=this.dimensions.x,this.bBox.h=this.dimensions.y;else if(this.primitive===n.Mesh&&this.mesh){let e=this.mesh.verticies[0].x,t=this.mesh.verticies[0].y,i=this.mesh.verticies[0].x,s=this.mesh.verticies[0].y;for(let o=1;o<this.mesh.verticies.length;++o){const{x:n,y:a}=this.mesh.verticies[o];n<e&&(e=n),n>i&&(i=n),a<t&&(t=a),a>s&&(s=a)}this.bBox.x=e,this.bBox.y=t,this.bBox.w=i-e,this.bBox.h=s-t}this.isBuilt=!0}}getBBox(){return this.bBox}}},2218:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UIItem=void 0,t.UIItem=class{constructor(e,t,i,s,o,n){this.caption=e,this.color=t,this.fontSize=i,this.action=s,this.active=o,this.activeColor=n,this.captionMod=e=>e}get finalCaption(){return this.captionMod(this.caption)}}},7187:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Velocity=void 0;const s=i(7531);class o extends s.Vector2D{}t.Velocity=o},3607:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.prepareRenderContext=void 0;const s=i(3188);i(5425),t.prepareRenderContext=()=>{const e=document.querySelector("canvas");if(!e)throw new Error("Could not find canvas element!");const t=e.getContext("2d");if(!t)throw new Error("Could not initialize 2D context");const i=e.getBoundingClientRect();return e.width=i.width,e.height=i.height,t.imageSmoothingEnabled=!1,t},window.addEventListener("resize",t.prepareRenderContext);const o={topdown:s.Topdown};(async()=>{const e=Object.keys(o).map(((e,t)=>`${t+1}) ${e}`));e.push("exit (or empty)");let t="topdown";for(;"exit"!==t;){let i=new o.topdown;await i.run(),t=prompt("What level would you like to check next?\n"+e.join("\n"))||"exit"}})().catch(console.error)},4436:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Level=void 0;const s=i(3607),o=i(5848),n=i(5081);t.Level=class{constructor(e){this.name=e;const t=this.createWorld();if(!t)throw new Error("A level must have a non-null             resuling createWorld function");this.world=t;const i=s.prepareRenderContext();this.world.addResource(i)}destroy(){this.world.commands.stopRun()}async run(){return this.world.run({beforeStepHandler:o.beforeFrameHandler,initialState:n.MenuState}).then((()=>this.destroy()))}}},3188:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Topdown=void 0;const s=i(895),o=i(8961),n=i(7947),a=i(7981),r=i(2019),c=i(7676),h=i(2591),l=i(2958),u=i(2218),m=i(7187),d=i(370),y=i(1638),v=i(7684),p=i(1172),f=i(1353),S=i(8842),x=i(2688),g=i(7551),w=i(1701),b=i(4436);class M extends b.Level{constructor(){super("topdown");const e=new d.GameStore;this.world.addResource(e)}destroy(){super.destroy();const e=this.world.getResource(CanvasRenderingContext2D);e.fillStyle="#ececec",e.clearRect(0,0,e.canvas.width,e.canvas.height)}createWorld(){return(new s.ECS).buildWorld().withSystem(x.PhysicsSystem,[y.CharacterSystem]).withSystem(y.CharacterSystem,[v.CollisionSystem]).withSystem(v.CollisionSystem,[]).withSystem(p.InputSystem).withSystem(f.MenuSystem,[p.InputSystem]).withSystem(S.PauseSystem,[p.InputSystem]).withSystem(g.RenderGameSystem,[x.PhysicsSystem,y.CharacterSystem]).withSystem(w.RenderUISystem,[x.PhysicsSystem,f.MenuSystem,S.PauseSystem]).withComponents(n.Collision,a.Material,r.Mesh,c.Position,h.Rotation,l.Shape,u.UIItem,m.Velocity,o.Character).build()}}t.Topdown=M},370:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.GameStore=t.EMovement=void 0,function(e){e[e.idle=0]="idle",e[e.up=1]="up",e[e.down=2]="down",e[e.left=4]="left",e[e.right=8]="right"}(i=t.EMovement||(t.EMovement={})),t.GameStore=class{constructor(){this.drawables=0,this.rendered=0,this.debugShapes=!0,this.continue=!1,this.lastFrameDeltaTime=0,this.ticks=0,this.medianFps=30,this.timeSinceLevelLoaded=0,this.input={actions:{characterMovement:i.idle,menuConfirm:!1,menuMovement:i.idle,togglePause:!1},keyStates:{}}}}},2189:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Rect=void 0,t.Rect=class{constructor(e,t,i,s){this.x=e,this.y=t,this.w=i,this.h=s}static checkIntersects(e,t){return!(t.x>e.x+e.w||t.x+t.w<e.x||t.y>e.y+e.h||t.y+t.h<e.y)}}},3214:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.ETags=void 0,(i=t.ETags||(t.ETags={}))[i.ui=0]="ui",i[i.terrain=1]="terrain",i[i.character=2]="character",i[i.networkObject=3]="networkObject",i[i.save=4]="save"},7531:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.vecRight=t.vecLeft=t.vecDown=t.vecUp=t.vecOne=t.vecZero=t.Vector2D=void 0;class i{constructor(e=0,t=0){this.x=e,this.y=t,this.buf=new ArrayBuffer(4),this.f32=new Float32Array(this.buf),this.u32=new Uint32Array(this.buf)}addSelf(e){this.x+=e.x,this.y+=e.y}subSelf(e){this.x-=e.x,this.y-=e.y}scale(e){this.x*=e,this.y*=e}normalize(){const e=this.invSqrt();this.x*=e,this.y*=e}invSqrt(){const e=this.x*this.x+this.y*this.y,t=.5*(this.f32[0]=e);this.u32[0]=1597463007-(this.u32[0]>>1);let i=this.f32[0];return i*=1.5-t*i*i,i}distance(e){const t=e.x-this.x,i=e.y-this.y;return Math.sqrt(t*t+i*i)}sqrDistance(e){const t=e.x-this.x,i=e.y-this.y;return t*t+i*i}sqrLength(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}}t.Vector2D=i,t.vecZero=new i(0,0),t.vecOne=new i(1,1),t.vecUp=new i(0,1),t.vecDown=new i(0,-1),t.vecLeft=new i(-1,0),t.vecRight=new i(1,0)},2690:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.gamePrefab=void 0;const s=i(2958);t.gamePrefab=[{Collision:{},Position:{x:60,y:60},Velocity:{x:0,y:0},Material:{color:"#fdff03"},Shape:{dimensions:{x:10,y:10},primitive:s.ShapePrimitive.Rect},Rotation:{value:3*Math.PI/4}},{Collision:{},Position:{x:30,y:100},Velocity:{x:10,y:0},Material:{color:"#fdff03"},Shape:{zIndex:10,dimensions:{x:20},primitive:s.ShapePrimitive.Circle}},{Collision:{},Position:{x:100,y:50},Velocity:{x:0,y:0},Material:{color:"#fdff03"},Shape:{mesh:{verticies:[{x:-10,y:-10},{x:10,y:-10},{x:0,y:10},{x:-5,y:100}]},primitive:s.ShapePrimitive.Mesh}}]},7365:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.menuPrefab=void 0;const s=i(895),o=i(7708),n=i(3214);t.menuPrefab=[{[s.CTagMarker]:[n.ETags.ui],Position:{x:51.2,y:51.2},UIItem:{caption:"PONG",color:"#ddd",fontSize:64}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:51.2,y:122.88},UIItem:{caption:"A sim-ecs usage demo",color:"#ddd",fontSize:24}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:51.2,y:204.8},UIItem:{caption:"How to play: Left paddle: W/S ; Right paddle: Up/Down ; Pause: Escape",color:"#ddd",fontSize:24}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:51.2,y:245.76},UIItem:{caption:"The game will be saved upon pausing!",color:"#ddd",fontSize:24}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:153.6,y:358.4},UIItem:{action:o.EActions.Play,active:!0,color:"#ddd",caption:"Play",fontSize:32}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:153.6,y:409.6},UIItem:{action:o.EActions.Continue,color:"#ddd",caption:"Continue",fontSize:32}},{[s.CTagMarker]:[n.ETags.ui],Position:{x:153.6,y:460.8},UIItem:{action:o.EActions.Exit,color:"#ddd",caption:"Exit",fontSize:32}}]},2687:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.pausePrefab=void 0,t.pausePrefab=[{Position:{x:.05,y:.02},UIItem:{caption:"❚❚ PAUSE",color:"#ddd",fontSize:64}}]},1289:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.savablePrefab=void 0;const s=i(3214),o=i(2958),n=i(895);t.savablePrefab=[{[n.CTagMarker]:[s.ETags.character],Character:{name:"XuPoH"},Velocity:{x:0,y:0},Collision:{},Position:{x:250,y:50},Shape:{zIndex:11,dimensions:{x:30},primitive:o.ShapePrimitive.Circle},Material:{color:"#cca"}}]},2607:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameState=void 0;const s=i(895),o=i(1172),n=i(8842),a=i(2690),r=i(370),c=i(1758),h=i(1701),l=i(7551),u=i(2958),m=i(2688),d=i(7684),y=i(1638),v=i(1289);class p extends s.State{constructor(){super(...arguments),this._systems=[d.CollisionSystem,o.InputSystem,y.CharacterSystem,n.PauseSystem,m.PhysicsSystem,l.RenderGameSystem,h.RenderUISystem]}activate(e){e.getResource(r.GameStore).currentState=this}async create(e){var t;const i=e.getResource(r.GameStore);this.staticDataPrefabHandle=f(e),i.continue?this.saveDataPrefabHandle=c.load(e):this.saveDataPrefabHandle=S(e),await e.flushCommands();for(const i of e.getEntities(new s.Query([s.With(u.Shape)])))null===(t=i.getComponent(u.Shape))||void 0===t||t.build();e.commands.maintain()}destroy(e){this.staticDataPrefabHandle&&e.commands.unloadPrefab(this.staticDataPrefabHandle),this.saveDataPrefabHandle&&e.commands.unloadPrefab(this.saveDataPrefabHandle),e.commands.maintain()}}t.GameState=p;const f=function(e){return e.commands.load(s.SerialFormat.fromArray(a.gamePrefab))},S=function(e){return e.commands.load(s.SerialFormat.fromArray(v.savablePrefab))}},5081:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MenuState=void 0;const s=i(895),o=i(7365),n=i(1172),a=i(1353),r=i(1701),c=i(370);class h extends s.State{constructor(){super(...arguments),this._systems=[n.InputSystem,a.MenuSystem,r.RenderUISystem]}activate(e){e.getResource(c.GameStore).currentState=this,this.prefabHandle=e.commands.load(s.SerialFormat.fromArray(o.menuPrefab)),e.commands.maintain()}deactivate(e){e.commands.unloadPrefab(this.prefabHandle),e.commands.maintain()}}t.MenuState=h},8415:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PauseState=void 0;const s=i(895),o=i(1172),n=i(8842),a=i(2687),r=i(370),c=i(1758),h=i(1701),l=i(7551);class u extends s.State{constructor(){super(...arguments),this._systems=[o.InputSystem,n.PauseSystem,l.RenderGameSystem,h.RenderUISystem]}activate(e){const t=e.getResource(r.GameStore);c.save(e),t.currentState=this,this.prefabHandle=e.commands.load(s.SerialFormat.fromArray(a.pausePrefab)),e.commands.maintain()}deactivate(e){e.commands.unloadPrefab(this.prefabHandle),e.commands.maintain()}}t.PauseState=u},1638:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CharacterSystem=void 0;const s=i(895),o=i(3214),n=i(7187),a=i(370);class r extends s.System{constructor(){super(...arguments),this.query=new s.Query({_character:s.WithTag(o.ETags.character),velocity:s.Write(n.Velocity)})}setup(e){this.gameStore=e.getResource(a.GameStore)}run(e){this.query.execute((({velocity:e})=>{const t=this.gameStore.lastFrameDeltaTime,{characterMovement:i}=this.gameStore.input.actions;(i&a.EMovement.left)===a.EMovement.left?e.x=-1:(i&a.EMovement.right)===a.EMovement.right?e.x=1:e.x=0,(i&a.EMovement.up)===a.EMovement.up?e.y=-1:(i&a.EMovement.down)===a.EMovement.down?e.y=1:e.y=0,e.normalize(),e.scale(1e4*t)}))}}t.CharacterSystem=r},7684:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CollisionSystem=void 0;const s=i(895),o=i(2958),n=i(7947),a=i(7531);class r extends s.System{constructor(){super(...arguments),this.query=new s.Query({collision:s.Write(n.Collision),entity:s.ReadEntity(),position:s.Read(a.Vector2D),shape:s.Read(o.Shape)})}run(e){const t=Array.from(this.query.iter()).map((({collision:e,entity:t,position:i,shape:s})=>{e.collisionObjects.clear(),e.occurred=!1;const{x:o,y:n,w:a,h:r}=s.getBBox();return{collisionData:e,entity:t,width:a,height:r,x:i.x+o,y:i.y+n}}));for(let e=0;e<t.length;e++)for(let i=0;i<t.length;i++){if(e==i)continue;const s=t[e],o=t[i];s.x<o.x+o.width&&s.x+s.width>o.x&&s.y<o.y+o.height&&s.y+s.height>o.y&&(s.collisionData.occurred||(s.collisionData.occurred=!0,s.collisionData.collisionObjects.add(o.entity)),o.collisionData.occurred||(o.collisionData.occurred=!0,o.collisionData.collisionObjects.add(s.entity)))}}}t.CollisionSystem=r},1172:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InputSystem=t.EKeyState=void 0;const s=i(895),o=i(370);var n;!function(e){e[e.Down=0]="Down",e[e.Up=1]="Up"}(n=t.EKeyState||(t.EKeyState={}));class a extends s.System{constructor(){super(...arguments),this.inputEvents=[]}setup(e){this.gameStore=e.getResource(o.GameStore),window.addEventListener("keydown",(e=>this.inputEvents.push({key:e.key,type:n.Down}))),window.addEventListener("keyup",(e=>this.inputEvents.push({key:e.key,type:n.Up})))}run(e){this.gameStore.input.actions.menuConfirm=!1,this.gameStore.input.actions.menuMovement=o.EMovement.idle,this.gameStore.input.actions.togglePause=!1;for(const e of this.inputEvents)if(this.gameStore.input.keyStates[e.key]=e.type,e.type==n.Down)switch(e.key){case"ArrowLeft":case"a":case"A":this.gameStore.input.actions.characterMovement|=o.EMovement.left;break;case"ArrowRight":case"d":case"D":this.gameStore.input.actions.characterMovement|=o.EMovement.right;break;case"ArrowUp":case"w":case"W":this.gameStore.input.actions.characterMovement|=o.EMovement.up,this.gameStore.input.actions.menuMovement=o.EMovement.up;break;case"ArrowDown":case"s":case"S":this.gameStore.input.actions.characterMovement|=o.EMovement.down,this.gameStore.input.actions.menuMovement=o.EMovement.down;break;case"Enter":this.gameStore.input.actions.menuConfirm=!0;break;case"Escape":this.gameStore.input.actions.togglePause=!0}else switch(e.key){case"ArrowLeft":case"a":case"A":this.gameStore.input.actions.characterMovement&=~o.EMovement.left;break;case"ArrowRight":case"d":case"D":this.gameStore.input.actions.characterMovement&=~o.EMovement.right;break;case"ArrowUp":case"w":case"W":this.gameStore.input.actions.characterMovement&=~o.EMovement.up,this.gameStore.input.actions.menuMovement=o.EMovement.idle;break;case"ArrowDown":case"s":case"S":this.gameStore.input.actions.characterMovement&=~o.EMovement.down,this.gameStore.input.actions.menuMovement=o.EMovement.idle}this.inputEvents.length=0}}t.InputSystem=a},1353:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MenuSystem=void 0;const s=i(895),o=i(2218),n=i(370),a=i(7708),r=i(2607),c=i(5081);class h extends s.System{constructor(){super(...arguments),this._states=[r.GameState,c.MenuState],this.query=new s.Query({uiItem:s.Write(o.UIItem)}),this.menuAction=a.EActions.Play}setup(e){this.actions=e,this.gameStore=e.getResource(n.GameStore),console.log("setup Menu")}run(e){if(this.gameStore.input.actions.menuMovement==n.EMovement.down)switch(this.menuAction){case a.EActions.Play:this.menuAction=a.EActions.Continue;break;case a.EActions.Continue:this.menuAction=a.EActions.Exit;break;case a.EActions.Exit:this.menuAction=a.EActions.Play;break;default:throw new Error(`Action ${this.menuAction} not implemented!`)}else if(this.gameStore.input.actions.menuMovement==n.EMovement.up)switch(this.menuAction){case a.EActions.Play:this.menuAction=a.EActions.Exit;break;case a.EActions.Continue:this.menuAction=a.EActions.Play;break;case a.EActions.Exit:this.menuAction=a.EActions.Continue;break;default:throw new Error(`Action ${this.menuAction} not implemented!`)}if(this.gameStore.input.actions.menuConfirm)if(this.menuAction==a.EActions.Play)this.actions.commands.pushState(r.GameState);else if(this.menuAction==a.EActions.Continue){if(null==localStorage.getItem("save"))return void alert("Sorry you werent saved lol");this.gameStore.continue=!0,this.actions.commands.pushState(r.GameState)}else this.actions.commands.stopRun();else for(const{uiItem:e}of this.query.iter())e.active=e.action==this.menuAction}}t.MenuSystem=h},8842:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PauseSystem=void 0;const s=i(895),o=i(370),n=i(2607),a=i(8415);class r extends s.System{setup(e){this.actions=e,this.gameStore=e.getResource(o.GameStore)}run(e){var t,i;const s=(null===(t=this.gameStore.currentState)||void 0===t?void 0:t.constructor)==n.GameState,o=(null===(i=this.gameStore.currentState)||void 0===i?void 0:i.constructor)==a.PauseState;(s||o)&&this.gameStore.input.actions.togglePause&&(s?this.actions.commands.pushState(a.PauseState):this.actions.commands.popState())}}t.PauseSystem=r},2688:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PhysicsSystem=void 0;const s=i(895),o=i(7676),n=i(7187);class a extends s.System{constructor(){super(...arguments),this.query=new s.Query({pos:s.Write(o.Position),vel:s.Read(n.Velocity)})}run(e){this.query.execute((({pos:e,vel:t})=>{e.x+=.016*t.x,e.y+=.016*t.y}))}}t.PhysicsSystem=a},7551:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderGameSystem=void 0;const s=i(895),o=i(2958),n=i(7676),a=i(7981),r=i(370),c=i(2189),h=2*Math.PI;class l extends s.System{constructor(){super(...arguments),this.query=new s.Query({pos:s.Read(n.Position),shape:s.Read(o.Shape),material:s.Read(a.Material)}),this.runs=0}setup(e){this.ctx=e.getResource(CanvasRenderingContext2D),this.gameStore=e.getResource(r.GameStore)}run(e){const t={x:0,y:0,w:this.ctx.canvas.width,h:this.ctx.canvas.height},i=Array.from(this.query.iter());this.gameStore.drawables=i.length;const s=i.filter((({pos:e,shape:i})=>{const s=i.getBBox(),o={x:e.x+s.x,y:e.y+s.y,w:s.w,h:s.h};return c.Rect.checkIntersects(o,t)})).sort((({shape:e},{shape:t})=>e.zIndex-t.zIndex));this.gameStore.rendered=s.length;for(let e=0;e<s.length;e++){const{pos:t,shape:i,material:o}=s[e];this.drawShape(t,i,o)}}drawShape(e,t,i){const{x:s,y:n}=t.dimensions,{x:a,y:r}=e;if(this.gameStore.debugShapes){this.ctx.save(),this.ctx.fillStyle="#fff",this.ctx.font="1rem Arial";const e=`Z=${t.zIndex}`;this.ctx.fillText(e,a,r-30),this.ctx.strokeStyle="#f0f";const{x:i,y:s,w:o,h:n}=t.getBBox(),c=5;this.ctx.lineWidth=1,this.ctx.strokeRect(a+i-c,r+s-c,o+2*c,n+2*c),this.ctx.restore()}if(this.ctx.fillStyle=i.color,t.primitive===o.ShapePrimitive.Rect)this.ctx.fillRect(a,r,s,n);else if(t.primitive===o.ShapePrimitive.Circle)this.ctx.beginPath(),this.ctx.arc(a,r,s/2,0,h),this.ctx.fill();else if(t.primitive===o.ShapePrimitive.Mesh&&t.mesh){this.ctx.beginPath();for(let e=0;e<t.mesh.verticies.length;++e){const{x:i,y:s}=t.mesh.verticies[e];this.ctx.lineTo(a+i,r+s)}this.ctx.closePath(),this.ctx.fill()}}}t.RenderGameSystem=l},1701:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderUISystem=void 0;const s=i(895),o=i(2218),n=i(7676),a=i(370),r=i(3214);class c extends s.System{constructor(){super(...arguments),this.query=new s.Query({_tag:s.WithTag(r.ETags.ui),pos:s.Read(n.Position),ui:s.Read(o.UIItem)}),this.runs=0}setup(e){this.ctx=e.getResource(CanvasRenderingContext2D)}run(e){this.ctx.textBaseline="top";const t=e.getResource(a.GameStore);this.query.execute((({pos:e,ui:t})=>{var i;this.ctx.fillStyle=t.active?null!==(i=t.activeColor)&&void 0!==i?i:"red":t.color,this.ctx.font=t.active?1.2*t.fontSize+"px serif":`${t.fontSize}px serif`,this.ctx.fillText(t.finalCaption,e.x,e.y)})),this.ctx.fillText(Math.floor(10*t.timeSinceLevelLoaded)/10+" s.",this.ctx.canvas.width-200,20),this.ctx.fillText(`${Math.floor(t.medianFps+.5)} FPS`,this.ctx.canvas.width-200,60),this.ctx.fillText(`${t.rendered} / ${t.drawables}`,this.ctx.canvas.width-200,100);let i=t.input.actions.characterMovement.toString(2);i="0".repeat(4-i.length)+i,this.ctx.fillText(`${i}`,this.ctx.canvas.width-200,140)}}t.RenderUISystem=c}},i={};function s(e){var o=i[e];if(void 0!==o)return o.exports;var n=i[e]={exports:{}};return t[e](n,n.exports,s),n.exports}s.m=t,e=[],s.O=(t,i,o,n)=>{if(!i){var a=1/0;for(l=0;l<e.length;l++){for(var[i,o,n]=e[l],r=!0,c=0;c<i.length;c++)(!1&n||a>=n)&&Object.keys(s.O).every((e=>s.O[e](i[c])))?i.splice(c--,1):(r=!1,n<a&&(a=n));if(r){e.splice(l--,1);var h=o();void 0!==h&&(t=h)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[i,o,n]},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var o,n,[a,r,c]=i,h=0;for(o in r)s.o(r,o)&&(s.m[o]=r[o]);if(c)var l=c(s);for(t&&t(i);h<a.length;h++)n=a[h],s.o(e,n)&&e[n]&&e[n][0](),e[a[h]]=0;return s.O(l)},i=self.webpackChunkcitylights=self.webpackChunkcitylights||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var o=s.O(void 0,[895],(()=>s(3607)));o=s.O(o)})();
//# sourceMappingURL=main.js.map