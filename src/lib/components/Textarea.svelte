<script lang="ts">
	export let key = ''
	export let value = ''
	export let rows = 2
</script>

<div class="flex flex-col my-6">
	<label>{key}</label>
	<textarea {rows} bind:value />
</div>

<style>
	textarea {
		@apply border border-black border-solid rounded p-4;
	}
</style>
