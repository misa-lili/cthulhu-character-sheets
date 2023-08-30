<script lang="ts">
	import { io } from 'socket.io-client'
	import LZString from 'lz-string'
	import { t, l, locales, locale } from '$lib/translations'
	import { onMount } from 'svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Number from '$lib/components/Number.svelte'
	import Text from '$lib/components/Text.svelte'
	import Textarea from '$lib/components/Textarea.svelte'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Title from '$lib/components/Title.svelte'
	import Button from '$lib/components/Button.svelte'
	import Select from '$lib/components/Select.svelte'
	import Row from '$lib/components/Row.svelte'
	import Card from '$lib/components/Card.svelte'
	import Col from '$lib/components/Col.svelte'
	import File from '$lib/components/File.svelte'
	import { initialData } from '$lib/models/data'
	import { page } from '$app/stores'
	import { compress, decompress } from '$lib/utils/LZString'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import Chatbox from '$lib/mixins/Chatbox.svelte'
	import { sheet, isOwner } from '$lib/store.ts'
	import Portrait from '$lib/mixins/Portrait.svelte'
	import Investigator from '$lib/mixins/Investigator.svelte'
	import Characteristics from '$lib/mixins/Characteristics.svelte'
	import Status from '$lib/mixins/Status.svelte'
	import Skills from '$lib/mixins/Skills.svelte'
	import Combat from '$lib/mixins/Combat.svelte'
	import Weapons from '$lib/mixins/Weapons.svelte'
	import Story from '$lib/mixins/Story.svelte'
	import Fellow from '$lib/mixins/Fellow.svelte'
	export let data: PageData

	onMount(() => {
		if (!isNew) window.localStorage.setItem('id', id)
	})

	const socket = io()
	const uuid = crypto.randomUUID()
	socket.on('edit sheet', (msg) => {
		console.log('on edit $sheet')
		if (msg.uuid === uuid) return
		if (msg.id === 'new') return
		if (msg.id === id) setSheet(msg.$sheet)
	})

	function setSheet(s) {
		$sheet = s
	}

	let previousSheet: Sheet = initialData
	$sheet = data.message

	function emitSheet() {
		if (isGuest) return
		if (id === 'new') return
		socket.emit('edit sheet', { uuid, id, sheet: $sheet })
	}

	$: isGuest = !$isOwner

	$: id = $page.url.pathname.slice(1) || ''
	$: isNew = id === 'new'
	$: if (isNew) $isOwner = true
	$: $locale = $sheet?.language || 'en'

	let pw: string = ''

	async function changePW() {
		if (isGuest) return
		const key = id
		const value = window.prompt($t('New password?'))
		if (!value) return
		const value2 = window.prompt($t('Again new password?'))
		if (!value2) return
		if (value !== value2) return alert($t('New passwords do not match.'))
		const response = await fetch(`/api/v1/passwords?key=${key}&value=${value}&current=${pw}`, {
			method: 'PUT',
		})
		const body = await response.json()
		pw = body.message
		if (!body.ok) return alert('Error: ' + body.message)
		alert('Password changed.')
		$isOwner = true
	}

	async function signIn() {
		const key = id
		const value = window.prompt($t('Password?'))
		const response = await fetch(`/api/v1/passwords?key=${key}&value=${value}`)
		const body = await response.json()
		pw = body.message
		if (!body.ok) return alert('Wrong password.')
		alert('Signed in.')
		$isOwner = true
	}

	function signOut() {
		alert('Signed out.')
		$isOwner = false
	}

	function newSheet() {
		const confirm = window.confirm(
			$t(
				'Are you sure you want to reset? This will delete all your data. This action cannot be undone. please backup your url data before continuing.',
			),
		)
		if (!confirm) return
		$sheet = initialData
		goto('/new')
	}

	function roll() {
		const d10x10 = Math.floor(Math.random() * 10) * 10
		const d10 = Math.floor(Math.random() * 10)
		const d10x10_extra = Math.floor(Math.random() * 10) * 10
		const d10x10_extra2 = Math.floor(Math.random() * 10) * 10
		const d20 = Math.floor(Math.random() * 20) + 1
		const d8 = Math.floor(Math.random() * 8) + 1
		const d6 = Math.floor(Math.random() * 6) + 1
		const d4 = Math.floor(Math.random() * 4) + 1
		const d3 = Math.floor(Math.random() * 3) + 1
		const text = `1d10x10=${d10x10}\n1d10=${d10}\n1d10x10_extra=${d10x10_extra}\n1d10x10_extra2=${d10x10_extra2}\n1d20=${d20}\n1d8=${d8}\n1d6=${d6}\n1d4=${d4}\n1d3=${d3}`
		alert(text)
	}

	async function save() {
		if (isGuest) return
		let pw1
		let pw2
		if (isNew && !pw) {
			pw1 = window.prompt($t('New password?'))
			if (!pw1) return alert($t('You have to set password first. Please try again.'))
			pw2 = window.prompt($t('Again new password?'))
			if (!pw2) return alert($t('You have to set password first. Please try again.'))
			if (pw1 !== pw2) return alert($t('New passwords do not match. Please try again.'))
			pw = pw1
		}
		if (!pw) {
			return alert($t('You have to set password first. Please try again.'))
		}

		await uploadBlobsAndReplace()

		if (isNew) {
			const value = compress($sheet)
			const response = await fetch(`/api/v1/sheets`, {
				method: 'POST',
				body: JSON.stringify({ value, pw }),
			})
			const body = await response.json()
			if (body.ok) {
				alert($t('Saved!'))
				goto(`/${body.message}`)
				return
			} else return alert($t('Failed to save.'))
		} else {
			const value = compress($sheet)
			const response = await fetch(`/api/v1/sheets?key=${id}&value=${value}`, { method: 'PUT' })
			const body = await response.json()
			if (body.ok) {
				emitSheet()
				return alert($t('Saved!'))
			} else return alert($t('Failed to save.'))
		}
	}

	function share() {
		const url = `${window.location.origin}/${id}`
		window.prompt($t('Copy this URL to share.'), url)
	}

	async function uploadBlobsAndReplace() {
		const blobImgs = Array.from(document.querySelectorAll('img[src^="blob:"]'))
		for await (const img of blobImgs) {
			const blob = await fetch(img.src).then((r) => r.blob())
			const formdata = new FormData()
			formdata.append('image', blob)

			const response = await fetch(`/api/v1/images`, {
				method: 'POST',
				body: formdata,
			})

			if (!response.ok) {
				alert($t('Failed to upload image.'))
				console.error(response)
				return
			}

			const body = await response.json()

			if (body.status !== 200) {
				alert($t('Failed to upload image.'))
				console.error(body)
				return
			}

			$sheet.note = $sheet.note.replaceAll(img.src, body.message)
		}
	}
</script>

<Title>{$t('title')}</Title>

<Fieldset legend={$t('environment')}>
	<div class="grid gap-y-3 gap-x-9 grid-cols-3 sm:grid-cols-3 md:grid-cols-3">
		<!-- TODO: 언어 바꾸기 전에 세이브 해야함 -->
		<Select
			--font-size="0.75rem"
			key={$t('language')}
			items={$locales.map((s) => ({ display: $t(s), value: s }))}
			bind:selected={$sheet.language}
			on:change={(event) => {
				$locale = event.target.value
			}}
		/>
		<Select
			--font-size="0.75rem"
			key={$t('edition')}
			items={[{ display: $t('7E'), value: '7E' }]}
			bind:selected={$sheet.edition}
			disabled={isGuest}
		/>
		<Select
			--font-size="0.75rem"
			key={$t('era')}
			items={[{ display: $t('20s'), value: '20s' }]}
			bind:selected={$sheet.era}
			disabled={isGuest}
		/>
	</div>

	{#if $isOwner && !isNew}
		<Row>
			<Button id="btn--change-pw" value={$t('Change Password')} on:click={changePW} />
		</Row>
	{/if}
</Fieldset>

<Portrait />

<Investigator />

<Characteristics />

<Status />

<Skills />

<Combat />

<Weapons />

<Story />

<Fellow />

<Fieldset legend={$t('note')}>
	<Textarea bind:value={$sheet.note} readonly={isGuest} />
</Fieldset>

<Fieldset>
	<div class="text-center font-mono">
		<a href="https://github.com/misa-lili/cthulhu-character-sheets">Github</a>
	</div>
</Fieldset>

<div class="text-5xl fixed right-0 bottom-0 p-4 flex flex-col space-y-2 z-50">
	{#if isGuest}
		<div class="cursor-pointer" on:click={signIn}>🔒</div>
	{:else if $isOwner && !isNew}
		<div class="cursor-pointer" on:click={signOut}>🔓</div>
	{/if}
	{#if !isNew}
		<div class="cursor-pointer" on:click={newSheet}>🆕</div>
	{/if}
	{#if $isOwner}
		<div class="cursor-pointer" on:click={save}>💾</div>
	{/if}
	{#if !isNew}
		<div class="cursor-pointer" on:click={share}>🔗</div>
	{/if}
	<div class="cursor-pointer" on:click={roll}>🎲</div>
</div>

<!-- <Chatbox socket {$sheet} /> -->

<style>
	:global(heading, legend, label, th, input[type='button']) {
		@apply font-serif;
	}
</style>
