import { Game } from "./game/Game"
import { FirstScene } from "./scene/FirstScene"

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
	parent: "game",
	backgroundColor: "#000000",
	scene: FirstScene,
})
