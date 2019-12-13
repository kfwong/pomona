import * as Phaser from "phaser"
import { Banana } from "../game/Banana"
import { Player } from "../game/Player"

export class FirstScene extends Phaser.Scene {
	private player: Player
	private bananas: Phaser.GameObjects.Group

	constructor() {
		super({
			active: false,
			visible: false,
			key: "game",
		})
	}

	public preload() {
		this.loadBackground()
		this.loadAnimations()
	}

	public create() {
		this.drawBackground()
		this.spawnPlayer()
		this.spawnRandomBananas()

		this.physics.world.on("worldbounds", (body: Phaser.Physics.Arcade.Body) => {
			const line = new Phaser.Geom.Line(0, 0, 768 * 2, 0)
			body.y = 0
			body.x = line.getRandomPoint().x
			body.setVelocityY(250 + 100 * Math.random())
		})
	}

	public update() {
		this.player.update()
		this.bananas.getChildren().forEach((banana) => banana.update())
	}

	private spawnPlayer() {
		this.player = new Player({ scene: this, x: 100, y: 200, texture: "player" })
	}

	private spawnRandomBananas() {
		const line = new Phaser.Geom.Line(0, 0, 768 * 2, 0)
		const _bananas = []
		for (let i = 0; i < 10; i++) {
			const pt = line.getRandomPoint()
			const banana = new Banana({ scene: this, x: pt.x, y: pt.y, texture: "banana" })
			_bananas.push(banana)
		}
		this.bananas = this.physics.add.group(_bananas)
	}

	private drawBackground() {
		this.add.tileSprite(0, 0, 1366 * 2, 768 * 2, "background")
	}

	private loadBackground() {
		this.load.spritesheet("background", "/assets/Pixel Adventure/Background/Brown.png", { frameWidth: 64, frameHeight: 64 })
	}

	private loadAnimations() {
		this.load.spritesheet("player-idle", "/assets/Pixel Adventure/Main Characters/Mask Dude/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-idle", "/assets/animations/player-idle.json")

		this.load.spritesheet("player-run", "/assets/Pixel Adventure/Main Characters/Mask Dude/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-run", "/assets/animations/player-run.json")

		this.load.spritesheet("player-jump", "/assets/Pixel Adventure/Main Characters/Mask Dude/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-jump", "/assets/animations/player-jump.json")

		this.load.spritesheet("player-fall", "/assets/Pixel Adventure/Main Characters/Mask Dude/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("player-fall", "/assets/animations/player-fall.json")

		this.load.spritesheet("banana", "/assets/Pixel Adventure/Items/Fruits/Bananas.png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("banana-idle", "/assets/animations/banana-idle.json")
	}
}
