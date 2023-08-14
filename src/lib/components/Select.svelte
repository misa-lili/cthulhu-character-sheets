<script lang="ts">
	export let key: string = ''
	export let items: { display: string; value: any }[] = []
	export let value = null
	export let selected = ''
</script>

<div class="flex flex-col">
	{#if key}
		<label class="pl-0.5">{key}</label>
	{/if}
	<select bind:value={selected} on:change>
		{#each items as item}
			<option value={item.value}>{item.display}</option>
		{/each}
	</select>
</div>

<style>
	select {
		@apply border border-black border-solid rounded p-2 h-10 bg-transparent font-light;
	}

	label {
		font-size: var(--font-size--label, 0.875rem);
		height: var(--height--label, 1.25rem);
	}
</style>
