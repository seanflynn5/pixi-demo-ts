import * as Matter from 'matter-js';
import { App } from '../system/App';
import * as PIXI from "pixi.js";

export class Diamond {
    private isDistinct: boolean;
    private sprite: PIXI.Sprite | null;
    private body: Matter.Body | undefined;

    constructor(x: number, y: number) {
        this.isDistinct = Math.random() < 0.1; // 10% chance of being distinct
        this.createSprite(x, y);
        App.app.ticker.add(this.update, this);
    }

    // using isDistinct flag to create special diamonds
    private createSprite(x: number, y: number) {
        if (this.isDistinct) {
            this.sprite = App.sprite("special-diamond");
            this.sprite.width = 60;
            this.sprite.height = 30;
        } else {
            this.sprite = App.sprite("diamond");
            this.sprite.width = 30;
            this.sprite.height = 30;
        }

        if (this.sprite) {
            this.sprite.x = x;
            this.sprite.y = y;
        }
    }

    private update() {
        if (this.sprite) {
            Matter.Body.setPosition(this.body!, {
                x: this.sprite.width / 2 + this.sprite.x + (this.sprite.parent ? this.sprite.parent.x : 0),
                y: this.sprite.height / 2 + this.sprite.y + (this.sprite.parent ? this.sprite.parent.y : 0)
            });
        }
    }

    createBody() {
        if (this.sprite) {
            this.body = Matter.Bodies.rectangle(
                this.sprite.width / 2 + this.sprite.x + (this.sprite.parent ? this.sprite.parent.x : 0),
                this.sprite.height / 2 + this.sprite.y + (this.sprite.parent ? this.sprite.parent.y : 0),
                this.sprite.width,
                this.sprite.height,
                { friction: 0, isStatic: true, render: { fillStyle: '#060a19' } }
            );
            this.body.isSensor = true;
            this.body.gameDiamond = this;
            Matter.World.add(App.physics.world, this.body);
        }
    }

    // [14]
    destroy() {
        if (this.sprite) {
            App.app.ticker.remove(this.update, this);
            if (this.body) {
                Matter.World.remove(App.physics.world, this.body);
            }
            this.sprite.destroy();
            this.sprite = null;
        }
    }
}
