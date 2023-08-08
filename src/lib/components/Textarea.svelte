<script lang="ts">
	import { t } from '$lib/translations'

	export let key = ''
	export let value = ''
	export let rows = 2

	const uuid = crypto.randomUUID()
</script>

<div class="field-row-stacked">
	<label for={uuid}>{$t(key)}</label>
	<textarea id={uuid} {rows} bind:value />
</div>

<style>
	div.field-row-stacked {
		width: var(--width);
	}
</style>
