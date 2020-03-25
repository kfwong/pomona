import Hammer from "hammerjs"
import isMobile from "ismobilejs"
import { Connection } from "./connection/Connection"
import "./extension/Number.extension"

let joinedRoomId: string

// Webrtc connection
export function setupConnection() {
	const peer = Connection.Instance(randomId())
	if (isMobile(navigator.userAgent).any) {
		const roomId = showRoomIdPrompt()
		peer.join(roomId)
		joinedRoomId = roomId
	}
	return peer
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
export function setupGestureListeners(peer: Connection) {
	if (!isMobile(navigator.userAgent).any) { return }

	const container = document.getElementsByTagName("html")[0]
	const gesture = new Hammer(container, null)
	gesture.on("swipeleft", (e) => peer.send(joinedRoomId, "left"))
	gesture.on("swiperight", (e) => peer.send(joinedRoomId, "right"))
	gesture.on("tap", (e) => peer.send(joinedRoomId, "jump"))
}
