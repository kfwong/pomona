import Peer from "peerjs"
import { config } from "../config"

export class Guest {

	public static Instance(hostId: string) {
		return this.instance || (this.instance = new this(hostId))
	}

	private static instance: Guest
	private hostId: string
	private guest: Peer

	private constructor(hostId: string) {
		this.hostId = hostId
		this.guest = new Peer(this.generateId(), {...config.peerJs, debug: 2})
		this.initalizeListeners()
	}

	public onOpen(doAction?: (assignedId: string) => void) {
		this.guest.on("open", (id: string) => {
			console.log(`Assigned id: ${id}.`)
			this.guest.connect(this.hostId)
			if (doAction) { doAction(id) }
		})
	}

	public onConnected(doAction?: (guestId: string) => void) {
		this.guest.on("connection", (connection: any) => {
			connection.on("open", () => {
				console.log(`Joined ${connection.peer}.`)
				if (doAction) {doAction(connection.peer) }
			})
		})
	}

	public onDisconnected(doAction?: () => void) {
		this.guest.on("disconnected", () => {
			console.log("Disconnected from signaller.")
			if (doAction) { doAction() }
		})
	}

	public onError(doAction?: (error: any) =>  void) {
		this.guest.on("error", (error: any) => {
			if (doAction) { doAction(error) }
		})
	}

	private initalizeListeners() {
		this.onOpen()
		this.onConnected()
		this.onDisconnected()
		this.onError()
	}

	private generateId() {
		return Math.floor(100000 + Math.random() * 900000).pad(6)
	}

}
