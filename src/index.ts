import { loader } from './resources';
import { Level } from './level';
import { Color, DisplayMode, Engine, Physics, Vector } from 'excalibur';

const engine = new Engine({
  backgroundColor: Color.fromHex('#000000'),
  displayMode: DisplayMode.FullScreen,
});

// Turn off anti-aliasing for pixel art graphics
engine.setAntialiasing(false);

// Set global gravity, 800 pixels/sec^2
// Physics.acc = new Vector(0, 981);

// Setup first level as a custom scene
engine.add('level', new Level(engine));
engine.goToScene('level');

// Game events to handle
// engine.on('hidden', () => {
//   console.log('pause');
//   engine.stop();
// });
engine.on('visible', () => {
  console.log('start');
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  console.log('game start');
});