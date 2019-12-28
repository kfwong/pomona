import * as Phaser from "phaser"

export class HUDScene extends Phaser.Scene {
	private score: number

	constructor() {
		super({
			active: true,
			key: "HUDScene",
		})
		this.score = 0
	}

	public create() {
		const scoreboard = this.add.text(10, 10, "Score: 0", { font: "48px MonsterFriendFore", fill: "#7a5632" })

		const gameScene = this.scene.get("GameScene")

		gameScene.events.on("catchedbanana", () => {

			this.score += 1

			scoreboard.setText("Score: " + this.score)

		}, this)
	}

}
