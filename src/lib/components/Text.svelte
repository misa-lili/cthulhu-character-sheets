<script lang="ts">
	export let key = ''
	export let value = ''
	export let readonly = false
</script>

<div class="flex flex-col">
	<label>{key}</label>
	<input type="text" bind:value autocomplete="off" {readonly} on:click />
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2 w-full;
	}

	input:read-only {
		@apply bg-gray-200;
	}
</style>
