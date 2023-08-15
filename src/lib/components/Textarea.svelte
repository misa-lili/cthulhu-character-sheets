<script lang="ts">
	export let key = ''
	export let value = ''
	export let readonly = false
</script>

{#if !readonly}
	<div class="flex flex-col w-full">
		<label class="pl-0.5 font-medium">{key}</label>
		<span contenteditable="true" autocomplete="off" role="textbox" bind:innerText={value} />
	</div>
{:else}
	<div class="flex flex-col w-full">
		<label class="pl-0.5 font-medium">{key}</label>
		<span contenteditable="false" autocomplete="off">{value}</span>
	</div>
{/if}

<style>
	span {
		@apply border border-black border-solid rounded p-2 bg-transparent w-full text-sm font-light min-h-[2.5rem];
	}

	span[contenteditable='false'] {
		@apply bg-black/5 cursor-not-allowed;
	}
</style>
