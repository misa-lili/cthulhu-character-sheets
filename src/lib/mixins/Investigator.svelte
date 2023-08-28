<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
</script>

<Fieldset legend={$t('investigator')}>
	<Row gap="12">
		<Row cols="4">
			<Col>
				<Text key={$t('name')} bind:value={$sheet.name} readonly={!$isOwner} />
				<Text key={$t('occupation')} bind:value={$sheet.occupation} readonly={!$isOwner} />
			</Col>
		</Row>
		<Row cols="4">
			<Col>
				<Text key={$t('birthplace')} bind:value={$sheet.birthplace} readonly={!$isOwner} />
				<Text key={$t('residence')} bind:value={$sheet.residence} readonly={!$isOwner} />
			</Col>
		</Row>
		<Row cols="4">
			<Col>
				<Text key={$t('sex')} bind:value={$sheet.sex} readonly={!$isOwner} />
				<Number key={$t('age')} bind:value={$sheet.age} readonly={!$isOwner} />
			</Col>
		</Row>
	</Row>
</Fieldset>
