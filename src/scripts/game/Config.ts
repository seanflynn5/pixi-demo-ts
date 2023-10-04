import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";


export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    bgSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        },
        isDistinct: undefined,
        sprite: undefined,
        body: undefined,
        createSprite: undefined,
        update: undefined,
        createBody: undefined,
        destroy: undefined
        
    },
    platforms: {
        moveSpeed: -3,
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        },
        rows: undefined,
        cols: undefined,
        tileSize: undefined,
        width: undefined,
        height: undefined,
        dx: undefined,
        body: undefined,
        container: undefined,
        diamonds: undefined,
        createDiamonds: undefined,
        createDiamond: undefined,
        createContainer: undefined,
        createBody: undefined,
        createTiles: undefined,
        createTile: undefined,
        move: undefined,
        destroy: undefined

            },
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        position: {
            x: 200,
            y: 100
        },
        sprite: undefined,
        body: undefined,
        dy: undefined,
        jumpIndex: undefined,
        platform: undefined,
        score: undefined,
        nameText: undefined,
        name: undefined,
        assignName: undefined, 
        collectDiamond: undefined, 
        startJump: undefined, 
        stayOnPlatform: undefined,
        createBody: undefined, 
        update: undefined, 
        createSprite: undefined, 
        startFireworksAnimation: undefined,
        showNewHighScoreMessage: undefined, 
        destroy: undefined
    },
    scenes: {
        "Game": GameScene
    }
};