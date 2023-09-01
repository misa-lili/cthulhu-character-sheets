<script lang="ts">
	export let id: string = crypto.randomUUID()
	export let value: string = ''
	export let disabled: boolean = false
</script>

<input {id} type="button" {value} on:click {disabled} />

<style>
	input {
		@apply border border-black/10 border-solid rounded p-1 cursor-pointer w-full tracking-widest font-light uppercase;

		@apply text-black/70 text-xs;
	}

	input[type='button']:disabled {
		@apply bg-black/5 cursor-not-allowed;
	}

	input:hover {
		@apply bg-black/5;
	}
</style>
