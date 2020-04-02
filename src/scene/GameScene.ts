import { Map } from "immutable"
import * as Phaser from "phaser"
import { Connection } from "../connection/Connection"
import { Banana } from "../game/Banana"
import { Command } from "../game/Command"
import { Player } from "../game/Player"
import { PlayerFactory } from "../game/PlayerFactory"

export class GameScene extends Phaser.Scene {
	private connection: Connection
	private playerFactory: PlayerFactory

	private players: Map<string, Player>
	private bananas: Phaser.GameObjects.Group

	constructor() {
		super({ key: "GameScene" })
		this.connection = Connection.Instance()
		this.players = Map()
		this.playerFactory = new PlayerFactory()
	}

	public preload() {
		this.loadBackground()
		Banana.loadResource(this)
		PlayerFactory.loadResource(this)

		// this.load.spritesheet("player-disappearing", "/assets/Pixel Adventure/Main Characters/Desappearing (96x96).png" , { frameWidth: 96, frameHeight: 96 })
	}

	public create() {
		this.drawBackground()
		this.spawnBananas()
		this.handlePlayer()
		this.handleBananasDropOnGround()

		// this.anims.create({
		// 	key: "player-disappearing",
		// 	frames: this.anims.generateFrameNumbers("player-disappearing", {start: 0, end: 10}),
		// 	frameRate: 30,
		// 	repeat: -1,
		// })

		// console.log(JSON.stringify(this.anims.toJSON("player-disappearing")))
	}

	public update() {
		this.players.forEach((player: Player) => player.update())
		this.bananas.getChildren().forEach((banana: Banana) => banana.update())
	}

	private handlePlayer() {
		this.connection.onConnectionEstablished = (id) => {
			this.spawnPlayer(id)
			this.handlePlayerCatchesBanana(id)
		}
		this.connection.onReceivedData = (id: string, data: Command) => {
			this.handlePlayerAction(id, data)
		}
		this.connection.onConnectionClosed = (id) => {
			this.despawnPlayer(id)
		}
	}

	private handlePlayerAction(id: string, command: Command) {
		this.players.get(id).action = command
	}

	private spawnPlayer(id: string) {
		const spawningPoint = this.randomSpawningPoint()
		const player = this.playerFactory.create({
			type: "pink-man",
			scene: this,
			x: spawningPoint.x,
			y: 600,
		})
		this.players = this.players.set(id, player)
		player.spawn()
	}

	private despawnPlayer(id: string) {
		const player = this.players.get(id)
		if (!player) { return }
		player.despawn()
		this.players = this.players.delete(id)
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

	private handlePlayerCatchesBanana(id: string) {
		this.physics.add.overlap(this.players.get(id), this.bananas, (player, banana: Banana) => {
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
}
