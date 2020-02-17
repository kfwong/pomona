import * as Phaser from "phaser"
import { config } from "../config"
import { Guest } from "../game/Guest"

export class JoinScene extends Phaser.Scene {
	private guest: Guest
	private roomId: string

	constructor() {
		super({
			active: true,
			key: "JoinScene",
		})
	}

	public preload() {
		this.loadBackground()
	}

	public create() {
		this.drawBackground()
		this.roomId = this.showRoomIdPrompt()
		this.guest = Guest.Instance(this.roomId)

		this.add.text(10, 10, this.roomId, { font: "48px MonsterFriendFore", fill: config.color1 })
	}

	private showRoomIdPrompt() {
		const sixDigitsRegex = /^\d{6}$/
		let roomId: string = null
		do {
			roomId = window.prompt("Enter six digits room id:")
		}while (roomId === null || !sixDigitsRegex.test(roomId.trim()))

		return roomId
	}

	private drawBackground() {
		this.add.tileSprite(0, 0, 1366 * 2, 768 * 2, "background")
	}

	private loadBackground() {
		this.load.spritesheet("background", "/assets/Pixel Adventure/Background/Blue.png", { frameWidth: 64, frameHeight: 64 })
	}

}
