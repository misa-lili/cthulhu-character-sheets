<script lang="ts">
	export let cols: number = 12
</script>

<div class={`flex items-center gap-1 basis-${cols}/12`}>
	<slot />
</div>
