<script lang="ts">
	export let key: string = ''
	export let value: boolean = false
	export let height: number = 8
	export let width: number = 8
	export let textSize: string = 'text-base'
	export let gap: string = 'gap-4'
</script>

<div class={`${textSize} flex items-center ${key ? gap : ''}`}>
	<input
		type="checkbox"
		class="appearance-none default:bg-transparent checked:bg-black"
		bind:checked={value}
	/>
	<label>{key}</label>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2 cursor-pointer;
		width: var(--width, 2rem);
		height: var(--height, 2rem);
	}
</style>
