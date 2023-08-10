<script lang="ts">
	export let key: string = ''
	export let value: boolean = false
	export let height: number = 8
	export let width: number = 8
</script>

<div class={`flex items-center ${key ? 'gap-4' : ''}`}>
	<input
		type="checkbox"
		class="appearance-none default:bg-transparent checked:bg-black"
		bind:checked={value}
	/>
	<label>{key}</label>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2;
		width: var(--width, 2rem);
		height: var(--height, 2rem);
	}
</style>
