import * as Phaser from "phaser"
import { Banana } from "../game/Banana"
import { Player } from "../game/Player"

export class GameScene extends Phaser.Scene {
	private player: Player
	private bananas: Phaser.GameObjects.Group

	constructor() {
		super({
			key: "GameScene",
		})
	}

	public preload() {
		this.loadBackground()
		this.loadAnimations()
	}

	public create() {
		this.drawBackground()
		this.spawnPlayer()
		this.spawnBananas()

		this.handleBananasDropOnGround()
		this.handlePlayerCatchesBanana()
	}

	public update() {
		this.player.update()
		this.bananas.getChildren().forEach((banana) => banana.update())
	}

	private spawnPlayer() {
		const spawningPoint = this.randomSpawningPoint()
		this.player = new Player({ scene: this, x: spawningPoint.x, y: 600, texture: "player" })
	}

	private spawnBananas() {
		const _bananas = []
		for (let i = 0; i < 10; i++) {
			const spawnPoint = this.randomSpawningPoint()
			const banana = new Banana({ scene: this, x: spawnPoint.x, y: 0, texture: "banana" })
			_bananas.push(banana)
		}
		this.bananas = this.physics.add.group(_bananas)
	}

	private respawnBanana(banana: Banana) {
		const spawningPoint = this.randomSpawningPoint()
		banana.body.y = 0
		banana.body.x = spawningPoint.x
		banana.body.setVelocityY(250 + 100 * Math.random())
	}

	private handleBananasDropOnGround() {
		this.physics.world.on("worldbounds", (body: Phaser.Physics.Arcade.Body) => {
			if (body.gameObject instanceof Banana) {
				this.respawnBanana(body.gameObject)
			}
		})
	}

	private handlePlayerCatchesBanana() {
		this.physics.add.overlap(this.player, this.bananas, (player, banana: Banana) => {
			this.events.emit("catchedbanana", player, banana)
			this.respawnBanana(banana)
		})
	}

	private randomSpawningPoint() {
		return new Phaser.Geom.Line(0, 0, 768 * 2, 1366 * 2).getRandomPoint()
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

		this.load.spritesheet("banana-idle", "/assets/Pixel Adventure/Items/Fruits/Bananas.png", { frameWidth: 32, frameHeight: 32 })
		this.load.animation("banana-idle", "/assets/animations/banana-idle.json")
	}
}
