import * as Phaser from "phaser"

export class Banana extends Phaser.GameObjects.Sprite {

	public static readonly animationKeys = {
		IDLE: "banana-idle",
	}

	public static loadResource(context: Phaser.Scene) {
		context.load.spritesheet(Banana.animationKeys.IDLE, "/assets/Pixel Adventure/Items/Fruits/Bananas.png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(Banana.animationKeys.IDLE, "/assets/animations/banana-idle.json")
	}

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
		this.body.immovable = true

		this.currentScene.add.existing(this)
	}

	private handleAnimation() {
		this.anims.play(Banana.animationKeys.IDLE, true)
	}

}
