<script lang="ts">
	export let key = ''
	export let value = ''
	export let rows = 2
</script>

<div class="flex flex-col">
	<label class="pl-0.5 font-medium">{key}</label>
	<textarea {rows} bind:value autocomplete="off" />
</div>

<style>
	textarea {
		@apply border border-black border-solid rounded p-2 bg-transparent;
	}
</style>
