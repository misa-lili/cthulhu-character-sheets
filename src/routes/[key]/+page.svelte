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
	export let data: PageData

	onMount(() => {
		if (!isNew) window.localStorage.setItem('id', id)
	})

	const socket = io()
	const uuid = crypto.randomUUID()
	socket.on('edit sheet', (msg) => {
		console.log('on edit sheet')
		if (msg.uuid === uuid) return
		if (msg.id === 'new') return
		if (msg.id === id) setSheet(msg.sheet)
	})

	function setSheet(s) {
		sheet = s
	}

	let previousSheet: Sheet = initialData
	let sheet: Sheet = data.message

	function emitSheet() {
		if (isGuest) return
		if (id === 'new') return
		socket.emit('edit sheet', { uuid, id, sheet })
	}

	let files: File[] = []

	let isOwner: boolean = false
	$: isGuest = !isOwner

	$: id = $page.url.pathname.slice(1) || ''
	$: isNew = id === 'new'
	$: if (isNew) isOwner = true
	$: $locale = sheet.language

	let pw: string = ''

	$: skills = Object.entries(sheet?.skills).sort((a, b) => {
		const aKey = $t(a[0])
		const bKey = $t(b[0])
		const result = aKey.localeCompare(bKey)
		return result
	})

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
		isOwner = true
	}

	async function signIn() {
		const key = id
		const value = window.prompt($t('Password?'))
		const response = await fetch(`/api/v1/passwords?key=${key}&value=${value}`)
		const body = await response.json()
		pw = body.message
		if (!body.ok) return alert('Wrong password.')
		alert('Signed in.')
		isOwner = true
	}

	function signOut() {
		alert('Signed out.')
		isOwner = false
	}

	function newSheet() {
		const confirm = window.confirm(
			$t(
				'Are you sure you want to reset? This will delete all your data. This action cannot be undone. please backup your url data before continuing.',
			),
		)
		if (!confirm) return
		sheet = initialData
		goto('/new')
	}

	function addSkill() {
		if (isGuest) return
		const skillName = window.prompt($t('Skill name?'))

		if (!skillName) return
		if (sheet.skills[skillName]) return alert($t('Skill already exists.'))

		sheet.skills[skillName] = { value: 0, isOccupation: false }
	}

	function removeSkill(idx: number) {
		if (isGuest) return
		const key = skills[idx][0]
		const confirm = window.confirm(`${$t('Remove skill?')} ${$t(key)}`)
		if (!confirm) return
		delete sheet.skills[key]
		sheet = sheet
	}

	function addWeapon() {
		if (isGuest) return
		const weaponName = window.prompt($t('Weapon name?'))
		if (!weaponName) return
		sheet.weapons = [
			...sheet.weapons,
			{
				weapon: weaponName,
				skill: 0,
				damage: '1d3',
				numberOfAttacks: 1,
				range: 20,
				ammo: 0,
				malfunction: false,
			},
		]
	}

	function removeWeapon(idx: number) {
		if (isGuest) return
		const key = sheet.weapons[idx].weapon
		const confirm = window.confirm(`${$t('Remove weapon?')} ${$t(key)}`)
		if (!confirm) return
		sheet.weapons.splice(idx, 1)
		sheet = sheet
	}

	function addFellow() {
		if (isGuest) return
		const fellowName = window.prompt($t('Fellow name?'))
		if (!fellowName) return
		sheet.fellowInvestigators = [
			...sheet.fellowInvestigators,
			{
				character: fellowName,
				player: '',
			},
		]
	}

	function removeFellow(idx: number) {
		if (isGuest) return
		const key = sheet.fellowInvestigators[idx].character
		const confirm = window.confirm(`${$t('Remove fellow?')} ${$t(key)}`)
		if (!confirm) return
		sheet.fellowInvestigators.splice(idx, 1)
		sheet = sheet
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
			const value = compress(sheet)
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
			const value = compress(sheet)
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

	async function upload() {
		if (isGuest) return

		const formdata = new FormData()
		formdata.append('image', files[0])

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

		sheet.portraitURL = body.message
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

			sheet.note = sheet.note.replaceAll(img.src, body.message)
		}
	}
</script>

<Title>{$t('title')}</Title>

<Fieldset legend={$t('environment')}>
	<Row>
		<Row cols="4">
			<Select
				--font-size="0.75rem"
				key={$t('language')}
				items={$locales.map((s) => ({ display: $t(s), value: s }))}
				bind:selected={sheet.language}
				on:change={(event) => {
					$locale = event.target.value
				}}
			/>
		</Row>
		<Row cols="4">
			<Select
				--font-size="0.75rem"
				key={$t('edition')}
				items={[{ display: $t('7E'), value: '7E' }]}
				bind:selected={sheet.edition}
				disabled={isGuest}
			/>
		</Row>
		<Row cols="4">
			<Select
				--font-size="0.75rem"
				key={$t('era')}
				items={[{ display: $t('20s'), value: '20s' }]}
				bind:selected={sheet.era}
				disabled={isGuest}
			/>
		</Row>
	</Row>
	{#if isOwner && !isNew}
		<Row>
			<Button id="btn--change-pw" value={$t('Change Password')} on:click={changePW} />
		</Row>
	{/if}
</Fieldset>

<Fieldset legend={$t('investigator')}>
	<Text key={$t('name')} bind:value={sheet.name} readonly={isGuest} />
	<Text key={$t('player')} bind:value={sheet.player} readonly={isGuest} />
	<Text key={$t('occupation')} bind:value={sheet.occupation} readonly={isGuest} />
	<Row>
		<Row cols="6">
			<Number key={$t('age')} bind:value={sheet.age} readonly={isGuest} />
		</Row>
		<Row cols="6">
			<Text key={$t('sex')} bind:value={sheet.sex} readonly={isGuest} />
		</Row>
	</Row>
	<Text key={$t('residence')} bind:value={sheet.residence} readonly={isGuest} />
	<Text key={$t('birthplace')} bind:value={sheet.birthplace} readonly={isGuest} />
</Fieldset>

<Fieldset legend={$t('portrait')}>
	{#if sheet.portraitURL}
		<img id="portrait" src={sheet.portraitURL} style="width:100%" />
	{/if}
	<Text key={$t('portraitURL')} bind:value={sheet.portraitURL} readonly={isGuest} />
	<File bind:files on:change={upload} disabled={isGuest} />
</Fieldset>

<Fieldset legend={$t('characteristics')}>
	<Row>
		<Number key={$t('STR')} bind:value={sheet.characteristics.STR} withHints readonly={isGuest} />
		<Number key={$t('DEX')} bind:value={sheet.characteristics.DEX} withHints readonly={isGuest} />
		<Number key={$t('INT')} bind:value={sheet.characteristics.INT} withHints readonly={isGuest} />
	</Row>

	<Row>
		<Number key={$t('CON')} bind:value={sheet.characteristics.CON} withHints readonly={isGuest} />
		<Number key={$t('APP')} bind:value={sheet.characteristics.APP} withHints readonly={isGuest} />
		<Number key={$t('POW')} bind:value={sheet.characteristics.POW} withHints readonly={isGuest} />
	</Row>
	<Row>
		<Number key={$t('SIZ')} bind:value={sheet.characteristics.SIZ} withHints readonly={isGuest} />
		<Number key={$t('EDU')} bind:value={sheet.characteristics.EDU} withHints readonly={isGuest} />
		<Row>
			<Number key={$t('MOV')} bind:value={sheet.characteristics.MOV} readonly={isGuest} />
			<Col>
				<div style="height:20px" />
				<Number
					--width="32px"
					--height="20px"
					textSize="text-xs"
					placeholder="+1"
					bind:value={sheet.characteristics.MOVPlus}
					readonly={isGuest}
				/>
				<Number
					--width="32px"
					--height="20px"
					textSize="text-xs"
					placeholder="-1"
					bind:value={sheet.characteristics.MOVMinus}
					readonly={isGuest}
				/>
			</Col>
		</Row>
	</Row>
</Fieldset>

<Fieldset legend={$t('status')}>
	<Row>
		<Number key={$t('currentHP')} bind:value={sheet.currentHP} readonly={isGuest} />
		<Number key={$t('maxHP')} bind:value={sheet.maxHP} readonly={isGuest} />
	</Row>
	<Row>
		<Row cols="4">
			<Checkbox
				textSize="text-xs"
				gap="gap-2"
				key={$t('isMajorWound')}
				bind:value={sheet.isMajorWound}
				disabled={isGuest}
			/>
		</Row>
		<Row cols="4">
			<Checkbox
				textSize="text-xs"
				gap="gap-2"
				key={$t('isUnconscious')}
				bind:value={sheet.isUnconscious}
				disabled={isGuest}
			/>
		</Row>
		<Row cols="4">
			<Checkbox
				textSize="text-xs"
				gap="gap-2"
				key={$t('isDying')}
				bind:value={sheet.isDying}
				disabled={isGuest}
			/>
		</Row>
	</Row>
	<Row>
		<Number key={$t('startSAN')} bind:value={sheet.startSAN} readonly={isGuest} />
		<Number key={$t('currentSAN')} bind:value={sheet.currentSAN} readonly={isGuest} />
		<Number key={$t('maxSAN')} bind:value={sheet.maxSAN} readonly={isGuest} />
	</Row>
	<Row>
		<Row cols="6">
			<Checkbox
				textSize="text-xs"
				key={$t('isTemporaryInsanity')}
				bind:value={sheet.isTemporaryInsanity}
				disabled={isGuest}
			/>
		</Row>
		<Row cols="6">
			<Checkbox
				textSize="text-xs"
				key={$t('isIndefiniteInsanity')}
				bind:value={sheet.isIndefiniteInsanity}
				disabled={isGuest}
			/>
		</Row>
	</Row>
	<Row>
		<Number key={$t('LUCK')} bind:value={sheet.LUCK} readonly={isGuest} />
		<Number key={$t('currentMP')} bind:value={sheet.currentMP} readonly={isGuest} />
		<Number key={$t('maxMP')} bind:value={sheet.maxMP} readonly={isGuest} />
	</Row>
</Fieldset>

<Fieldset legend={$t('skills')}>
	{#each skills as [key, set], idx}
		<Row>
			<Row cols="1">
				<Checkbox bind:value={set.isSuccess} disabled={isGuest} />
			</Row>
			<Row cols="10">
				<span
					class="pl-1 font-serif text-sm leading-none cursor-pointer"
					on:click={() => removeSkill(idx)}
				>
					{$t(key)}
				</span>
			</Row>
			<Row cols="1">
				<Number
					--width="32px"
					textSize="text-xs"
					bind:value={set.value}
					withHints
					readonly={isGuest}
				/>
			</Row>
		</Row>
	{/each}
	<Button on:click={addSkill} value={$t('addSkill')} disabled={isGuest} />
</Fieldset>

<Fieldset legend={$t('weapons')}>
	<div class="flex text-center text-xs font-medium">
		<div class="flex-grow">{$t('weapon')}</div>
		<div class="w-[40px]">{$t('skill')}</div>
		<div class="w-[60px]">{$t('damage')}</div>
		<div class="w-5 hover:cursor-help" title={$t('range')}>r</div>
		<div class="w-5 hover:cursor-help" title={$t('numberOfAttacks')}>#</div>
		<div class="w-5 hover:cursor-help" title={$t('ammo')}>a</div>
		<div class="w-5 hover:cursor-help" title={$t('malfunction')}>m</div>
	</div>
	{#each sheet.weapons as weapon, idx}
		<div class="flex justify-between text-xs">
			<div class="flex-grow self-center" on:click={() => removeWeapon(idx)}>
				{$t(weapon.weapon)}
			</div>
			<div>
				<Number
					textPosition="text-center"
					--padding-left="0"
					--padding-right="0"
					--width="20px"
					--width--hint="20px"
					--padding-left--hint="2px"
					textSize="text-xs"
					bind:value={weapon.skill}
					withHints
					readonly={isGuest}
				/>
			</div>
			<div>
				<Text --width="60px" --font-size="11px" bind:value={weapon.damage} readonly={isGuest} />
			</div>
			<div>
				<Number
					textPosition="text-center"
					--padding-left="0"
					--padding-right="0"
					--width="20px"
					textSize="text-xs"
					bind:value={weapon.range}
					readonly={isGuest}
				/>
			</div>
			<div>
				<Number
					textPosition="text-center"
					--padding-left="0"
					--padding-right="0"
					--width="20px"
					textSize="text-xs"
					bind:value={weapon.numberOfAttacks}
					readonly={isGuest}
				/>
			</div>
			<div>
				<Number
					textPosition="text-center"
					--padding-left="0"
					--padding-right="0"
					--width="20px"
					textSize="text-xs"
					bind:value={weapon.ammo}
					readonly={isGuest}
				/>
			</div>
			<div>
				<Checkbox
					--width="20px"
					--height="40px"
					bind:value={weapon.malfunction}
					disabled={isGuest}
				/>
			</div>
		</div>
	{/each}

	<Button on:click={addWeapon} value={$t('addWeapon')} />
</Fieldset>

<Fieldset legend={$t('combat')}>
	<Row>
		<Row cols="4">
			<Number --font-size--label="0.75rem" key={$t('damageBonus')} readonly={isGuest} />
		</Row>
		<Row cols="4">
			<Number --font-size--label="0.75rem" key={$t('build')} readonly={isGuest} />
		</Row>
		<Row cols="4">
			<Number
				--font-size--label="0.75rem"
				key={$t('_dodge')}
				bind:value={sheet.skills.dodge.value}
				withHints
				readonly
			/>
		</Row>
	</Row>
</Fieldset>

<Fieldset legend={$t('myStory')}>
	<Textarea bind:value={sheet.myStory} readonly={isGuest} />
</Fieldset>

<Fieldset legend={$t('backstory')}>
	<Textarea
		key={$t('personalDescription')}
		bind:value={sheet.backstory.personalDescription}
		readonly={isGuest}
	/>
	<Textarea key={$t('traits')} bind:value={sheet.backstory.traits} readonly={isGuest} />
	<Textarea
		key={$t('ideologyAndBeliefs')}
		bind:value={sheet.backstory.ideologyAndBeliefs}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('injuriesAndScars')}
		bind:value={sheet.backstory.injuriesAndScars}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('significantPeople')}
		bind:value={sheet.backstory.significantPeople}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('phobiasAndManias')}
		bind:value={sheet.backstory.phobiasAndManias}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('meaningfulLocations')}
		bind:value={sheet.backstory.meaningfulLocations}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('arcaneTomesSpellsAndArtifacts')}
		bind:value={sheet.backstory.arcaneTomesSpellsAndArtifacts}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('treasuredPossessions')}
		bind:value={sheet.backstory.treasuredPossessions}
		readonly={isGuest}
	/>
	<Textarea
		key={$t('encountersWithStrangeEntities')}
		bind:value={sheet.backstory.encountersWithStrangeEntities}
		readonly={isGuest}
	/>
</Fieldset>

<Fieldset legend={$t('gearAndPossessions')}>
	<Textarea bind:value={sheet.gearAndPossessions} readonly={isGuest} />
</Fieldset>

<Fieldset legend={$t('wealth')}>
	<Textarea key={$t('spendingLevel')} bind:value={sheet.wealth.spendingLevel} readonly={isGuest} />
	<Textarea key={$t('cash')} bind:value={sheet.wealth.cash} readonly={isGuest} />
	<Textarea key={$t('assets')} bind:value={sheet.wealth.assets} readonly={isGuest} />
</Fieldset>

<Fieldset legend={$t('fellowInvestigators')}>
	{#each sheet.fellowInvestigators as fellow, idx}
		<Card>
			<Row>
				<Text
					key={$t('character')}
					bind:value={fellow.character}
					readonly
					pointer
					on:click={() => removeFellow(idx)}
				/>
				<Text key={$t('player')} bind:value={fellow.player} readonly={isGuest} />
			</Row>
		</Card>
	{/each}
	<Button on:click={addFellow} value={$t('addFellow')} />
</Fieldset>

<Fieldset legend={$t('note')}>
	<Textarea bind:value={sheet.note} readonly={isGuest} />
</Fieldset>

<Fieldset>
	<div class="text-center font-mono">
		<a href="https://github.com/misa-lili/cthulhu-character-sheets">Github</a>
	</div>
</Fieldset>

<div class="text-5xl fixed right-0 bottom-0 p-4 flex flex-col space-y-2 z-50">
	{#if isGuest}
		<div class="cursor-pointer" on:click={signIn}>🔒</div>
	{:else if isOwner && !isNew}
		<div class="cursor-pointer" on:click={signOut}>🔓</div>
	{/if}
	{#if !isNew}
		<div class="cursor-pointer" on:click={newSheet}>🆕</div>
	{/if}
	{#if isOwner}
		<div class="cursor-pointer" on:click={save}>💾</div>
	{/if}
	{#if !isNew}
		<div class="cursor-pointer" on:click={share}>🔗</div>
	{/if}
	<div class="cursor-pointer" on:click={roll}>🎲</div>
</div>

<!-- <Chatbox socket {sheet} /> -->

<style>
	:global(heading, legend, label, th, input[type='button']) {
		@apply font-serif;
	}
</style>
