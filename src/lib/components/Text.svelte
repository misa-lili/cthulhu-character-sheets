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
		@apply border border-black border-solid rounded py-2 bg-transparent font-light;
		font-size: var(--font-size, 0.875rem);
		line-height: var(--line-height, 1.25rem);
		width: var(--width, 100%);
		height: var(--height, 2.5rem);
		padding-left: var(--padding-left, 0.45rem);
	}

	input:read-only {
		@apply bg-black/10;
	}
</style>
