import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {
    private speed: number;
    public container: PIXI.Container;
    private sprites: PIXI.Sprite[];

    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
    }

    private createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    private createSprite(i: number) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    private move(sprite: PIXI.Sprite, offset: number) {
        const spriteRightX = sprite.x + sprite.width;
        const screenLeftX = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }

        sprite.x -= offset;
    }

    public update(dt: number) {
        const offset = this.speed * dt;

        this.sprites.forEach((sprite) => {
            this.move(sprite, offset);
        });
    }

    public destroy() {
        this.container.destroy();
    }
}