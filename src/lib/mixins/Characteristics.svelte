<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
	import NumberDense from '$lib/components/NumberDense.svelte'
</script>

<Fieldset legend={$t('characteristics')}>
	<div
		class="grid gap-y-3 gap-x-12 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8"
	>
		<NumberDense label={$t('STR')} bind:value={$sheet.characteristics.STR} readonly={!$isOwner} />
		<NumberDense label={$t('CON')} bind:value={$sheet.characteristics.CON} readonly={!$isOwner} />
		<NumberDense label={$t('DEX')} bind:value={$sheet.characteristics.DEX} readonly={!$isOwner} />
		<NumberDense label={$t('INT')} bind:value={$sheet.characteristics.INT} readonly={!$isOwner} />
		<NumberDense label={$t('SIZ')} bind:value={$sheet.characteristics.SIZ} readonly={!$isOwner} />
		<NumberDense label={$t('POW')} bind:value={$sheet.characteristics.POW} readonly={!$isOwner} />
		<NumberDense label={$t('APP')} bind:value={$sheet.characteristics.APP} readonly={!$isOwner} />
		<NumberDense label={$t('EDU')} bind:value={$sheet.characteristics.EDU} readonly={!$isOwner} />
	</div>
</Fieldset>
