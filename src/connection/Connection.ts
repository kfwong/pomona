import { Map } from "immutable"
import Peer from "peerjs"
import { Command } from "../game/Command"

const config = {
	host: "peerjs-signaler.herokuapp.com",
	path: "/",
	port: 443,
	secure: true,
	debug: 3,
}

export class Connection {

	public static Instance(id?: string) {
		return this.instance || (this.instance = new this(id))
	}

	private static instance: Connection

	public readonly id: string

	private peer: Peer
	private connections: Map<string, Peer.DataConnection>

	private _onConnectionEstablished: (id: string) => void
	private _onReceivedData: (id: string, command: Command) => void
	private _onConnectionClosed: (id: string) => void

	private constructor(id?: string) {
		this.id = id
		this.peer = new Peer(id, config)
		this.connections = Map()

		this.peer.on("open", (assignedId) => {
			console.log("Connection to signaller established.")
			console.log(`[Assigned id]: `, assignedId)
		})

		this.peer.on("error", (error) => {
			console.error("ERROR:" + error)
		})

		this.peer.on("disconnected", () => {
			console.log("Disconnected from signaller.")
		})

		this.peer.on("close", () => {
			console.log("close from ")
		})

		this.peer.on("connection", (connection: Peer.DataConnection) => {
			console.log(`${connection.peer} requests to connect.`)

			connection.on("open", () => {
				console.log(`Connection to ${connection.peer} established.`)
				this.connections = this.connections.set(connection.peer, connection)
				this._onConnectionEstablished(connection.peer)
			})

			connection.on("data", (data: Command) => {
				console.log(`[${connection.peer}]: `, data)
				this._onReceivedData(connection.peer, data)
			})

			connection.on("close", () => {
				console.log(`Connection to ${connection.peer} closed.`)
			})

			connection.peerConnection.addEventListener("iceconnectionstatechange", (event) => {
				if (connection.peerConnection.iceConnectionState === "disconnected") {
					this.connections = this.connections.delete(connection.peer)
					this._onConnectionClosed(connection.peer)
				}
			})
		})

	}

	public join(id: string) {
		const connection = this.peer.connect(id)

		connection.on("open", () => {
			console.log(`Connection to ${connection.peer} established.`)
			this.connections = this.connections.set(id, connection)
		})

		connection.on("data", (data) => {
			console.log(`[${connection.peer}]: `, data)
		})

		connection.on("close", () => {
			console.log(`Connection to ${connection.peer} closed.`)
			this.connections = this.connections.delete(id)
		})
	}

	public send(id: string, data: Command) {
		if (!this.connections.isEmpty()) {
			this.connections.get(id).send(data)
		}
	}

	public broadcast(data: Command) {
		this.connections.forEach( (connection) => connection.send(data))
	}

	public set onConnectionEstablished(action: (id: string) => void) {
		this._onConnectionEstablished = action
	}

	public set onReceivedData(action: (id: string, data: Command) => void) {
		this._onReceivedData = action
	}

	public set onConnectionClosed(action: (id: string) => void) {
		this._onConnectionClosed = action
	}
}
