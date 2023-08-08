<script lang="ts">
	import { t } from '$lib/translations'

	export let key = ''
	export let value = 0
	export let readonly = false

	const uuid = crypto.randomUUID()

	function roll100() {
		alert(`1d100: ${Math.floor(Math.random() * 100) + 1}`)
	}
</script>

<div class="row">
	<label for={uuid} on:click={roll100}>{key ? $t(key) : ''}</label>
	<input id={uuid} type="number" bind:value {readonly} />
</div>

<style>
	input {
		width: 25px;
	}
</style>
