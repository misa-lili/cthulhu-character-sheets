<script lang="ts">
	export let key: string = ''
	export let value: number = 0
	export let readonly: boolean = false
	export let withHints: boolean = false

	$: half = Math.floor(value / 2)
	$: fifth = Math.floor(value / 5)
</script>

<div class="flex flex-col w-full">
	<label class="pl-0.5">{key}</label>
	<div class="flex w-full gap-1">
		<input
			tabindex={readonly ? -1 : 0}
			class={`w-full h-10 ${readonly ? 'bg-black/10' : 'bg-transparent'}`}
			type="number"
			bind:value
			{readonly}
			autocomplete="off"
			min="0"
			max="99"
		/>
		{#if withHints}
			<div class="flex flex-col text-sm">
				<input tabindex="-1" class="w-10 h-5 bg-green-500/10" type="number" value={half} readonly />
				<input tabindex="-1" class="w-10 h-5 bg-red-500/10" type="number" value={fifth} readonly />
			</div>
		{/if}
	</div>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2;
	}

	input:read-only {
		@apply cursor-not-allowed;
	}
</style>
