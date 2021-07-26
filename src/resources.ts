import {Loader, Sound, SpriteSheet, Texture} from 'excalibur';

import botFile from '../res/excalibot.png';
import botRedFile from '../res/excalibot-red.png';
import baddieFile from '../res/baddie.png';
import blockFile from '../res/block.png';
import npcFile from '../res/npc.png';
import jumpSound from '../res/jump.wav';
import hitSound from '../res/hurt.wav';
import gotEmSound from '../res/gottem.wav';

import grassFile from '../res/TX Tileset Grass.png';

const Resources = {
    bot: new Texture(botFile),
    botRed: new Texture(botRedFile),
    baddie: new Texture(baddieFile),
    block: new Texture(blockFile),
    npc: new Texture(npcFile),
    jump: new Sound(jumpSound),
    hit: new Sound(hitSound),
    gotEm: new Sound(gotEmSound),
    
    grass: new Texture(grassFile),
}

const loader = new Loader();

const botSpriteSheet = new SpriteSheet(Resources.bot, 8, 1, 32, 32);
const botRedSpriteSheet = new SpriteSheet(Resources.botRed, 8, 1, 32, 32);
const baddieSpriteSheet = new SpriteSheet(Resources.baddie, 6, 1, 32, 32);
const blockSprite = Resources.block.asSprite();
const npcSprite = Resources.npc.asSprite();

const grassSpriteSheet = new SpriteSheet(Resources.grass, 8, 8, 32, 32);
// const font = new Font(Resources.font);

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export {
    Resources,
    loader,
    botSpriteSheet,
    botRedSpriteSheet,
    baddieSpriteSheet,
    blockSprite,
    npcSprite,
    grassSpriteSheet,
    // font,
};