<script lang="ts">
	export let key: string = ''
	export let items: { display: string; value: any }[] = []
	export let value = null
	export let selected = ''
</script>

<div class="flex flex-col">
	<label>{key}</label>
	<select bind:value={selected} on:change>
		{#each items as item}
			<option value={item.value}>{item.display}</option>
		{/each}
	</select>
</div>

<style>
	select {
		@apply border border-black border-solid rounded p-2;
	}
</style>
