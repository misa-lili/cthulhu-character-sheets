<script lang="ts">
	export let legend: string = ''
</script>

<fieldset>
	<legend class="font-medium px-1 text-base uppercase">{legend}</legend>
	<div class="flex flex-col space-y-3">
		<slot />
	</div>
</fieldset>

<style>
	fieldset {
		@apply p-4;
	}
</style>
