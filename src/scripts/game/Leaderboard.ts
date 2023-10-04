import * as PIXI from 'pixi.js';
import { App } from "../system/App";
import Scores from "../system/Scores.json"; 
// Define the type for the Scores JSON data
type ScoresData = { [key: string]: number };

export class Leaderboard {
    public container: PIXI.Container;

    constructor() {
        // Create a container for the leaderboard
        this.container = new PIXI.Container();
        
        // Style for leaderboard entries
        const entryStyle = new PIXI.TextStyle({
            fontFamily: 'Verdana',
            fontSize: 18,
            fill: 0xFF6229,
        });

        // Sort scores in descending order
        const sortedScores: [string, number][] = Object.entries(Scores)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

        // Create and add leaderboard entries
        const entryCount: number = Math.min(sortedScores.length, 10);
        const entryHeight: number = 30;
        const leaderboardWidth: number = 170; 
        const leaderboardX: number = window.innerWidth - leaderboardWidth - 10;

        // Create a background for the leaderboard
        const background: PIXI.Graphics = new PIXI.Graphics();
        background.beginFill(0xFFFFFF, 0.7);
        background.drawRect(0, 0, leaderboardWidth, entryCount * entryHeight);
        background.endFill();
        this.container.addChild(background);

        for (let i = 0; i < entryCount; i++) {
            const [name, score]: [string, number] = sortedScores[i];
            const entryText: PIXI.Text = new PIXI.Text(`${name}: ${score}`, entryStyle);
            entryText.anchor.set(0, 0.5);
            entryText.position.set(10, i * entryHeight + 10);
            this.container.addChild(entryText);
        }

        // Position the leaderboard container
        this.container.position.set(leaderboardX, window.innerHeight - entryCount * entryHeight - 10);
        this.container.width = leaderboardWidth;
        this.container.height = entryCount * entryHeight;
        this.container.visible = true;

        // Add the leaderboard container to the stage (if available)
        if (App.stage) {
            App.stage.addChild(this.container);
        }
    }

    // Show the leaderboard
    show() {
        this.container.visible = true;
    }
}