import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { Ticker } from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { Hero } from "../game/Hero";
import { Platform } from "../game/Platform";
import { Scene } from "./Scene";
import { ScenesManager } from "./ScenesManager";
import { LoaderConfig } from "./Loader";

export interface AppConfig {
    loader: { key: string; data: { default: string } }[];
    hero: Hero;
    bgSpeed: number;
    score: ScoreCoords;
    diamonds: DiamondProps;
    platforms: ExtendedPlatformProps;
    scenes: Record<string, new () => Scene>;
}

interface ScoreCoords {
    x: number;
    y: number;
    anchor: number;
    style: {
        fontFamily: string,
        fontWeight: string,
        fontSize: number,
        fill: Array<string>
    };
}

interface DiamondProps {
    chance: number;
    offset: OffsetProps;
}

interface OffsetProps {
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

export class Application {
    config: AppConfig;
    app: PIXI.Application;
    loader: Loader;
    scenes: ScenesManager;
    physics: Matter.Engine;
    stage: PIXI.Container;
    ticker: Ticker;

    constructor() {
        this.config = {} as AppConfig;
        this.physics = Matter.Engine.create();
    }

    run(config: AppConfig) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;
        
        this.app = new PIXI.Application({resizeTo: window});
        document.body.appendChild(this.app.view);

        this.loader = new Loader(this.app.loader, this.config); 
        this.loader.preload().then(() => this.start());

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        // [06]
        this.createPhysics();
    }

    createPhysics() {
        this.physics = Matter.Engine.create();
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