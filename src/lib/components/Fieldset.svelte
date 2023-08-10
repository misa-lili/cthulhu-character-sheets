<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend class="font-bold px-1 text-lg">{legend}</legend>
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</fieldset>

<style>
	fieldset {
		@apply p-4;
	}
</style>
