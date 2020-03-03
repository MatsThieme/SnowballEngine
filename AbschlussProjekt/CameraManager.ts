import { AnimatedSprite } from './Components/AnimatedSprite.js';
import { Camera } from './Components/Camera.js';
import { Texture } from './Components/Texture.js';
import { Frame } from './Frame.js';
import { GameObject } from './GameObject.js';

export class CameraManager {
    private context: CanvasRenderingContext2D;
    public cameras: Camera[];
    public mainCameraIndex: number;
    public constructor(domElement: HTMLCanvasElement) {
        this.cameras = [];
        this.mainCameraIndex = 0;
        this.context = <CanvasRenderingContext2D>domElement.getContext('2d');
    }
    public get mainCamera(): Camera {
        return this.cameras[this.mainCameraIndex % this.cameras.length];
    }
    public update(gameObjects: GameObject[]) {
        const frames: (Frame | undefined)[] = [];

        for (const gameObject of gameObjects) {
            frames.push(...gameObject.getComponents(AnimatedSprite).map(aS => aS.currentFrame));
            frames.push(...gameObject.getComponents(Texture).map(t => t.currentFrame));
        }

        this.cameras.forEach(camera => camera.update(<Frame[]>frames.filter(f => f)));


        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.drawImage(this.cameras[this.mainCameraIndex].currentFrame, 0, 0);
    }
}