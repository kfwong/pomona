import Peer from "peerjs"
import { config } from "../config"

export class Host {

	public static get Instance() {
		return this.instance || (this.instance = new this())
	}

	private static instance: Host
	private host: Peer

	private constructor() {
		this.host = new Peer(this.generateId(), config.peerJs)
		this.initalizeListeners()
	}

	public onOpen(doAction?: (assignedId: string) => void) {
		this.host.on("open", (id: string) => {
			console.log(`Assigned id: ${id}.`)
			if (doAction) {doAction(id)}
		})
	}

	public onConnecting(doAction?: (guestId: string) => void) {
		this.host.on("connection", (connection: any) => {
			console.log(`${connection.peer} attempting to establish connection.`)
			if (doAction) {doAction(connection.peer)}
		})
	}

	public onConnected(doAction?: (guestId: string) => void) {
		this.host.on("connection", (connection: any) => {
			connection.on("open", () => {
				console.log(`${connection.peer} joined.`)
				if (doAction) {doAction(connection.peer)}
			})
		})
	}

	public onData(doAction?: (guestId: string, data: any) => void) {
		this.host.on("connection", (connection: any) => {
			connection.on("data", (data: any) => {
				console.log(`Recvied data from ${connection.peer}:\n`, data)
				if (doAction) {doAction(connection.peer, data)}
			})
		})
	}

	public onClose(doAction?: (guestId: string) => void) {
		this.host.on("connection", (connection: any) => {
			connection.on("close", () => {
				console.log(`Disconnected from ${connection.peer}.`)
				if (doAction) {doAction(connection.peer)}
			})
		})
	}

	public onDisconnected(doAction?: () => void) {
		this.host.on("disconnected", () => {
			console.log("Disconnected from signaller.")
			if (doAction) {doAction()}
		})
	}

	public onError(doAction?: (error: any) =>  void) {
		this.host.on("error", (error: any) => {
			console.log(error)
			if (doAction) {doAction(error)}
		})
	}

	private initalizeListeners() {
		this.onOpen()
		this.onConnecting()
		this.onConnected()
		this.onData()
		this.onDisconnected()
		this.onClose()
		this.onError()
	}

	private generateId() {
		return Math.floor(100000 + Math.random() * 900000).pad(6)
	}
}
