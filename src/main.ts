import * as Phaser from "phaser"
import { Game } from "./game/Game"
import { GameScene } from "./scene/GameScene"
import { HUDScene } from "./scene/HUDScene"

export const game = new Game({
	title: "pomona",
	type: Phaser.AUTO,
	width: 1366,
	height: 768,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	backgroundColor: "#000000",
	scene: [GameScene, HUDScene],
})
