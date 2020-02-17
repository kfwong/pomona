import * as Phaser from "phaser"

export class Player extends Phaser.GameObjects.Sprite {
	public body!: Phaser.Physics.Arcade.Body
	private currentScene: Phaser.Scene
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private isSpawning: boolean

	private velocity: number

	constructor(params: any) {
		super(params.scene, params.x, params.y, params.texture, params.frame)
		this.currentScene = params.scene
		this.cursors = this.currentScene.input.keyboard.createCursorKeys()
		this.isSpawning = true
		this.velocity = 500
		this.initSprite()
	}

	public update() {
		this.handleInput()
		this.handleAnimation()
	}

	private initSprite() {
		this.currentScene.physics.world.enable(this)
		this.body.syncBounds = true
		this.on("animationcomplete", (_animation: any, _frame: any) => {
			if (this.anims.getCurrentKey() === "player-appearing") {
				this.body.setCollideWorldBounds(true)
				this.body.setGravityY(1000)
				this.setScale(2.5, 2.5)
				this.isSpawning = false
				this.removeAllListeners()
			}
		}, this)
		this.currentScene.add.existing(this)
	}

	private jump() {
		this.body.setVelocityY(-this.velocity * 1.5)
	}
	private runLeft() {
		this.body.setVelocityX(-this.velocity)
	}
	private runRight() {
		this.body.setVelocityX(this.velocity)
	}

	private stop() {
		this.body.setVelocityX(0)
	}

	private get isJumping() {
		return !(this.body.onFloor() ||
			this.body.blocked.down)
	}

	private handleInput() {
		if (this.cursors.space.isDown && !this.isJumping) {
			this.jump()
		} else if (this.cursors.left.isDown) {
			this.runLeft()
		} else if (this.cursors.right.isDown) {
			this.runRight()
		} else {
			this.stop()
		}
	}

	private handleAnimation() {
		if (this.isSpawning) {
			this.anims.play("player-appearing", true)
			return
		}
		if (this.body.velocity.y < 0) {
			this.anims.play("player-jump", true)
		} else if (this.body.velocity.y > 0) {
			this.anims.play("player-fall")
		} else if (this.body.velocity.x === 0) {
			this.anims.play("player-idle", true)
		} else if (this.body.velocity.x < 0) {
			this.anims.play("player-run", true)
			this.setFlipX(true)
		} else if (this.body.velocity.x > 0) {
			this.anims.play("player-run", true)
			this.setFlipX(false)
		}
	}

}
