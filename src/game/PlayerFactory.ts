import { MaskDude } from "./MaskDude"
import { NinjaFrog } from "./NinjaFrog"
import { PinkMan } from "./PinkMan"
import { Player } from "./Player"
import { VirtualGuy } from "./VirtualGuy"

type PlayerType = "mask-dude" | "ninja-frog" | "pink-man" | "virtual-guy"

interface IPlayerFactoryConfig extends IPlayerContext {
	type: PlayerType
}

interface IPlayerContext {
	scene: Phaser.Scene
	x: number
	y: number
}

export class PlayerFactory {
	public static loadResource(context: Phaser.Scene) {
		MaskDude.loadResource(context)
		NinjaFrog.loadResource(context)
		VirtualGuy.loadResource(context)
		PinkMan.loadResource(context)
	}

	public create(config: IPlayerFactoryConfig): Player {
		switch (config.type) {
			case "mask-dude": return new MaskDude(config)
			case "ninja-frog": return new NinjaFrog(config)
			case "pink-man": return new PinkMan(config)
			case "virtual-guy": return new VirtualGuy(config)
		}
	}

	public random(config: IPlayerContext): Player {
		const playerTypes: PlayerType[] = ["mask-dude", "ninja-frog", "pink-man", "virtual-guy"]
		const randomPlayerType = playerTypes[Math.floor(Math.random() * playerTypes.length)]
		return this.create({
			type: randomPlayerType,
			...config,
		})
	}
}
