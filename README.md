# SnowballEngine

2D Game-Engine written in TypeScript.


<a href="https://github.com/MatsThieme/SnowballEngineTemplate">Project template</a> 


<b>Usage</b>
```TypeScript
class Game {
    private readonly sceneManager: SceneManager;
    public constructor() {
        this.sceneManager = new SceneManager();
        this.initialize(this.sceneManager);
    }
    private async initialize(sceneManager: SceneManager): Promise<void> {
        // create scenes
        sceneManager.create('Loadingscreen', LoadingScreenScene);
        sceneManager.create('Main Scene', MainScene);


        // load scene
        sceneManager.load('Loadingscreen');

        // load 
        // await Assets.load('path/to/asset', AssetType.Image, 'some image');
        // or
        // create asset
        Assets.set(createSprite((ctx, c) => {
            ctx.fillStyle = Color.yellow.colorString;
            ctx.fillRect(0, 0, c.width, c.height);
        }), 'some image');

        
        // timeout to simulate loading
        await asyncTimeout(2000);


        sceneManager.load('Main Scene');
    }
}
```
