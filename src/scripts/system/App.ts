import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { Hero } from "../game/Hero";
import { Diamond } from "../game/Diamond";
import { Platform } from "../game/Platform";
import { ScenesManager } from "./ScenesManager";

export interface AppConfig {
    hero: Hero;
    bgSpeed: number;
    score: ScoreCoords;
    diamonds: DiamondProps
    platforms: ExtendedPlatformProps;
}

interface DiamondProps extends Diamond {
    offset: OffsetProps;
    chance: number;
}

interface OffsetProps extends DiamondProps {
    min: number;
    max: number;
}

interface PlatformProps extends Platform {
    moveSpeed: number;
}

type Ranges = {
    rows: {
        min: number;
        max: number;
    };
    cols: {
        min: number;
        max: number;
    };
    offset: {
        min: number;
        max: number;
    };
};

type ExtendedPlatformProps = PlatformProps & {
    ranges: Ranges;
};

interface ScoreCoords extends AppConfig {
    x: number;
    y: number;
    anchor: number;
    style: PIXI.TextStyle;
}

export class Application {
    config: AppConfig;
    app: PIXI.Application;
    loader: Loader;
    scenes: ScenesManager;
    physics: Matter.Engine; 
    stage: PIXI.Container;

    constructor() {
        // Initialize properties
        this.config = {} as AppConfig;
        this.app = new PIXI.Application({ resizeTo: window });
        this.loader = new Loader(this.app.loader, this.config);
        this.scenes = new ScenesManager();
        this.physics = Matter.Engine.create();
    }

    run(config: AppConfig) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        document.body.appendChild(this.app.view);

        this.loader.preload().then(() => this.start());

        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        // [06]
        this.createPhysics();
    }

    createPhysics() {
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }

    res(key: string) {
        return this.loader.resources[key].texture;
    }

    sprite(key: string) {
        return new PIXI.Sprite(this.res(key));
    }

    start() {
        this.scenes.start("Game");
    }
}

export const App = new Application();