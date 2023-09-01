<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Button from '$lib/components/Button.svelte'
	import Span from '$lib/components/Span.svelte'
	import { onMount } from 'svelte'
	import NumberDense from '$lib/components/NumberDense.svelte'

	$: weapons = $sheet?.weapons.map((weapon) => {
		if (weapon.name === undefined) {
			return {
				...weapon,
				name: $t(weapon.weapon),
			}
		} else {
			return weapon
		}
	})

	function addWeapon() {
		if (!$isOwner) return
		const weaponName = window.prompt($t('Weapon name?'))
		if (!weaponName) return
		$sheet.weapons = [
			...$sheet.weapons,
			{
				weapon: weaponName,
				name: weaponName,
				skill: 0,
				damage: '1d3',
				numberOfAttacks: 1,
				range: 20,
				ammo: 0,
				malfunction: false,
			},
		]
	}

	function editWeapon(event: InputEnvet, idx: number) {
		if (!$isOwner) return

		// const key = $sheet.weapons[idx].weapon
		const value = (event.target as HTMLInputElement).innerText
		// const translated = $t(value)
		$sheet.weapons[idx].name = value
		$sheet = $sheet

		// if (value !== translated) {
		// 	$sheet.weapons[idx].weapon = translated
		// 	;(event.target as HTMLInputElement).innerText = translated
		// }

		if (value === '') return removeWeapon(event, idx)
	}

	function removeWeapon(event: InputEvent, idx: number) {
		if (!$isOwner) return
		const key = $sheet.weapons[idx].weapon
		const confirm = window.confirm(`${$t('Remove weapon?')} ${$t(key)}`)
		if (!confirm) return
		$sheet.weapons.splice(idx, 1)
		$sheet = $sheet
	}
</script>

<div class="overflow-x-scroll w-full">
	<div>
		<table class="table border-collapse">
			<thead class="text-xs whitespace-nowrap">
				<tr>
					<th>{$t('weapon')}</th>
					<th>{$t('skill')}</th>
					<th>{$t('damage')}</th>
					<th>{$t('range')}</th>
					<th>{$t('numberOfAttacks')}</th>
					<th>{$t('ammo')}</th>
					<th>{$t('malfunction')}</th>
				</tr>
			</thead>
			<tbody class="text-xs whitespace-nowrap">
				{#each weapons as weapon, idx (weapon.weapon)}
					<tr>
						<td>
							<Span
								value={weapon.name}
								readonly={!$isOwner}
								on:input={(event) => editWeapon(event, idx)}
							/>
						</td>
						<td>
							<NumberDense bind:value={weapon.skill} readonly={!$isOwner} />
						</td>
						<td>
							<Span bind:value={weapon.damage} readonly={!$isOwner} />
						</td>
						<td>
							<Span bind:value={weapon.range} readonly={!$isOwner} />
						</td>
						<td>
							<Span bind:value={weapon.numberOfAttacks} readonly={!$isOwner} />
						</td>
						<td>
							<Span bind:value={weapon.ammo} readonly={!$isOwner} />
						</td>
						<td>
							<Checkbox
								--width="1rem"
								--height="1rem"
								textSize="text-xs"
								bind:value={weapon.malfunction}
								disabled={!$isOwner}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="7">
						<Button on:click={addWeapon} value={$t('addWeapon')} disabled={!$isOwner} />
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<style>
	table {
		@apply font-normal;
	}

	thead {
		@apply bg-black/5;
	}

	td,
	th {
		@apply px-2 py-1 border;
	}

	th {
		@apply font-medium;
	}
</style>
