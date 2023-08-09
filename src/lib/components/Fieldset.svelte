<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend>{legend}</legend>
	<slot />
</fieldset>

<style>
	fieldset {
		@apply border border-black border-solid rounded p-4;
	}
</style>
