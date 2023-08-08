<script lang="ts">
	import { t } from '$lib/translations'

	export let key = ''
	export let value = ''

	const uuid = crypto.randomUUID()
</script>

<div class="row">
	<label for={uuid}>{key ? $t(key) : ''}</label>
	<input id={uuid} type="text" bind:value />
</div>

<style>
	input {
		width: var(--width);
	}
</style>
