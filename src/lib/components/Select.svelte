<script lang="ts">
	export let key: string = ''
	export let items: { display: string; value: any }[] = []
	export let value = null
	export let selected = ''
	export let disabled = false
</script>

<div class="flex flex-col w-full">
	{#if key}
		<label class="pl-0.5">{key}</label>
	{/if}
	<select bind:value={selected} on:change {disabled}>
		{#each items as item}
			<option value={item.value}>{item.display}</option>
		{/each}
	</select>
</div>

<style>
	select {
		@apply bg-black/5 rounded h-[24px] font-light cursor-pointer text-xs;
		padding-top: var(--padding-top, 0px);
		padding-bottom: var(--padding-bottom, 2px);
		padding-left: var(--padding-left, 10px);
		padding-right: var(--padding-right, 10px);
	}

	select:disabled {
		@apply cursor-not-allowed;
	}

	label {
		@apply text-xs;
	}
</style>
