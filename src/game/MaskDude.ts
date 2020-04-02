import { Player } from "./Player"

interface IMaskDudeConfig {
	scene: Phaser.Scene
	x: number
	y: number
}

export class MaskDude extends Player {

	public static readonly animationKeys = {
		APPEAR: "player-appearing",
		IDLE: "mask-dude-idle",
		RUN: "mask-dude-run",
		JUMP: "mask-dude-jump",
		FALL: "mask-dude-fall",
		DISAPPEAR: "player-disappearing",
	}

	public static loadResource(context: Phaser.Scene) {
		context.load.spritesheet(MaskDude.animationKeys.APPEAR, "/assets/Pixel Adventure/Main Characters/Appearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(MaskDude.animationKeys.APPEAR, "/assets/animations/player-appearing.json")

		context.load.spritesheet(MaskDude.animationKeys.DISAPPEAR, "/assets/Pixel Adventure/Main Characters/Desappearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(MaskDude.animationKeys.DISAPPEAR, "/assets/animations/player-disappearing.json")

		context.load.spritesheet(MaskDude.animationKeys.IDLE, "/assets/Pixel Adventure/Main Characters/Mask Dude/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(MaskDude.animationKeys.IDLE, "/assets/animations/mask-dude-idle.json")

		context.load.spritesheet(MaskDude.animationKeys.RUN, "/assets/Pixel Adventure/Main Characters/Mask Dude/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(MaskDude.animationKeys.RUN, "/assets/animations/mask-dude-run.json")

		context.load.spritesheet(MaskDude.animationKeys.JUMP, "/assets/Pixel Adventure/Main Characters/Mask Dude/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(MaskDude.animationKeys.JUMP, "/assets/animations/mask-dude-jump.json")

		context.load.spritesheet(MaskDude.animationKeys.FALL, "/assets/Pixel Adventure/Main Characters/Mask Dude/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(MaskDude.animationKeys.FALL, "/assets/animations/mask-dude-fall.json")
	}

	constructor(config: IMaskDudeConfig) {
		super({
			scene: config.scene,
			x: config.x,
			y: config.y,
			animationKeys: {
				jump: MaskDude.animationKeys.JUMP,
				fall: MaskDude.animationKeys.FALL,
				idle: MaskDude.animationKeys.IDLE,
				run: MaskDude.animationKeys.RUN,
				appear: MaskDude.animationKeys.APPEAR,
				disappear: MaskDude.animationKeys.DISAPPEAR,
			},
		})
	}

}
