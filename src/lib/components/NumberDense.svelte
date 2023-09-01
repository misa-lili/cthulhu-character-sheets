<script lang="ts">
	import { onMount } from 'svelte'

	export let label: string | null = null
	export let value = null
	export let readonly = true

	let element: HTMLElement

	onMount(() => {
		if (value == 0 || value == null) value = '00'
		value = Number(value).toString().padStart(2, '0')
	})

	function onFocus() {
		if (readonly) return

		let range = new Range()
		range.setStart(element, 0)
		range.setEnd(element, 1)
		window.getSelection().removeAllRanges()
		window.getSelection().addRange(range)
	}

	function onBlur() {
		if (readonly) return
		if (value == 0 || value == null) value = '00'
		value = Number(value).toString().padStart(2, '0')
	}

	function onInput() {
		if (isNaN(value)) value = ''
	}

	$: half = Math.floor(Number(value) / 2)
		.toString()
		.padStart(2, '0')

	$: fifth = Math.floor(Number(value) / 5)
		.toString()
		.padStart(2, '0')
</script>

<div class="text-xs font-serif leading-none flex justify-between items-center">
	<div>
		{#if label}
			<span class="label">{label}</span>
		{/if}
	</div>
	<div>
		{#if readonly}
			<span class="cursor-not-allowed">{value}</span>
		{:else}
			<span
				bind:this={element}
				class="cursor-pointer focus:cursor-text outline-none"
				contenteditable="true"
				bind:innerText={value}
				on:focus={onFocus}
				on:blur={onBlur}
				on:input={onInput}
			/>
		{/if}
		<span> / </span>
		<span class="text-fuchsia-500 text-xs leading-none">
			{half}
		</span>
		<span> / </span>
		<span class="text-rose-500 text-xs leading-none">
			{fifth}
		</span>
	</div>
</div>
