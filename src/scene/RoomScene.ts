import * as Phaser from "phaser"
import { config } from "../config"
import { Host } from "../game/Host"
import "../game/Number.extension"
import { Player } from "../game/Player"

export class RoomScene extends Phaser.Scene {
	private host: Host
	private player: Player

	constructor() {
		super({
			key: "RoomScene",
		})
		this.spawnPlayer = this.spawnPlayer.bind(this)
	}

	public preload() {
		this.loadBackground()
		this.loadAnimations()
		this.initializeHost()
	}

	public create() {
		this.drawBackground()
		this.add.text(10, 10, "Waiting for players...", { font: "48px MonsterFriendFore", fill: config.color2 })
	}

	public update() {
		if (this.player) { this.player.update() }
	}

	private spawnPlayer() {
		const spawningPoint = this.randomSpawningPoint()
		this.player = new Player({ scene: this, x: spawningPoint.x, y: 600, texture: "player" })
	}

	private randomSpawningPoint() {
		return new Phaser.Geom.Line(0, 0, 768 * 2, 1366 * 2).getRandomPoint()
	}

	private drawBackground() {
		this.add.tileSprite(0, 0, 1366 * 2, 768 * 2, "background")
	}

	private loadBackground() {
		this.load.spritesheet("background", "/assets/Pixel Adventure/Background/Green.png", { frameWidth: 64, frameHeight: 64 })
	}

	private loadAnimations() {
		this.load.spritesheet("player-appearing", "/assets/Pixel Adventure/Main Characters/Appearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		this.load.animation("player-appearing", "/assets/animations/player-appearing.json")

		this.load.spritesheet("player-idle", "/assets/Pixel Adventure/Main Characters/Mask Dude/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-idle", "/assets/animations/player-idle.json")

		this.load.spritesheet("player-run", "/assets/Pixel Adventure/Main Characters/Mask Dude/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-run", "/assets/animations/player-run.json")

		this.load.spritesheet("player-jump", "/assets/Pixel Adventure/Main Characters/Mask Dude/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-jump", "/assets/animations/player-jump.json")

		this.load.spritesheet("player-fall", "/assets/Pixel Adventure/Main Characters/Mask Dude/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-fall", "/assets/animations/player-fall.json")
	}

	private initializeHost() {
		this.host = Host.Instance
		this.host.onConnected((guestId: string) => {
			this.spawnPlayer()
		})
	}
}
