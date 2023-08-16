<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	onMount(() => {
		if (window.localStorage.getItem('id')) {
			goto(`/${window.localStorage.getItem('id')}`)
		} else {
			goto('/new')
		}
	})
</script>
