import { Player } from "./Player"

interface IPinkManConfig {
	scene: Phaser.Scene
	x: number
	y: number
}

export class PinkMan extends Player {

	public static readonly animationKeys = {
		APPEAR: "player-appearing",
		IDLE: "pink-man-idle",
		RUN: "pink-man-run",
		JUMP: "pink-man-jump",
		FALL: "pink-man-fall",
		DISAPPEAR: "player-disappearing",
	}

	public static loadResource(context: Phaser.Scene) {
		context.load.spritesheet(PinkMan.animationKeys.APPEAR, "/assets/Pixel Adventure/Main Characters/Appearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(PinkMan.animationKeys.APPEAR, "/assets/animations/player-appearing.json")

		context.load.spritesheet(PinkMan.animationKeys.DISAPPEAR, "/assets/Pixel Adventure/Main Characters/Desappearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(PinkMan.animationKeys.DISAPPEAR, "/assets/animations/player-disappearing.json")

		context.load.spritesheet(PinkMan.animationKeys.IDLE, "/assets/Pixel Adventure/Main Characters/Pink Man/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(PinkMan.animationKeys.IDLE, "/assets/animations/pink-man-idle.json")

		context.load.spritesheet(PinkMan.animationKeys.RUN, "/assets/Pixel Adventure/Main Characters/Pink Man/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(PinkMan.animationKeys.RUN, "/assets/animations/pink-man-run.json")

		context.load.spritesheet(PinkMan.animationKeys.JUMP, "/assets/Pixel Adventure/Main Characters/Pink Man/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(PinkMan.animationKeys.JUMP, "/assets/animations/pink-man-jump.json")

		context.load.spritesheet(PinkMan.animationKeys.FALL, "/assets/Pixel Adventure/Main Characters/Pink Man/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(PinkMan.animationKeys.FALL, "/assets/animations/pink-man-fall.json")
	}

	constructor(config: IPinkManConfig) {
		super({
			scene: config.scene,
			x: config.x,
			y: config.y,
			animationKeys: {
				jump: PinkMan.animationKeys.JUMP,
				fall: PinkMan.animationKeys.FALL,
				idle: PinkMan.animationKeys.IDLE,
				run: PinkMan.animationKeys.RUN,
				appear: PinkMan.animationKeys.APPEAR,
				disappear: PinkMan.animationKeys.DISAPPEAR,
			},
		})
	}

}
