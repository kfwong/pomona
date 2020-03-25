import isMobile from "ismobilejs"
import * as Phaser from "phaser"
import { Game } from "./game/Game"
import { GamePadScene } from "./scene/GamePadScene"
import { GameScene } from "./scene/GameScene"
import { HUDScene } from "./scene/HUDScene"
import { setupConnection, setupGestureListeners } from "./setup"

const connection = setupConnection()
setupGestureListeners(connection)

const isMobileAgent = isMobile(navigator.userAgent).any
const scene = isMobileAgent ? [GamePadScene] : [GameScene, HUDScene]
const width = isMobileAgent ? window.innerWidth : 1366
const height = isMobileAgent ? window.innerHeight : 768

export const game = new Game({
	title: "pomona",
	type: Phaser.AUTO,
	width,
	height,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	backgroundColor: "#000000",
	scene,
})
