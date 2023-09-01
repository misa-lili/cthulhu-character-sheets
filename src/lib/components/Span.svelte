<script lang="ts">
	export let readonly = false
	export let value = ''
	export let customClass = ''
	export let tabindex = 0
</script>

{#if !readonly}
	<span {tabindex} contenteditable="true" bind:innerText={value} class={customClass} on:input />
{:else}
	<span contenteditable="false" class={customClass}>{value}</span>
{/if}

<style>
	span[contenteditable='true'] {
		@apply cursor-pointer outline-none;
	}
	span[contenteditable='true']:focus {
		@apply cursor-text;
	}
	span[contenteditable='false'] {
		@apply cursor-not-allowed;
	}
</style>
