import { Player } from "./Player"

interface IVirtualGuyConfig {
	scene: Phaser.Scene
	x: number
	y: number
}

export class VirtualGuy extends Player {

	public static readonly animationKeys = {
		APPEAR: "player-appearing",
		IDLE: "virtual-guy-idle",
		RUN: "virtual-guy-run",
		JUMP: "virtual-guy-jump",
		FALL: "virtual-guy-fall",
		DISAPPEAR: "player-disappearing",
	}

	public static loadResource(context: Phaser.Scene) {
		context.load.spritesheet(VirtualGuy.animationKeys.APPEAR, "/assets/Pixel Adventure/Main Characters/Appearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(VirtualGuy.animationKeys.APPEAR, "/assets/animations/player-appearing.json")

		context.load.spritesheet(VirtualGuy.animationKeys.DISAPPEAR, "/assets/Pixel Adventure/Main Characters/Desappearing (96x96).png", { frameWidth: 96, frameHeight: 96 })
		context.load.animation(VirtualGuy.animationKeys.DISAPPEAR, "/assets/animations/player-disappearing.json")

		context.load.spritesheet(VirtualGuy.animationKeys.IDLE, "/assets/Pixel Adventure/Main Characters/Virtual Guy/Idle (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(VirtualGuy.animationKeys.IDLE, "/assets/animations/virtual-guy-idle.json")

		context.load.spritesheet(VirtualGuy.animationKeys.RUN, "/assets/Pixel Adventure/Main Characters/Virtual Guy/Run (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(VirtualGuy.animationKeys.RUN, "/assets/animations/virtual-guy-run.json")

		context.load.spritesheet(VirtualGuy.animationKeys.JUMP, "/assets/Pixel Adventure/Main Characters/Virtual Guy/Jump (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(VirtualGuy.animationKeys.JUMP, "/assets/animations/virtual-guy-jump.json")

		context.load.spritesheet(VirtualGuy.animationKeys.FALL, "/assets/Pixel Adventure/Main Characters/Virtual Guy/Fall (32x32).png", { frameWidth: 32, frameHeight: 32 })
		context.load.animation(VirtualGuy.animationKeys.FALL, "/assets/animations/virtual-guy-fall.json")
	}

	constructor(config: IVirtualGuyConfig) {
		super({
			scene: config.scene,
			x: config.x,
			y: config.y,
			animationKeys: {
				jump: VirtualGuy.animationKeys.JUMP,
				fall: VirtualGuy.animationKeys.FALL,
				idle: VirtualGuy.animationKeys.IDLE,
				run: VirtualGuy.animationKeys.RUN,
				appear: VirtualGuy.animationKeys.APPEAR,
				disappear: VirtualGuy.animationKeys.DISAPPEAR,
			},
		})
	}

}
