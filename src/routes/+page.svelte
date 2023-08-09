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
	import Row from '$lib/components/Row.svelte'
	import Card from '$lib/components/Card.svelte'

	export let data: Character

	onMount(() => {
		$locale = data.language
		document.addEventListener('change', replaceUrl)
	})

	function replaceUrl() {
		console.log(data)
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
</script>

<Title>Cthulhu Character Sheets @misa-lili</Title>

<Fieldset legend={$t('environment')}>
	<Select
		key={$t('language')}
		items={$locales.map((s) => ({ display: $t(s), value: s }))}
		bind:selected={data.language}
		on:change={(event) => {
			$locale = event.target.value
		}}
	/>
	<Select
		key={$t('edition')}
		items={[{ display: $t('7E'), value: '7E' }]}
		bind:selected={data.edition}
	/>
	<Select key={$t('era')} items={[{ display: $t('20s'), value: '20s' }]} bind:selected={data.era} />
</Fieldset>

<Fieldset legend={$t('investigator')}>
	<Text key={$t('name')} bind:value={data.name} />
	<Text key={$t('player')} bind:value={data.player} />
	<Text key={$t('occupation')} bind:value={data.occupation} />
	<Text key={$t('age')} bind:value={data.age} />
	<Text key={$t('sex')} bind:value={data.sex} />
	<Text key={$t('residence')} bind:value={data.residence} />
	<Text key={$t('birthplace')} bind:value={data.birthplace} />
</Fieldset>

<Fieldset legend={$t('portrait')}>
	{#if data.portraitURL}
		<img id="portrait" src={data.portraitURL} style="width:100%" />
	{/if}
	<Text key={$t('portraitURL')} bind:value={data.portraitURL} />
</Fieldset>

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

<Fieldset legend={$t('status')}>
	<Row>
		<Number key={$t('currentHP')} bind:value={data.currentHP} />
		<Number key={$t('maxHP')} bind:value={data.maxHP} readonly />
	</Row>
	<Row>
		<Number key={$t('currentMP')} bind:value={data.currentMP} />
		<Number key={$t('maxMP')} bind:value={data.maxMP} readonly />
	</Row>
	<Row>
		<Number key={$t('startSAN')} bind:value={data.startSAN} readonly />
		<Number key={$t('currentSAN')} bind:value={data.currentSAN} />
		<Number key={$t('insaneSAN')} bind:value={data.insaneSAN} readonly />
	</Row>
	<Checkbox key={$t('isMajorWound')} bind:value={data.isMajorWound} />
	<Checkbox key={$t('isUnconscious')} bind:value={data.isUnconscious} />
	<Checkbox key={$t('isDying')} bind:value={data.isDying} />
	<Checkbox key={$t('isTemporaryInsanity')} bind:value={data.isTemporaryInsanity} />
	<Checkbox key={$t('isIndefiniteInsanity')} bind:value={data.isIndefiniteInsanity} />
</Fieldset>

<Fieldset legend={$t('skills')}>
	{#each skills as [key, set], idx}
		<Row>
			<Row cols="1">
				<Checkbox bind:value={set.isSuccess} />
			</Row>
			<Row cols="5">
				<span class="pl-1" on:click={() => removeSkill(idx)}>{$t(key)}</span>
			</Row>
			<Row cols="6">
				<Number bind:value={set.value} withHints />
			</Row>
		</Row>
	{/each}
	<Button on:click={addSkill} value={$t('addSkill')} />
</Fieldset>

<Fieldset legend={$t('weapons')}>
	<table class="table text-[8px] tracking-tighter">
		<thead>
			<tr>
				<th>{$t('weapon')}</th>
				<th class="w-8">{$t('skill')}</th>
				<th class="w-14">{$t('damage')}</th>
				<th class="w-8">{$t('numberOfAttacks')}</th>
				<th class="w-8">{$t('range')}</th>
				<th class="w-8">{$t('ammo')}</th>
				<th class="w-8">{$t('malfunction')}</th>
			</tr>
		</thead>
		<tbody>
			{#each data.weapons as weapon, idx}
				<tr>
					<td on:click={() => removeWeapon(idx)}>
						<div
							class="
								w-full h-[34px] border border-black border-solid rounded
								flex items-center justify-center
								px-0.5 leading-none overflow-hidden
							"
						>
							{$t(weapon.weapon)}
						</div>
					</td>
					<td>
						<Number bind:value={weapon.skill} />
					</td>
					<td>
						<Text bind:value={weapon.damage} />
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
					<td>
						<Checkbox bind:value={weapon.malfunction} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<Button on:click={addWeapon} value={$t('addWeapon')} />
</Fieldset>

<Fieldset legend={$t('combat')}>
	<Row>
		<Number key={$t('damageBonus')} />
		<Number key={$t('build')} />
	</Row>
	<Number key={$t('dodge')} withHints />
</Fieldset>

<Fieldset legend={$t('myStory')}>
	<Textarea bind:value={data.myStory} />
</Fieldset>

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

<Fieldset legend={$t('gearAndPossessions')}>
	<Textarea bind:value={data.gearAndPossessions} />
</Fieldset>

<Fieldset legend={$t('wealth')}>
	<Textarea key={$t('spendingLevel')} bind:value={data.backstory.spendingLevel} />
	<Textarea key={$t('cash')} bind:value={data.backstory.cash} />
	<Textarea key={$t('assets')} bind:value={data.backstory.assets} />
</Fieldset>

<Fieldset legend={$t('fellowInvestigators')}>
	{#each data.fellowInvestigators as fellow, idx}
		<Card>
			<Row>
				<Text
					key={$t('character')}
					bind:value={fellow.character}
					readonly
					on:click={() => removeFellow(idx)}
				/>
				<Text key={$t('player')} bind:value={fellow.player} />
			</Row>
		</Card>
	{/each}
	<Button on:click={addFellow} value={$t('addFellow')} />
</Fieldset>

<Fieldset legend={$t('note')}>
	<Textarea rows="8" bind:value={data.note} />
</Fieldset>

<div class="text-center">
	<a href="https://github.com/misa-lili/cthulhu-character-sheets">github</a>
</div>

<Fab value={$t('ROLL')} fixed right bottom on:click={roll} />
