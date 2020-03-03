import { AlignH, AlignV } from '../Align.js';
import { Alignable } from '../Alignable.js';
import { Drawable } from '../Drawable.js';
import { Frame } from '../Frame.js';
import { GameObject } from '../GameObject.js';
import { Sprite } from '../Resources/Sprite.js';
import { Vector2 } from '../Vector2.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class Texture extends Component implements Drawable, Alignable {
    public relativePosition: Vector2;
    public size: Vector2;
    public sprite: Sprite | undefined;
    public alignH: AlignH;
    public alignV: AlignV;
    public constructor(gameObject: GameObject, relativePosition: Vector2 = new Vector2(), size: Vector2 = new Vector2(1, 1), alignH: AlignH = AlignH.Center, alignV: AlignV = AlignV.Center) {
        super(gameObject, ComponentType.Texture);
        this.relativePosition = relativePosition;
        this.size = size;
        this.alignH = alignH;
        this.alignV = alignV;
    }
    public get currentFrame(): Frame | undefined {
        return this.sprite ? new Frame(this.position, this.scaledSize, this.sprite) : undefined;
    }
    public get scaledSize(): Vector2 {
        return new Vector2(this.size.x * this.gameObject.transform.scale.x, this.size.y * this.gameObject.transform.scale.y);
    }
    public get position() {
        const align = new Vector2(this.alignH === AlignH.Left ? -this.scaledSize.x : this.alignH === AlignH.Center ? -this.scaledSize.x / 2 : 0, this.alignV === AlignV.Bottom ? -this.scaledSize.y : this.alignV === AlignV.Center ? -this.scaledSize.y / 2 : 0);
        return Vector2.add(this.relativePosition, this.gameObject.transform.position, align);
    }
}