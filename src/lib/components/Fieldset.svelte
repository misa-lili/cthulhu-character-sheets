<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend>{legend}</legend>
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</fieldset>

<style>
	fieldset {
		@apply border border-black border-solid rounded p-4;
	}
</style>
