import isMobile from "ismobilejs"
import * as Phaser from "phaser"
import { Game } from "./game/Game"
import { JoinScene } from "./scene/JoinScene"
import { RoomScene } from "./scene/RoomScene"

const scene = isMobile(navigator.userAgent).any ? [JoinScene] : [RoomScene]
const width = isMobile(navigator.userAgent).any ? window.outerWidth : 1366
const height = isMobile(navigator.userAgent).any ? window.outerHeight : 768

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
