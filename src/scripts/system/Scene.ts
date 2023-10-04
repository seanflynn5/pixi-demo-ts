import * as PIXI from "pixi.js";
import { Ticker } from "pixi.js"; 
import { App } from "./App";

export class Scene {
    public container: PIXI.Container; 
    public ticker: Ticker; 

    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        this.ticker = App.app.ticker; 
        this.ticker.add(this.update, this);
    }

    update(dt?: number) {
    
    }
    
    create() {

    }

    destroy() {
        // Add your destroy logic here
    }
}