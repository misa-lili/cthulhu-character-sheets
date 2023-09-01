<script lang="ts">
	export let key: string = ''
	export let value: number | null = null
	export let readonly: boolean = false
	export let withHints: boolean = false
	export let placeholder: string = ''
	export let textSize: string = 'text-xs'
	export let textPosition: string = 'text-left'

	$: half = Math.floor(Number(value) / 2)
		.toString()
		.padStart(2, '0')

	$: fifth = Math.floor(Number(value) / 5)
		.toString()
		.padStart(2, '0')
</script>

<div class="flex flex-col w-full">
	{#if key}
		<label class="pl-0.5 pt-1.5 overflow-visible text-xs leading-none">{key}</label>
	{/if}
	<div class="flex w-full">
		<input
			tabindex={readonly ? -1 : 0}
			class={`flex-grow ${textSize} ${textPosition} ${readonly ? 'bg-black/5' : 'bg-transparent'}`}
			type="number"
			bind:value
			{placeholder}
			{readonly}
			autocomplete="off"
			min="0"
			max="99"
			on:click={(event) => {
				const value = event.target.value
				event.target.value = null
				if (value == 0) return
				event.target.value = value
			}}
			on:change
		/>
		{#if withHints}
			<div class="flex flex-col">
				<input
					tabindex="-1"
					class="misa-hint text-fuchsia-500"
					type="number"
					value={half}
					readonly
				/>
				<input tabindex="-1" class="misa-hint text-rose-500" type="number" value={fifth} readonly />
			</div>
		{/if}
	</div>
</div>

<style>
	input {
		@apply rounded bg-black/5 overflow-x-scroll outline-none font-serif;
		font-size: var(--font-size, 12px);
		line-height: var(--line-height, 1);
		width: var(--width, 100%);
		height: var(--height, 24px);
		padding-left: var(--padding-left, 0.45rem);
		padding-right: var(--padding-right, 0.45rem);
	}

	input:read-only {
		@apply cursor-not-allowed overflow-x-scroll;
	}

	.misa-hint {
		@apply cursor-not-allowed;
		background: transparent;
		font-size: 10px;
		line-height: 16px;
		height: var(--height--hint, 12px);
		width: var(--width--hint, 22px);
		padding-left: var(--padding-left--hint, 0);
		padding-right: var(--padding-right--hint, 0);
		margin-top: -1px;
		text-align: var(--text-align--hint, center);
	}

	label {
		font-size: var(--font-size--label, 12px);
		height: var(--height--label, 18px);
	}
</style>
