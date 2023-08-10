<script lang="ts">
	export let key = ''
	export let value = ''
	export let readonly = false
	export let pointer = false
</script>

<div class="flex flex-col">
	<label class="pl-0.5">{key}</label>
	<input
		tabindex={readonly ? -1 : 0}
		type="text"
		bind:value
		autocomplete="off"
		{readonly}
		class:cursor-pointer={pointer}
		on:click
	/>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2 w-full h-10 bg-transparent;
	}

	input:read-only {
		@apply bg-black/10;
	}
</style>
