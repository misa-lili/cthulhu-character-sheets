<script lang="ts">
	import LZString from 'lz-string'
	import { t, l, locales, locale } from '$lib/translations'
	import { onMount } from 'svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Number from '$lib/components/Number.svelte'
	import Text from '$lib/components/Text.svelte'
	import Textarea from '$lib/components/Textarea.svelte'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Title from '$lib/components/Title.svelte'
	import Fab from '$lib/components/Fab.svelte'
	import Button from '$lib/components/Button.svelte'
	import Select from '$lib/components/Select.svelte'

	export let data: Character

	onMount(() => {
		document.addEventListener('change', replaceUrl)
	})

	function replaceUrl() {
		history.replaceState({}, '', `?data=${encode(data)}`)
	}

	function encode(obj: object) {
		const text = JSON.stringify(obj)
		const encoded = LZString.compressToEncodedURIComponent(text)
		return encoded
	}

	$: skills = Object.entries(data.skills).sort((a, b) => {
		const aKey = $t(a[0])
		const bKey = $t(b[0])
		const result = aKey.localeCompare(bKey)
		return result
	})

	function addSkill() {
		const skillName = window.prompt('Skill name')
		if (!skillName) return
		data.skills[skillName] = { value: 0, isOccupation: false }
		replaceUrl()
	}

	function removeSkill(idx: number) {
		const key = skills[idx][0]
		const confirm = window.confirm(`Remove skill? ${$t(key)}`)
		if (!confirm) return
		delete data.skills[key]
		data = data
		replaceUrl()
	}

	function addWeapon() {
		const weaponName = window.prompt('Weapon name?')
		if (!weaponName) return
		data.weapons = [
			...data.weapons,
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
		replaceUrl()
	}

	function removeWeapon(idx: number) {
		const key = data.weapons[idx].weapon
		const confirm = window.confirm(`Remove weapon? ${key}`)
		if (!confirm) return
		data.weapons.splice(idx, 1)
		data = data
		replaceUrl()
	}

	function addFellow() {
		const fellowName = window.prompt('Fellow name?')
		if (!fellowName) return
		data.fellowInvestigators = [
			...data.fellowInvestigators,
			{
				character: fellowName,
				player: '',
			},
		]
		replaceUrl()
	}

	function removeFellow(idx: number) {
		const key = data.fellowInvestigators[idx].character
		const confirm = window.confirm(`Remove fellow? ${key}`)
		if (!confirm) return
		data.fellowInvestigators.splice(idx, 1)
		data = data
		replaceUrl()
	}

	function roll100() {
		alert(`1d100: ${Math.floor(Math.random() * 100) + 1}`)
	}
</script>

<Title>Cthulhu Character Sheets @misa-lili</Title>

<br />

<Fieldset legend={$t('environment')}>
	<Select values={$locales} bind:selected={$locale} />
	<Select values={['7E']} bind:selected={data.edition} />
	<Select values={['20s']} bind:selected={data.era} />
</Fieldset>

<br />

<Fieldset legend={$t('investigator')}>
	<Text key={$t('name')} bind:value={data.name} />
	<Text key={$t('player')} bind:value={data.player} />
	<Text key={$t('occupation')} bind:value={data.occupation} />
	<Text key={$t('age')} bind:value={data.age} />
	<Text key={$t('sex')} bind:value={data.sex} />
	<Text key={$t('residence')} bind:value={data.residence} />
	<Text key={$t('birthplace')} bind:value={data.birthplace} />
</Fieldset>

<br />

<Fieldset legend={$t('portrait')}>
	<img id="portrait" src={data.portraitURL} style="width:100%" />
	<Text key={$t('portraitURL')} bind:value={data.portraitURL} />
</Fieldset>

<br />

<Fieldset legend={$t('characteristics')}>
	<Number key={$t('STR')} bind:value={data.characteristics.STR} withHints />
	<Number key={$t('CON')} bind:value={data.characteristics.CON} withHints />
	<Number key={$t('POW')} bind:value={data.characteristics.POW} withHints />
	<Number key={$t('DEX')} bind:value={data.characteristics.DEX} withHints />
	<Number key={$t('APP')} bind:value={data.characteristics.APP} withHints />
	<Number key={$t('SIZ')} bind:value={data.characteristics.SIZ} withHints />
	<Number key={$t('INT')} bind:value={data.characteristics.INT} withHints />
	<Number key={$t('EDU')} bind:value={data.characteristics.EDU} withHints />
	<Number key={$t('MOV')} readonly bind:value={data.characteristics.MOV} withHints />
	<Number key={$t('LUCK')} bind:value={data.LUCK} />
</Fieldset>

<br />

<Fieldset legend={$t('status')}>
	<div style="display: flex; align-items: center; gap: 4px;">
		<Number key={$t('currentHP')} bind:value={data.currentHP} />
		<Number key={$t('maxHP')} bind:value={data.maxHP} readonly />
	</div>
	<div style="display: flex; align-items: center; gap: 4px;">
		<Number key={$t('currentMP')} bind:value={data.currentMP} />
		<Number key={$t('maxMP')} bind:value={data.maxMP} readonly />
	</div>
	<div style="display: flex; align-items: center; gap: 4px;">
		<Number key={$t('startSAN')} bind:value={data.startSAN} readonly />
		<Number key={$t('currentSAN')} bind:value={data.currentSAN} />
		<Number key={$t('insaneSAN')} bind:value={data.insaneSAN} readonly />
	</div>
	<Checkbox key={$t('isMajorWound')} bind:value={data.isMajorWound} />
	<Checkbox key={$t('isUnconscious')} bind:value={data.isUnconscious} />
	<Checkbox key={$t('isDying')} bind:value={data.isDying} />
	<Checkbox key={$t('isTemporaryInsanity')} bind:value={data.isTemporaryInsanity} />
	<Checkbox key={$t('isIndefiniteInsanity')} bind:value={data.isIndefiniteInsanity} />
</Fieldset>

<br />

<Fieldset legend={$t('skills')}>
	{#each skills as [key, set], idx}
		<div style="display: flex; align-items: center;">
			<div class="field-row">
				<Checkbox type="checkbox" bind:checked={set.isSuccess} />
			</div>
			<div class="field-row">
				<Number key={$t(key)} bind:value={set.value} withHints />
			</div>
			<div>
				<div class="title-bar-controls">
					<button aria-label="Close" on:click={() => removeSkill(idx)} />
				</div>
			</div>
		</div>
	{/each}
	<br />
	<Button on:click={addSkill} value={$t('addSkill')} />
</Fieldset>

<br />
<!-- 
<Fieldset legend={$t('weapons')}>
	<div class="sunken-panel" style="height: 120px; width: 335px;">
		<table class="interactive">
			<thead>
				<tr>
					<th>{$t('weapon')}</th>
					<th>{$t('skill')}</th>
					<th>{$t('damage')}</th>
					<th>{$t('numberOfAttacks')}</th>
					<th>{$t('range')}</th>
					<th>{$t('ammo')}</th>
					<th>{$t('malfunction')}</th>
					<th>{$t('remove')}</th>
				</tr>
			</thead>
			<tbody>
				{#each data.weapons as weapon, idx}
					<tr>
						<td>{$t(weapon.weapon)}</td>
						<td>
							<Number bind:value={weapon.skill} />
						</td>
						<td>
							<Text bind:value={weapon.damage} --width="40px" />
						</td>
						<td>
							<Number bind:value={weapon.numberOfAttacks} />
						</td>
						<td>
							<Number bind:value={weapon.range} />
						</td>
						<td>
							<Number bind:value={weapon.ammo} />
						</td>
						<td><Checkbox bind:value={weapon.malfunction} /></td>
						<td>
							<div class="title-bar-controls">
								<button aria-label="Close" on:click={() => removeWeapon(idx)} />
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<br />
	<button on:click={addWeapon}>{$t('addWeapon')}</button>
</Fieldset> -->

<br />

<Fieldset legend={$t('combat')}>
	<Number key={$t('damageBonus')} readonly />
	<Number key={$t('build')} readonly />
	<Number key={$t('dodge')} readonly />
</Fieldset>

<br />

<Fieldset legend={$t('myStory')}>
	<Textarea bind:value={data.myStory} />
</Fieldset>

<br />

<Fieldset legend={$t('backstory')}>
	<Textarea key={$t('personalDescription')} bind:value={data.backstory.personalDescription} />
	<Textarea key={$t('traits')} bind:value={data.backstory.traits} />
	<Textarea key={$t('ideologyAndBeliefs')} bind:value={data.backstory.ideologyAndBeliefs} />
	<Textarea key={$t('injuriesAndScars')} bind:value={data.backstory.injuriesAndScars} />
	<Textarea key={$t('significantPeople')} bind:value={data.backstory.significantPeople} />
	<Textarea key={$t('phobiasAndManias')} bind:value={data.backstory.phobiasAndManias} />
	<Textarea key={$t('meaningfulLocations')} bind:value={data.backstory.meaningfulLocations} />
	<Textarea
		key={$t('arcaneTomesSpellsAndArtifacts')}
		bind:value={data.backstory.arcaneTomesSpellsAndArtifacts}
	/>
	<Textarea key={$t('treasuredPossessions')} bind:value={data.backstory.treasuredPossessions} />
	<Textarea
		key={$t('encountersWithStrangeEntities')}
		bind:value={data.backstory.encountersWithStrangeEntities}
	/>
</Fieldset>

<br />

<Fieldset legend={$t('gearAndPossessions')}>
	<Textarea bind:value={data.gearAndPossessions} />
</Fieldset>

<br />

<Fieldset legend={$t('wealth')}>
	<Textarea key={$t('spendingLevel')} bind:value={data.backstory.spendingLevel} />
	<Textarea key={$t('cash')} bind:value={data.backstory.cash} />
	<Textarea key={$t('assets')} bind:value={data.backstory.assets} />
</Fieldset>

<br />

<Fieldset legend={$t('fellowInvestigators')}>
	{#each data.fellowInvestigators as fellow, idx}
		<div class="field-row">
			<Text key={$t('character')} bind:value={fellow.character} />
			<Text key={$t('player')} bind:value={fellow.player} />
			<div class="title-bar-controls">
				<Button on:click={() => removeFellow(idx)} value={$t('removeFellow')} />
			</div>
		</div>
	{/each}
	<br />
	<Button on:click={addFellow} value={$t('addFellow')} />
</Fieldset>

<br />

<Fieldset legend={$t('note')}>
	<Textarea rows="8" bind:value={data.note} />
</Fieldset>

<Fab value="ROLL" fixed right bottom on:click={roll100} />
