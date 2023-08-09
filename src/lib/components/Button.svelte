<script lang="ts">
	export let value: string = ''
</script>

<input type="button" {value} on:click />

<style>
	input {
		@apply border border-black border-solid rounded p-2 cursor-pointer;
	}

	input:hover {
		@apply bg-gray-200;
	}
</style>
