import * as Phaser from "phaser"
import { config } from "../config"

export class GamePadScene extends Phaser.Scene {
	constructor() {
		super({
			active: true,
			key: "JoinScene",
		})
	}

	public preload() {
		this.loadBackground()
	}

	public create() {
		this.drawBackground()
		this.add.text(10, 10, "SWIPE LEFT or RIGHT to move", { fontSize: "14px", fontFamily: "SuperMario", fill: config.color1 })
		this.add.text(10, 50, "TAP to jump", { fontSize: "14px", fontFamily: "SuperMario", fill: config.color1 })
	}

	private drawBackground() {
		this.add.tileSprite(0, 0, 1366 * 2, 768 * 2, "background")
	}

	private loadBackground() {
		this.load.spritesheet("background", "/assets/Pixel Adventure/Background/Blue.png", { frameWidth: 64, frameHeight: 64 })
	}

}
