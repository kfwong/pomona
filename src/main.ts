import Hammer from "hammerjs"
import isMobile from "ismobilejs"
import * as Phaser from "phaser"
import { Connection } from "./connection/Connection"
import "./game/Command"
import { Game } from "./game/Game"
import "./game/Number.extension"
import { GamePadScene } from "./scene/GamePadScene"
import { GameScene } from "./scene/GameScene"
import { HUDScene } from "./scene/HUDScene"

const scene = isMobile(navigator.userAgent).any ? [GamePadScene] : [GameScene, HUDScene]
const width = isMobile(navigator.userAgent).any ? window.innerWidth : 1366
const height = isMobile(navigator.userAgent).any ? window.innerHeight : 768

if (isMobile(navigator.userAgent).any) { setupGestureListeners() }

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

// WebRTC connections
const peer = Connection.Instance(randomId())
if (isMobile(navigator.userAgent).any) {
	const roomId = showRoomIdPrompt()
	peer.join(roomId)
}

function showRoomIdPrompt() {
	const sixDigitsRegex = /^\d{6}$/
	let roomId: string = null
	do {
		roomId = window.prompt("Enter six digits room id:")
	}while (roomId === null || !sixDigitsRegex.test(roomId.trim()))

	return roomId
}

function randomId() {
	return Math.floor(100000 + Math.random() * 900000).pad(6)
}

// Gesture commands
function setupGestureListeners() {
	const container = document.getElementsByTagName("html")[0]
	const gesture = new Hammer(container, null)
	gesture.on("swipeleft", (e) => peer.send("left"))
	gesture.on("swiperight", (e) => peer.send("right"))
	gesture.on("tap", (e) => peer.send("jump"))
}
