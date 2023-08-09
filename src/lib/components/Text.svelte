<script lang="ts">
	export let key = ''
	export let value = ''
</script>

<div class="flex flex-col my-4">
	<label>{key}</label>
	<input type="text" bind:value />
</div>

<style>
	input {
		@apply border border-black border-solid rounded p-2;
	}
</style>
