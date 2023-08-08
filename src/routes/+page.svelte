<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Number from '$lib/components/Number.svelte'
	import Text from '$lib/components/Text.svelte'
	import { t, l, locales, locale } from '$lib/translations'
	import { onMount } from 'svelte'

	export let data: Character

	$: if (data) {
		console.log(data)
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
	}

	function removeSkill(idx: number) {
		const key = skills[idx][0]
		const confirm = window.confirm(`Remove skill? ${$t(key)}`)
		if (!confirm) return
		delete data.skills[key]
		data = data
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
	}

	function removeWeapon(idx: number) {
		const key = data.weapons[idx].weapon
		const confirm = window.confirm(`Remove weapon? ${key}`)
		if (!confirm) return
		data.weapons.splice(idx, 1)
		data = data
	}
</script>

<div class="title-bar">
	<div class="title-bar-text">Cthulhu Character Sheets @misa-lili</div>
	<div class="title-bar-controls">
		<button aria-label="Minimize" />
		<button aria-label="Maximize" />
		<button aria-label="Close" />
	</div>
</div>

<br />

<fieldset>
	<legend>{$t('environment')}</legend>
	<div class="field-row">
		<select bind:value={$locale}>
			{#each $locales as value}
				<option {value}>{$l(value, value)}</option>
			{/each}
		</select>
	</div>

	<div class="field-row">
		<select>
			<option selected>7E</option>
		</select>
	</div>

	<div class="field-row">
		<select>
			<option selected>20s</option>
			<option>Now</option>
		</select>
	</div>
</fieldset>

<br />

<fieldset>
	<legend>{$t('investigator')}</legend>
	<Text key="name" value={data.name} />
	<Text key="player" value={data.player} />
	<Text key="occupation" value={data.occupation} />
	<Text key="age" value={data.age} />
	<Text key="sex" value={data.sex} />
	<Text key="residence" value={data.residence} />
	<Text key="birthplace" value={data.birthplace} />
</fieldset>

<br />

<fieldset>
	<legend>{$t('portrait')}</legend>
	<img id="portrait" src={data.portraitURL} style="width:100%" />
	<Text key="portraitURL" bind:value={data.portraitURL} />
</fieldset>

<br />

<fieldset>
	<legend>{$t('characteristics')}</legend>
	<Number key="STR" bind:value={data.characteristics.STR} />
	<Number key="CON" bind:value={data.characteristics.CON} />
	<Number key="POW" bind:value={data.characteristics.POW} />
	<Number key="DEX" bind:value={data.characteristics.DEX} />
	<Number key="APP" bind:value={data.characteristics.APP} />
	<Number key="SIZ" bind:value={data.characteristics.SIZ} />
	<Number key="INT" bind:value={data.characteristics.INT} />
	<Number key="EDU" bind:value={data.characteristics.EDU} />
	<Number key="MOV" readonly bind:value={data.characteristics.MOV} />
</fieldset>

<br />

<fieldset>
	<legend>{$t('status')}</legend>
	<Checkbox key="isMajorWound" bind:value={data.isMajorWound} />
	<Checkbox key="isUnconscious" bind:value={data.isUnconscious} />
	<Checkbox key="isDying" bind:value={data.isDying} />
	<Checkbox key="isTemporaryInsanity" bind:value={data.isTemporaryInsanity} />
	<Checkbox key="isIndefiniteInsanity" bind:value={data.isIndefiniteInsanity} />
</fieldset>

<br />

<fieldset>
	<legend>{$t('skills')}</legend>
	{#each skills as [key, set], idx}
		<div style="display: flex; align-items: center;">
			<div class="field-row">
				<input type="checkbox" id={idx} bind:checked={set.isSuccess} />
				<label for={idx}><span style="opacity:0">|</span></label>
			</div>
			<div class="field-row">
				<Number key={$t(key)} bind:value={set.value} />
				<Number value={(set.value / 2).toFixed(0)} readonly />
				<Number value={(set.value / 5).toFixed(0)} readonly />
			</div>
			<div>
				<div class="title-bar-controls">
					<button aria-label="Close" on:click={() => removeSkill(idx)} />
				</div>
			</div>
		</div>
	{/each}
	<br />
	<button on:click={addSkill}>스킬 추가</button>
</fieldset>

<br />

<fieldset>
	<legend>{$t('weapons')}</legend>
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
						<td>{weapon.weapon}</td>
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
	<button on:click={addWeapon}>무기 추가</button>
</fieldset>

<br />

<fieldset>
	<legend>{$t('combat')}</legend>
	<Number key={$t('damageBonus')} readonly />
	<Number key={$t('build')} readonly />
	<Number key={$t('dodge')} readonly />
</fieldset>

<style>
	:global(body) {
		background: #dfdfdf;
	}

	:global(legend) {
		background: none;
	}

	:global(input[type='number']:read-only) {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}

	.zoom {
		transform-origin: 0 0;
		transform: scale(1.2);
	}
</style>
