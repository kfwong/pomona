import Peer from "peerjs"

const config = {
	host: "peerjs-signaler.herokuapp.com",
	path: "/",
	port: 443,
	secure: true,
	debug: 2,
}

export class Connection {

	public static Instance(id?: string) {
		return this.instance || (this.instance = new this(id))
	}

	private static instance: Connection

	public readonly id: string

	private peer: Peer
	private connection: Peer.DataConnection

	private _onConnectionEstablished: () => void

	private constructor(id?: string) {
		this.id = id
		this.peer = new Peer(id, config)

		this.peer.on("open", (assignedId) => {
			console.log("Connection to signaller established.")
			console.log(`[Assigned id]: `, assignedId)
		})

		this.peer.on("error", (error) => {
			console.error(error)
		})

		this.peer.on("disconnected", () => {
			console.log("Disconnected from signaller.")
		})

		this.peer.on("connection", (connection: Peer.DataConnection) => {
			console.log(`${connection.peer} requests to connect.`)

			connection.on("open", () => {
				console.log(`Connection to ${connection.peer} established.`)
				this._onConnectionEstablished()
			})

			connection.on("data", (data: any) => {
				console.log(`[${connection.peer}]: `, data)
			})

			connection.on("close", () => {
				console.log(`Connection to ${connection.peer} closed.`)
			})
		})

	}

	public join(id: string) {
		this.connection = this.peer.connect(id)

		this.connection.on("open", () => {
			console.log(`Connection to ${this.connection.peer} established.`)
		})

		this.connection.on("data", (data) => {
			console.log(`[${this.connection.peer}]: `, data)
		})

		this.connection.on("close", () => {
			console.log(`Connection to ${this.connection.peer} closed.`)
		})
	}

	public send(message: any) {
		if (this.connection) {
			this.connection.send(message)
		}
	}

	public set onConnectionEstablished(action: () => void) {
		this._onConnectionEstablished = action
	}
}
