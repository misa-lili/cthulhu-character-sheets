<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend class="font-medium text-sm uppercase">{legend}</legend>
	<slot />
</fieldset>

<style>
	legend {
		@apply pb-2;
	}
	fieldset {
		@apply pb-2;
	}
</style>
