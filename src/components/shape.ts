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
        public dimensions: Vector2D = vecZero,
        public primitive: ShapePrimitive = ShapePrimitive.Rect,
        public mesh: Mesh | null = null,
    ) {
        
    }

    build() {
        if (this.isBuilt) return;

        console.log('Building shape', this);
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
            this.bBox.x = 0;
            this.bBox.y = 0;
            this.bBox.w = this.dimensions.x;
            this.bBox.h = this.dimensions.y;
        } else if (this.primitive === ShapePrimitive.Mesh && this.mesh) {
            let minX = this.mesh.verticies[0].x;
            let minY = this.mesh.verticies[0].y;

            let maxX = this.mesh.verticies[0].x;
            let maxY = this.mesh.verticies[0].y;

            for (let i=1;i<this.mesh.verticies.length;++i){
                const {x, y} = this.mesh.verticies[i];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }

            this.bBox.x = minX;
            this.bBox.y = minY;
            this.bBox.w = maxX - minX;
            this.bBox.h = maxY - minY;
        }

        this.isBuilt = true;
    }

    getBBox() {
        return this.bBox;
    }
}
