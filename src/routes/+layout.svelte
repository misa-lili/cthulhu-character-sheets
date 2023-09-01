<script>
	import Container from '$lib/components/Container.svelte'
	import '../app.css'
</script>

<Container>
	<slot />
</Container>

<style>
	:global(body) {
		@apply font-serif text-xs;
	}
</style>
