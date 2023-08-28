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

	function addWeapon() {
		if (!$isOwner) return
		const weaponName = window.prompt($t('Weapon name?'))
		if (!weaponName) return
		$sheet.weapons = [
			...$sheet.weapons,
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
		if (!$isOwner) return
		const key = $sheet.weapons[idx].weapon
		const confirm = window.confirm(`${$t('Remove weapon?')} ${$t(key)}`)
		if (!confirm) return
		$sheet.weapons.splice(idx, 1)
		$sheet = $sheet
	}
</script>

<Fieldset legend={$t('weapons')}>
	<div>
		<table class="table-auto border-collapse">
			<thead>
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
			<tbody>
				{#each $sheet.weapons as weapon, idx}
					<tr>
						<td on:click={() => removeWeapon(idx)}>
							{$t(weapon.weapon)}
						</td>
						<td>
							<Span bind:value={weapon.skill} readonly={!$isOwner} />
							<span> ( </span>
							<span class="text-green-500">{Math.floor(weapon.skill / 2)}</span>
							<span> / </span>
							<span class="text-red-500">{Math.floor(weapon.skill / 5)}</span>
							<span> ) </span>
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
							<input bind:checked={weapon.malfunction} type="checkbox" disabled={!$isOwner} />
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="7">
						<Button on:click={addWeapon} value={$t('addWeapon')} />
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</Fieldset>

<style>
	table {
		@apply text-sm font-normal;
	}

	thead {
		@apply bg-black/5;
	}

	td,
	th {
		@apply px-3 py-1 border;
	}

	th {
		@apply font-medium;
	}
</style>
