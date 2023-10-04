import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { Diamond } from './Diamond';

export interface CustomPlatformBody extends Matter.Body {
    gamePlatform?: Platform;
}

export class Platform {
    public rows: number;
    public cols: number;
    private tileSize: number;
    private width: number;
    private height: number;
    private dx: number;
    private body: CustomPlatformBody;
    public container: PIXI.Container;
    private diamonds: Diamond[];

    

    constructor(rows: number, cols: number, x: number) {
        this.rows = rows;
        this.cols = cols;
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;

        this.createContainer(x);
        this.createTiles();

        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
        this.createDiamonds();
    }

    private createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    private createDiamond(x: number, y: number) {
        const diamond = new Diamond(x, y);
        this.container.addChild(diamond.sprite);
        diamond.createBody();
        this.diamonds.push(diamond);
    }

    private createBody() {
        this.body = Matter.Bodies.rectangle(
            this.width / 2 + this.container.x,
            this.height / 2 + this.container.y,
            this.width,
            this.height,
            { friction: 0, isStatic: true }
        );
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    private createContainer(x: number) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }

    private createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    private createTile(row: number, col: number) {
        const texture = row === 0 ? "platform" : "tile";
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }

    public move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, { x: this.body.position.x + this.dx, y: this.body.position.y });
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }

    public destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.container.destroy();
    }
}