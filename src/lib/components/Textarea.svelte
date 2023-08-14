<script lang="ts">
	export let key = ''
	export let value = ''
	export let rows = 2
</script>

<div class="flex flex-col w-full">
	<label class="pl-0.5 font-medium">{key}</label>
	<span {rows} autocomplete="off" role="textbox" contenteditable bind:innerText={value} />
</div>

<style>
	span {
		@apply border border-black border-solid rounded p-2 bg-transparent w-full text-sm font-light;
	}
</style>
