<script lang="ts">
	export let files: string = ''
	export let disabled: boolean = false
</script>

<input type="file" bind:files on:change {disabled} />

<style>
	input {
		@apply border border-black border-solid rounded p-2 cursor-pointer w-full tracking-widest font-light uppercase;
	}

	input:hover {
		@apply bg-black/5;
	}

	input:disabled {
		@apply bg-black/5 cursor-not-allowed;
	}
</style>
