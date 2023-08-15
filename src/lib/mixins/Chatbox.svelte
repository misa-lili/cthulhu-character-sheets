<script lang="ts">
	import { io } from 'socket.io-client'

	export let sheet: Sheet | null = null

	$: name = sheet.name

	$: chat = {
		messages: [],
		input: '',
	}

	const socket = io()

	socket.on('chat message', (message) => {
		chat.messages = [...chat.messages, message]
		setTimeout(() => {
			document.querySelector('.chat--messages').scrollTo(0, 999999)
		}, 0)
	})

	function emitSocket(event) {
		if (event.key !== 'Enter') return
		socket.emit('chat message', `${name}: ${chat.input}`)
		chat.input = ''
	}
</script>

<div class="chat--container">
	<div class="chat--box">
		<div class="chat--messages">
			{#each chat.messages as message}
				<div>{message}</div>
			{/each}
		</div>
		<div
			contenteditable="true"
			class="chat--input"
			on:keypress={emitSocket}
			bind:innerText={chat.input}
		/>
	</div>
</div>

<style>
	div.chat--container {
		@apply fixed left-0 bottom-0 w-full h-24;
	}

	div.chat--box {
		@apply rounded-t-3xl mx-auto w-80 h-full p-4
    border bg-white;
	}

	div.chat--messages {
		@apply h-8 overflow-scroll;
	}

	div.chat--input {
		@apply border rounded-lg h-8;
	}
</style>
