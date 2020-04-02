import { Player } from "./Player"

interface INinjaFrogConfig {
	scene: Phaser.Scene
	x: number
	y: number
}

export class NinjaFrog extends Player {

	public static readonly animationKeys = {
		APPEAR: "player-appearing",
		IDLE: "ninja-frog-idle",
		RUN: "ninja-frog-run",
		JUMP: "ninja-frog-jump",
		FALL: "ninja-frog-fall",
		DISAPPEAR: "player-disappearing",
	}

	public static loadResource(context: Phaser.Scene) {
		context.load.spritesheet(NinjaFrog.animationKeys.APPEAR, "/assets/Pixel Adventure/Main Characters/Appearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(NinjaFrog.animationKeys.APPEAR, "/assets/animations/player-appearing.json")

		context.load.spritesheet(NinjaFrog.animationKeys.DISAPPEAR, "/assets/Pixel Adventure/Main Characters/Desappearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(NinjaFrog.animationKeys.DISAPPEAR, "/assets/animations/player-disappearing.json")

		context.load.spritesheet(NinjaFrog.animationKeys.IDLE, "/assets/Pixel Adventure/Main Characters/Ninja Frog/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(NinjaFrog.animationKeys.IDLE, "/assets/animations/ninja-frog-idle.json")

		context.load.spritesheet(NinjaFrog.animationKeys.RUN, "/assets/Pixel Adventure/Main Characters/Ninja Frog/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(NinjaFrog.animationKeys.RUN, "/assets/animations/ninja-frog-run.json")

		context.load.spritesheet(NinjaFrog.animationKeys.JUMP, "/assets/Pixel Adventure/Main Characters/Ninja Frog/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(NinjaFrog.animationKeys.JUMP, "/assets/animations/ninja-frog-jump.json")

		context.load.spritesheet(NinjaFrog.animationKeys.FALL, "/assets/Pixel Adventure/Main Characters/Ninja Frog/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(NinjaFrog.animationKeys.FALL, "/assets/animations/ninja-frog-fall.json")
	}

	constructor(config: INinjaFrogConfig) {
		super({
			scene: config.scene,
			x: config.x,
			y: config.y,
			animationKeys: {
				jump: NinjaFrog.animationKeys.JUMP,
				fall: NinjaFrog.animationKeys.FALL,
				idle: NinjaFrog.animationKeys.IDLE,
				run: NinjaFrog.animationKeys.RUN,
				appear: NinjaFrog.animationKeys.APPEAR,
				disappear: NinjaFrog.animationKeys.DISAPPEAR,
			},
		})
	}

}
