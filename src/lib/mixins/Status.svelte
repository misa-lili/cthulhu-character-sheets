<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
</script>

<Fieldset legend={$t('status')}>
	<div class="flex flex-col gap-9">
		<div class="grid gap-y-3 gap-x-9 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
			<Row>
				<Number key={$t('currentHP')} bind:value={$sheet.currentHP} readonly={!$isOwner} />
				<Number key={$t('maxHP')} bind:value={$sheet.maxHP} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('currentMP')} bind:value={$sheet.currentMP} readonly={!$isOwner} />
				<Number key={$t('maxMP')} bind:value={$sheet.maxMP} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('LUCK')} bind:value={$sheet.LUCK} readonly={!$isOwner} />
				<Number key={$t('startLUCK')} bind:value={$sheet.startLUCK} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('currentSAN')} bind:value={$sheet.currentSAN} readonly={!$isOwner} />
				<Number key={$t('startSAN')} bind:value={$sheet.startSAN} readonly={!$isOwner} />
				<Number key={$t('insaneSAN')} bind:value={$sheet.insaneSAN} readonly={!$isOwner} />
				<Number key={$t('maxSAN')} bind:value={$sheet.maxSAN} readonly={!$isOwner} />
			</Row>
		</div>

		<div class="grid gap-y-3 gap-x-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
			<Checkbox
				textSize="text-xs"
				key={$t('isTemporaryInsanity')}
				bind:value={$sheet.isTemporaryInsanity}
				disabled={!$isOwner}
			/>
			<Checkbox
				textSize="text-xs"
				key={$t('isIndefiniteInsanity')}
				bind:value={$sheet.isIndefiniteInsanity}
				disabled={!$isOwner}
			/>
			<Checkbox
				textSize="text-xs"
				key={$t('isMajorWound')}
				bind:value={$sheet.isMajorWound}
				disabled={!$isOwner}
			/>
			<Checkbox
				textSize="text-xs"
				key={$t('isUnconscious')}
				bind:value={$sheet.isUnconscious}
				disabled={!$isOwner}
			/>
			<Checkbox
				textSize="text-xs"
				key={$t('isDying')}
				bind:value={$sheet.isDying}
				disabled={!$isOwner}
			/>
		</div>
	</div>
</Fieldset>
