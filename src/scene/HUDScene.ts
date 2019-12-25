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
		const info = this.add.text(10, 10, "Score: 0", { font: "48px MonsterFriendFore", fill: "#7a5632" })

		const ourGame = this.scene.get("GameScene")

		ourGame.events.on("catchedbanana", () => {

			this.score += 1

			info.setText("Score: " + this.score)

		}, this)
	}

}
