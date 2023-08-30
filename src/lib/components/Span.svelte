<script lang="ts">
	export let readonly = false
	export let value = ''
	export let customClass = ''
</script>

{#if !readonly}
	<span contenteditable="true" bind:innerText={value} class={customClass} on:input />
{:else}
	<span contenteditable="false" class={customClass}>{value}</span>
{/if}

<style>
	span[contenteditable='false'] {
		@apply cursor-not-allowed;
	}
</style>
