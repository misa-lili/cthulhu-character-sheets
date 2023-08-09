<script lang="ts">
	export let value: string = ''
	export let fixed: boolean = false
	export let bottom: boolean = false
	export let right: boolean = false
</script>

<input type="button" {value} class:right-0={right} class:bottom-0={bottom} class:fixed on:click />

<style>
	input {
		@apply border border-black border-solid rounded-full w-16 h-16 bg-white m-2 cursor-pointer;
	}

	input:hover {
		@apply bg-gray-200;
	}
</style>
