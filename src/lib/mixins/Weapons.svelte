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

	function addWeapon() {
		if (!$isOwner) return
		const weaponName = window.prompt($t('Weapon name?'))
		if (!weaponName) return
		const weapon: Weapon = {
			name: weaponName,
			isEditable: true,
			skill: 0,
			damage: '1d3',
			numberOfAttacks: 1,
			range: '0m',
			ammo: 0,
			malfunction: false,
		}
		$sheet.weapons = [...$sheet.weapons, weapon]
	}

	function editWeapon(event: InputEnvet, idx: number) {
		if (!$isOwner) return
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
				{#each $sheet.weapons as weapon, idx (idx)}
					<tr>
						<td>
							{#if weapon.isEditable}
								<Span
									bind:value={weapon.name}
									readonly={!$isOwner}
									on:input={(event) => editWeapon(event, idx)}
								/>
							{:else}
								<span class="cursor-not-allowed">
									{$t(weapon.name)}
								</span>
							{/if}
						</td>
						<td>
							<NumberDense bind:value={weapon.skill} readonly={!$isOwner} />
						</td>
						<td>
							<Text bind:value={weapon.damage} readonly={!$isOwner} isAutoWidth />
						</td>
						<td>
							<Text bind:value={weapon.range} readonly={!$isOwner} isAutoWidth />
						</td>
						<td>
							<Text bind:value={weapon.numberOfAttacks} readonly={!$isOwner} isAutoWidth />
						</td>
						<td>
							<Text bind:value={weapon.ammo} readonly={!$isOwner} isAutoWidth />
						</td>
						<td>
							<Text bind:value={weapon.malfunction} readonly={!$isOwner} isAutoWidth />
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
