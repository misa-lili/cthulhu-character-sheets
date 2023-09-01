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

	function addFellow() {
		if (!$isOwner) return
		const fellowName = window.prompt($t('Fellow name?'))
		if (!fellowName) return
		$sheet.fellowInvestigators = [
			...$sheet.fellowInvestigators,
			{
				character: fellowName,
				player: '',
			},
		]
		$sheet = $sheet
	}

	function editFellow(event: InputEvent, idx: number) {
		if (!$isOwner) return

		const value = (event.target as HTMLInputElement).innerText
		if (value === '') return removeFellow(idx)
	}

	function removeFellow(idx: number) {
		if (!$isOwner) return
		const key = $sheet.fellowInvestigators[idx].character
		const confirm = window.confirm(`${$t('Remove fellow?')} ${$t(key)}`)
		if (!confirm) return
		$sheet.fellowInvestigators.splice(idx, 1)
		$sheet = $sheet
	}
</script>

<Fieldset legend={$t('fellowInvestigators')}>
	<div class="overflow-x-scroll w-full">
		<div class="px-0">
			<table class="table border-collapse">
				<thead class="text-xs whitespace-nowrap">
					<tr>
						<th>{$t('character')}</th>
						<th>{$t('player')}</th>
					</tr>
				</thead>
				<tbody class="text-xs whitespace-nowrap">
					{#each $sheet.fellowInvestigators as fellow, idx}
						<tr>
							<td>
								<Span
									bind:value={fellow.character}
									readonly={!$isOwner}
									on:input={(event) => editFellow(event, idx)}
								/>
							</td>
							<td>
								<Span bind:value={fellow.player} readonly={!$isOwner} />
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<td colspan="2">
							<Button on:click={addFellow} value={$t('addFellow')} disabled={!$isOwner} />
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</Fieldset>

<style>
	table {
		@apply table-auto border-collapse;
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
