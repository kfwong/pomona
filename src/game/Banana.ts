import * as Phaser from "phaser"

export class Banana extends Phaser.GameObjects.Sprite {
	public body!: Phaser.Physics.Arcade.Body
	private currentScene: Phaser.Scene

	constructor(params: any) {
		super(params.scene, params.x, params.y, params.texture, params.frame)
		this.currentScene = params.scene
		this.initSprite()
	}

	public update() {
		this.handleAnimation()
	}

	private initSprite() {
		this.currentScene.physics.world.enable(this)

		this.setScale(1.5, 1.5)
		this.body.setCollideWorldBounds(true)
		this.body.onWorldBounds = true

		this.currentScene.add.existing(this)
	}

	private handleAnimation() {
		this.anims.play("banana-idle", true)
	}

}
