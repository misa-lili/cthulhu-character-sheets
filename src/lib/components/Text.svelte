<script lang="ts">
	export let key = ''
	export let value = ''
	export let readonly = false
	export let pointer = false
</script>

<div class="flex flex-col w-full text-xs">
	{#if key}
		<label class="pl-0.5 pt-1.5 overflow-visible leading-none text-xs">{key}</label>
	{/if}
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
		@apply rounded bg-black/5 text-xs font-light font-serif outline-none;
		font-size: var(--font-size, 12px);
		line-height: var(--line-height, 1);
		width: var(--width, 100%);
		height: var(--height, 24px);
		padding-top: var(--padding-top, 0px);
		padding-bottom: var(--padding-bottom, 2px);
		padding-left: var(--padding-left, 10px);
	}

	input:read-only {
		@apply cursor-not-allowed;
	}

	label {
		font-size: var(--font-size--label, 12px);
		height: var(--height--label, 18px);
	}
</style>
