<script lang="ts">
	export let files: string = ''
</script>

<input type="file" bind:files on:change />

<style>
	input {
		@apply border border-black border-solid rounded p-2 cursor-pointer w-full tracking-widest font-light uppercase;
	}

	input:hover {
		@apply bg-black/10;
	}
</style>
