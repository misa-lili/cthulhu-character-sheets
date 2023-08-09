<script lang="ts">
	export let key: string = ''
	export let value: boolean = false
</script>

<div class={`flex items-center ${key ? 'gap-4' : ''}`}>
	<input type="checkbox" bind:checked={value} />
	<label>{key}</label>
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2 w-8 h-8;
	}
</style>
