<script lang="ts">
	export let values: any[] = []
	export let value = values[0] || null
	export let selected = ''
</script>

<div>
	<select bind:value={selected}>
		{#each values as value}
			<option>{value}</option>
		{/each}
	</select>
</div>
