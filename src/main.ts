import isMobile from "ismobilejs"
import * as Phaser from "phaser"
import { Connection } from "./connection/Connection"
import { Game } from "./game/Game"
import { JoinScene } from "./scene/JoinScene"
import { RoomScene } from "./scene/RoomScene"

const scene = isMobile(navigator.userAgent).any ? [JoinScene] : [RoomScene]
const width = isMobile(navigator.userAgent).any ? window.innerWidth : 1366
const height = isMobile(navigator.userAgent).any ? window.innerHeight : 768

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
