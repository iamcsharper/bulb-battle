import { IVector2D } from "../models/vector2d";

export class Mesh {
    public isConvex: boolean;

    constructor (public verticies: IVector2D[]) {
        // TODO: test for convexness
        this.isConvex = true;
    }
}