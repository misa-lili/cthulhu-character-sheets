<script lang="ts">
	export let key: string = ''
	export let value: number = 0
	export let readonly: boolean = false
	export let withHints: boolean = false
	export let placeholder: string = ''
	export let textSize: string = 'text-sm'
	export let textPosition: string = 'text-left'

	$: half = Math.floor(value / 2)
	$: fifth = Math.floor(value / 5)
</script>

<div class="flex flex-col w-full">
	{#if key}
		<label class="pl-0.5 overflow-visible">{key}</label>
	{/if}
	<div class="flex w-full">
		<input
			tabindex={readonly ? -1 : 0}
			class={`${textSize} ${textPosition} ${readonly ? 'bg-black/10' : 'bg-transparent'}`}
			type="number"
			bind:value
			{placeholder}
			{readonly}
			autocomplete="off"
			min="0"
			max="99"
			on:click={(event) => {
				const value = event.target.value
				event.target.value = ''
				event.target.value = value
			}}
		/>
		{#if withHints}
			<div class="flex flex-col text-xs">
				<input
					tabindex="-1"
					class="misa-hint bg-green-500/10"
					type="number"
					value={half}
					readonly
				/>
				<input tabindex="-1" class="misa-hint bg-red-500/10" type="number" value={fifth} readonly />
			</div>
		{/if}
	</div>
</div>

<style>
	input {
		@apply border border-black border-solid rounded py-2 font-light;
		height: var(--height, 2.5rem);
		width: var(--width, 100%);
		padding-left: var(--padding-left, 0.45rem);
		padding-right: var(--padding-right, 0rem);
	}

	.misa-hint {
		@apply cursor-not-allowed;
		height: var(--height--hint, 1.25rem);
		width: var(--width--hint, 2rem);
		padding-left: var(--padding-left--hint, 0.45rem);
		padding-right: var(--padding-right--hint, 0rem);
		text-align: var(--text-align--hint, left);
	}

	label {
		font-size: var(--font-size--label, 0.875rem);
		height: var(--height--label, 1.25rem);
	}
</style>
