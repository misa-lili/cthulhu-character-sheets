<script lang="ts">
	import { autoWidth } from '$lib/directives/autoWidth'
	import { tabEnter } from '$lib/directives/tabEnter'
	import { onMount } from 'svelte'

	export let label: string | null = null
	export let value = '00'
	export let readonly = true

	let inputElement: HTMLInputElement
	let virtualDom: HTMLElement

	onMount(() => {
		onBlur()
		onInput()
	})

	function onFocus() {
		if (readonly) return
		inputElement.select()
	}

	function onBlur() {
		if (value == 0 || value == null) value = '00'
		value = Number(value).toString().padStart(2, '0')
	}

	function onInput() {
		if (isNaN(value)) value = ''
		if (value === null) value = ''
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
	<div class="border border-black/20 rounded-lg px-1">
		{#if readonly}
			<span class="cursor-not-allowed">{value}</span>
		{:else}
			<input
				use:tabEnter
				use:autoWidth={{ type: 'number' }}
				type="number"
				class="cursor-pointer focus:cursor-text outline-none min-w-[13px]"
				style="width: 12px;"
				bind:this={inputElement}
				bind:value
				on:focus={onFocus}
				on:blur={onBlur}
				on:input={onInput}
			/>
			<div class="virtual-dom absolute inline-block opacity-0 pl-[1px]" bind:this={virtualDom}>
				{value}
			</div>
		{/if}
		<span class="text-fuchsia-500/90 text-xs leading-none">
			{half}
		</span>
		<span class="text-rose-500/90 text-xs leading-none">
			{fifth}
		</span>
	</div>
</div>
