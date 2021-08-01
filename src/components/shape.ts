import { Rect } from "../models/rect";
import { Vector2D, vecZero } from "../models/vector2d";
import { Mesh } from "./mesh";

export enum ShapePrimitive {
    Circle = 'circle',
    Rect = 'rect',
    Mesh = 'mesh',
}

export enum ShapePivot {
    TopLeft = 0,
    TopMiddle = 1,
    TopRight = 2,
    Left = 3,
    Middle = 4,
    Right = 5,
    BottomLeft = 6,
    BottomMiddle = 7,
    BottomRight = 8
}

export const ShapePivotNames:{
    [key in ShapePivot]: string;
} = {
    [ShapePivot.TopLeft]: 'TopLeft',
    [ShapePivot.TopMiddle]: 'TopMiddle',
    [ShapePivot.TopRight]: 'TopRight',
    [ShapePivot.Left]: 'Left',
    [ShapePivot.Middle]: 'Middle',
    [ShapePivot.Right]: 'Right',
    [ShapePivot.BottomLeft]: 'BottomLeft',
    [ShapePivot.BottomMiddle]: 'BottomMiddle',
    [ShapePivot.BottomRight]: 'BottomRight',
}

// todo triangle, capsule

export class Shape {
    public bBox: Rect = new Rect(0, 0, 0, 0);

    public isBuilt = false;

    /**
     * 
     * @param dimensions (width,height) if rect, (diameter,any) if circle
     * @param primitive Enum or string value
     * @param mesh verticies data
     */
    constructor(
        public zIndex = 0,
        // TODO: make it real
        public pivot = ShapePivot.Middle,
        public offsetX = 0,
        public offsetY = 0,
        public dimensions: Vector2D = vecZero,
        public primitive: ShapePrimitive = ShapePrimitive.Rect,
        public mesh: Mesh | null = null,
    ) {
        
    }

    build() {
        if (this.isBuilt) return;

        if (this.primitive === ShapePrimitive.Mesh && !this.mesh) {
            throw new Error('Shapes with mesh primitive\
                must provide a mesh data');
        }
        if (this.primitive !== ShapePrimitive.Mesh && !this.dimensions) {
            console.error('dimensions:', this.dimensions,
                'primitive:', this.primitive,
                'mesh:', this.mesh);
            throw new Error('Shapes with non-mesh primitive\
                must provide dimensions')
        }

        // All the shapes are cenetered by default

        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        if (this.primitive === ShapePrimitive.Circle) {
            // A center-positioned circle
            // will fit into a mid-shifted
            // square with side = diameter
            const d = this.dimensions.x
            const rad = d/2;
            this.bBox.x = -rad;
            this.bBox.y = -rad;
            this.bBox.w = d;
            this.bBox.h = d;
        } else if (this.primitive === ShapePrimitive.Rect) {
            // a top-left positioned rectangle
            // is the bounding box itself
            this.bBox.x = -this.dimensions.x/2;
            this.bBox.y = -this.dimensions.y/2;
            this.bBox.w = this.dimensions.x;
            this.bBox.h = this.dimensions.y;
        } else if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            minX = this.mesh.verticies[0].x;
            minY = this.mesh.verticies[0].y;

            maxX = this.mesh.verticies[0].x;
            maxY = this.mesh.verticies[0].y;

            for (let i=1;i<this.mesh.verticies.length;++i){
                const {x, y} = this.mesh.verticies[i];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }

            this.bBox.w = maxX - minX;
            this.bBox.h = maxY - minY;
            this.bBox.x = -this.bBox.w/2;
            this.bBox.y = -this.bBox.h/2;
        }

        if (this.pivot === ShapePivot.TopLeft) {
            this.bBox.x += this.bBox.w/2;
            this.bBox.y += this.bBox.h/2;
        } else if (this.pivot === ShapePivot.TopMiddle) {
            this.bBox.y += this.bBox.h/2;
        } else if (this.pivot === ShapePivot.TopRight) {
            this.bBox.x -= this.bBox.w/2;
            this.bBox.y += this.bBox.h/2;
        } else if (this.pivot === ShapePivot.Left) {
            this.bBox.x += this.bBox.w/2;
        } else if (this.pivot === ShapePivot.Right) {
            this.bBox.x -= this.bBox.w/2;
        } else if (this.pivot === ShapePivot.BottomLeft) {
            this.bBox.x += this.bBox.w/2;
            this.bBox.y -= this.bBox.h/2;
        } else if (this.pivot === ShapePivot.BottomMiddle) {
            this.bBox.y -= this.bBox.h/2;
        } else if (this.pivot === ShapePivot.BottomRight) {
            this.bBox.x -= this.bBox.w/2;
            this.bBox.y -= this.bBox.h/2;
        }

        if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            for (let i=0;i<this.mesh.verticies.length;++i){
                this.mesh.verticies[i].x += (this.bBox.x - minX);
                this.mesh.verticies[i].y += (this.bBox.y - minY);
            }
        }

        this.isBuilt = true;
    }

    getBBox() {
        return this.bBox;
    }
}
