<script lang="ts">
	export let key = ''
	export let value = ''
	export let readonly = false
</script>

{#if !readonly}
	<div class="flex flex-col w-full text-xs">
		<label class="pl-0.5 text-xs">{key}</label>
		<div
			class="textarea"
			contenteditable="true"
			autocomplete="off"
			role="textbox"
			bind:innerHTML={value}
		/>
	</div>
{:else}
	<div class="flex flex-col w-full">
		<label class="pl-0.5 text-xs">{key}</label>
		<div class="textarea" contenteditable="false" autocomplete="off" bind:innerHTML={value} />
	</div>
{/if}

<style>
	.textarea {
		@apply bg-black/5 rounded p-2 w-full text-xs font-serif font-light min-h-[24px] outline-none;
	}

	.textarea[contenteditable='false'] {
		@apply cursor-not-allowed text-xs;
	}

	.textarea[contenteditable='true'] {
		@apply text-xs;
	}
</style>
