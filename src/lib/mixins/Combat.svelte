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
</script>

<Fieldset legend={$t('combat')}>
	<div class="grid gap-y-3 gap-x-2 grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
		<Number key={$t('MOV')} bind:value={$sheet.characteristics.MOV} readonly={!$isOwner} />
		<Number key={$t('build')} bind:value={$sheet.combat.build} readonly={!$isOwner} />
		<Number key={$t('_dodge')} bind:value={$sheet.skills.dodge.value} withHints readonly />
		<Text key={$t('damageBonus')} bind:value={$sheet.combat.damageBonus} readonly={!$isOwner} />
	</div>
</Fieldset>
