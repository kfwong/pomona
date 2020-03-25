import * as Phaser from "phaser"
import { Command } from "./Command"

interface IPlayerConfig {
	scene: Phaser.Scene
	x: number
	y: number
	animationKeys: {
		jump: string | Phaser.Animations.Animation
		fall: string | Phaser.Animations.Animation
		idle: string | Phaser.Animations.Animation
		run: string | Phaser.Animations.Animation
		appear: string | Phaser.Animations.Animation,
	}
	texture?: string
	frame?: string | number
}

export class Player extends Phaser.GameObjects.Sprite {

	public set action(value: Command) {
		this.currentAction = value
	}

	public body!: Phaser.Physics.Arcade.Body
	public readonly config: IPlayerConfig
	private currentAction: Command
	private context: Phaser.Scene
	private isSpawning: boolean

	private velocity: number

	constructor(config: IPlayerConfig) {
		super(config.scene, config.x, config.y, config.texture, config.frame)
		this.config = config
		this.context = config.scene
		this.isSpawning = true
		this.velocity = 500
		this.initSprite()
	}

	public update() {
		this.handleInput()
		this.handleAnimation()
	}

	private isJumping() {
		return !(this.body.onFloor() || this.body.blocked.down)
	}

	private initSprite() {
		this.context.physics.world.enable(this)
		this.body.syncBounds = true
		this.on("animationcomplete", (_animation: any, _frame: any) => {
			if (this.anims.getCurrentKey() === this.config.animationKeys.appear) {
				this.body.setCollideWorldBounds(true)
				this.body.setGravityY(1000)
				this.setScale(2.5, 2.5)
				this.isSpawning = false
				this.removeAllListeners()
			}
		}, this)
		this.context.add.existing(this)
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

	private handleInput() {
		if (this.currentAction === "jump" && !this.isJumping()) {
			this.jump()
		} else if (this.currentAction === "left") {
			this.runLeft()
		} else if (this.currentAction === "right") {
			this.runRight()
		} else {
			this.stop()
		}
	}

	private handleAnimation() {
		if (this.isSpawning) {
			this.anims.play(this.config.animationKeys.appear, true)
			return
		}
		if (this.body.velocity.y < 0) {
			this.anims.play(this.config.animationKeys.jump, true)
		} else if (this.body.velocity.y > 0) {
			this.anims.play(this.config.animationKeys.fall)
		} else if (this.body.velocity.x === 0) {
			this.anims.play(this.config.animationKeys.idle, true)
		} else if (this.body.velocity.x < 0) {
			this.anims.play(this.config.animationKeys.run, true)
			this.setFlipX(true)
		} else if (this.body.velocity.x > 0) {
			this.anims.play(this.config.animationKeys.run, true)
			this.setFlipX(false)
		}
	}

}
