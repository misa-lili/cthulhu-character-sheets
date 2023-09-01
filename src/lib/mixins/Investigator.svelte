<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
</script>

<Fieldset legend={$t('investigator')}>
	<div class="grid gap-y-3 gap-x-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
		<Text key={$t('name')} bind:value={$sheet.name} readonly={!$isOwner} />
		<Text key={$t('occupation')} bind:value={$sheet.occupation} readonly={!$isOwner} />
		<Text key={$t('birthplace')} bind:value={$sheet.birthplace} readonly={!$isOwner} />
		<Text key={$t('residence')} bind:value={$sheet.residence} readonly={!$isOwner} />
		<Text key={$t('sex')} bind:value={$sheet.sex} readonly={!$isOwner} />
		<Text key={$t('age')} bind:value={$sheet.age} readonly={!$isOwner} />
	</div>
</Fieldset>
