<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend class="font-bold px-1">{legend}</legend>
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</fieldset>

<style>
	fieldset {
		@apply border border-black border-solid rounded p-4;
	}
</style>
