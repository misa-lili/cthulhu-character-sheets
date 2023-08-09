<script lang="ts">
	export let key: string = ''
	export let value: number = 0
	export let readonly: boolean = false
	export let withHints: boolean = false
</script>

<div class="flex flex-col my-4">
	<label>{key}</label>
	<div class="flex w-full">
		<input type="number" bind:value {readonly} />
		{#if withHints}
			<div class="flex flex-col items-center justify-between">
				<input class="half h-2" type="number" value={(value / 2).toFixed(0)} readonly />
				<input class="fifth h-2" type="number" value={(value / 5).toFixed(0)} readonly />
			</div>
		{/if}
	</div>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2 w-full;
	}

	input:read-only {
		@apply bg-gray-200;
	}

	.half {
		@apply w-12 ml-2;
	}

	.fifth {
		@apply w-12 ml-2;
	}
</style>
