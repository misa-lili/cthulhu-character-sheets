<script lang="ts">
	import { t } from '$lib/translations'

	export let key = ''
	export let value = false

	const uuid = crypto.randomUUID()
</script>

{#if key}
	<div class="field-row">
		<input id={uuid} type="checkbox" bind:checked={value} />
		<label for={uuid}>{$t(key)}</label>
	</div>
{:else}
	<div class="field-row">
		<input id={uuid} type="checkbox" bind:checked={value} />
		<label for={uuid} style="transform: translate(0px, 0px) !important" />
	</div>
{/if}

<style>
	input[type='checkbox']:checked + label:after {
		content: '';
		display: block;
		height: 7px;
		left: -16px;
		position: absolute;
		top: -3px;
		width: 7px;
	}
</style>
