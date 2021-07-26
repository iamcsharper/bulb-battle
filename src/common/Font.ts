import { SpriteSheet, Texture } from "excalibur";

export class Font extends SpriteSheet {
    constructor(image: Texture) {
        super(
            image,
            2,
            2,
            16,
            16
        );
    }
}