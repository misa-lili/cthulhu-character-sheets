<script lang="ts">
	import exp from 'constants'

	export let key: string = ''
	export let value: boolean = false
	export let height: number = 8
	export let width: number = 8
	export let textSize: string = 'text-base'
	export let gap: string = 'gap-4'
	export let disabled: boolean = false
	export let tabindex: number = -1
</script>

<div class={`${textSize} ${key ? gap : ''}`}>
	<label class="flex items-center gap-2">
		<input
			{tabindex}
			type="checkbox"
			class="appearance-none default:bg-transparent checked:bg-black/75 outline-none"
			bind:checked={value}
			{disabled}
			on:change
		/>
		{key}
	</label>
</div>

<style>
	input {
		@apply border border-black/10 border-solid rounded p-2 cursor-pointer;
		width: var(--width, 2rem);
		height: var(--height, 2rem);
	}

	label {
		@apply cursor-pointer;
	}

	input:disabled {
		@apply cursor-not-allowed;
	}
</style>
