import { sveltekit } from '@sveltejs/kit/vite'
import { type ViteDevServer, defineConfig } from 'vite'

import { Server } from 'socket.io'

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		io.on('connection', (socket) => {
			socket.emit('chat message', 'Hello, World 👋')
			socket.on('chat message', (data) => {
				io.emit('chat message', data)
			})
			socket.on('edit sheet', (data) => {
				socket.broadcast.emit('edit sheet', data)
			})
		})
	},
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
})
