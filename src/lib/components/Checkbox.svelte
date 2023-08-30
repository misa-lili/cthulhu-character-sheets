<script lang="ts">
	import exp from 'constants'

	export let key: string = ''
	export let value: boolean = false
	export let height: number = 8
	export let width: number = 8
	export let textSize: string = 'text-base'
	export let gap: string = 'gap-4'
	export let disabled: boolean = false
</script>

<div class={`${textSize} flex items-center ${key ? gap : ''}`}>
	<input
		type="checkbox"
		class="appearance-none default:bg-transparent checked:bg-black/75"
		bind:checked={value}
		{disabled}
		on:change
	/>
	<label>{key}</label>
</div>

<style>
	input {
		@apply border border-black/10 border-solid rounded p-2 cursor-pointer;
		width: var(--width, 2rem);
		height: var(--height, 2rem);
	}

	input:disabled {
		@apply cursor-not-allowed;
	}
</style>
