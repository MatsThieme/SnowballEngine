import { Frame } from './Frame.js';
import { Vector2 } from './Vector2.js';

export interface Drawable {
    readonly currentFrame: Frame | undefined;
    relativePosition: Vector2;
    size: Vector2;
    scaledSize: Vector2;
}