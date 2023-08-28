<script lang="ts">
	export let readonly = false
	export let value = ''
	export let customClass = ''
</script>

{#if !readonly}
	<span contenteditable="true" bind:innerText={value} class={customClass} />
{:else}
	<span contenteditable="false" class={customClass}>{value}</span>
{/if}
