import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { handler } from '../build/handler.js'

const port = 8081
const app = express()
const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
	socket.emit('chat message', 'Hello, World 👋')
	socket.on('chat message', (data) => {
		io.emit('chat message', data)
	})
	socket.on('edit sheet', (data) => {
		socket.broadcast.emit('edit sheet', data)
	})
})

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler)

server.listen(port)
