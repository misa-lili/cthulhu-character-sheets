<script lang="ts">
	export let cols: number = 12
	export let gap: number = 1
	export let customClass: string = ''
</script>

<div class={`flex items-center gap-${gap} basis-${cols}/12 ${customClass}`}>
	<slot />
</div>
