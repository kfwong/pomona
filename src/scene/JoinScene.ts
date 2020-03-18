import * as Phaser from "phaser"
import { config } from "../config"

export class JoinScene extends Phaser.Scene {
	private roomId: string

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
		this.add.text(10, 10, "ROOM ID: " + this.roomId, { font: "14px Monaco", fill: config.color1 })
	}

	private drawBackground() {
		this.add.tileSprite(0, 0, 1366 * 2, 768 * 2, "background")
	}

	private loadBackground() {
		this.load.spritesheet("background", "/assets/Pixel Adventure/Background/Blue.png", { frameWidth: 64, frameHeight: 64 })
	}

}
