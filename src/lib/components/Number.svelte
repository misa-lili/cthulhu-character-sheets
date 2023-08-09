<script lang="ts">
	export let key: string = ''
	export let value: number = 0
	export let readonly: boolean = false
	export let withHints: boolean = false
</script>

<div class="flex flex-col w-full">
	<label>{key}</label>
	<div class="flex w-full gap-1">
		<input type="number" bind:value {readonly} autocomplete="off" min="0" max="99" />
		{#if withHints}
			<div class="flex items-center justify-between gap-1">
				<input type="number" value={(value / 2).toFixed(0)} readonly />
				<input type="number" value={(value / 5).toFixed(0)} readonly />
			</div>
		{/if}
	</div>
</div>

<style>
	input {
		@apply border border-black border-solid rounded w-full p-2;
	}

	input:read-only {
		@apply bg-gray-200;
	}
</style>
